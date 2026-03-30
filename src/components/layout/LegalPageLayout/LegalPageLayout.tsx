import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ConstructionIcon from '@mui/icons-material/Construction'
import styles from './LegalPageLayout.module.scss'

interface LegalPageLayoutProps {
  titleKey: string
}

export const LegalPageLayout = ({ titleKey }: LegalPageLayoutProps) => {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language || 'en'
  const localePath = (path: string) => `/${currentLocale}${path}`

  return (
    <div className={styles.legalLayout}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to={localePath('/')} className={styles.backLink}>
            <ArrowBackIcon fontSize="small" />
            {t('nav.home', 'Home')}
          </Link>
          <h1 className={styles.title}>{t(titleKey)}</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.developmentState}>
            <ConstructionIcon className={styles.icon} />
            <p className={styles.statusText}>{t('legal.status')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
