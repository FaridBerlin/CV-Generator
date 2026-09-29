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
      title: 'Full Stack Web Developer',
      bio: 'Fullstack Web Developer with 2+ years of experience in Amazon FBA e-commerce and a completed 1.5-year MERN fullstack program at DCI Berlin (graduated April 2026). Hands-on experience building real-time interaction platforms with Vue 3 and Socket.io. I combine analytical thinking, technical expertise, and a solution-oriented mindset — ready to contribute from day one.',
      email: '****unterf@gmail.com',
      phone: '017679******',
      address: 'Berlin, Germany',
      github: 'github.com/FaridBerlin',
      profileImage: null,
    });

    setEducation([
      {
        id: uuidv4(),
        degree: 'Fullstack Web Development',
        institution: 'DCI Digital Career Institute GmbH',
        startDate: '10/2024',
        endDate: '04/2026',
        location: 'Berlin',
        courses: [
          'Comprehensive MERN Stack training (MongoDB, Express.js, React, Node.js)',
          'Developed multiple real-world fullstack projects',
          'English language training (B2 level)',
          'AI automation and AI agent creation',
        ],
      },
    ]);

    setExperience([
      {
        id: uuidv4(),
        position: 'Fullstack Developer Intern',
        company: 'Crowds',
        startDate: '03/2026',
        endDate: '06/2026',
        location: 'Berlin',
        achievements: [
          'Took ownership of backend development in a team of 3 developers',
          'Designed and implemented a real-time backend using Node.js, Express, and Socket.io',
          'Built RESTful APIs, implemented JWT authentication, and defined MongoDB data models',
          'Ensured seamless integration between frontend and backend systems',
          'Contributed to frontend development using Vue 3, Pinia, and Vite',
          'Collaborated in an agile team using Git workflows',
        ],
      },
      {
        id: uuidv4(),
        position: 'Amazon FBA Manager',
        company: 'IIIHT',
        startDate: '10/2021',
        endDate: '02/2024',
        location: 'Berlin',
        achievements: [
          'Optimized product listings and advertising campaigns for tech products',
          'Managed inventory, logistics, and supply chain processes',
          'Conducted market and competitor analysis to increase sales performance',
        ],
      },
      {
        id: uuidv4(),
        position: 'Personal Trainer & Influencer',
        company: 'Berlin',
        startDate: '06/2011',
        endDate: '12/2022',
        location: 'Berlin',
        achievements: [
          'Built YouTube channel (Farid Berlin) to 180,000 subscribers',
          'Sponsored by Olimp Sport Nutrition (2013–2020)',
          'Winner of IFBB Fit Model Belgium (2019)',
        ],
      },
    ]);

    setSkills(
      [
        'JavaScript',
        'TypeScript',
        'Python',
        'Go',
        'Kotlin',
        'PHP',
        'React',
        'Vue 3',
        'Next.js',
        'Mobile Development',
        'Android Studio',
        'IntelliJ IDEA',
        'Angular',
        'Astro',
        'Flask',
        'Django',
        'Node.js',
        'Express.js',
        'JWT',
        'Socket.io',
        'MongoDB',
        'MySQL',
        'Docker',
        'Nginx',
        'Git',
        'GitHub',
        'Linux',
        'Hetzner VPS',
        'Postman',
        'AI Integration',
        'Ollama',
        'LLM',
        'LLM Integration',
        'n8n',
        'Zapier',
        'Tailwind CSS',
        'MJML',
        'HTML',
        'CSS',
      ].map((skill) => ({ id: uuidv4(), skill }))
    );

    setProjects([
      {
        id: uuidv4(),
        name: 'NutriVa – AI-Powered Nutrition App',
        stack: '',
        features: [
          'Led a 4-person development team',
          'Built AI-driven meal planning features',
          'Implemented tracking and dashboard functionality',
        ],
        role: '',
        deployment: 'Hetzner VPS with Nginx',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Portfolio Website',
        stack: 'React, Tailwind CSS, Vite, React Three Fiber',
        features: ['Integrated 3D elements'],
        role: '',
        deployment: 'GitHub Pages',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Weather App & Weather Flask & Docker',
        stack: '',
        features: [
          'JS/TS version: real-time weather via OpenWeather API',
          'Python/Flask/Docker version: containerised API integration',
        ],
        role: '',
        deployment: '',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Space Invader Game',
        stack: 'Classic arcade game built with JavaScript and Canvas',
        features: ['Focus on game logic and animation'],
        role: '',
        deployment: 'GitHub Pages',
        liveUrl: '',
      },
    ]);

    setLanguages([
      { id: uuidv4(), language: 'Deutsch', level: 'C2' },
      { id: uuidv4(), language: 'English', level: 'C1' },
    ]);

    setInterests([
      { id: uuidv4(), interest: 'AI Automation' },
      { id: uuidv4(), interest: 'Game Dev' },
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
