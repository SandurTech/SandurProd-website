import { useTranslation } from 'react-i18next'
import { useCookieConsent } from '../../../context/CookieConsentContext'
import styles from './CookieBanner.module.scss'

export const CookieBanner = () => {
  const { t } = useTranslation()
  const { showBanner, acceptAll, rejectAll, openPreferencesModal } = useCookieConsent()

  if (!showBanner) return null

  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.bannerContainer} role="dialog" aria-labelledby="cookie-banner-title">
        <div className={styles.content}>
          <h2 id="cookie-banner-title" className={styles.title}>
            {t('cookie.bannerTitle', 'We value your privacy')}
          </h2>
          <p className={styles.text}>
            {t(
              'cookie.bannerText',
              'We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'
            )}
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.btnCustomize} onClick={openPreferencesModal} type="button">
            {t('cookie.customize', 'Customize')}
          </button>
          <button className={styles.btnReject} onClick={rejectAll} type="button">
            {t('cookie.rejectAll', 'Reject All')}
          </button>
          <button className={styles.btnAccept} onClick={acceptAll} type="button">
            {t('cookie.acceptAll', 'Accept All')}
          </button>
        </div>
      </div>
    </div>
  )
}
