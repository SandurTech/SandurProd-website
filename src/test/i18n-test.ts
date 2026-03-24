import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../locales/en/common.json'
import hi from '../locales/hi/common.json'
import kn from '../locales/kn/common.json'

/**
 * Lightweight i18n instance for tests.
 * Uses the real translation files so tests validate actual content.
 * Disables language detection to default to English deterministically.
 */
i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    hi: { common: hi },
    kn: { common: kn },
  },
  lng: 'en', // Force English in tests by default
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
