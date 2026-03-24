import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'
import type { ThemePreference } from '../../context/ThemeContext'
import type { ReactNode } from 'react'

// wrapper for renderHook
function wrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

function wrapperWithDefault(defaultPreference: ThemePreference) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider defaultPreference={defaultPreference}>
        {children}
      </ThemeProvider>
    )
  }
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.style.colorScheme = ''
  })

  // ---------------------------------------------------------------------------
  // Default behavior
  // ---------------------------------------------------------------------------

  describe('defaults', () => {
    it('defaults to dark theme when no localStorage value', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('dark')
      expect(result.current.preference).toBe('dark')
    })

    it('applies data-theme attribute to <html>', () => {
      renderHook(() => useTheme(), { wrapper })
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('sets color-scheme on <html>', () => {
      renderHook(() => useTheme(), { wrapper })
      expect(document.documentElement.style.colorScheme).toBe('dark')
    })
  })

  // ---------------------------------------------------------------------------
  // Theme switching
  // ---------------------------------------------------------------------------

  describe('switching', () => {
    it('switches to light via setPreference', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => {
        result.current.setPreference('light')
      })

      expect(result.current.theme).toBe('light')
      expect(result.current.preference).toBe('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('toggles between dark and light', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('dark')

      act(() => result.current.toggle())
      expect(result.current.theme).toBe('light')

      act(() => result.current.toggle())
      expect(result.current.theme).toBe('dark')
    })

    it('switches to system preference', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => {
        result.current.setPreference('system')
      })

      expect(result.current.preference).toBe('system')
      expect(result.current.isSystem).toBe(true)
      // theme should be 'dark' or 'light' based on system
      expect(['dark', 'light']).toContain(result.current.theme)
    })
  })

  // ---------------------------------------------------------------------------
  // Persistence
  // ---------------------------------------------------------------------------

  describe('persistence', () => {
    it('saves preference to localStorage', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => {
        result.current.setPreference('light')
      })

      expect(localStorage.getItem('sandurprod-theme')).toBe('light')
    })

    it('restores preference from localStorage', () => {
      localStorage.setItem('sandurprod-theme', 'light')

      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.theme).toBe('light')
      expect(result.current.preference).toBe('light')
    })

    it('toggles and persists correctly', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })

      act(() => result.current.toggle())
      expect(localStorage.getItem('sandurprod-theme')).toBe('light')

      act(() => result.current.toggle())
      expect(localStorage.getItem('sandurprod-theme')).toBe('dark')
    })
  })

  // ---------------------------------------------------------------------------
  // defaultPreference override
  // ---------------------------------------------------------------------------

  describe('defaultPreference prop', () => {
    it('overrides stored preference when provided', () => {
      localStorage.setItem('sandurprod-theme', 'dark')

      const { result } = renderHook(() => useTheme(), {
        wrapper: wrapperWithDefault('light'),
      })

      expect(result.current.theme).toBe('light')
    })
  })

  // ---------------------------------------------------------------------------
  // isSystem flag
  // ---------------------------------------------------------------------------

  describe('isSystem', () => {
    it('returns false for explicit dark/light', () => {
      const { result } = renderHook(() => useTheme(), { wrapper })
      expect(result.current.isSystem).toBe(false)
    })

    it('returns true when preference is system', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: wrapperWithDefault('system'),
      })
      expect(result.current.isSystem).toBe(true)
    })
  })

  // ---------------------------------------------------------------------------
  // Error boundary
  // ---------------------------------------------------------------------------

  it('throws when useTheme is used outside ThemeProvider', () => {
    // Suppress console.error for expected error
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within a <ThemeProvider>')

    spy.mockRestore()
  })
})
