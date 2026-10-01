export type Lang = 'en' | 'de';

export const LANGS: Lang[] = ['en', 'de'];
export const DEFAULT_LANG: Lang = 'en';

/** Labels printed on the CV itself (preview + PDF). */
export interface CvLabels {
  yourTitle: string;
  photo: string;
  position: string;
  company: string;
  degree: string;
  institution: string;
  projectName: string;
  experience: string;
  education: string;
  skills: string;
  projects: string;
  languages: string;
  interests: string;
  achievements: string;
  courses: string;
  stack: string;
  role: string;
  deployment: string;
  live: string;
  pdfTitle: string;
  pdfFallbackName: string;
}

/** Strings for the editor UI (form and alerts). */
export interface UiLabels {
  appTitle: string;
  language: string;
  autoFill: string;
  downloadPdf: string;
  cvColor: string;
  personalInfo: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  bio: string;
  bioPlaceholder: string;
  email: string;
  phone: string;
  address: string;
  addressPlaceholder: string;
  add: string;
  degreeProgram: string;
  degreePlaceholder: string;
  institutionPlaceholder: string;
  startDate: string;
  endDate: string;
  endDatePlaceholder: string;
  location: string;
  coursesLabel: string;
  coursesPlaceholder: string;
  positionTitle: string;
  positionPlaceholder: string;
  companyPlaceholder: string;
  achievementsLabel: string;
  achievementsPlaceholder: string;
  projectNamePlaceholder: string;
  techStack: string;
  featuresLabel: string;
  featuresPlaceholder: string;
  yourRole: string;
  rolePlaceholder: string;
  liveUrl: string;
  languagePlaceholder: string;
  interestPlaceholder: string;
  imageTooLarge: string;
  invalidImage: string;
  imageReadFailed: string;
  pdfFailed: string;
}

export interface Translation {
  htmlLang: string;
  cv: CvLabels;
  ui: UiLabels;
}

export const translations: Record<Lang, Translation> = {
  en: {
    htmlLang: 'en',
    cv: {
      yourTitle: 'Your Title',
      photo: 'Photo',
      position: 'Position',
      company: 'Company',
      degree: 'Degree',
      institution: 'Institution',
      projectName: 'Project Name',
      experience: 'Professional Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Personal Projects',
      languages: 'Languages',
      interests: 'Interests',
      achievements: 'Achievements/Tasks:',
      courses: 'Courses:',
      stack: 'Stack:',
      role: 'Role:',
      deployment: 'Deployment:',
      live: 'Live:',
      pdfTitle: 'CV',
      pdfFallbackName: 'resume',
    },
    ui: {
      appTitle: 'CV Generator',
      language: 'Language',
      autoFill: 'AutoFill',
      downloadPdf: 'Download PDF',
      cvColor: 'CV Color',
      personalInfo: 'Personal Information',
      profileImage: 'Profile Image',
      firstName: 'First Name',
      lastName: 'Last Name',
      professionalTitle: 'Professional Title',
      bio: 'Bio / Summary',
      bioPlaceholder: 'Brief professional summary...',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      addressPlaceholder: 'City, Country',
      add: 'Add',
      degreeProgram: 'Degree / Program',
      degreePlaceholder: 'Full Stack Web Development',
      institutionPlaceholder: 'University Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      endDatePlaceholder: 'Present',
      location: 'Location',
      coursesLabel: 'Courses (one per line)',
      coursesPlaceholder: 'Course 1\nCourse 2\nCourse 3',
      positionTitle: 'Position / Title',
      positionPlaceholder: 'Software Developer',
      companyPlaceholder: 'Company Name',
      achievementsLabel: 'Achievements / Tasks (one per line)',
      achievementsPlaceholder: 'Achievement 1\nAchievement 2\nAchievement 3',
      projectNamePlaceholder: 'Project Name',
      techStack: 'Tech Stack',
      featuresLabel: 'Features (one per line)',
      featuresPlaceholder: 'Feature 1\nFeature 2\nFeature 3',
      yourRole: 'Your Role',
      rolePlaceholder: 'Full Stack Developer',
      liveUrl: 'Live URL',
      languagePlaceholder: 'English',
      interestPlaceholder: 'Chess',
      imageTooLarge: 'Image is too large. Please use an image smaller than 5MB.',
      invalidImage: 'Please select a valid image file.',
      imageReadFailed: 'Failed to read the image file. Please try again.',
      pdfFailed: 'Failed to generate PDF',
    },
  },
  de: {
    htmlLang: 'de',
    cv: {
      yourTitle: 'Ihr Titel',
      photo: 'Foto',
      position: 'Position',
      company: 'Unternehmen',
      degree: 'Abschluss',
      institution: 'Institution',
      projectName: 'Projektname',
      experience: 'Berufserfahrung',
      education: 'Weiterbildung',
      skills: 'Fähigkeiten',
      projects: 'Persönliche Projekte',
      languages: 'Sprachen',
      interests: 'Interessen',
      achievements: 'Errungenschaften/Aufgaben',
      courses: 'Kurse & Leistungen',
      stack: 'Stack:',
      role: 'Rolle:',
      deployment: 'Deployment:',
      live: 'Live:',
      pdfTitle: 'Lebenslauf',
      pdfFallbackName: 'lebenslauf',
    },
    ui: {
      appTitle: 'Lebenslauf-Generator',
      language: 'Sprache',
      autoFill: 'Beispieldaten',
      downloadPdf: 'PDF herunterladen',
      cvColor: 'Farbe des Lebenslaufs',
      personalInfo: 'Persönliche Angaben',
      profileImage: 'Profilbild',
      firstName: 'Vorname',
      lastName: 'Nachname',
      professionalTitle: 'Berufsbezeichnung',
      bio: 'Kurzprofil',
      bioPlaceholder: 'Kurze berufliche Zusammenfassung...',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      addressPlaceholder: 'Stadt, Land',
      add: 'Hinzufügen',
      degreeProgram: 'Abschluss / Programm',
      degreePlaceholder: 'Fullstack-Webentwicklung',
      institutionPlaceholder: 'Name der Institution',
      startDate: 'Beginn',
      endDate: 'Ende',
      endDatePlaceholder: 'Heute',
      location: 'Ort',
      coursesLabel: 'Kurse & Leistungen (eine pro Zeile)',
      coursesPlaceholder: 'Kurs 1\nKurs 2\nKurs 3',
      positionTitle: 'Position / Titel',
      positionPlaceholder: 'Softwareentwickler',
      companyPlaceholder: 'Name des Unternehmens',
      achievementsLabel: 'Errungenschaften / Aufgaben (eine pro Zeile)',
      achievementsPlaceholder: 'Errungenschaft 1\nErrungenschaft 2\nErrungenschaft 3',
      projectNamePlaceholder: 'Projektname',
      techStack: 'Tech-Stack',
      featuresLabel: 'Funktionen (eine pro Zeile)',
      featuresPlaceholder: 'Funktion 1\nFunktion 2\nFunktion 3',
      yourRole: 'Deine Rolle',
      rolePlaceholder: 'Fullstack-Entwickler',
      liveUrl: 'Live-URL',
      languagePlaceholder: 'Deutsch',
      interestPlaceholder: 'Schach',
      imageTooLarge: 'Das Bild ist zu groß. Bitte ein Bild unter 5 MB verwenden.',
      invalidImage: 'Bitte eine gültige Bilddatei auswählen.',
      imageReadFailed: 'Die Bilddatei konnte nicht gelesen werden. Bitte erneut versuchen.',
      pdfFailed: 'PDF konnte nicht erstellt werden',
    },
  },
};
