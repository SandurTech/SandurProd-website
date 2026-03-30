import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { useCookieConsent } from '../../../context/CookieConsentContext'
import CloseIcon from '@mui/icons-material/Close'
import styles from './CookieModal.module.scss'

import { TFunction } from 'i18next'
import { CookiePreferences } from '../../../context/CookieConsentContext'

/**
 * Inner component to handle local preference state.
 * This avoids the cascading render warning by initializing state from props on mount.
 */
const CookieModalContent = ({ 
  preferences, 
  onSave, 
  onClose,
  localePath,
  t 
}: { 
  preferences: CookiePreferences, 
  onSave: (prefs: CookiePreferences) => void, 
  onClose: () => void,
  localePath: (path: string) => string,
  t: TFunction
}) => {
  const [localPrefs, setLocalPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
  })

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-labelledby="cookie-modal-title"
      aria-modal="true"
    >
      <div className={styles.header}>
        <h2 id="cookie-modal-title" className={styles.title}>
          {t('cookie.preferencesTitle', 'Privacy Preferences')}
        </h2>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={t('common.close', 'Close')}
          type="button"
        >
          <CloseIcon />
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          {t(
            'cookie.preferencesDesc',
            'Review and manage your privacy settings below. You can change your preferences at any time.'
          )}
        </p>

        <div className={styles.preferenceGroup}>
          <div className={styles.prefHeader}>
            <div className={styles.prefTitleBlock}>
              <h3>{t('cookie.strictTitle', 'Strictly Necessary')}</h3>
              <span className={styles.badge}>{t('cookie.alwaysActive', 'Always Active')}</span>
            </div>
          </div>
          <p className={styles.prefDesc}>
            {t(
              'cookie.strictDesc',
              'These cookies are essential for the website to function properly. They cannot be disabled.'
            )}
          </p>
        </div>

        <div className={styles.preferenceGroup}>
          <div className={styles.prefHeader}>
            <div className={styles.prefTitleBlock}>
              <h3>{t('cookie.analyticsTitle', 'Analytics & Tracking')}</h3>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={localPrefs.analytics}
                onChange={(e) => setLocalPrefs({ ...localPrefs, analytics: e.target.checked })}
                aria-label={t('cookie.analyticsTitle', 'Analytics')}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <p className={styles.prefDesc}>
            {t(
              'cookie.analyticsDesc',
              'These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously (e.g., Google Analytics, Clarity).'
            )}
          </p>
        </div>

        <div className={styles.preferenceGroup}>
          <div className={styles.prefHeader}>
            <div className={styles.prefTitleBlock}>
              <h3>{t('cookie.marketingTitle', 'Marketing')}</h3>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={localPrefs.marketing}
                onChange={(e) => setLocalPrefs({ ...localPrefs, marketing: e.target.checked })}
                aria-label={t('cookie.marketingTitle', 'Marketing')}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <p className={styles.prefDesc}>
            {t(
              'cookie.marketingDesc',
              'These cookies are used to track visitors across websites to allow publishers to display relevant advertisements.'
            )}
          </p>
        </div>

        <div className={styles.links}>
          <Link to={localePath('/cookie-policy')} className={styles.learnMore} onClick={onClose}>
            {t('cookie.learnMore', 'Learn more in our Cookie Policy')}
          </Link>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.btnSave} onClick={() => onSave(localPrefs)} type="button">
          {t('cookie.savePreferences', 'Save Preferences')}
        </button>
      </div>
    </div>
  )
}

export const CookieModal = () => {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language || 'en'
  const localePath = (path: string) => `/${currentLocale}${path}`

  const {
    isPreferencesModalOpen,
    closePreferencesModal,
    preferences,
    savePreferences,
  } = useCookieConsent()

  // Manage body scroll lock
  useEffect(() => {
    if (isPreferencesModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isPreferencesModalOpen])

  if (!isPreferencesModalOpen) return null

  return (
    <div className={styles.overlay}>
      <CookieModalContent 
        preferences={preferences}
        onSave={savePreferences}
        onClose={closePreferencesModal}
        localePath={localePath}
        t={t}
      />
    </div>
  )
}
