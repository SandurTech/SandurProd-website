import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../context/ThemeContext'
import { useCookieConsent } from '../../../context/CookieConsentContext'
import { supportedLanguages } from '../../../i18n'

// MUI Icons
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import TranslateIcon from '@mui/icons-material/Translate'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { FaSearch, FaTimes } from 'react-icons/fa'
import { searchProjects } from '../../../data/projects'
import styles from './Sidebar.module.scss'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  navLinks: Array<{ path: string; label: string }>
  currentLocale: string
  localePath: (path: string) => string
  isActive: (path: string) => boolean
  onLanguageChange: (langCode: string) => void
  searchQuery: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchResults: ReturnType<typeof searchProjects>
  onResultClick: () => void
}

const Sidebar = ({
  isOpen,
  onClose,
  navLinks,
  currentLocale,
  localePath,
  isActive,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  searchResults,
  onResultClick,
}: SidebarProps) => {
  const { t } = useTranslation()
  const { theme, toggle } = useTheme()
  const { openPreferencesModal } = useCookieConsent()

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        aria-label="Mobile navigation sidebar"
        {...(!isOpen ? { inert: true } : {})}
      >
        <div className={styles.header}>
          <span className={styles.title}>{t('nav.menu')}</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t('nav.closeMenu')}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.content}>
          {/* Mobile Search */}
          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t('nav.searchPlaceholder')}
                value={searchQuery}
                onChange={onSearchChange}
              />
              {searchQuery && (
                <button
                  className={styles.searchClear}
                  onClick={() => onSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                  type="button"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Sidebar Search Results */}
            {searchQuery && searchQuery.trim().length > 0 && (
              <div className={styles.searchResults}>
                {searchResults && searchResults.length > 0 ? (
                  <ul className={styles.resultsList}>
                    {searchResults.map((project) => (
                      <li key={project.id}>
                        <Link
                          to={localePath('/projects')}
                          className={styles.resultItem}
                          onClick={onResultClick}
                        >
                          <div className={styles.resultInfo}>
                            <span className={styles.resultTitle}>{t(project.titleKey)}</span>
                            <span className={styles.resultGenre}>{t(project.genreKey)}</span>
                          </div>
                          <ArrowForwardIosIcon className={styles.resultArrow} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.noResults}>{t('projects.noResults')}</p>
                )}
              </div>
            )}
          </div>

          <div className={styles.divider} />

          {/* Navigation Links */}
          <nav className={styles.navSection}>
            <ul className={styles.navList}>
              {navLinks.map((link, index) => (
                <li
                  key={link.path}
                  className={isOpen ? styles.animIn : ''}
                  style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                >
                  <Link
                    to={localePath(link.path)}
                    className={`${styles.navLink} ${
                      isActive(link.path) ? styles.active : ''
                    }`}
                    onClick={onClose}
                  >
                    <span className={styles.linkLabel}>{link.label}</span>
                    <ArrowForwardIosIcon className={styles.linkIcon} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.divider} />

          {/* Preferences Section */}
          <section className={styles.preferences}>
            <h3 className={styles.sectionTitle}>{t('settings.preferences')}</h3>

            <div className={styles.prefRow}>
              <button
                className={styles.plainBtn}
                onClick={openPreferencesModal}
                type="button"
              >
                {t('cookie.preferencesTitle', 'Privacy Preferences')}
              </button>
            </div>

            {/* Theme Toggle */}
            <div className={styles.prefRow}>
              <div className={styles.prefInfo}>
                <span className={styles.prefLabel}>{t('theme.title')}</span>
                <span className={styles.prefValue}>
                  {theme === 'dark' ? t('theme.dark') : t('theme.light')}
                </span>
              </div>
              <button
                className={styles.themeToggle}
                onClick={toggle}
                aria-label={t('theme.toggle')}
                type="button"
              >
                {theme === 'dark' ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* Language Selection */}
            <div className={styles.langSection}>
              <div className={styles.prefInfo}>
                <div className={styles.langHeader}>
                  <TranslateIcon fontSize="small" />
                  <span className={styles.prefLabel}>{t('language.select')}</span>
                </div>
              </div>
              <div className={styles.selectWrapper}>
                <select
                  className={styles.langSelect}
                  value={currentLocale}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  aria-label={t('language.select')}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeLabel} ({lang.label})
                    </option>
                  ))}
                </select>
                <div className={styles.selectArrow}>
                  <ArrowForwardIosIcon />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.footer}>
          <p className={styles.copyright}>
            © 2026 Sandur Productions
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
