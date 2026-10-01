// Sample data is shipped encrypted. The key is derived from the answer to a
// secret question, so the plaintext never appears in the repo or the bundle.
// No runtime imports on purpose: scripts/encrypt-sample.mjs loads this file
// directly with Node.

export interface EncryptedBlob {
  v: 1;
  iterations: number;
  salt: string;
  iv: string;
  data: string;
}

const ITERATIONS = 600_000;

const toB64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));
const fromB64 = (b64: string): Uint8Array<ArrayBuffer> =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

/** "Berlin Defense", "berlin defence" and "Berlin" all map to "berlin". */
export const normalizeAnswer = (answer: string): string =>
  answer
    .toLowerCase()
    .replace(/defen[cs]e/g, '')
    .replace(/[^\p{L}\p{N}]/gu, '');

const deriveKey = async (answer: string, salt: Uint8Array<ArrayBuffer>, iterations: number) => {
  const material = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(normalizeAnswer(answer)),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
};

export async function encryptJson(
  value: unknown,
  answer: string,
  iterations = ITERATIONS
): Promise<EncryptedBlob> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(answer, salt, iterations);
  const data = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(JSON.stringify(value))
  );
  return { v: 1, iterations, salt: toB64(salt), iv: toB64(iv), data: toB64(new Uint8Array(data)) };
}

/** Resolves to the decrypted value, or null when the answer is wrong. */
export async function decryptJson<T>(blob: EncryptedBlob, answer: string): Promise<T | null> {
  try {
    const key = await deriveKey(answer, fromB64(blob.salt), blob.iterations);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromB64(blob.iv) },
      key,
      fromB64(blob.data)
    );
    return JSON.parse(new TextDecoder().decode(plain)) as T;
  } catch {
    return null;
  }
}
