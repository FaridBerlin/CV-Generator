import { describe, expect, test } from 'vitest';
import { decryptJson, encryptJson, normalizeAnswer } from './sampleCrypto';

describe('sampleCrypto', () => {
  test('normalizes spelling variants of the answer', () => {
    expect(normalizeAnswer('  Berlin Defense ')).toBe('berlin');
    expect(normalizeAnswer('berlin-defence')).toBe('berlin');
    expect(normalizeAnswer('BERLIN')).toBe('berlin');
  });

  test('round-trips with the right answer and rejects a wrong one', async () => {
    const blob = await encryptJson({ hello: 'world' }, 'Test Opening', 1000);
    expect(JSON.stringify(blob)).not.toContain('world');
    expect(await decryptJson(blob, 'test opening')).toEqual({ hello: 'world' });
    expect(await decryptJson(blob, 'sicilian')).toBeNull();
  });
});
