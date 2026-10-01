import { useEffect, useState } from 'react';
import Form from './containers/form/Form';
import Preview from './containers/preview/Preview';
import { v4 as uuidv4 } from 'uuid';
import { getTheme, DEFAULT_THEME_ID, cvThemes } from './theme/cvThemes';
import MobileToggle from './components/MobileToggle/MobileToggle';
import { LanguageContext } from './i18n/LanguageContext';
import { translations, LANGS, DEFAULT_LANG } from './i18n/translations';
import type { Lang } from './i18n/translations';
import { getSampleData } from './i18n/sampleData';
import type {
  PersonalInfo,
  Education,
  Experience,
  Skill,
  Project,
  Language,
  Interest,
  MobileState,
} from './types/cv';

const initializePersonalInfo = (): PersonalInfo => ({
  firstName: '',
  lastName: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  address: '',
  github: '',
  profileImage: null,
});

const initializeEducation = (): Education[] => [
  {
    id: uuidv4(),
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    location: '',
    courses: [],
  },
];

const initializeExperience = (): Experience[] => [
  {
    id: uuidv4(),
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    achievements: [],
  },
];

const initializeProjects = (): Project[] => [
  {
    id: uuidv4(),
    name: '',
    stack: '',
    features: [],
    role: '',
    deployment: '',
    liveUrl: '',
  },
];

const initializeLanguages = (): Language[] => [{ id: uuidv4(), language: '', level: '' }];

const initializeInterests = (): Interest[] => [{ id: uuidv4(), interest: '' }];

