import { Mail, Phone, MapPin, Link, BrainCircuit, Gamepad2, Dumbbell, ChessKnight, Star } from 'lucide-react';
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
import type { CSSProperties } from 'react';
import type { CvTheme } from '../../theme/cvThemes';
import A4Scaler from './A4Scaler';
import './Preview.css';
import { getInterestIconKind } from '../../utils/interestIcon';
import { useTranslation } from '../../i18n/LanguageContext';

const interestIcons = {
  ai: BrainCircuit,
  game: Gamepad2,
  fitness: Dumbbell,
  chess: ChessKnight,
  default: Star,
};

interface PreviewProps {
  mobile: MobileState;
  theme: CvTheme;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  interests: Interest[];
}

const dateRange = (start: string, end: string) => {
  if (!start && !end) return '';
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

const BulletList = ({ items }: { items: string[] }) => (
  <div className="cv-bullet-list">
    {items.map((item, idx) => (
      <div className="cv-bullet-row" key={idx}>
        <span className="cv-bullet-dot">•</span>
        <span className="cv-bullet-text">{item}</span>
      </div>
    ))}
  </div>
);

const ContactItem = ({ text, icon: Icon }: { text: string; icon: typeof Mail }) =>
  text ? (
    <div className="cv-contact-item">
      <span className="cv-contact-icon">
        <Icon size="9pt" fill="currentColor" stroke="currentColor" />
      </span>
      <span className="cv-contact-text">{text}</span>
    </div>
  ) : null;

function Preview({
  mobile,
  theme,
  personalInfo,
  education,
  experience,
  skills,
  projects,
  languages,
  interests,
}: PreviewProps) {
  const { cv } = useTranslation();
  const filledSkills = skills.filter((s) => s.skill);
  const filledLanguages = languages.filter((l) => l.language);
  const filledInterests = interests.filter((i) => i.interest);

  const themeVars = {
    '--cv-primary': theme.primary,
    '--cv-primary-dark': theme.primaryDark,
    '--cv-accent': theme.accent,
    '--cv-bullet': theme.bullet,
    '--cv-on-primary': theme.onPrimary,
    '--cv-header-subtle': theme.headerSubtle,
  } as CSSProperties;

  return (
    <div
      style={themeVars}
      className={`${mobile.formIsOpen ? 'hidden lg:block' : 'block'} lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-auto bg-neutral-800 border border-neutral-700 shadow-xl p-[16px] rounded-lg min-w-0`}
      id="preview"
    >
      <A4Scaler>
        <header className="cv-header">
          <div className="cv-header-row">
            <div className="cv-header-text">
              <h1 className="cv-name">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className="cv-title">{personalInfo.title || cv.yourTitle}</p>
              <p className="cv-bio">{personalInfo.bio}</p>
            </div>
            {personalInfo.profileImage ? (
              <img src={personalInfo.profileImage} alt="Profile" className="cv-photo" />
            ) : (
              <div className="cv-photo">{cv.photo}</div>
            )}
          </div>
          <div className="cv-contact-bar">
            <ContactItem text={personalInfo.email} icon={Mail} />
            <ContactItem text={personalInfo.phone} icon={Phone} />
            <ContactItem text={personalInfo.address} icon={MapPin} />
            <ContactItem text={personalInfo.github} icon={Link} />
          </div>
        </header>

        <div className="cv-body">
          <div className="cv-column">
            <section>
              <h2 className="cv-section-title">{cv.experience}</h2>
              <div className="cv-entry-list">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="cv-entry-title">{exp.position || cv.position}</h3>
                    <p className="cv-entry-subtitle">{exp.company || cv.company}</p>
                    <div className="cv-entry-meta-row">
                      <p className="cv-entry-meta">{dateRange(exp.startDate, exp.endDate)}</p>
                      {exp.location && <p className="cv-entry-meta">{exp.location}</p>}
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <>
                        <p className="cv-entry-label">{cv.achievements}</p>
                        <BulletList items={exp.achievements} />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="cv-section-title">{cv.education}</h2>
              <div className="cv-entry-list">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="cv-entry-title">{edu.degree || cv.degree}</h3>
                    <p className="cv-entry-subtitle">{edu.institution || cv.institution}</p>
                    <div className="cv-entry-meta-row">
                      <p className="cv-entry-meta">{dateRange(edu.startDate, edu.endDate)}</p>
                      {edu.location && <p className="cv-entry-meta">{edu.location}</p>}
                    </div>
                    {edu.courses && edu.courses.length > 0 && (
                      <>
                        <p className="cv-entry-label">{cv.courses}</p>
                        <BulletList items={edu.courses} />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="cv-column-gap" />

          <div className="cv-column">
            {filledSkills.length > 0 && (
              <section>
                <h2 className="cv-section-title">{cv.skills}</h2>
                <div className="cv-pill-wrap">
                  {filledSkills.map((skill) => (
                    <span key={skill.id} className="cv-pill">
                      {skill.skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="cv-section-title">{cv.projects}</h2>
              <div className="cv-entry-list">
                {projects.map((project) => (
                  <div key={project.id}>
                    <h3 className="cv-entry-title">{project.name || cv.projectName}</h3>
                    <div className="cv-entry-details">
                      {project.stack && (
                        <p className="cv-inline-row">
                          <b>{cv.stack}</b> {project.stack}
                        </p>
                      )}
                      {project.features && project.features.length > 0 && (
                        <BulletList items={project.features} />
                      )}
                      {project.role && (
                        <p className="cv-inline-row">
                          <b>{cv.role}</b> {project.role}
                        </p>
                      )}
                      {project.deployment && (
                        <p className="cv-inline-row">
                          <b>{cv.deployment}</b> {project.deployment}
                        </p>
                      )}
                      {project.liveUrl && (
                        <p className="cv-inline-row">
                          <b>{cv.live}</b> {project.liveUrl}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {filledLanguages.length > 0 && (
              <section>
                <h2 className="cv-section-title">{cv.languages}</h2>
                <div className="cv-language-grid">
                  {filledLanguages.map((lang) => (
                    <div key={lang.id} className="cv-language-item">
                      <p className="cv-language-name">{lang.language}</p>
                      <p className="cv-language-level">{lang.level}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filledInterests.length > 0 && (
              <section>
                <h2 className="cv-section-title">{cv.interests}</h2>
                <div className="cv-pill-wrap">
                  {filledInterests.map((interest) => {
                    const Icon = interestIcons[getInterestIconKind(interest.interest)];
                    return (
                      <span key={interest.id} className="cv-interest-pill">
                        <span className="cv-interest-icon">
                          <Icon size="9pt" />
                        </span>
                        {interest.interest}
                      </span>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </A4Scaler>
    </div>
  );
}

export default Preview;
