import { describe, it, expect } from 'vitest'
import { supportedLanguages } from '../i18n'
import type { SupportedLanguage } from '../i18n'

describe('i18n Exports', () => {
  it('exports supportedLanguages array', () => {
    expect(supportedLanguages).toBeDefined()
    expect(Array.isArray(supportedLanguages)).toBe(true)
  })

  it('has exactly 3 supported languages', () => {
    expect(supportedLanguages).toHaveLength(3)
  })

  it('includes English, Hindi, and Kannada', () => {
    const codes = supportedLanguages.map((lang: { code: string }) => lang.code)
    expect(codes).toContain('en')
    expect(codes).toContain('hi')
    expect(codes).toContain('kn')
  })

  it('each language has code, label, and nativeLabel', () => {
    for (const lang of supportedLanguages) {
      expect(lang.code).toBeTruthy()
      expect(lang.label).toBeTruthy()
      expect(lang.nativeLabel).toBeTruthy()
    }
  })

  it('nativeLabel is in the correct script', () => {
    const en = supportedLanguages.find((l: { code: string }) => l.code === 'en')!
    const hi = supportedLanguages.find((l: { code: string }) => l.code === 'hi')!
    const kn = supportedLanguages.find((l: { code: string }) => l.code === 'kn')!

    expect(en.nativeLabel).toBe('English')
    expect(hi.nativeLabel).toBe('हिन्दी')
    expect(kn.nativeLabel).toBe('ಕನ್ನಡ')
  })

  it('SupportedLanguage type matches codes', () => {
    const validLangs: SupportedLanguage[] = ['en', 'hi', 'kn']
    expect(validLangs).toHaveLength(3)
  })
})
