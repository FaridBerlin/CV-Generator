import { v4 as uuidv4 } from 'uuid';
import type { CVData } from '../types/cv';
import type { Lang } from './translations';
import { decryptJson } from './sampleCrypto';
import type { EncryptedBlob } from './sampleCrypto';
import encryptedSample from './sampleData.enc.json';

type WithoutId<T> = Omit<T, 'id'>;

/** The stored shape: no ids, and flat string lists for skills and interests. */
export interface SampleContent {
  personalInfo: CVData['personalInfo'];
  education: WithoutId<CVData['education'][number]>[];
  experience: WithoutId<CVData['experience'][number]>[];
  skills: string[];
  projects: WithoutId<CVData['projects'][number]>[];
  languages: WithoutId<CVData['languages'][number]>[];
  interests: string[];
}

type SampleSet = Record<Lang, SampleContent>;

const withIds = <T extends object>(items: T[]) => items.map((item) => ({ id: uuidv4(), ...item }));

const hydrate = (c: SampleContent): CVData => ({
  personalInfo: c.personalInfo,
  education: withIds(c.education),
  experience: withIds(c.experience),
  skills: c.skills.map((skill) => ({ id: uuidv4(), skill })),
  projects: withIds(c.projects),
  languages: withIds(c.languages),
  interests: c.interests.map((interest) => ({ id: uuidv4(), interest })),
});

/**
 * Decrypts the sample CV for `lang`. Resolves to null when `answer` is wrong.
 * The plaintext lives only in the git-ignored private/sample-data.json.
 */
export async function getSampleData(lang: Lang, answer: string): Promise<CVData | null> {
  const set = await decryptJson<SampleSet>(encryptedSample as EncryptedBlob, answer);
  return set ? hydrate(set[lang]) : null;
}
