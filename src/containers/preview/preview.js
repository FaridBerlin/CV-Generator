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
          <header className="bg-primary text-white p-5 relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-1">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="text-accent-light text-base mb-2 uppercase">
                  {personalInfo.title || 'YOUR TITLE'}
                </p>
                <p className="text-xs leading-snug max-w-2xl">
                  {personalInfo.bio || 'Your bio will appear here...'}
                </p>
              </div>
              <div className="flex-shrink-0">
                {personalInfo.profileImage ? (
                  <img
                    src={personalInfo.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-white/30 flex items-center justify-center text-gray-500 text-xs">
                    Photo
                  </div>
                )}
              </div>
            </div>

            {/* Contact Bar */}
            <div className="mt-4 -mx-5 -mb-5 bg-primary-dark px-5 py-2 flex flex-wrap items-center gap-3 text-xs">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={14} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone size={14} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.github && (
                <div className="flex items-center gap-1.5">
                  <Github size={14} />
                  <span>{personalInfo.github}</span>
                </div>
              )}
            </div>
          </header>

          {/* Main Content - Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-5 p-5">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Education */}
              <section>
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  EDUCATION
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="text-base font-bold leading-tight">{edu.degree || 'Degree'}</h3>
                    <p className="font-semibold text-sm">{edu.institution || 'Institution'}</p>
                    <div className="flex flex-wrap justify-between items-center mt-0.5 mb-1">
                      <p className="text-xs text-accent italic">
                        {edu.startDate} {edu.startDate && edu.endDate && '-'}{' '}
                        {edu.endDate || 'Present'}
                      </p>
                      {edu.location && <p className="text-xs text-accent italic">{edu.location}</p>}
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-accent mb-1">Courses:</p>
                        <ul className="text-xs space-y-0.5 list-disc list-inside marker:text-accent">
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
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  PROFESSIONAL EXPERIENCE
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-3">
                    <h3 className="text-base font-bold leading-tight">
                      {exp.position || 'Position'}
                    </h3>
                    <p className="font-semibold text-sm">{exp.company || 'Company'}</p>
                    <div className="flex flex-wrap justify-between items-center mt-0.5 mb-1">
                      <p className="text-xs text-accent italic">
                        {exp.startDate} {exp.startDate && exp.endDate && '-'}{' '}
                        {exp.endDate || 'Present'}
                      </p>
                      {exp.location && <p className="text-xs text-accent italic">{exp.location}</p>}
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-accent mb-1">
                          Achievements/Tasks:
                        </p>
                        <ul className="text-xs space-y-0.5 list-disc list-inside marker:text-accent">
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
            <div className="space-y-5">
              {/* Skills */}
              <section>
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  SKILLS
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills
                    .filter((s) => s.skill)
                    .map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-primary text-white px-2 py-0.5 rounded text-xs inline-flex items-center justify-center"
                      >
                        {skill.skill}
                      </span>
                    ))}
                </div>
              </section>

              {/* Personal Projects */}
              <section>
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  PERSONAL PROJECTS
                </h2>
                <div className="space-y-2.5">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-bold text-sm leading-tight">
                        {project.name || 'Project Name'}
                      </h3>
                      {project.stack && (
                        <p className="text-xs mb-0.5">
                          <span className="font-semibold">Stack:</span> {project.stack}
                        </p>
                      )}
                      {project.features && project.features.length > 0 && (
                        <ul className="text-xs space-y-0.5 list-disc list-inside marker:text-accent">
                          {project.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      )}
                      {project.role && (
                        <p className="text-xs">
                          <span className="font-semibold">Role:</span> {project.role}
                        </p>
                      )}
                      {project.deployment && (
                        <p className="text-xs">
                          <span className="font-semibold">Deployment:</span> {project.deployment}
                        </p>
                      )}
                      {project.liveUrl && (
                        <p className="text-xs">
                          <span className="font-semibold">Live:</span> {project.liveUrl}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  LANGUAGES
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {languages
                    .filter((l) => l.language)
                    .map((lang) => (
                      <div key={lang.id}>
                        <p className="font-semibold text-sm">{lang.language}</p>
                        <p className="text-xs text-gray-600 italic">{lang.level}</p>
                      </div>
                    ))}
                </div>
              </section>

              {/* Interests */}
              <section>
                <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                  INTERESTS
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {interests
                    .filter((i) => i.interest)
                    .map((interest) => (
                      <span
                        key={interest.id}
                        className="border-2 border-gray-300 px-2 py-0.5 rounded text-xs inline-flex items-center justify-center"
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
