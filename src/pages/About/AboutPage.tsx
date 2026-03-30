import { useTranslation } from 'react-i18next'
import { FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { RiThreadsFill } from 'react-icons/ri'
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import GroupsIcon from '@mui/icons-material/Groups'
import PlaceIcon from '@mui/icons-material/Place'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

import styles from './AboutPage.module.scss'

interface SocialLink {
  key: string
  url: string
  Icon: React.ElementType
  brandColor: string
}

// Social links for the about page
const socialLinks: SocialLink[] = [
  {
    key: 'youtube',
    url: 'https://www.youtube.com/@SandurProductions',
    Icon: FaYoutube,
    brandColor: '#FF0000',
  },
  {
    key: 'linkedin',
    url: 'https://www.linkedin.com/company/sandur-productions/',
    Icon: FaLinkedin,
    brandColor: '#0077B5',
  },
  {
    key: 'instagram',
    url: 'https://www.instagram.com/sandur_productions/',
    Icon: FaInstagram,
    brandColor: '#E4405F',
  },
  {
    key: 'threads',
    url: 'https://www.threads.net/@sandur_productions',
    Icon: RiThreadsFill,
    brandColor: '#000000',
  },
]


const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <article className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.hero} aria-label={t('about.heading')}>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>{t('about.heading')}</h1>
          <p className={styles.description}>{t('about.description')}</p>
        </div>
      </section>

      {/* Info Cards */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <CalendarMonthIcon className={styles.infoIcon} />
              <span className={styles.infoLabel}>{t('about.foundedYear')}</span>
              <span className={styles.infoValue}>{t('about.foundedValue')}</span>
            </div>
            <div className={styles.infoCard}>
              <PlaceIcon className={styles.infoIcon} />
              <span className={styles.infoLabel}>{t('about.basedIn')}</span>
              <span className={styles.infoValue}>{t('about.basedInValue')}</span>
            </div>
            <div className={styles.infoCard}>
              <MovieCreationIcon className={styles.infoIcon} />
              <span className={styles.infoLabel}>{t('projects.heading')}</span>
              <span className={styles.infoValue}>2</span>
            </div>
            <div className={styles.infoCard}>
              <GroupsIcon className={styles.infoIcon} />
              <span className={styles.infoLabel}>{t('about.mission')}</span>
              <span className={styles.infoValue}>🎬</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.missionSection} aria-label={t('about.mission')}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>{t('about.mission')}</h2>
          <p className={styles.missionText}>{t('about.missionText')}</p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className={styles.contactSection}
        aria-label={t('about.contactHeading')}
      >
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>{t('about.contactHeading')}</h2>
          <p className={styles.contactDescription}>{t('about.contactDescription')}</p>
        </div>
      </section>

      {/* Social */}
      <section className={styles.socialSection} aria-label={t('about.socialHeading')}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>{t('about.socialHeading')}</h2>
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                aria-label={t(`footer.social.${social.key}`)}
              >
                <social.Icon
                  className={styles.socialIcon}
                  style={{ '--brand-color': social.brandColor } as React.CSSProperties}
                />

                <span className={styles.socialName}>
                  {t(`footer.social.${social.key}`)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}

export default AboutPage
