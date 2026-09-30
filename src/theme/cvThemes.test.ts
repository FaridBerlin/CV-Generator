import { describe, expect, test } from 'vitest';
import { cvThemes } from './cvThemes';
import { contrastRatio } from './contrast';

// Teal is the original look; Blue and Indigo are exact user-chosen colors. All three are
// below AA for white text on the primary, so only the other presets get the full check.
const exempt = ['teal', 'blue', 'indigo'];
const checked = cvThemes.filter((t) => !exempt.includes(t.id));

describe('cvThemes contrast (WCAG AA, 4.5:1)', () => {
  test.each(checked.map((t) => [t.id, t] as const))('%s', (_id, t) => {
    expect(contrastRatio(t.onPrimary, t.primary)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.onPrimary, t.primaryDark)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.headerSubtle, t.primary)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.accent, '#ffffff')).toBeGreaterThanOrEqual(4.5);
  });

  test.each(exempt.map((id) => [id, cvThemes.find((t) => t.id === id)!] as const))(
    '%s (exempt) still has readable bar and accent',
    (_id, t) => {
      if (t.id !== 'teal')
        expect(contrastRatio(t.onPrimary, t.primaryDark)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(t.accent, '#ffffff')).toBeGreaterThanOrEqual(4.5);
    }
  );

  test('ids are unique', () => {
    expect(new Set(cvThemes.map((t) => t.id)).size).toBe(cvThemes.length);
  });
});
