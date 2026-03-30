/* eslint-disable react-refresh/only-export-components */
import { createRootRoute, Outlet, useNavigate, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/layout/Header/Header'
import Footer from '../components/layout/Footer/Footer'
import { LanguageToast } from '../components/ui/LanguageToast/LanguageToast'

import { CookieConsentProvider } from '../context/CookieConsentContext'
import { CookieBanner } from '../components/ui/CookieConsent/CookieBanner'
import { CookieModal } from '../components/ui/CookieConsent/CookieModal'

// Supported locale codes
const SUPPORTED_LOCALES = ['en', 'hi', 'kn'] as const

import { HeadContent } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  head: (ctx: any) => {
    const BASE_URL = 'https://sandurproductions.vercel.app'
    const location = ctx.location ?? ctx.router?.state?.location ?? (typeof window !== 'undefined' ? window.location : { pathname: '/' })
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    
    const firstSegment = segments[0] as typeof SUPPORTED_LOCALES[number]
    const currentLang = SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : 'en'
    const routePath = segments.length > 1 ? '/' + segments.slice(1).join('/') : '/'

    const canonicalUrl = `${BASE_URL}/${currentLang}${routePath === '/' ? '' : routePath}`
    
    const links: Array<{ rel: string, href: string, hreflang?: string }> = [
      { rel: 'canonical', href: canonicalUrl }
    ]

    const allLangs = [...SUPPORTED_LOCALES, 'x-default'] as const
    allLangs.forEach((lang) => {
      const hrefLang = lang === 'x-default' ? 'en' : lang
      links.push({
        rel: 'alternate',
        hreflang: lang,
        href: `${BASE_URL}/${hrefLang}${routePath === '/' ? '' : routePath}`
      })
    })

    return {
      links,
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://sandurproductions.vercel.app/#organization",
                "name": "Sandur Productions",
                "url": "https://sandurproductions.vercel.app",
                "logo": "https://sandurproductions.vercel.app/favicon.svg",
                "description": "Sandur Productions is an independent student-led production house founded by Amogha Raj Sandur, creating cinematic stories that move, inspire, and provoke thought.",
                "foundingDate": "2026",
                "founder": {
                  "@type": "Person",
                  "name": "Amogha Raj Sandur",
                  "url": "https://www.linkedin.com/in/amogharajsandur/"
                },
                "sameAs": [
                  "https://www.youtube.com/@SandurProductions",
                  "https://www.linkedin.com/company/sandur-productions/",
                  "https://www.instagram.com/sandur_productions/",
                  "https://www.threads.net/@sandur_productions"
                ]
              },
              {
                "@type": "WebSite",
                "@id": "https://sandurproductions.vercel.app/#website",
                "name": "Sandur Productions",
                "url": "https://sandurproductions.vercel.app",
                "publisher": {
                  "@id": "https://sandurproductions.vercel.app/#organization"
                },
                "description": "Official website of Sandur Productions — an independent student-led production house.",
                "inLanguage": ["en", "hi", "kn"]
              }
            ]
          })
        }
      ]
    }
  }
})

function RootLayout() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // Sync i18n language from URL locale param on route change
  useEffect(() => {
    const path = location.pathname
    const segments = path.split('/').filter(Boolean)
    const firstSegment = segments[0]

    // Determine the preferred/active language from i18n settings
    const rawLang = i18n.language || 'en'
    const baseLang = rawLang.split('-')[0]
    const activeLang = SUPPORTED_LOCALES.includes(baseLang as (typeof SUPPORTED_LOCALES)[number]) ? baseLang : 'en'

    if (
      firstSegment &&
      SUPPORTED_LOCALES.includes(firstSegment as (typeof SUPPORTED_LOCALES)[number])
    ) {
      if (activeLang !== firstSegment) {
        // Only trigger this if we explicitly navigated to a URL that has a different language
        i18n.changeLanguage(firstSegment)
      }
    } else {
      // Redirect unprefixed routes keeping the correct prefix
      const restPath = path === '/' ? '' : path
      navigate({ to: `/${activeLang}${restPath}` as string, replace: true })
    }
  }, [i18n, navigate, location.pathname])

  // --------------------------------------------------------------------------
  // Dynamic <html lang>, canonical, and hreflang management
  // --------------------------------------------------------------------------
  useEffect(() => {
    const rawLang = i18n.language || 'en'
    const currentLang = rawLang.split('-')[0]

    // 1. Update <html lang> attribute and class
    document.documentElement.lang = currentLang
    // Remove existing lang- classes
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith('lang-')) document.documentElement.classList.remove(cls)
    })
    document.documentElement.classList.add(`lang-${currentLang}`)

  }, [i18n.language, location.pathname])

  return (
    <CookieConsentProvider>
      <HeadContent />
      <LanguageToast />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <CookieModal />
    </CookieConsentProvider>
  )
}

function NotFound() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  // Redirect unknown routes to home with current locale
  useEffect(() => {
    const rawLang = i18n.language || 'en'
    const baseLang = rawLang.split('-')[0]
    const lang = SUPPORTED_LOCALES.includes(baseLang as (typeof SUPPORTED_LOCALES)[number])
      ? baseLang
      : 'en'
    navigate({ to: `/${lang}/` as string, replace: true })
  }, [i18n, navigate])

  return null
}
