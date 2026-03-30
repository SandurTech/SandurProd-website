/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { initAnalytics } from '../utils/analytics'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentContextType {
  hasConsentChoice: boolean
  preferences: CookiePreferences
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (prefs: Partial<CookiePreferences>) => void
  showBanner: boolean
  openPreferencesModal: () => void
  closePreferencesModal: () => void
  isPreferencesModalOpen: boolean
}

const STORAGE_KEY = 'sp-cookie-consent'

const defaultPreferences: CookiePreferences = {
  necessary: true,   // Always required
  analytics: false,  // Default explicitly false
  marketing: false,  // Default explicitly false
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

// Helper to get initial state from localStorage safely
const getInitialPreferences = (): CookiePreferences => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  if (stored) {
    try {
      return JSON.parse(stored) as CookiePreferences
    } catch {
      return defaultPreferences
    }
  }
  return defaultPreferences
}

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(getInitialPreferences)
  
  const [hasConsentChoice, setHasConsentChoice] = useState(() => {
    return typeof window !== 'undefined' ? !!localStorage.getItem(STORAGE_KEY) : false
  })

  const [showBanner, setShowBanner] = useState(() => {
    return typeof window !== 'undefined' ? !localStorage.getItem(STORAGE_KEY) : false
  })

  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false)

  // Sync analytics on mount if consent already exists
  useEffect(() => {
    if (hasConsentChoice) {
      initAnalytics(preferences)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const persistAndApply = (prefs: CookiePreferences) => {
    setPreferences(prefs)
    setHasConsentChoice(true)
    setShowBanner(false)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    initAnalytics(prefs)
  }

  const acceptAll = () => {
    persistAndApply({
      necessary: true,
      analytics: true,
      marketing: true,
    })
  }

  const rejectAll = () => {
    persistAndApply({
      necessary: true,
      analytics: false,
      marketing: false,
    })
  }

  const savePreferences = (prefs: Partial<CookiePreferences>) => {
    persistAndApply({
      ...preferences,
      ...prefs,
      necessary: true, // enforce necessary
    })
    setIsPreferencesModalOpen(false)
  }

  const openPreferencesModal = () => setIsPreferencesModalOpen(true)
  const closePreferencesModal = () => setIsPreferencesModalOpen(false)

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsentChoice,
        preferences,
        acceptAll,
        rejectAll,
        savePreferences,
        showBanner,
        openPreferencesModal,
        closePreferencesModal,
        isPreferencesModalOpen
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
