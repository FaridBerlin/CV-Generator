import { StyleSheet } from '@react-pdf/renderer';
import type { CvTheme } from '../theme/cvThemes';

// Neutral colors that are not part of the CV theme.
export const colors = {
  gray: '#4b5563',
  lightGray: '#d1d5db',
};

const cache = new Map<string, ReturnType<typeof build>>();

export const createPdfStyles = (theme: CvTheme) => {
  let styles = cache.get(theme.id);
  if (!styles) {
    styles = build(theme);
    cache.set(theme.id, styles);
  }
  return styles;
};

const build = (theme: CvTheme) =>
  StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1f2937',
  },
  header: {
    backgroundColor: theme.primary,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: theme.onPrimary,
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: theme.headerSubtle,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bio: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: theme.onPrimary,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: theme.accent,
  },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.accent,
  },
  photoPlaceholderText: {
    fontSize: 7,
    color: '#ffffff',
  },
  contactBar: {
    backgroundColor: theme.primaryDark,
    marginTop: 14,
    marginHorizontal: -24,
    marginBottom: -14,
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  contactIcon: {
    marginRight: 5,
  },
  contactText: {
    fontSize: 8,
    color: theme.onPrimary,
  },
  body: {
    flexDirection: 'row',
    padding: 24,
  },
  column: {
    flex: 1,
    gap: 14,
  },
  columnGap: {
    width: 24,
  },
  section: {},
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: theme.accent,
    textTransform: 'uppercase',
    paddingBottom: 3,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.accent,
  },
  entryList: {
    gap: 10,
  },
  entry: {},
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
  },
  entrySubtitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    marginTop: 1,
  },
  entryMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 4,
  },
  entryMeta: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 8,
    color: theme.accent,
  },
  entryLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: theme.accent,
    marginBottom: 3,
  },
  entryDetails: {
    gap: 2,
  },
  bulletList: {
    gap: 2,
  },
  bulletRow: {
    flexDirection: 'row',
  },
  bulletDot: {
    fontSize: 8,
    color: theme.bullet,
    marginRight: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.35,
  },
  inlineLabel: {
    fontFamily: 'Helvetica-Bold',
  },
  inlineRow: {
    fontSize: 8,
    lineHeight: 1.3,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 6,
    rowGap: 6,
  },
  pill: {
    backgroundColor: theme.primary,
    color: theme.onPrimary,
    fontSize: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  interestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
  },
  interestPillIcon: {
    marginRight: 5,
  },
  interestPillText: {
    fontSize: 8,
    color: '#1f2937',
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 8,
  },
  languageItem: {
    width: '50%',
  },
  languageName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
  },
  languageLevel: {
    fontFamily: 'Helvetica-Oblique',
    fontSize: 8,
    color: colors.gray,
  },
});
