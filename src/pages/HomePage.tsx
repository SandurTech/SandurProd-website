import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <>
      {/* Header / Navigation will be added here */}

      <main id="main-content">
        {/* Hero Section */}
        <section id="hero" className="section" aria-label={t('hero.title')}>
          <div className="container">
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>
          </div>
        </section>

        {/* Works / Portfolio Section */}
        <section id="works" className="section" aria-label={t('works.heading')}>
          <div className="container">
            <h2>{t('works.heading')}</h2>
            {/* THE SCAM & UTTARA cards will go here */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section" aria-label={t('about.heading')}>
          <div className="container">
            <h2>{t('about.heading')}</h2>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section" aria-label={t('contact.heading')}>
          <div className="container">
            <h2>{t('contact.heading')}</h2>
          </div>
        </section>
      </main>

      {/* Footer will be added here */}
    </>
  )
}

export default HomePage
