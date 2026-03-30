import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import logoSvg from '../../../assets/images/SVG-SandurProductions_Logo.svg'
import styles from './Footer.module.scss'

import { FaYoutube, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { RiThreadsFill } from 'react-icons/ri'

// Social links data
const socialLinks = [
  {
    key: 'youtube',
    url: 'https://www.youtube.com/@SandurProductions',
    Icon: FaYoutube,
  },
  {
    key: 'linkedin',
    url: 'https://www.linkedin.com/company/sandur-productions/',
    Icon: FaLinkedin,
  },
  {
    key: 'instagram',
    url: 'https://www.instagram.com/sandur_productions/',
    Icon: FaInstagram,
  },
  {
    key: 'threads',
    url: 'https://www.threads.net/@sandur_productions',
    Icon: RiThreadsFill,
  },
]

const Footer = () => {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()
  const currentLocale = i18n.language || 'en'

  const localePath = (path: string) => `/${currentLocale}${path}`

  // Nav links
  const companyLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/blog', label: t('nav.blog') },
  ]

  const legalLinks = [
    { path: '/privacy', label: t('legal.privacy') },
    { path: '/cookie-policy', label: t('legal.cookie') },
    { path: '/terms', label: t('legal.terms') },
    { path: '/gdpr', label: t('legal.gdpr') },
  ]

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Accent gradient top border */}
      <div className={styles.accentBorder} aria-hidden="true" />

      <div className={styles.container}>
        {/* Column 1: Brand */}
        <div className={styles.brand}>
          <Link
            to={localePath('/')}
            className={styles.logoLink}
            aria-label={`${t('brand')} — ${t('nav.home')}`}
          >
            <img
              src={logoSvg}
              alt={`${t('brand')} Logo`}
              width={32}
              height={32}
              className={styles.logoImage}
            />
            <span className={styles.logoText}>{t('brand').toUpperCase()}</span>
          </Link>
          <p className={styles.tagline}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Column 2: Company Links */}
        <nav className={styles.column} aria-label={t('footer.company')}>
          <h3 className={styles.columnHeading}>{t('footer.company')}</h3>
          <ul className={styles.linkList}>
            {companyLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={localePath(link.path)}
                  className={styles.footerLink}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3: Legal Links */}
        <nav className={styles.column} aria-label={t('footer.legal')}>
          <h3 className={styles.columnHeading}>{t('footer.legal')}</h3>
          <ul className={styles.linkList}>
            {legalLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={localePath(link.path)}
                  className={styles.footerLink}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 4: Social */}
        <div className={styles.column} role="navigation" aria-label={t('footer.social.heading')}>
          <h3 className={styles.columnHeading}>{t('footer.social.heading')}</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.socialLink} ${styles[social.key]}`}
                aria-label={t(`footer.social.${social.key}`)}
                title={t(`footer.social.${social.key}`)}
              >
                <social.Icon
                  size={20}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <div className={styles.copyrights}>
            <p className={styles.copyright}>
              {t('footer.copyrightCombined', { year: currentYear })}
            </p>
          </div>
          <p className={styles.builtBy}>
            {t('footer.builtBy')}{' '}
            <a
              href="https://sandurtech.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.sandurTechLink}
            >
              {t('footer.sandurTech')}
              <OpenInNewIcon
                sx={{ fontSize: 12, marginLeft: '3px', verticalAlign: 'middle' }}
                aria-hidden="true"
              />
            </a>
          </p>
        </div>
      </div>

      {/* Big 3D Text Section */}
      <div className={styles.bigTextContainer} aria-hidden="true">
        <h2 className={styles.bigText}>
          {t('brand').toUpperCase()}
        </h2>
      </div>
    </footer>
  )
}

export default Footer
