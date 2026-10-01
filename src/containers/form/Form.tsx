import { Trash2, Plus, Download, Sparkles, Check } from 'lucide-react';
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
import { cvThemes } from '../../theme/cvThemes';
import { useTranslation } from '../../i18n/LanguageContext';
import { LANGS } from '../../i18n/translations';
import type { Lang } from '../../i18n/translations';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';

interface FormProps {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  themeId: string;
  onThemeChange: (id: string) => void;
  mobile: MobileState;
  autoFill: () => void;
  printDocument: () => void;

  personalInfo: PersonalInfo;
  handlePersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;

  education: Education[];
  addEducation: (e: React.MouseEvent) => void;
  removeEducation: (id: string) => void;
  handleEducationChange: (id: string, field: keyof Education, value: string | string[]) => void;

  experience: Experience[];
  addExperience: (e: React.MouseEvent) => void;
  removeExperience: (id: string) => void;
  handleExperienceChange: (id: string, field: keyof Experience, value: string | string[]) => void;

  skills: Skill[];
  addSkill: (e: React.MouseEvent) => void;
  removeSkill: (id: string) => void;
  handleSkillChange: (id: string, value: string) => void;

  projects: Project[];
  addProject: (e: React.MouseEvent) => void;
  removeProject: (id: string) => void;
  handleProjectChange: (id: string, field: keyof Project, value: string | string[]) => void;

  languages: Language[];
  addLanguage: (e: React.MouseEvent) => void;
  removeLanguage: (id: string) => void;
  handleLanguageChange: (id: string, field: keyof Language, value: string) => void;

  interests: Interest[];
  addInterest: (e: React.MouseEvent) => void;
  removeInterest: (id: string) => void;
  handleInterestChange: (id: string, value: string) => void;
}

