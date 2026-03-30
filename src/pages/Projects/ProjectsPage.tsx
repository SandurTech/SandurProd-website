import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { projects, type ProjectCategory, type Project } from '../../data/projects'

import styles from './ProjectsPage.module.scss'

type FilterType = 'all' | ProjectCategory

const filterOptions: { key: FilterType; labelKey: string }[] = [
  { key: 'all', labelKey: 'projects.filterAll' },
  { key: 'web-series', labelKey: 'projects.filterWebSeries' },
  { key: 'short-film', labelKey: 'projects.filterShortFilm' },
  { key: 'documentary', labelKey: 'projects.filterDocumentary' },
]

const statusLabelKeys: Record<string, string> = {
  released: 'projects.statusReleased',
  'in-production': 'projects.statusInProduction',
  upcoming: 'projects.statusUpcoming',
}

const ProjectsPage = () => {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p: Project) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <article className={styles.projectsPage}>
      {/* Hero */}
      <section className={styles.hero} aria-label={t('projects.heading')}>
        <div className={styles.heroContent}>
          <h1 className={styles.heading}>{t('projects.heading')}</h1>
        </div>
      </section>

      {/* Filters */}
      <section className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filterBar} role="tablist" aria-label="Filter projects">
            {filterOptions.map((filter) => (
              <button
                key={filter.key}
                className={`${styles.filterBtn} ${
                  activeFilter === filter.key ? styles.filterActive : ''
                }`}
                onClick={() => setActiveFilter(filter.key)}
                role="tab"
                aria-selected={activeFilter === filter.key}
                type="button"
              >
                {t(filter.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className={styles.gridSection} aria-live="polite">
        <div className={styles.container}>
          {filteredProjects.length > 0 ? (
            <div className={styles.projectGrid}>
              {filteredProjects.map((project: Project) => (
                <article
                  key={project.id}
                  className={styles.projectCard}
                  aria-label={t(project.titleKey)}
                >
                  {/* Thumbnail placeholder */}
                  <div className={styles.cardThumbnail}>
                    <div className={styles.thumbnailPlaceholder}>
                      <span className={styles.thumbnailLetter}>
                        {t(project.titleKey).charAt(0)}
                      </span>
                    </div>
                    {/* Status badge */}
                    <span
                      className={`${styles.statusBadge} ${
                        styles[`status-${project.status}`] || ''
                      }`}
                    >
                      {t(statusLabelKeys[project.status] || project.status)}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{t(project.titleKey)}</h2>
                    <span className={styles.cardGenre}>{t(project.genreKey)}</span>
                    <p className={styles.cardDesc}>{t(project.descKey)}</p>

                    {/* Meta */}
                    <div className={styles.cardMeta}>
                      <span className={styles.cardYear}>{project.year}</span>
                      {project.links?.youtube && (
                        <a
                          href={project.links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.cardLink}
                          aria-label={`Watch ${t(project.titleKey)} on YouTube`}
                        >
                          {t('projects.viewProject')} →
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>{t('projects.noResults')}</p>
          )}
        </div>
      </section>
    </article>
  )
}

export default ProjectsPage
