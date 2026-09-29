import { Mail, Phone, MapPin, Link } from 'lucide-react';
import type {
  PersonalInfo,
  Education,
  Experience,
  Skill,
  Project,
  Language,
  Interest,
  MobileState,
} from '../../types/cv';

interface PreviewProps {
  mobile: MobileState;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  interests: Interest[];
}

function Preview({
  mobile,
  personalInfo,
  education,
  experience,
  skills,
  projects,
  languages,
  interests,
}: PreviewProps) {
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
              <p className="text-accent text-base mb-2 uppercase">
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
          <div className="mt-2 -mx-5 -mb-5 bg-primary-dark px-5 py-3 flex flex-wrap items-center gap-3 text-xs">
            {personalInfo.email && (
              <div
                className="flex items-center gap-1.5"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '14px',
                    overflow: 'visible',
                  }}
                >
                  <Mail
                    size={14}
                    fill="white"
                    stroke="white"
                    style={{ display: 'block', width: '14px', height: '14px', flexShrink: 0 }}
                  />
                </span>
                <span
                  style={{ display: 'inline-block', lineHeight: '14px', transform: 'translateY(-2px)' }}
                >
                  {personalInfo.email}
                </span>
              </div>
            )}
            {personalInfo.phone && (
              <div
                className="flex items-center gap-1.5"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '14px',
                    overflow: 'visible',
                  }}
                >
                  <Phone
                    size={14}
                    fill="white"
                    stroke="white"
                    style={{ display: 'block', width: '14px', height: '14px', flexShrink: 0 }}
                  />
                </span>
                <span
                  style={{ display: 'inline-block', lineHeight: '14px', transform: 'translateY(-2px)' }}
                >
                  {personalInfo.phone}
                </span>
              </div>
            )}
            {personalInfo.address && (
              <div
                className="flex items-center gap-1.5"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '14px',
                    overflow: 'visible',
                  }}
                >
                  <MapPin
                    size={14}
                    fill="white"
                    stroke="white"
                    style={{ display: 'block', width: '14px', height: '14px', flexShrink: 0 }}
                  />
                </span>
                <span
                  style={{ display: 'inline-block', lineHeight: '14px', transform: 'translateY(-2px)' }}
                >
                  {personalInfo.address}
                </span>
              </div>
            )}
            {personalInfo.github && (
              <div
                className="flex items-center gap-1.5"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    width: '14px',
                    overflow: 'visible',
                  }}
                >
                  <Link
                    size={14}
                    fill="white"
                    stroke="white"
                    style={{ display: 'block', width: '14px', height: '14px', flexShrink: 0 }}
                  />
                </span>
                <span
                  style={{ display: 'inline-block', lineHeight: '14px', transform: 'translateY(-2px)' }}
                >
                  {personalInfo.github}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Main Content - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-5 p-5">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Professional Experience */}
            <section>
              <h2 className="text-lg font-bold text-accent mb-2 border-b-2 border-accent pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <h3 className="text-base font-bold leading-tight">{exp.position || 'Position'}</h3>
                  <p className="font-semibold text-sm">{exp.company || 'Company'}</p>
                  <div className="flex flex-wrap justify-between items-center mt-0.5 mb-1">
                    <p className="text-xs text-accent italic">
                      {exp.startDate} {exp.startDate && exp.endDate && '-'} {exp.endDate || 'Present'}
                    </p>
                    {exp.location && <p className="text-xs text-accent italic">{exp.location}</p>}
                  </div>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <>
                      <p className="text-xs font-semibold text-accent mb-1">Achievements/Tasks:</p>
                      <div className="text-xs space-y-0.5">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
                            <span style={{ color: '#10b981', marginRight: '4px', lineHeight: '1.2' }}>
                              •
                            </span>
                            <span style={{ flex: 1, lineHeight: '1.2' }}>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </section>

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
                      {edu.startDate} {edu.startDate && edu.endDate && '-'} {edu.endDate || 'Present'}
                    </p>
                    {edu.location && <p className="text-xs text-accent italic">{edu.location}</p>}
                  </div>
                  {edu.courses && edu.courses.length > 0 && (
                    <>
                      <p className="text-xs font-semibold text-accent mb-1">Courses:</p>
                      <div className="text-xs space-y-0.5">
                        {edu.courses.map((course, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
                            <span style={{ color: '#10b981', marginRight: '4px', lineHeight: '1.2' }}>
                              •
                            </span>
                            <span style={{ flex: 1, lineHeight: '1.2' }}>{course}</span>
                          </div>
                        ))}
                      </div>
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
                      className="bg-primary text-white px-2 py-1 rounded text-xs inline-flex items-center justify-center leading-none"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1',
                        paddingTop: '7px',
                        paddingBottom: '13px',
                        minHeight: '28px',
                      }}
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
                    <h3 className="font-bold text-sm leading-tight">{project.name || 'Project Name'}</h3>
                    {project.stack && (
                      <p className="text-xs mb-0.5">
                        <span className="font-semibold">Stack:</span> {project.stack}
                      </p>
                    )}
                    {project.features && project.features.length > 0 && (
                      <div className="text-xs space-y-0.5">
                        {project.features.map((feature, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0' }}>
                            <span style={{ color: '#10b981', marginRight: '4px', lineHeight: '1.2' }}>
                              •
                            </span>
                            <span style={{ flex: 1, lineHeight: '1.2' }}>{feature}</span>
                          </div>
                        ))}
                      </div>
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
                      className="border-2 border-gray-300 px-2 py-1 rounded text-xs inline-flex items-center justify-center leading-none"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1',
                        paddingTop: '7px',
                        paddingBottom: '13px',
                        minHeight: '28px',
                      }}
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

export default Preview;
