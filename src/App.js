import React, { useState } from 'react';
import Form from './containers/form/form.js';
import Preview from './containers/preview/preview.js';
import { v4 as uuidv4 } from 'uuid';
import MobileToggle from './components/MobileToggle/MobileToggle.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Initialize personal info state
const initializePersonalInfo = () => ({
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

// Initialize education entries
const initializeEducation = () => [
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

// Initialize projects
const initializeProjects = () => [
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

// Initialize languages
const initializeLanguages = () => [{ id: uuidv4(), language: '', level: '' }];

// Initialize interests
const initializeInterests = () => [{ id: uuidv4(), interest: '' }];

function App() {
  // Personal information state
  const [personalInfo, setPersonalInfo] = useState(initializePersonalInfo());

  // Education state
  const [education, setEducation] = useState(initializeEducation());

  // Professional experience state
  const [experience, setExperience] = useState([
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

  // Skills state
  const [skills, setSkills] = useState([{ id: uuidv4(), skill: '' }]);

  // Personal projects state
  const [projects, setProjects] = useState(initializeProjects());

  // Languages state
  const [languages, setLanguages] = useState(initializeLanguages());

  // Interests state
  const [interests, setInterests] = useState(initializeInterests());

  // Mobile view toggle state
  const [mobile, setMobile] = useState({ formIsOpen: true });

  // Toggling between form and preview in mobile view
  const handleToggle = () => {
    setMobile((prev) => ({ formIsOpen: !prev.formIsOpen }));
  };

  // Handle personal info changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('Image is too large. Please use an image smaller than 5MB.');
        e.target.value = ''; // Reset file input
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        e.target.value = ''; // Reset file input
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Create an image element to compress if needed
        const img = new Image();
        img.onload = () => {
          // If image is very large, compress it
          if (img.width > 800 || img.height > 800) {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions (max 800px on longest side)
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
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to data URL with compression
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setPersonalInfo((prev) => ({ ...prev, profileImage: compressedDataUrl }));
          } else {
            // Image is small enough, use as-is
            setPersonalInfo((prev) => ({ ...prev, profileImage: reader.result }));
          }
        };
        img.src = reader.result;
      };
      reader.onerror = () => {
        alert('Failed to read the image file. Please try again.');
        e.target.value = ''; // Reset file input
      };
      reader.readAsDataURL(file);
    }
  };

  // Education handlers
  const addEducation = (e) => {
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

  const removeEducation = (id) => {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleEducationChange = (id, field, value) => {
    setEducation((prev) => prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)));
  };

  // Experience handlers
  const addExperience = (e) => {
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

  const removeExperience = (id) => {
    setExperience((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleExperienceChange = (id, field, value) => {
    setExperience((prev) => prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)));
  };

  // Skills handlers
  const addSkill = (e) => {
    e.preventDefault();
    setSkills((prev) => [...prev, { id: uuidv4(), skill: '' }]);
  };

  const removeSkill = (id) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  const handleSkillChange = (id, value) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, skill: value } : skill))
    );
  };

  // Projects handlers
  const addProject = (e) => {
    e.preventDefault();
    setProjects((prev) => [
      ...prev,
      {
        id: uuidv4(),
        name: '',
        stack: '',
        features: [],
        role: '',
        deployment: '',
        liveUrl: '',
      },
    ]);
  };

  const removeProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  const handleProjectChange = (id, field, value) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  // Languages handlers
  const addLanguage = (e) => {
    e.preventDefault();
    setLanguages((prev) => [...prev, { id: uuidv4(), language: '', level: '' }]);
  };

  const removeLanguage = (id) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  const handleLanguageChange = (id, field, value) => {
    setLanguages((prev) =>
      prev.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  // Interests handlers
  const addInterest = (e) => {
    e.preventDefault();
    setInterests((prev) => [...prev, { id: uuidv4(), interest: '' }]);
  };

  const removeInterest = (id) => {
    setInterests((prev) => prev.filter((int) => int.id !== id));
  };

  const handleInterestChange = (id, value) => {
    setInterests((prev) => prev.map((int) => (int.id === id ? { ...int, interest: value } : int)));
  };

  // Autofill functionality with sample data
  const autoFill = () => {
    setPersonalInfo({
      firstName: 'Farid',
      lastName: 'Hima',
      title: 'Junior Full Stack Web Developer',
      bio: 'Motivated Junior Full Stack Developer with hands-on experience in MERN stack technologies and a strong background in e-commerce operations. Passionate about building scalable, user-focused web applications and exploring automation and AI tools. Seeking a collaborative development environment where I can grow and contribute to innovative projects.',
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
          'Certified EMS IHHA Personal Trainer',
          '*(Experience showcases leadership, self-motivation, and digital marketing skills)*',
        ],
      },
    ]);

    setSkills([
      { id: uuidv4(), skill: 'JavaScript' },
      { id: uuidv4(), skill: 'TypeScript' },
      { id: uuidv4(), skill: 'React' },
      { id: uuidv4(), skill: 'Python' },
      { id: uuidv4(), skill: 'Flask' },
      { id: uuidv4(), skill: 'Docker' },
      { id: uuidv4(), skill: 'Node.js' },
      { id: uuidv4(), skill: 'Express.js' },
      { id: uuidv4(), skill: 'MongoDB' },
      { id: uuidv4(), skill: 'MySQL' },
      { id: uuidv4(), skill: 'PHP' },
      { id: uuidv4(), skill: 'React Native' },
      { id: uuidv4(), skill: 'Tailwind CSS' },
      { id: uuidv4(), skill: 'Git' },
      { id: uuidv4(), skill: 'GitHub' },
      { id: uuidv4(), skill: 'Clerk' },
      { id: uuidv4(), skill: 'API Development' },
      { id: uuidv4(), skill: 'Postman' },
      { id: uuidv4(), skill: 'AI Automation' },
      { id: uuidv4(), skill: 'Zapier' },
      { id: uuidv4(), skill: 'n8n' },
      { id: uuidv4(), skill: 'Astro' },
      { id: uuidv4(), skill: 'HTML' },
      { id: uuidv4(), skill: 'CSS' },
      { id: uuidv4(), skill: 'YAML' },
      { id: uuidv4(), skill: 'MJML' },
    ]);

    setProjects([
      {
        id: uuidv4(),
        name: 'NutriVa – AI-powered nutrition app',
        stack: 'MERN (MongoDB, Express, React 19, Node.js), Ollama AI, Tailwind CSS',
        features: [
          'Features: AI weekly planning, macro tracking, progress dashboard',
          'Role: Project lead (4-person team), Deployment: Hetzner Cloud VPS',
          'Live: nutriva.live',
        ],
        role: 'Project lead (4-person team)',
        deployment: 'Hetzner Cloud VPS',
        liveUrl: 'nutriva.live',
      },
      {
        id: uuidv4(),
        name: 'Weather Flask & Docker',
        stack: 'Python, Flask, Docker & Docker Compose, HTML, CSS',
        features: ['Features: Real-time weather data, API requests OpenWeatherMap'],
        role: '',
        deployment: '',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Portfolio Website',
        stack: 'React, Tailwind CSS, Vite, React Three Fiber',
        features: ['Deployment: GitHub Pages'],
        role: '',
        deployment: 'GitHub Pages',
        liveUrl: '',
      },
      {
        id: uuidv4(),
        name: 'Space Invader Game',
        stack: 'Classic arcade-style game built with JavaScript and Canvas',
        features: ['focusing on animation and game logic', 'Deployment: GitHub Pages'],
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

  // Save Preview CV in a PDF file
  const printDocument = () => {
    const input = document.getElementById('preview');

    if (!input) {
      alert('Preview element not found. Please try again.');
      return;
    }

    // Store original display properties
    const originalClasses = input.className;
    const wasHidden = input.classList.contains('hidden');

    // Temporarily make visible for capturing (if hidden)
    if (wasHidden) {
      input.classList.remove('hidden');
      input.classList.add('block');
    }

    // Use higher scale for better quality
    html2canvas(input, {
      scale: 2, // Good balance between quality and file size
      useCORS: true,
      allowTaint: true, // Allow cross-origin images
      logging: true, // Enable logging to see what's happening
      backgroundColor: '#ffffff',
      imageTimeout: 15000, // Wait up to 15 seconds for images to load
      removeContainer: true,
      foreignObjectRendering: false, // Better SVG handling
    })
      .then((canvas) => {
        try {
          console.log('Canvas created successfully:', canvas.width, 'x', canvas.height);

          // Use JPEG for better compatibility and smaller size
          const imgData = canvas.toDataURL('image/jpeg', 0.95);

          console.log('Image data URL length:', imgData.length);
          console.log('Image data URL start:', imgData.substring(0, 50));
          console.log(
            'Image data type check:',
            typeof imgData,
            'starts with data:image?',
            imgData.startsWith('data:image')
          );

          // Validate the data URL - be more lenient
          if (!imgData || imgData === 'data:,') {
            console.error(
              'Invalid image data:',
              imgData ? imgData.substring(0, 100) : 'imgData is null/undefined'
            );
            throw new Error('Failed to generate image data from canvas');
          }

          if (!imgData.startsWith('data:image')) {
            console.error(
              'Image data does not start with data:image, actual start:',
              imgData.substring(0, 100)
            );
            throw new Error('Invalid image data format - not a valid data URL');
          }

          // Calculate dimensions
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          console.log('Creating PDF with dimensions:', imgWidth, 'x', imgHeight);

          const pdf = new jsPDF('p', 'mm', 'a4');

          let heightLeft = imgHeight;
          let position = 0;

          // Add the image to the first page
          console.log('Adding image to PDF...');
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // Add new pages if content exceeds one page
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          // Download PDF to user
          console.log('Saving PDF...');
          pdf.save('resume.pdf');
          console.log('PDF saved successfully!');

          // Restore original classes
          if (wasHidden) {
            input.className = originalClasses;
          }
        } catch (error) {
          console.error('Error generating PDF:', error);
          console.error('Error stack:', error.stack);

          // Restore original classes on error
          if (wasHidden) {
            input.className = originalClasses;
          }

          alert(`Failed to generate PDF: ${error.message}\nCheck the console for more details.`);
        }
      })
      .catch((error) => {
        console.error('Error capturing preview:', error);
        console.error('Error stack:', error.stack);

        // Restore original classes on error
        if (wasHidden) {
          input.className = originalClasses;
        }

        alert(`Failed to capture preview: ${error.message}\nCheck the console for more details.`);
      });
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
