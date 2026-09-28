import { useState } from 'react';
import Form from './containers/form/Form';
import Preview from './containers/preview/Preview';
import { v4 as uuidv4 } from 'uuid';
import MobileToggle from './components/MobileToggle/MobileToggle';
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

function App() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initializePersonalInfo());
  const [education, setEducation] = useState<Education[]>(initializeEducation());
  const [experience, setExperience] = useState<Experience[]>(initializeExperience());
  const [skills, setSkills] = useState<Skill[]>([{ id: uuidv4(), skill: '' }]);
  const [projects, setProjects] = useState<Project[]>(initializeProjects());
  const [languages, setLanguages] = useState<Language[]>(initializeLanguages());
  const [interests, setInterests] = useState<Interest[]>(initializeInterests());
  const [mobile, setMobile] = useState<MobileState>({ formIsOpen: true });

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
      alert('Image is too large. Please use an image smaller than 5MB.');
      e.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
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
      alert('Failed to read the image file. Please try again.');
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  // Education handlers
  const addEducation = (e: React.MouseEvent) => {
    e.preventDefault();
    setEducation((prev) => [
      ...prev,
      { id: uuidv4(), degree: '', institution: '', startDate: '', endDate: '', location: '', courses: [] },
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
      { id: uuidv4(), position: '', company: '', startDate: '', endDate: '', location: '', achievements: [] },
    ]);
  };

  const removeExperience = (id: string) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: string | string[]) => {
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
    setSkills((prev) => prev.map((skill) => (skill.id === id ? { ...skill, skill: value } : skill)));
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
    setLanguages((prev) => prev.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)));
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

  // Autofill functionality with sample data
  const autoFill = () => {
    setPersonalInfo({
      firstName: 'Farid',
      lastName: 'Hima',
      title: 'Junior Full Stack Web Developer',
      bio: 'Motivated junior full-stack developer with hands-on MERN experience and a strong e-commerce operations background. Build user-focused web apps and enjoy exploring automation and AI tools. Seeking a collaborative team to learn, contribute, and ship features.',
      email: 'bughunterf@gmail.com',
      phone: '01767976666',
      address: '12045, Berlin, Germany',
      github: 'github.com/FaridBerlin',
      profileImage: null,
    });

    setEducation([
      {
        id: uuidv4(),
        degree: 'Full Stack Web Development',
        institution: 'DCI Digital Career Institute GmbH',
        startDate: '10/2024',
        endDate: 'Present',
        location: 'Berlin',
        courses: [
          'Comprehensive training in MERN Stack (MongoDB, Express.js, React, Node.js)',
          'Development of multiple real-world projects focusing on React, Node.js, and REST API creation',
          'Participation in English language improvement courses',
          'Introduction to AI automation and AI agent creation',
        ],
      },
    ]);

    setExperience([
      {
        id: uuidv4(),
        position: 'Amazon FBA Manager',
        company: 'IIIHT, Berlin',
        startDate: '10/2021',
        endDate: '02/2024',
        location: 'Berlin',
        achievements: [
          'Managed and optimized Amazon FBA listings and ad campaigns for tech products',
          'Conducted market research and competitor analysis to enhance sales performance',
          'Monitored stock levels, logistics, and product traceability to ensure smooth operations',
          'Developed data-driven approaches to improve ROI and streamline workflows',
        ],
      },
      {
        id: uuidv4(),
        position: 'Personal Trainer / Influencer',
        company: 'Berlin',
        startDate: '06/2011',
        endDate: '12/2022',
        location: '',
        achievements: [
          'Managed online content and fitness programs, building a YouTube channel with 180K subscribers',
          'Sponsored by Olimp Sport Nutrition (2013-2020)',
          'Winner of IFBB Fit Model Belgium (2019)',
          'Certified EREPS IHFA Personal Trainer',
          'Experience leadership, self-motivation, and digital marketing skills',
        ],
      },
    ]);

    setSkills(
      [
        'JavaScript',
        'TypeScript',
        'React',
        'Python',
        'Flask',
        'Docker',
        'Node.js',
        'Express.js',
        'MongoDB',
        'MySQL',
        'PHP',
        'React Native',
        'Tailwind CSS',
        'Git',
        'GitHub',
        'Clerk',
        'API Development',
        'Postman',
        'AI Automation',
        'Zapier',
        'n8n',
        'Astro',
        'HTML',
        'CSS',
        'YAML',
        'MJML',
        'Nginx',
        'Hetzner VPS',
      ].map((skill) => ({ id: uuidv4(), skill }))
    );

    setProjects([
      {
        id: uuidv4(),
        name: 'NutriVa – AI-powered nutrition app',
        stack: 'MERN (MongoDB, Express, React 19, Node.js), Ollama AI, Tailwind CSS',
        features: ['Features: AI weekly planning, macro tracking, progress dashboard'],
        role: 'Project manager ',
        deployment: 'Hetzner Cloud VPS',
        liveUrl: 'nutriva.live',
      },
      {
        id: uuidv4(),
        name: 'Weather Flask & Docker',
        stack: 'Python, Flask, Docker & Docker Compose',
        features: ['Features: Real-time weather data, API requests OpenWeatherMap'],
        role: '',
        deployment: '',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Portfolio Website',
        stack: 'React, Tailwind CSS, Vite, React Three Fiber',
        features: [],
        role: '',
        deployment: 'GitHub Pages',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Space Invader Game',
        stack: 'Classic game built with JavaScript and Canvas',
        features: ['focusing on animation and game logic'],
        role: '',
        deployment: 'GitHub Pages',
        liveUrl: '',
      },
    ]);

    setLanguages([
      { id: uuidv4(), language: 'German', level: 'C2' },
      { id: uuidv4(), language: 'English', level: 'B2' },
    ]);

    setInterests([
      { id: uuidv4(), interest: 'AI Automation' },
      { id: uuidv4(), interest: 'Game Development' },
      { id: uuidv4(), interest: 'Content Creation' },
      { id: uuidv4(), interest: 'Fitness' },
      { id: uuidv4(), interest: 'Chess' },
    ]);
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
      const name = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join('_') || 'resume';
      link.download = `${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 grid lg:grid-cols-2 gap-8">
        <Form
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
  );
}

export default App;
