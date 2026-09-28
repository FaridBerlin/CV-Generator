export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  profileImage: string | null;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  location: string;
  courses: string[];
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  skill: string;
}

export interface Project {
  id: string;
  name: string;
  stack: string;
  features: string[];
  role: string;
  deployment: string;
  liveUrl: string;
}

export interface Language {
  id: string;
  language: string;
  level: string;
}

export interface Interest {
  id: string;
  interest: string;
}

export interface MobileState {
  formIsOpen: boolean;
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  interests: Interest[];
}
