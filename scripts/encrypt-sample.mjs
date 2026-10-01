// Usage: SAMPLE_ANSWER="<secret answer>" npm run encrypt-sample
// Reads private/sample-data.json (git-ignored) and writes the encrypted
// blob that is committed: src/i18n/sampleData.enc.json
import { readFileSync, writeFileSync } from 'node:fs';
import { encryptJson } from '../src/i18n/sampleCrypto.ts';

const answer = process.env.SAMPLE_ANSWER;
if (!answer) {
  console.error('Set SAMPLE_ANSWER to the secret answer.');
  process.exit(1);
}

const plain = JSON.parse(readFileSync('private/sample-data.json', 'utf8'));
const blob = await encryptJson(plain, answer);
writeFileSync('src/i18n/sampleData.enc.json', JSON.stringify(blob, null, 2) + '\n');
console.log('Wrote src/i18n/sampleData.enc.json');
