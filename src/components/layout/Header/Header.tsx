import { useState, useCallback, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../../context/ThemeContext'
import { supportedLanguages } from '../../../i18n'
import { searchProjects } from '../../../data/projects'
import { FaTimes } from 'react-icons/fa'

// MUI Icons
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate'

import logoSvg from '../../../assets/images/SVG-SandurProductions_Logo.svg'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Header.module.scss'

const Header = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // State
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProjects>>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Refs
  const searchInputRef = useRef<HTMLInputElement>(null)
  const langDropdownRef = useRef<HTMLDivElement>(null)

  // Current locale from URL
  const currentLocale = i18n.language || 'en'

  // --------------------------------------------------------------------------
  // Scroll detection for sticky header background
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // --------------------------------------------------------------------------
  // Close language dropdown on outside click
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // --------------------------------------------------------------------------
  // Close menus on route change
  // --------------------------------------------------------------------------
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
    setSearchQuery('')
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [location.pathname])

  // --------------------------------------------------------------------------
  // Search
  // --------------------------------------------------------------------------
  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => {
      if (!prev) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
      return !prev
    })
    setSearchQuery('')
    setSearchResults([])
  }, [])

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value || ''
      setSearchQuery(query)
      if (query.trim().length > 0) {
        setSearchResults(searchProjects(query, t))
      } else {
        setSearchResults([])
      }
    },
    [t],
  )

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    },
    [],
  )

  // --------------------------------------------------------------------------
  // Language switching with URL update
  // --------------------------------------------------------------------------
  const handleLanguageChange = useCallback(
    (langCode: string) => {
      i18n.changeLanguage(langCode)
      // Update URL locale prefix
      const pathParts = location.pathname.split('/').filter(Boolean)
      // Remove current locale from path
      const supportedCodes = supportedLanguages.map((l) => l.code)
      if (pathParts.length > 0 && (supportedCodes as string[]).includes(pathParts[0])) {
        pathParts.shift()
      }
      const newPath = `/${langCode}/${pathParts.join('/')}`
      navigate({ to: newPath as string })
      setIsLangDropdownOpen(false)
    },
    [i18n, location.pathname, navigate],
  )

  // --------------------------------------------------------------------------
  // Navigation helper — get locale-prefixed path
  // --------------------------------------------------------------------------
  const localePath = (path: string) => `/${currentLocale}${path}`

  // Check if a route is active
  const isActive = (path: string) => {
    const currentPath = location.pathname
    const target = localePath(path)
    if (path === '/') {
      // Home is active if the path is exactly /:locale or /:locale/
      return currentPath === `/${currentLocale}` || currentPath === `/${currentLocale}/`
    }
    return currentPath.startsWith(target)
  }

  // --------------------------------------------------------------------------
  // Nav links config
  // --------------------------------------------------------------------------
  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/about', label: t('nav.about') },
  ]

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={styles.container}>
        {/* Logo */}
        <Link
          to={localePath('/')}
          className={styles.logo}
          aria-label={`${t('brand')} — ${t('nav.home')}`}
        >
          <img
            src={logoSvg}
            alt={`${t('brand')} Logo`}
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <span className={styles.logoText}>{t('brand').toUpperCase()}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={styles.desktopNav}
          aria-label="Main navigation"
        >
          <ul className={styles.navList} role="list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={localePath(link.path)}
                  className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search Toggle */}
          <button
            className={styles.actionBtn}
            onClick={handleSearchToggle}
            aria-label={isSearchOpen ? t('nav.closeSearch') : t('nav.search')}
            aria-expanded={isSearchOpen}
            type="button"
          >
            {isSearchOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <SearchIcon fontSize="small" />
            )}
          </button>

          {/* Desktop Only Actions */}
          <div className={styles.desktopActions}>
            {/* Theme Toggle */}
            <button
              className={styles.actionBtn}
              onClick={toggle}
              aria-label={
                theme === 'dark'
                  ? t('theme.switchToLight')
                  : t('theme.switchToDark')
              }
              type="button"
            >
              {theme === 'dark' ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
            </button>

            {/* Language Switcher */}
            <div className={styles.langWrapper} ref={langDropdownRef}>
              <button
                className={styles.actionBtn}
                onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                aria-label={t('language.select')}
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="listbox"
                type="button"
              >
                <TranslateIcon fontSize="small" />
                <span className={styles.langCode}>
                  {currentLocale.toUpperCase()}
                </span>
              </button>

              {isLangDropdownOpen && (
                <ul
                  className={styles.langDropdown}
                  role="listbox"
                  aria-label={t('language.select')}
                >
                  {supportedLanguages.map((lang) => (
                    <li key={lang.code} role="option" aria-selected={currentLocale === lang.code}>
                      <button
                        className={`${styles.langOption} ${
                          currentLocale === lang.code ? styles.langActive : ''
                        }`}
                        onClick={() => handleLanguageChange(lang.code)}
                        type="button"
                      >
                        <span className={styles.langNative}>{lang.nativeLabel}</span>
                        <span className={styles.langLabel}>{lang.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.actionBtn} ${styles.mobileMenuBtn}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t('nav.openMenu')}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <MenuIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Search Overlay is placed directly under the container for relative positioning if needed */}
      {isSearchOpen && (
        <div className={styles.searchOverlay} role="search" aria-label={t('nav.search')}>
          <div className={styles.searchContainer}>
            <SearchIcon className={styles.searchIcon} />
            <input
              ref={searchInputRef}
              type="search"
              className={styles.searchInput}
              placeholder={t('nav.searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              aria-label={t('nav.searchPlaceholder')}
            />
              {searchQuery && (
                <button
                  className={styles.searchClear}
                  onClick={() => handleSearchChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                  type="button"
                >
                  <FaTimes />
                </button>
              )}
          </div>

          {/* Search Results */}
          {searchQuery && searchQuery.trim().length > 0 && (
            <div className={styles.searchResults} role="status" aria-live="polite">
              {searchResults.length > 0 ? (
                <ul className={styles.resultsList}>
                  {searchResults.map((project) => (
                    <li key={project.id}>
                      <Link
                        to={localePath('/projects')}
                        className={styles.resultItem}
                        onClick={() => {
                          setIsSearchOpen(false)
                          setSearchQuery('')
                        }}
                      >
                        <span className={styles.resultTitle}>{t(project.titleKey)}</span>
                        <span className={styles.resultGenre}>{t(project.genreKey)}</span>
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
      )}
      </header>

      {/* Sidebar - Mobile/Tablet Navigation & Preferences */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        currentLocale={currentLocale}
        localePath={localePath}
        isActive={isActive}
        onLanguageChange={handleLanguageChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchResults={searchResults}
        onResultClick={() => {
          setIsMobileMenuOpen(false)
          setSearchQuery('')
        }}
      />
    </>
  )
}

export default Header
