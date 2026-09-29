import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { styles, colors } from './pdfStyles';
import type { CVData } from '../types/cv';
import { MailIcon, PhoneIcon, PinIcon, LinkIcon, BrainCircuitIcon, Gamepad2Icon, DumbbellIcon, ChessKnightIcon, StarIcon } from './icons';
import { getInterestIconKind } from '../utils/interestIcon';

const interestIcons = {
  ai: BrainCircuitIcon,
  game: Gamepad2Icon,
  fitness: DumbbellIcon,
  chess: ChessKnightIcon,
  default: StarIcon,
};

const dateRange = (start: string, end: string) => {
  if (!start && !end) return '';
  if (start && end) return `${start} - ${end}`;
  return start || end;
};

const BulletList = ({ items }: { items: string[] }) => (
  <>
    {items.map((item, idx) => (
      <View style={styles.bulletRow} key={idx}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </>
);

const Pills = ({ items }: { items: string[] }) => (
  <View style={styles.pillWrap}>
    {items.map((text, idx) => (
      <Text key={idx} style={styles.pill}>
        {text}
      </Text>
    ))}
  </View>
);

const InterestPills = ({ items }: { items: string[] }) => (
  <View style={styles.pillWrap}>
    {items.map((text, idx) => {
      const Icon = interestIcons[getInterestIconKind(text)];
      return (
        <View key={idx} style={styles.interestPill}>
          <View style={styles.interestPillIcon}>
            <Icon size={9} color={colors.gray} />
          </View>
          <Text style={styles.interestPillText}>{text}</Text>
        </View>
      );
    })}
  </View>
);

const ContactItem = ({
  text,
  icon: Icon,
}: {
  text: string;
  icon: typeof MailIcon;
}) =>
  text ? (
    <View style={styles.contactItem}>
      <View style={styles.contactIcon}>
        <Icon size={9} color="#ffffff" />
      </View>
      <Text style={styles.contactText}>{text}</Text>
    </View>
  ) : null;

function CVDocument({
  personalInfo,
  education,
  experience,
  skills,
  projects,
  languages,
  interests,
}: CVData) {
  const filledSkills = skills.filter((s) => s.skill).map((s) => s.skill);
  const filledInterests = interests.filter((i) => i.interest).map((i) => i.interest);
  const filledLanguages = languages.filter((l) => l.language);

  return (
    <Document title={`${personalInfo.firstName} ${personalInfo.lastName} - CV`.trim()}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.name}>
                {personalInfo.firstName} {personalInfo.lastName}
              </Text>
              <Text style={styles.title}>{personalInfo.title || 'Your Title'}</Text>
              <Text style={styles.bio}>{personalInfo.bio}</Text>
            </View>
            {personalInfo.profileImage ? (
              <Image src={personalInfo.profileImage} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>Photo</Text>
              </View>
            )}
          </View>

          <View style={styles.contactBar}>
            <ContactItem text={personalInfo.email} icon={MailIcon} />
            <ContactItem text={personalInfo.phone} icon={PhoneIcon} />
            <ContactItem text={personalInfo.address} icon={PinIcon} />
            <ContactItem text={personalInfo.github} icon={LinkIcon} />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {experience.map((exp) => (
                <View style={styles.entry} key={exp.id} wrap={false}>
                  <Text style={styles.entryTitle}>{exp.position || 'Position'}</Text>
                  <Text style={styles.entrySubtitle}>{exp.company || 'Company'}</Text>
                  <View style={styles.entryMetaRow}>
                    <Text style={styles.entryMeta}>{dateRange(exp.startDate, exp.endDate)}</Text>
                    {exp.location ? <Text style={styles.entryMeta}>{exp.location}</Text> : null}
                  </View>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <>
                      <Text style={styles.entryLabel}>Achievements/Tasks:</Text>
                      <BulletList items={exp.achievements} />
                    </>
                  )}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View style={styles.entry} key={edu.id} wrap={false}>
                  <Text style={styles.entryTitle}>{edu.degree || 'Degree'}</Text>
                  <Text style={styles.entrySubtitle}>{edu.institution || 'Institution'}</Text>
                  <View style={styles.entryMetaRow}>
                    <Text style={styles.entryMeta}>{dateRange(edu.startDate, edu.endDate)}</Text>
                    {edu.location ? <Text style={styles.entryMeta}>{edu.location}</Text> : null}
                  </View>
                  {edu.courses && edu.courses.length > 0 && (
                    <>
                      <Text style={styles.entryLabel}>Courses:</Text>
                      <BulletList items={edu.courses} />
                    </>
                  )}
                </View>
              ))}
            </View>
          </View>

          <View style={styles.columnGap} />

          {/* Right column */}
          <View style={styles.column}>
            {filledSkills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <Pills items={filledSkills} />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Projects</Text>
              {projects.map((project) => (
                <View style={styles.entry} key={project.id} wrap={false}>
                  <Text style={styles.entryTitle}>{project.name || 'Project Name'}</Text>
                  {project.stack ? (
                    <Text style={styles.inlineRow}>
                      <Text style={styles.inlineLabel}>Stack: </Text>
                      {project.stack}
                    </Text>
                  ) : null}
                  {project.features && project.features.length > 0 && (
                    <BulletList items={project.features} />
                  )}
                  {project.role ? (
                    <Text style={styles.inlineRow}>
                      <Text style={styles.inlineLabel}>Role: </Text>
                      {project.role}
                    </Text>
                  ) : null}
                  {project.deployment ? (
                    <Text style={styles.inlineRow}>
                      <Text style={styles.inlineLabel}>Deployment: </Text>
                      {project.deployment}
                    </Text>
                  ) : null}
                  {project.liveUrl ? (
                    <Text style={styles.inlineRow}>
                      <Text style={styles.inlineLabel}>Live: </Text>
                      {project.liveUrl}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>

            {filledLanguages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Languages</Text>
                <View style={styles.languageGrid}>
                  {filledLanguages.map((lang) => (
                    <View style={styles.languageItem} key={lang.id}>
                      <Text style={styles.languageName}>{lang.language}</Text>
                      <Text style={styles.languageLevel}>{lang.level}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {filledInterests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <InterestPills items={filledInterests} />
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default CVDocument;
