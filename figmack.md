import { Mail, Phone, MapPin, Github } from 'lucide-react';
import profileImage from 'figma:asset/0693234a4817d6101e161ec52ac0da596ae5b445.png';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg">
        {/* Header Section */}
        <header className="bg-[#4d5f9e] text-white p-8 relative">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">Farid Hima</h1>
              <p className="text-[#85d4a6] text-lg mb-4">JUNIOR FULL STACK WEB DEVELOPER</p>
              <p className="text-sm leading-relaxed max-w-2xl">
                Motivated Junior Full Stack Developer with hands-on experience in MERN stack
                technologies and a strong background in e-commerce operations. Passionate about building
                scalable, user-focused web applications and exploring automation and AI tools. Seeking a
                collaborative development environment where I can grow and contribute to innovative
                projects.
              </p>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={profileImage} 
                alt="Farid Hima" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30"
              />
            </div>
          </div>
          
          {/* Contact Bar */}
          <div className="mt-8 -mx-8 -mb-8 bg-[#2d3e6e] px-8 py-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} fill="white" />
              <span>bughunterf@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} fill="white" />
              <span>01767976666</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} fill="white" />
              <span>12045, berlin, Germany</span>
            </div>
            <div className="flex items-center gap-2">
              <Github size={16} fill="white" />
              <span>github.com/FaridBerlin</span>
            </div>
          </div>
        </header>

        {/* Main Content - Two Column Layout */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 p-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Education */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                EDUCATION
              </h2>
              <div>
                <h3 className="text-xl font-bold">Full Stack Web Development</h3>
                <p className="font-semibold">DCI Digital Career Institute GmbH</p>
                <div className="flex flex-wrap justify-between items-center mt-1 mb-2">
                  <p className="text-sm text-[#2abfa2] italic">10/2024 - Present</p>
                  <p className="text-sm text-[#2abfa2] italic">Berlin</p>
                </div>
                <p className="text-sm font-semibold text-[#2abfa2] mb-2">Courses:</p>
                <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                  <li>Comprehensive training in MERN Stack (MongoDB, Express.js, React, Node.js)</li>
                  <li>Development of multiple real-world projects focusing on React, Node.js, and REST API creation</li>
                  <li>Participation in English language improvement courses</li>
                  <li>Introduction to AI automation and AI agent creation</li>
                </ul>
              </div>
            </section>

            {/* Professional Experience */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              
              {/* Job 1 */}
              <div className="mb-6">
                <h3 className="text-xl font-bold">Amazon FBA Manager</h3>
                <p className="font-semibold">IIIHT, Berlin</p>
                <div className="flex flex-wrap justify-between items-center mt-1 mb-2">
                  <p className="text-sm text-[#2abfa2] italic">10/2021 - 02/2024</p>
                  <p className="text-sm text-[#2abfa2] italic">Berlin</p>
                </div>
                <p className="text-sm font-semibold text-[#2abfa2] mb-2">Achievements/Tasks:</p>
                <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                  <li>Managed and optimized Amazon FBA listings and ad campaigns for tech products</li>
                  <li>Conducted market research and competitor analysis to enhance sales performance</li>
                  <li>Monitored stock levels, logistics, and product traceability to ensure smooth operations</li>
                  <li>Developed data-driven approaches to improve ROI and streamline workflows</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div>
                <h3 className="text-xl font-bold">Personal Trainer / Influencer</h3>
                <p className="font-semibold">Berlin</p>
                <div className="flex flex-wrap justify-between items-center mt-1 mb-2">
                  <p className="text-sm text-[#2abfa2] italic">06/2011 - 12/2022</p>
                </div>
                <p className="text-sm font-semibold text-[#2abfa2] mb-2">Achievements/Tasks:</p>
                <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                  <li>Managed online content and fitness programs, building a YouTube channel with 180K subscribers</li>
                  <li>Sponsored by Olimp Sport Nutrition (2013-2020)</li>
                  <li>Winner of IFBB Fit Model Belgium (2019)</li>
                  <li>Certified EMS IHHA Personal Trainer</li>
                  <li>*(Experience showcases leadership, self-motivation, and digital marketing skills)*</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                SKILLS
              </h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Python', 'Flask', 'Docker', 'Node.js', 
                  'Express.js', 'MongoDB', 'MySQL', 'PHP', 'React Native', 'Tailwind CSS', 'Git', 
                  'GitHub', 'Clerk', 'API Development', 'Postman', 'AI Automation', 'Zapier', 'n8n', 
                  'Astro', 'HTML', 'CSS', 'YAML', 'MJML'].map((skill) => (
                  <span 
                    key={skill}
                    className="bg-[#4d5f9e] text-white px-3 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Personal Projects */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                PERSONAL PROJECTS
              </h2>
              
              <div className="space-y-4">
                {/* Project 1 */}
                <div>
                  <h3 className="font-bold">NutriVa – AI-powered nutrition app</h3>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Stack:</span> MERN (MongoDB, Express, React 19, Node.js), Ollama AI, Tailwind CSS
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                    <li>Features: AI weekly planning, macro tracking, progress dashboard</li>
                    <li>Role: Project lead (4-person team), Deployment: Hetzner Cloud VPS</li>
                    <li>Live: nutriva.live</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <h3 className="font-bold">Weather Flask & Docker</h3>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Stack:</span> Python, Flask, Docker & Docker Compose, HTML, CSS
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                    <li>Features: Real-time weather data, API requests OpenWeatherMap</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div>
                  <h3 className="font-bold">Portfolio Website</h3>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Stack:</span> React, Tailwind CSS, Vite, React Three Fiber
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                    <li>Deployment: GitHub Pages</li>
                  </ul>
                </div>

                {/* Project 4 */}
                <div>
                  <h3 className="font-bold">Space Invader Game</h3>
                  <p className="text-sm mb-1">
                    <span className="font-semibold">Stack:</span> Classic arcade-style game built with JavaScript and Canvas
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside marker:text-[#2abfa2]">
                    <li>focusing on animation and game logic</li>
                    <li>Deployment: GitHub Pages</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                LANGUAGES
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">German</p>
                  <p className="text-sm text-gray-600 italic">C2</p>
                </div>
                <div>
                  <p className="font-semibold">English</p>
                  <p className="text-sm text-gray-600 italic">B2</p>
                </div>
              </div>
            </section>

            {/* Interests */}
            <section>
              <h2 className="text-2xl font-bold text-[#2abfa2] mb-4 border-b-2 border-[#2abfa2] pb-2">
                INTERESTS
              </h2>
              <div className="flex flex-wrap gap-2">
                {['AI Automation', 'Game Development', 'Content Creation', 'Fitness', 'Chess'].map((interest) => (
                  <span 
                    key={interest}
                    className="border-2 border-gray-300 px-3 py-1 rounded text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
