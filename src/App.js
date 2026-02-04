import React, { useState } from 'react';
import Form from './containers/form/form.js';
import Preview from './containers/preview/preview.js';
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import autofilledState from './utils/autofill.js';
import MobileToggle from './components/MobileToggle/MobileToggle.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Initialize info state with unique IDs
const initializeInfo = () => [
  { name: "firstName", value: "", id: uuidv4() },
  { name: "lastName", value: "", id: uuidv4() },
  { name: "address", value: "", id: uuidv4() },
  { name: "website", value: "", id: uuidv4() },
  { name: "email", value: "", id: uuidv4() },
  { name: "phone", value: "", id: uuidv4() },
  { name: "bio", value: "", id: uuidv4() },
  { name: "universityName", value: "", id: uuidv4() },
  { name: "universityDegree", value: "", id: uuidv4() },
  { name: "universityDate", value: "", id: uuidv4() },
  { name: "schoolName", value: "", id: uuidv4() },
  { name: "schoolDegree", value: "", id: uuidv4() },
  { name: "schoolDate", value: "", id: uuidv4() }
];

function App() {
  // State for all of the user's personal and educational information
  const [info, setInfo] = useState(initializeInfo());

  // State Array to hold Objects resembling work experience of the user
  const [experience, setExperience] = useState([
    { 
      isHovered: false,
      id: uuidv4(),
      company: "",
      position: "",
      task: "",
      start: "",
      end: ""
    }
  ]);

  // State Array to hold Objects resembling skills of the user
  const [skills, setSkills] = useState([
    { isHovered: false, id: uuidv4(), skill: "" },
    { isHovered: false, id: uuidv4(), skill: "" },
    { isHovered: false, id: uuidv4(), skill: "" }
  ]);

  // Object to hold a boolean value, determining if the form (or the preview, if formIsOpen: false) is supposed to be rendered in mobile view.
  const [mobile, setMobile] = useState({ formIsOpen: true });

  // Toggling between the "form" and "preview" in mobile view
  const handleToggle = () => {
    setMobile(prev => ({ formIsOpen: !prev.formIsOpen }));
  };

  // Adding a work object to the experience state array
  const addWork = (e) => {
    e.preventDefault();
    setExperience(prev => [...prev, {
      isHovered: false,
      id: uuidv4(),
      company: "",
      position: "",
      task: "",
      start: "",
      end: ""
    }]);
  };

  // Adding a skill object to the skills state array
  const addSkill = (e) => {
    e.preventDefault();
    setSkills(prev => [...prev, {
      isHovered: false,
      id: uuidv4(),
      skill: ""
    }]);
  };

  // Removing a work object from the experience state array
  const removeWork = (index) => {
    setExperience(prev => prev.filter((_, i) => i !== index));
  };

  // Removing a skill object from the skills state array
  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  // Recolouring SVGs (with the "fill:" property) on hover
  const handleMouse = (e) => {
    const targetId = e.target.id;
    setExperience(prev => prev.map(work => 
      work.id === targetId 
        ? { ...work, isHovered: !work.isHovered }
        : work
    ));
  };

  // Recolouring SVGs (with the "fill:" property) on hover
  const handleMouseSkills = (e) => {
    const targetId = e.target.id;
    setSkills(prev => prev.map(skill =>
      skill.id === targetId
        ? { ...skill, isHovered: !skill.isHovered }
        : skill
    ));
  };

  // Handling edits for input fields that control the experience state
  const handleWorkChange = (e) => {
    const { id, name, value } = e.target;
    setExperience(prev => prev.map(work =>
      work.id === id
        ? { ...work, [name]: value }
        : work
    ));
  };

  // Handling edits for input fields that control the skills state
  const handleSkillChange = (e) => {
    const { id, name, value } = e.target;
    setSkills(prev => prev.map(skill =>
      skill.id === id
        ? { ...skill, [name]: value }
        : skill
    ));
  };

  // Handling edits for input fields that control info state
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => prev.map(information =>
      information.name === name
        ? { ...information, value }
        : information
    ));
  };

  // Changing values of all keys in the state that keep user data, automatically rendering an autofilled CV
  const autoFill = () => {
    setInfo(autofilledState.info);
    setExperience(autofilledState.experience);
    setSkills(autofilledState.skills);
  };

  // Save Preview CV in a PDF file
  const printDocument = () => {
    const input = document.getElementById('preview');
    
    // Use higher scale for better quality
    html2canvas(input, {
      scale: 2, // Good balance between quality and file size
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        let heightLeft = imgHeight;
        let position = 0;

        // Add the image to the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add new pages if content exceeds one page
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Download PDF to user
        pdf.save("resume.pdf");
      });
  };

  return (
    <div className={styles['body']}>
      <div className={styles['App']}>
        <Form
          printDocument={printDocument}
          mobile={mobile}
          autoFill={autoFill}
          info={info}
          experience={experience}
          skills={skills}
          addWork={addWork}
          removeWork={removeWork}
          handleMouse={handleMouse}
          handleWorkChange={handleWorkChange}
          handleMouseSkills={handleMouseSkills}
          addSkill={addSkill}
          removeSkill={removeSkill}
          handleSkillChange={handleSkillChange}
          handleInfoChange={handleInfoChange}
        />
        <Preview 
          mobile={mobile}
          info={info}
          experience={experience}
          skills={skills}
        />
      </div>
      <MobileToggle 
        handleToggle={handleToggle}
        mobile={mobile}
      />
    </div>
  );
}

export default App;
