export interface CvTheme {
  id: string;
  label: string;
  /** Header background and skill chips. */
  primary: string;
  /** Contact bar. */
  primaryDark: string;
  /** Section titles, dates, labels, photo border. */
  accent: string;
  bullet: string;
  /** Text on primary / primaryDark. */
  onPrimary: string;
  /** Professional title on the header. */
  headerSubtle: string;
}

export const DEFAULT_THEME_ID = 'teal';

export const cvThemes: CvTheme[] = [
  // Teal, Blue and Indigo use user-specified brand colors below AA for white text (see tests).
  // The default keeps the original look exactly (white on #2abfa2 is below AA; legacy exception).
  {
    id: 'teal',
    label: 'Teal',
    primary: '#2abfa2',
    primaryDark: '#1c8a73',
    accent: '#4d5f9e',
    bullet: '#10b981',
    onPrimary: '#ffffff',
    headerSubtle: '#4d5f9e',
  },
  {
    id: 'sky',
    label: 'Light Blue',
    primary: '#0369a1',
    primaryDark: '#0c4a6e',
    accent: '#0369a1',
    bullet: '#0ea5e9',
    onPrimary: '#ffffff',
    headerSubtle: '#e0f2fe',
  },
  {
    id: 'blue',
    label: 'Blue',
    primary: '#2196f3',
    primaryDark: '#0d47a1',
    accent: '#0d47a1',
    bullet: '#2196f3',
    onPrimary: '#ffffff',
    headerSubtle: '#0a2f6b',
  },
  {
    id: 'indigo',
    label: 'Indigo',
    primary: '#5465ff',
    primaryDark: '#2a35b8',
    accent: '#3345d6',
    bullet: '#5465ff',
    onPrimary: '#ffffff',
    headerSubtle: '#e8ebff',
  },
  {
    id: 'olive',
    label: 'Olive',
    primary: '#606c38',
    primaryDark: '#283618',
    accent: '#4a5527',
    bullet: '#606c38',
    onPrimary: '#ffffff',
    headerSubtle: '#fefae0',
  },
  {
    id: 'navy',
    label: 'Dark Blue',
    primary: '#1e3a8a',
    primaryDark: '#172554',
    accent: '#1d4ed8',
    bullet: '#3b82f6',
    onPrimary: '#ffffff',
    headerSubtle: '#bfdbfe',
  },
  {
    id: 'black',
    label: 'Black',
    primary: '#111827',
    primaryDark: '#000000',
    accent: '#374151',
    bullet: '#6b7280',
    onPrimary: '#ffffff',
    headerSubtle: '#d1d5db',
  },
  {
    id: 'gray',
    label: 'Gray',
    primary: '#475569',
    primaryDark: '#334155',
    accent: '#334155',
    bullet: '#64748b',
    onPrimary: '#ffffff',
    headerSubtle: '#e2e8f0',
  },
  {
    id: 'purple',
    label: 'Purple',
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    accent: '#5b21b6',
    bullet: '#8b5cf6',
    onPrimary: '#ffffff',
    headerSubtle: '#ede9fe',
  },
  {
    id: 'burgundy',
    label: 'Burgundy',
    primary: '#9f1239',
    primaryDark: '#6b0f2a',
    accent: '#9f1239',
    bullet: '#e11d48',
    onPrimary: '#ffffff',
    headerSubtle: '#fecdd3',
  },
  {
    id: 'forest',
    label: 'Forest Green',
    primary: '#15803d',
    primaryDark: '#14532d',
    accent: '#166534',
    bullet: '#22c55e',
    onPrimary: '#ffffff',
    headerSubtle: '#dcfce7',
  },
  {
    id: 'orange',
    label: 'Orange',
    primary: '#c2410c',
    primaryDark: '#7c2d12',
    accent: '#9a3412',
    bullet: '#f97316',
    onPrimary: '#ffffff',
    headerSubtle: '#ffedd5',
  },
];

export const getTheme = (id: string | null | undefined): CvTheme =>
  cvThemes.find((t) => t.id === id) ?? cvThemes[0];
