import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CookieConsentProvider, useCookieConsent } from '../CookieConsentContext'
import { initAnalytics } from '../../utils/analytics'
import type { ReactNode } from 'react'

// Mock analytics utility
vi.mock('../../utils/analytics', () => ({
  initAnalytics: vi.fn(),
}))

function wrapper({ children }: { children: ReactNode }) {
  return <CookieConsentProvider>{children}</CookieConsentProvider>
}

describe('CookieConsentContext', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('defaults to no consent choice and shows banner', () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })
    
    expect(result.current.hasConsentChoice).toBe(false)
    expect(result.current.showBanner).toBe(true)
    expect(result.current.preferences).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  })

  it('restores preferences from localStorage on init', () => {
    const savedPrefs = { necessary: true, analytics: true, marketing: false }
    localStorage.setItem('sp-cookie-consent', JSON.stringify(savedPrefs))

    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.hasConsentChoice).toBe(true)
    expect(result.current.preferences).toEqual(savedPrefs)
    expect(result.current.showBanner).toBe(false)
    expect(initAnalytics).toHaveBeenCalledWith(savedPrefs)
  })

  it('handles acceptAll correctly', () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.acceptAll()
    })

    const expectedPrefs = { necessary: true, analytics: true, marketing: true }
    expect(result.current.preferences).toEqual(expectedPrefs)
    expect(result.current.hasConsentChoice).toBe(true)
    expect(result.current.showBanner).toBe(false)
    expect(localStorage.getItem('sp-cookie-consent')).toBe(JSON.stringify(expectedPrefs))
    expect(initAnalytics).toHaveBeenCalledWith(expectedPrefs)
  })

  it('handles rejectAll correctly', () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.rejectAll()
    })

    const expectedPrefs = { necessary: true, analytics: false, marketing: false }
    expect(result.current.preferences).toEqual(expectedPrefs)
    expect(result.current.hasConsentChoice).toBe(true)
    expect(result.current.showBanner).toBe(false)
    expect(localStorage.getItem('sp-cookie-consent')).toBe(JSON.stringify(expectedPrefs))
    expect(initAnalytics).toHaveBeenCalledWith(expectedPrefs)
  })

  it('handles savePreferences correctly', () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    act(() => {
      result.current.savePreferences({ analytics: true })
    })

    const expectedPrefs = { necessary: true, analytics: true, marketing: false }
    expect(result.current.preferences).toEqual(expectedPrefs)
    expect(result.current.isPreferencesModalOpen).toBe(false)
    expect(initAnalytics).toHaveBeenCalledWith(expectedPrefs)
  })

  it('manages preferences modal state', () => {
    const { result } = renderHook(() => useCookieConsent(), { wrapper })

    expect(result.current.isPreferencesModalOpen).toBe(false)

    act(() => {
      result.current.openPreferencesModal()
    })
    expect(result.current.isPreferencesModalOpen).toBe(true)

    act(() => {
      result.current.closePreferencesModal()
    })
    expect(result.current.isPreferencesModalOpen).toBe(false)
  })

  it('throws when used outside Provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useCookieConsent())
    }).toThrow('useCookieConsent must be used within a CookieConsentProvider')
    
    spy.mockRestore()
  })
})
