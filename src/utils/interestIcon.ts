export type InterestIconKind = 'ai' | 'game' | 'fitness' | 'chess' | 'default';

/**
 * Interests are free text, so icons are picked by keyword match against a
 * handful of common hobbies. Anything unrecognized falls back to a star.
 */
export function getInterestIconKind(interest: string): InterestIconKind {
  const text = interest.toLowerCase();
  if (text.includes('ai') || text.includes('automati') || /(^|[^a-z])ki([^a-z]|$)/.test(text))
    return 'ai';
  if (text.includes('game') || text.includes('spiel')) return 'game';
  if (text.includes('fitness') || text.includes('gym') || text.includes('sport')) return 'fitness';
  if (text.includes('chess') || text.includes('schach')) return 'chess';
  return 'default';
}
