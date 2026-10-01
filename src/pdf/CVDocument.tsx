import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import { createPdfStyles, colors } from './pdfStyles';
import { getTheme } from '../theme/cvThemes';
import type { CvTheme } from '../theme/cvThemes';
import type { CVData } from '../types/cv';
import { MailIcon, PhoneIcon, PinIcon, LinkIcon, BrainCircuitIcon, Gamepad2Icon, DumbbellIcon, ChessKnightIcon, StarIcon } from './icons';
import { getInterestIconKind } from '../utils/interestIcon';
import { translations } from '../i18n/translations';
import type { Lang } from '../i18n/translations';

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

type Styles = ReturnType<typeof createPdfStyles>;

const BulletList = ({ items, styles }: { items: string[]; styles: Styles }) => (
  <View style={styles.bulletList}>
    {items.map((item, idx) => (
      <View style={styles.bulletRow} key={idx}>
        <Text style={styles.bulletDot}>•</Text>
        <Text style={styles.bulletText}>{item}</Text>
      </View>
    ))}
  </View>
);

const Pills = ({ items, styles }: { items: string[]; styles: Styles }) => (
  <View style={styles.pillWrap}>
    {items.map((text, idx) => (
      <Text key={idx} style={styles.pill}>
        {text}
      </Text>
    ))}
  </View>
);

const InterestPills = ({ items, styles }: { items: string[]; styles: Styles }) => (
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
  styles,
  color,
}: {
  text: string;
  icon: typeof MailIcon;
  styles: Styles;
  color: string;
}) =>
  text ? (
    <View style={styles.contactItem}>
      <View style={styles.contactIcon}>
        <Icon size={9} color={color} />
      </View>
      <Text style={styles.contactText}>{text}</Text>
    </View>
  ) : null;

function CVDocument({
  theme: themeProp,
  lang = 'en',
  personalInfo,
  education,
  experience,
  skills,
  projects,
  languages,
  interests,
}: CVData & { theme?: CvTheme; lang?: Lang }) {
  const { cv } = translations[lang];
  const theme = themeProp ?? getTheme(null);
  const styles = createPdfStyles(theme);
  const filledSkills = skills.filter((s) => s.skill).map((s) => s.skill);
  const filledInterests = interests.filter((i) => i.interest).map((i) => i.interest);
  const filledLanguages = languages.filter((l) => l.language);

  return (
    <Document title={`${personalInfo.firstName} ${personalInfo.lastName} - ${cv.pdfTitle}`.trim()}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <Text style={styles.name}>
                {personalInfo.firstName} {personalInfo.lastName}
              </Text>
              <Text style={styles.title}>{personalInfo.title || cv.yourTitle}</Text>
              <Text style={styles.bio}>{personalInfo.bio}</Text>
            </View>
            {personalInfo.profileImage ? (
              <Image src={personalInfo.profileImage} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>{cv.photo}</Text>
              </View>
            )}
          </View>

          <View style={styles.contactBar}>
            <ContactItem styles={styles} color={theme.onPrimary} text={personalInfo.email} icon={MailIcon} />
            <ContactItem styles={styles} color={theme.onPrimary} text={personalInfo.phone} icon={PhoneIcon} />
            <ContactItem styles={styles} color={theme.onPrimary} text={personalInfo.address} icon={PinIcon} />
            <ContactItem styles={styles} color={theme.onPrimary} text={personalInfo.github} icon={LinkIcon} />
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.column}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{cv.experience}</Text>
              <View style={styles.entryList}>
                {experience.map((exp) => (
                  <View style={styles.entry} key={exp.id} wrap={false}>
                    <Text style={styles.entryTitle}>{exp.position || cv.position}</Text>
                    <Text style={styles.entrySubtitle}>{exp.company || cv.company}</Text>
                    <View style={styles.entryMetaRow}>
                      <Text style={styles.entryMeta}>{dateRange(exp.startDate, exp.endDate)}</Text>
                      {exp.location ? <Text style={styles.entryMeta}>{exp.location}</Text> : null}
                    </View>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <>
                        <Text style={styles.entryLabel}>{cv.achievements}</Text>
                        <BulletList styles={styles} items={exp.achievements} />
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{cv.education}</Text>
              <View style={styles.entryList}>
                {education.map((edu) => (
                  <View style={styles.entry} key={edu.id} wrap={false}>
                    <Text style={styles.entryTitle}>{edu.degree || cv.degree}</Text>
                    <Text style={styles.entrySubtitle}>{edu.institution || cv.institution}</Text>
                    <View style={styles.entryMetaRow}>
                      <Text style={styles.entryMeta}>{dateRange(edu.startDate, edu.endDate)}</Text>
                      {edu.location ? <Text style={styles.entryMeta}>{edu.location}</Text> : null}
                    </View>
                    {edu.courses && edu.courses.length > 0 && (
                      <>
                        <Text style={styles.entryLabel}>{cv.courses}</Text>
                        <BulletList styles={styles} items={edu.courses} />
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.columnGap} />

          {/* Right column */}
          <View style={styles.column}>
            {filledSkills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{cv.skills}</Text>
                <Pills styles={styles} items={filledSkills} />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{cv.projects}</Text>
              <View style={styles.entryList}>
                {projects.map((project) => (
                  <View style={styles.entry} key={project.id} wrap={false}>
                    <Text style={styles.entryTitle}>{project.name || cv.projectName}</Text>
                    <View style={styles.entryDetails}>
                      {project.stack ? (
                        <Text style={styles.inlineRow}>
                          <Text style={styles.inlineLabel}>{cv.stack} </Text>
                          {project.stack}
                        </Text>
                      ) : null}
                      {project.features && project.features.length > 0 && (
                        <BulletList styles={styles} items={project.features} />
                      )}
                      {project.role ? (
                        <Text style={styles.inlineRow}>
                          <Text style={styles.inlineLabel}>{cv.role} </Text>
                          {project.role}
                        </Text>
                      ) : null}
                      {project.deployment ? (
                        <Text style={styles.inlineRow}>
                          <Text style={styles.inlineLabel}>{cv.deployment} </Text>
                          {project.deployment}
                        </Text>
                      ) : null}
                      {project.liveUrl ? (
                        <Text style={styles.inlineRow}>
                          <Text style={styles.inlineLabel}>{cv.live} </Text>
                          {project.liveUrl}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {filledLanguages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{cv.languages}</Text>
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
                <Text style={styles.sectionTitle}>{cv.interests}</Text>
                <InterestPills styles={styles} items={filledInterests} />
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default CVDocument;
