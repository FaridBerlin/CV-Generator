import React from 'react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';

class Preview extends React.Component {
  render() {
    const { personalInfo, education, experience, skills, projects, languages, interests, mobile } =
      this.props;

    return (
      <div className={mobile.formIsOpen ? 'hidden lg:block' : 'block'} id="preview">
        <div className="max-w-5xl mx-auto bg-white shadow-lg">
          {/* Header Section */}
          <header className="bg-primary text-white p-8 relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="text-accent-light text-lg mb-4 uppercase">
                  {personalInfo.title || 'YOUR TITLE'}
                </p>
                <p className="text-sm leading-relaxed max-w-2xl">
                  {personalInfo.bio || 'Your bio will appear here...'}
                </p>
              </div>
              <div className="flex-shrink-0">
                {personalInfo.profileImage ? (
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/30"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white/30 flex items-center justify-center text-gray-500">
                    Photo
                  </div>
                )}
              </div>
            </div>

            {/* Contact Bar */}
            <div className="mt-8 -mx-8 -mb-8 bg-primary-dark px-8 py-4 flex flex-wrap gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-2">
                  <Github size={16} />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </header>

          {/* Main Content - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Education */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  EDUCATION
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-6">
                    <h3 className="text-xl font-bold">{edu.degree || 'Degree'}</h3>
                    <p className="font-semibold">{edu.institution || 'Institution'}</p>
                    <div className="flex flex-wrap justify-between items-center mt-1 mb-2">
                      <p className="text-sm text-accent italic">
                        {edu.startDate} {edu.startDate && edu.endDate && '-'}{' '}
                        {edu.endDate || 'Present'}
                      </p>
                      {edu.location && <p className="text-sm text-accent italic">{edu.location}</p>}
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <>
                        <p className="text-sm font-semibold text-accent mb-2">Courses:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside marker:text-accent">
                          {edu.courses.map((course, idx) => (
                            <li key={idx}>{course}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </section>

              {/* Professional Experience */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  PROFESSIONAL EXPERIENCE
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-6">
                    <h3 className="text-xl font-bold">{exp.position || 'Position'}</h3>
                    <p className="font-semibold">{exp.company || 'Company'}</p>
                    <div className="flex flex-wrap justify-between items-center mt-1 mb-2">
                      <p className="text-sm text-accent italic">
                        {exp.startDate} {exp.startDate && exp.endDate && '-'}{' '}
                        {exp.endDate || 'Present'}
                      </p>
                      {exp.location && <p className="text-sm text-accent italic">{exp.location}</p>}
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <>
                        <p className="text-sm font-semibold text-accent mb-2">
                          Achievements/Tasks:
                        </p>
                        <ul className="text-sm space-y-1 list-disc list-inside marker:text-accent">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Skills */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.skill)
                    .map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-primary text-white px-3 py-1 rounded text-sm"
                      >
                        {skill.skill}
                      </span>
                    ))}
                </div>
              </section>

              {/* Personal Projects */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  PERSONAL PROJECTS
                </h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-bold">{project.name || 'Project Name'}</h3>
                      {project.stack && (
                        <p className="text-sm mb-1">
                          <span className="font-semibold">Stack:</span> {project.stack}
                        </p>
                      )}
                      {project.features && project.features.length > 0 && (
                        <ul className="text-sm space-y-1 list-disc list-inside marker:text-accent">
                          {project.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      {project.role && (
                        <p className="text-sm">
                          <span className="font-semibold">Role:</span> {project.role}
                        </p>
                      )}
                      {project.deployment && (
                        <p className="text-sm">
                          <span className="font-semibold">Deployment:</span> {project.deployment}
                        </p>
                      )}
                      {project.liveUrl && (
                        <p className="text-sm">
                          <span className="font-semibold">Live:</span> {project.liveUrl}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  LANGUAGES
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {languages
                    .filter((l) => l.language)
                    .map((lang) => (
                      <div key={lang.id}>
                        <p className="font-semibold">{lang.language}</p>
                        <p className="text-sm text-gray-600 italic">{lang.level}</p>
                      </div>
                    ))}
                </div>
              </section>

              {/* Interests */}
              <section>
                <h2 className="text-2xl font-bold text-accent mb-4 border-b-2 border-accent pb-2">
                  INTERESTS
                </h2>
                <div className="flex flex-wrap gap-2">
                  {interests
                    .filter((i) => i.interest)
                    .map((interest) => (
                      <span
                        key={interest.id}
                        className="border-2 border-gray-300 px-3 py-1 rounded text-sm"
                      >
                        {interest.interest}
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
}

export default Preview;
