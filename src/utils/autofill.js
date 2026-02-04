import { v4 as uuidv4 } from 'uuid';

const autofilledState = {
    info: [
      {
        name: "firstName",
        value: "Farid",
        id: uuidv4()
      },
      {
        name: "lastName",
        value: "Berlin",
        id: uuidv4()
      },
      {
        name: "address",
        value: "New York, US",
        id: uuidv4()
      },
      {
        name: "website",
        value: "nikolatesla.com",
        id: uuidv4()
      },
      {
        name: "email",
        value: "nikolatesla@gmail.com",
        id: uuidv4()
      },
      {
        name: "phone",
        value: "555-555-5555",
        id: uuidv4()
      },
      {
        name: "bio",
        value: "Motivated and results-driven Senior Software Engineer with 8+ years of experience in my field. I have continuously demonstrated experience in improving software performance by implementing new ideas, updating, testing and coding. Experience in development tools which increase accuracy and performance of software, especially in React and with React Redux, are my specialization. In my free time, I go on a walk with the two of my dogs or spend time with friends. I also play chess and appreciate any competitive environment when pursuing sports.",
        id: uuidv4()
      },
      {
        name: "universityName",
        value: "University of Chicago",
        id: uuidv4()
      },
      {
        name: "universityDegree",
        value: "Master of Science",
        id: uuidv4()
      },
      {
        name: "universityDate",
        value: "2010 - 2014",
        id: uuidv4()
      },
      {
        name: "schoolName",
        value: "Sullivan High School",
        id: uuidv4()
      },
      {
        name: "schoolDegree",
        value: "HS Diploma",
        id: uuidv4()
      },
      {
        name: "schoolDate",
        value: "2004 - 2010",
        id: uuidv4()
      }
    ],

    experience: [
      { 
        isHovered: false,
        id: uuidv4(),
        company: "Dice",
        position: "Senior Software Engineer",
        task: "I provided technical leadership for complex projects. I used the latest technologies such as Cloud Service, Visual Studio 2019 and Azure DevOps. I gained experience with data technologies such as SQL Servers, NoSQL databases, full text search engines and caching. My daily work consisted mostly of maintaining full project life-cycle tasks including testing, debugging, technical analysis, design and coding.",
        start: "2016",
        end: "Present"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        company: "Rose International",
        position: "Software Engineer",
        task: "I worked on the company's software development plans including all aspects of the SDLC in collaboration with peer programmers. My daily workflow here consisted of performing error analysis, assisting with IT issues and building/accessing databases including NoSQL and Node.js. I, together with my team of peers, developed 25+ Java Applications in the time of my employment.",
        start: "2014",
        end: "2016"
      }
    ],

    newExperience: { 
      isHovered: false,
      id: uuidv4(),
      company: "",
      position: "",
      task: "",
      start: "",
      end: ""
    },

    skills: [
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "React"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Redux"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "PostgreSQL"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Node.js"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Tailwind"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Java"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Python"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Express.js"
      },
      { 
        isHovered: false,
        id: uuidv4(),
        skill: "Git"
      },
    ],

    newSkill: {
      isHovered: false,
      id: uuidv4(),
      skill: ""
    }
}

export default autofilledState;