function Form({
  lang,
  onLangChange,
  themeId,
  onThemeChange,
  mobile,
  autoFill,
  printDocument,
  personalInfo,
  handlePersonalInfoChange,
  handleImageUpload,
  education,
  addEducation,
  removeEducation,
  handleEducationChange,
  experience,
  addExperience,
  removeExperience,
  handleExperienceChange,
  skills,
  addSkill,
  removeSkill,
  handleSkillChange,
  projects,
  addProject,
  removeProject,
  handleProjectChange,
  languages,
  addLanguage,
  removeLanguage,
  handleLanguageChange,
  interests,
  addInterest,
  removeInterest,
  handleInterestChange,
}: FormProps) {
  const { ui, cv } = useTranslation();
  return (
    <div className={mobile.formIsOpen ? 'block' : 'hidden lg:block'}>
      <div className="bg-white text-gray-900 [color-scheme:light] rounded-lg shadow-xl ring-1 ring-white/15 p-6 space-y-6">
        {/* Language */}
        <LanguageSwitcher lang={lang} langs={LANGS} onChange={onLangChange} label={ui.language} />

        {/* Header with Actions */}
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-primary">{ui.appTitle}</h1>
          <div className="flex gap-2">
            <button
              onClick={autoFill}
              className="flex items-center gap-2 px-4 py-2 whitespace-nowrap bg-accent text-white rounded hover:bg-accent/90 transition"
            >
              <Sparkles size={16} />
              <span className="hidden sm:inline">{ui.autoFill}</span>
            </button>
            <button
              onClick={printDocument}
              className="flex items-center gap-2 px-4 py-2 whitespace-nowrap bg-primary text-white rounded hover:bg-primary/90 transition"
            >
              <Download size={16} />
              <span className="hidden sm:inline">{ui.downloadPdf}</span>
            </button>
          </div>
        </div>

        {/* CV Color */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-700">{ui.cvColor}</h2>
          <div className="flex flex-wrap gap-2">
            {cvThemes.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.label}
                aria-label={t.label}
                aria-pressed={themeId === t.id}
                onClick={() => onThemeChange(t.id)}
                style={{ backgroundColor: t.primary }}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900 ${
                  themeId === t.id ? 'ring-2 ring-offset-2 ring-gray-900' : 'hover:scale-110'
                }`}
              >
                {themeId === t.id && <Check size={16} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </section>

        {/* Personal Information */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2">
            {ui.personalInfo}
          </h2>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{ui.profileImage}</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
            />
            {personalInfo.profileImage && (
              <img
                src={personalInfo.profileImage}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover mt-2"
              />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.firstName}</label>
              <input
                type="text"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.lastName}</label>
              <input
                type="text"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.professionalTitle}</label>
            <input
              type="text"
              name="title"
              value={personalInfo.title}
              onChange={handlePersonalInfoChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Junior Full Stack Web Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.bio}</label>
            <textarea
              name="bio"
              value={personalInfo.bio}
              onChange={handlePersonalInfoChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={ui.bioPlaceholder}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.email}</label>
              <input
                type="email"
                name="email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.phone}</label>
              <input
                type="tel"
                name="phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.address}</label>
              <input
                type="text"
                name="address"
                value={personalInfo.address}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={ui.addressPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub</label>
              <input
                type="text"
                name="github"
                value={personalInfo.github}
                onChange={handlePersonalInfoChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="github.com/username"
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.education}
            </h2>
            <button
              onClick={addEducation}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          {education.map((edu) => (
            <div key={edu.id} className="p-4 border border-gray-200 rounded space-y-3 relative">
              <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.degreeProgram}</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.degreePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{cv.institution}</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.institutionPlaceholder}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.startDate}</label>
                  <input
                    type="text"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="10/2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.endDate}</label>
                  <input
                    type="text"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={ui.endDatePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.location}</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Berlin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {ui.coursesLabel}
                </label>
                <textarea
                  value={edu.courses?.join('\n') || ''}
                  onChange={(e) =>
                    handleEducationChange(
                      edu.id,
                      'courses',
                      e.target.value.split('\n').filter((c) => c)
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.coursesPlaceholder}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Experience Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.experience}
            </h2>
            <button
              onClick={addExperience}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          {experience.map((exp) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded space-y-3 relative">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.positionTitle}</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.positionPlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{cv.company}</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.companyPlaceholder}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.startDate}</label>
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="01/2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.endDate}</label>
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={ui.endDatePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.location}</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Berlin"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {ui.achievementsLabel}
                </label>
                <textarea
                  value={exp.achievements?.join('\n') || ''}
                  onChange={(e) =>
                    handleExperienceChange(
                      exp.id,
                      'achievements',
                      e.target.value.split('\n').filter((a) => a)
                    )
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.achievementsPlaceholder}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Skills Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.skills}
            </h2>
            <button
              onClick={addSkill}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="flex gap-2">
                <input
                  type="text"
                  value={skill.skill}
                  onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="JavaScript"
                />
                <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.projects}
            </h2>
            <button
              onClick={addProject}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          {projects.map((project) => (
            <div key={project.id} className="p-4 border border-gray-200 rounded space-y-3 relative">
              <button
                onClick={() => removeProject(project.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{cv.projectName}</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.projectNamePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.techStack}</label>
                <input
                  type="text"
                  value={project.stack}
                  onChange={(e) => handleProjectChange(project.id, 'stack', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {ui.featuresLabel}
                </label>
                <textarea
                  value={project.features?.join('\n') || ''}
                  onChange={(e) =>
                    handleProjectChange(
                      project.id,
                      'features',
                      e.target.value.split('\n').filter((f) => f)
                    )
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.featuresPlaceholder}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.yourRole}</label>
                  <input
                    type="text"
                    value={project.role}
                    onChange={(e) => handleProjectChange(project.id, 'role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={ui.rolePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Deployment</label>
                  <input
                    type="text"
                    value={project.deployment}
                    onChange={(e) => handleProjectChange(project.id, 'deployment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Heroku, AWS"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{ui.liveUrl}</label>
                <input
                  type="text"
                  value={project.liveUrl}
                  onChange={(e) => handleProjectChange(project.id, 'liveUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="https://project.com"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Languages Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.languages}
            </h2>
            <button
              onClick={addLanguage}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          <div className="space-y-2">
            {languages.map((lang) => (
              <div key={lang.id} className="flex gap-2">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleLanguageChange(lang.id, 'language', e.target.value)}
                  className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.languagePlaceholder}
                />
                <input
                  type="text"
                  value={lang.level}
                  onChange={(e) => handleLanguageChange(lang.id, 'level', e.target.value)}
                  className="w-20 flex-shrink-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="B2"
                />
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="text-red-500 hover:text-red-700 flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-primary border-b-2 border-accent pb-2 flex-1">
              {cv.interests}
            </h2>
            <button
              onClick={addInterest}
              className="flex items-center gap-2 px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition text-sm"
            >
              <Plus size={16} />
              {ui.add}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {interests.map((interest) => (
              <div key={interest.id} className="flex gap-2">
                <input
                  type="text"
                  value={interest.interest}
                  onChange={(e) => handleInterestChange(interest.id, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder={ui.interestPlaceholder}
                />
                <button
                  onClick={() => removeInterest(interest.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Form;
