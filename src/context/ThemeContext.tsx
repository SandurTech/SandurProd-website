/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Theme = 'dark' | 'light'
export type ThemePreference = Theme | 'system'

interface ThemeContextValue {
  /** Current resolved theme (always 'dark' or 'light') */
  theme: Theme
  /** User's preference ('dark', 'light', or 'system') */
  preference: ThemePreference
  /** Set theme preference */
  setPreference: (pref: ThemePreference) => void
  /** Toggle between dark and light */
  toggle: () => void
  /** Whether current theme matches system preference */
  isSystem: boolean
}

const STORAGE_KEY = 'sandurprod-theme'

// ---------------------------------------------------------------------------
// System theme detection
// ---------------------------------------------------------------------------

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}


function getStoredPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light' || stored === 'system')
    return stored
  return 'dark'
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode
  /** Override initial preference (useful for testing) */
  defaultPreference?: ThemePreference
}

export function ThemeProvider({
  children,
  defaultPreference,
}: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    () => defaultPreference ?? getStoredPreference()
  )
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme)

  // Resolved theme: 'dark' or 'light'
  const theme = useMemo(
    () => (preference === 'system' ? systemTheme : preference),
    [preference, systemTheme]
  )

  // Apply data-theme attribute & color-scheme to <html>
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
  }, [theme])

  // Persist preference to localStorage
  const setPreference = useCallback((pref: ThemePreference) => {
    setPreferenceState(pref)
    localStorage.setItem(STORAGE_KEY, pref)
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'light' : 'dark')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Toggle convenience
  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark')
  }, [theme, setPreference])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      preference,
      setPreference,
      toggle,
      isSystem: preference === 'system',
    }),
    [theme, preference, setPreference, toggle]
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current theme context.
 * Must be used within a <ThemeProvider>.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return context
}
