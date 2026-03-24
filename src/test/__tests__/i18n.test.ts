import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import i18n from '../i18n-test'

// Translation key samples from English
const englishKeys = {
  'hero.title': 'Sandur Productions',
  'hero.subtitle': 'Crafting cinematic stories that move, inspire, and provoke thought.',
  'nav.works': 'Works',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'works.heading': 'Our Works',
  'works.theScam.title': 'THE SCAM',
  'works.uttara.title': 'UTTARA',
  'about.heading': 'About',
  'contact.heading': 'Get in Touch',
  'footer.madeWith': 'Made with passion',
  'footer.social.youtube': 'YouTube',
  'footer.social.linkedin': 'LinkedIn',
  'footer.social.instagram': 'Instagram',
  'footer.social.threads': 'Threads',
}

const hindiKeys: Record<string, string> = {
  'hero.title': 'सांदुर प्रोडक्शंस',
  'nav.works': 'कार्य',
  'nav.about': 'हमारे बारे में',
  'works.heading': 'हमारे कार्य',
  'about.heading': 'हमारे बारे में',
  'contact.heading': 'संपर्क करें',
  'footer.social.youtube': 'यूट्यूब',
}

const kannadaKeys: Record<string, string> = {
  'hero.title': 'ಸಂದೂರ ಪ್ರೊಡಕ್ಷನ್ಸ್',
  'nav.works': 'ಕೆಲಸಗಳು',
  'nav.about': 'ನಮ್ಮ ಬಗ್ಗೆ',
  'works.heading': 'ನಮ್ಮ ಕೆಲಸಗಳು',
  'about.heading': 'ನಮ್ಮ ಬಗ್ಗೆ',
  'contact.heading': 'ಸಂಪರ್ಕಿಸಿ',
  'footer.social.youtube': 'ಯೂಟ್ಯೂಬ್',
}

describe('i18n Configuration', () => {
  beforeEach(async () => {
    await act(async () => {
      await i18n.changeLanguage('en')
    })
  })

  // ---------------------------------------------------------------------------
  // Initialization
  // ---------------------------------------------------------------------------

  it('initializes with English as default language', () => {
    expect(i18n.language).toBe('en')
  })

  it('has all three languages loaded', () => {
    expect(i18n.hasResourceBundle('en', 'common')).toBe(true)
    expect(i18n.hasResourceBundle('hi', 'common')).toBe(true)
    expect(i18n.hasResourceBundle('kn', 'common')).toBe(true)
  })

  it('uses "common" as default namespace', () => {
    expect(i18n.options.defaultNS).toBe('common')
  })

  it('has English as fallback language', () => {
    expect(i18n.options.fallbackLng).toEqual(['en'])
  })

  // ---------------------------------------------------------------------------
  // English Translations
  // ---------------------------------------------------------------------------

  describe('English translations', () => {
    for (const [key, expected] of Object.entries(englishKeys)) {
      it(`t('${key}') = "${expected}"`, () => {
        expect(i18n.t(key)).toBe(expected)
      })
    }

    it('interpolates footer copyright with year', () => {
      const result = i18n.t('footer.copyright', { year: 2026 })
      expect(result).toBe('© 2026 Sandur Productions. All rights reserved.')
    })
  })

  // ---------------------------------------------------------------------------
  // Hindi Translations
  // ---------------------------------------------------------------------------

  describe('Hindi translations', () => {
    beforeEach(async () => {
      await act(async () => {
        await i18n.changeLanguage('hi')
      })
    })

    for (const [key, expected] of Object.entries(hindiKeys)) {
      it(`t('${key}') = "${expected}"`, () => {
        expect(i18n.t(key)).toBe(expected)
      })
    }
  })

  // ---------------------------------------------------------------------------
  // Kannada Translations
  // ---------------------------------------------------------------------------

  describe('Kannada translations', () => {
    beforeEach(async () => {
      await act(async () => {
        await i18n.changeLanguage('kn')
      })
    })

    for (const [key, expected] of Object.entries(kannadaKeys)) {
      it(`t('${key}') = "${expected}"`, () => {
        expect(i18n.t(key)).toBe(expected)
      })
    }
  })

  // ---------------------------------------------------------------------------
  // Language Switching
  // ---------------------------------------------------------------------------

  describe('Language switching', () => {
    it('switches from English to Hindi', async () => {
      expect(i18n.t('hero.title')).toBe('Sandur Productions')
      await act(async () => {
        await i18n.changeLanguage('hi')
      })
      expect(i18n.t('hero.title')).toBe('सांदुर प्रोडक्शंस')
    })

    it('switches from English to Kannada', async () => {
      expect(i18n.t('hero.title')).toBe('Sandur Productions')
      await act(async () => {
        await i18n.changeLanguage('kn')
      })
      expect(i18n.t('hero.title')).toBe('ಸಂದೂರ ಪ್ರೊಡಕ್ಷನ್ಸ್')
    })

    it('falls back to English for missing keys in Hindi', async () => {
      await act(async () => {
        await i18n.changeLanguage('hi')
      })
      // THE SCAM title is the same in all languages (brand name)
      expect(i18n.t('works.theScam.title')).toBe('THE SCAM')
    })
  })

  // ---------------------------------------------------------------------------
  // Translation Completeness
  // ---------------------------------------------------------------------------

  describe('Translation completeness', () => {
    it('all English keys exist and are non-empty strings', () => {
      for (const key of Object.keys(englishKeys)) {
        const value = i18n.t(key, { lng: 'en' })
        expect(value).toBeTruthy()
        expect(typeof value).toBe('string')
        expect(value).not.toBe(key) // Should not return the key itself
      }
    })

    it('Hindi has translations for critical navigation keys', () => {
      const criticalKeys = ['nav.works', 'nav.about', 'nav.contact', 'hero.title']
      for (const key of criticalKeys) {
        const value = i18n.t(key, { lng: 'hi' })
        expect(value).toBeTruthy()
        expect(value).not.toBe(i18n.t(key, { lng: 'en' })) // Should differ from English
      }
    })

    it('Kannada has translations for critical navigation keys', () => {
      const criticalKeys = ['nav.works', 'nav.about', 'nav.contact', 'hero.title']
      for (const key of criticalKeys) {
        const value = i18n.t(key, { lng: 'kn' })
        expect(value).toBeTruthy()
        expect(value).not.toBe(i18n.t(key, { lng: 'en' })) // Should differ from English
      }
    })
  })
})