const THEME_KEY = 'cv-theme';
const LANG_KEY = 'cv-lang';

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initializePersonalInfo());
  const [education, setEducation] = useState<Education[]>(initializeEducation());
  const [experience, setExperience] = useState<Experience[]>(initializeExperience());
  const [skills, setSkills] = useState<Skill[]>([{ id: uuidv4(), skill: '' }]);
  const [projects, setProjects] = useState<Project[]>(initializeProjects());
  const [languages, setLanguages] = useState<Language[]>(initializeLanguages());
  const [interests, setInterests] = useState<Interest[]>(initializeInterests());
  const [mobile, setMobile] = useState<MobileState>({ formIsOpen: true });

  const [themeId, setThemeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return cvThemes.some((t) => t.id === saved) ? (saved as string) : DEFAULT_THEME_ID;
    } catch {
      return DEFAULT_THEME_ID;
    }
  });
  const theme = getTheme(themeId);

  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      return LANGS.includes(saved as Lang) ? (saved as Lang) : DEFAULT_LANG;
    } catch {
      return DEFAULT_LANG;
    }
  });
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  const handleLangChange = (next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // storage unavailable; the language just won't persist
    }
  };

  const handleThemeChange = (id: string) => {
    setThemeId(id);
    try {
      localStorage.setItem(THEME_KEY, id);
    } catch {
      // storage unavailable; the theme just won't persist
    }
  };

  const handleToggle = () => {
    setMobile((prev) => ({ formIsOpen: !prev.formIsOpen }));
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(t.ui.imageTooLarge);
      e.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert(t.ui.invalidImage);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 800 || img.height > 800) {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > 800) {
              height = (height * 800) / width;
              width = 800;
            }
          } else {
            if (height > 800) {
              width = (width * 800) / height;
              height = 800;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPersonalInfo((prev) => ({ ...prev, profileImage: compressedDataUrl }));
        } else {
          setPersonalInfo((prev) => ({ ...prev, profileImage: reader.result as string }));
        }
      };
      img.src = reader.result as string;
    };
    reader.onerror = () => {
      alert(t.ui.imageReadFailed);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  // Education handlers
  const addEducation = (e: React.MouseEvent) => {
    e.preventDefault();
    setEducation((prev) => [
      ...prev,
      {
        id: uuidv4(),
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        location: '',
        courses: [],
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string | string[]) => {
    setEducation((prev) => prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  // Experience handlers
  const addExperience = (e: React.MouseEvent) => {
    e.preventDefault();
    setExperience((prev) => [
      ...prev,
      {
        id: uuidv4(),
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
        achievements: [],
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) => {
    setExperience((prev) => prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  // Skills handlers
  const addSkill = (e: React.MouseEvent) => {
    e.preventDefault();
    setSkills((prev) => [...prev, { id: uuidv4(), skill: '' }]);
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const handleSkillChange = (id: string, value: string) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, skill: value } : skill))
    );
  };

  // Projects handlers
  const addProject = (e: React.MouseEvent) => {
    e.preventDefault();
    setProjects((prev) => [
      ...prev,
      { id: uuidv4(), name: '', stack: '', features: [], role: '', deployment: '', liveUrl: '' },
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string | string[]) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  // Languages handlers
  const addLanguage = (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguages((prev) => [...prev, { id: uuidv4(), language: '', level: '' }]);
  };

  const removeLanguage = (id: string) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  const handleLanguageChange = (id: string, field: keyof Language, value: string) => {
    setLanguages((prev) =>
      prev.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  // Interests handlers
  const addInterest = (e: React.MouseEvent) => {
    e.preventDefault();
    setInterests((prev) => [...prev, { id: uuidv4(), interest: '' }]);
  };

  const removeInterest = (id: string) => {
    setInterests((prev) => prev.filter((int) => int.id !== id));
  };

  const handleInterestChange = (id: string, value: string) => {
    setInterests((prev) => prev.map((int) => (int.id === id ? { ...int, interest: value } : int)));
  };

  // Autofill with sample data in the selected language
  const autoFill = () => {
    const data = getSampleData(lang);
    setPersonalInfo(data.personalInfo);
    setEducation(data.education);
    setExperience(data.experience);
    setSkills(data.skills);
    setProjects(data.projects);
    setLanguages(data.languages);
    setInterests(data.interests);
  };

  // Generate and download the CV as a real, text-based PDF
  const printDocument = async () => {
    try {
      const [{ pdf }, { default: CVDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./pdf/CVDocument'),
      ]);
      const doc = (
        <CVDocument
          theme={theme}
          lang={lang}
          personalInfo={personalInfo}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          languages={languages}
          interests={interests}
        />
      );
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name =
        [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join('_') ||
        t.cv.pdfFallbackName;
      link.download = `${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`${t.ui.pdfFailed}: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <LanguageContext.Provider value={lang}>
      <div className="min-h-screen bg-neutral-950 [color-scheme:dark]">
        <div className="max-w-[2200px] mx-auto py-6 px-4 lg:px-6 lg:grid lg:grid-cols-[minmax(360px,1fr)_minmax(400px,1fr)] lg:gap-6">
          <Form
            lang={lang}
            onLangChange={handleLangChange}
            themeId={themeId}
            onThemeChange={handleThemeChange}
            printDocument={printDocument}
            mobile={mobile}
            autoFill={autoFill}
            personalInfo={personalInfo}
            handlePersonalInfoChange={handlePersonalInfoChange}
            handleImageUpload={handleImageUpload}
            education={education}
            addEducation={addEducation}
            removeEducation={removeEducation}
            handleEducationChange={handleEducationChange}
            experience={experience}
            addExperience={addExperience}
            removeExperience={removeExperience}
            handleExperienceChange={handleExperienceChange}
            skills={skills}
            addSkill={addSkill}
            removeSkill={removeSkill}
            handleSkillChange={handleSkillChange}
            projects={projects}
            addProject={addProject}
            removeProject={removeProject}
            handleProjectChange={handleProjectChange}
            languages={languages}
            addLanguage={addLanguage}
            removeLanguage={removeLanguage}
            handleLanguageChange={handleLanguageChange}
            interests={interests}
            addInterest={addInterest}
            removeInterest={removeInterest}
            handleInterestChange={handleInterestChange}
          />
          <Preview
            theme={theme}
            mobile={mobile}
            personalInfo={personalInfo}
            education={education}
            experience={experience}
            skills={skills}
            projects={projects}
            languages={languages}
            interests={interests}
          />
        </div>
        <MobileToggle handleToggle={handleToggle} mobile={mobile} />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
