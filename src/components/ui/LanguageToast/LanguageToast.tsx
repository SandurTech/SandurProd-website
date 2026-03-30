import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TranslateIcon from '@mui/icons-material/Translate'
import styles from './LanguageToast.module.scss'

export const LanguageToast = () => {
  const { i18n, t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleLangChange = () => {
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 800)
    }

    i18n.on('languageChanged', handleLangChange)
    return () => {
      i18n.off('languageChanged', handleLangChange)
    }
  }, [i18n])

  if (!isVisible) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.toast}>
        <TranslateIcon className={styles.icon} />
        <span className={styles.text}>{t('language.select')}...</span>
      </div>
    </div>
  )
}
