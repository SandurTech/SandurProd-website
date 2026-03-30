import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en/common.json'
import hi from './locales/hi/common.json'
import kn from './locales/kn/common.json'

const resources = {
  en: { common: en },
  hi: { common: hi },
  kn: { common: kn },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common'],

    interpolation: {
      escapeValue: false, // React already escapes
    },

    detection: {
      // Path first (route-based i18n), then localStorage, then browser
      order: ['path', 'localStorage', 'navigator', 'htmlTag'],
      lookupFromPathIndex: 0, // /:locale/ is the first path segment
      lookupLocalStorage: 'sandurprod-lang',
      caches: ['localStorage'],
    },
  })

export default i18n

// Supported languages for language switcher
export const supportedLanguages = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]['code']
