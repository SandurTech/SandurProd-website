import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditNoteIcon from '@mui/icons-material/EditNote'
import styles from './BlogPage.module.scss'

export const BlogPage = () => {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language || 'en'
  const localePath = (path: string) => `/${currentLocale}${path}`

  return (
    <div className={styles.blogLayout}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link to={localePath('/')} className={styles.backLink}>
            <ArrowBackIcon fontSize="small" />
            {t('nav.home', 'Home')}
          </Link>
          <h1 className={styles.title}>{t('nav.blog', 'Blog')}</h1>
          <p className={styles.subtitle}>
            {t('blog.subtitle', 'Stories, behind the scenes, and updates from Sandur Productions.')}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.developmentState}>
            <div className={styles.iconWrapper}>
              <EditNoteIcon className={styles.icon} />
            </div>
            <p className={styles.statusText}>{t('blog.comingSoon', 'In development, coming soon.')}</p>
            <p className={styles.statusSubtext}>
              {t('blog.comingSoonSubtext', 'We are currently crafting stories and behind-the-scenes content to share with you. Stay tuned!')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
