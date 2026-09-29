import { StyleSheet } from '@react-pdf/renderer';

// Mirrors the Tailwind theme in src/globalStyles.css so the PDF matches the live preview.
export const colors = {
  primary: '#2abfa2',
  primaryDark: '#1c8a73',
  accent: '#4d5f9e',
  accentLight: '#cdeee2',
  bullet: '#10b981',
  gray: '#4b5563',
  lightGray: '#d1d5db',
};

export const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#1f2937',
  },
  header: {
    backgroundColor: colors.primary,
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
    color: '#ffffff',
    marginBottom: 2,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: colors.accentLight,
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  bio: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#ffffff',
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    fontSize: 7,
    color: '#ffffff',
  },
  contactBar: {
    backgroundColor: colors.primaryDark,
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
  contactDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentLight,
    marginRight: 5,
  },
  contactText: {
    fontSize: 8,
    color: '#ffffff',
  },
  body: {
    flexDirection: 'row',
    padding: 24,
  },
  column: {
    flex: 1,
  },
  columnGap: {
    width: 24,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: colors.accent,
    textTransform: 'uppercase',
    paddingBottom: 3,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.accent,
  },
  entry: {
    marginBottom: 10,
  },
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
    color: colors.accent,
  },
  entryLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: colors.accent,
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    fontSize: 8,
    color: colors.bullet,
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
    marginBottom: 2,
    lineHeight: 1.3,
  },
  pillWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    backgroundColor: colors.primary,
    color: '#ffffff',
    fontSize: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  outlinePill: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    color: '#1f2937',
    fontSize: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginRight: 6,
    marginBottom: 6,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageItem: {
    width: '50%',
    marginBottom: 8,
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
