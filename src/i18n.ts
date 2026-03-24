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
      // localStorage first, then browser language, then HTML lang attribute
      // Route-based detection will be added when react-router is installed
      order: ['localStorage', 'navigator', 'htmlTag'],
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
