import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '../context/ThemeContext'
import i18n from './i18n-test'

/**
 * Custom render that wraps components with all required providers.
 * Use this instead of @testing-library/react's render in all tests.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  function AllProviders({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider defaultPreference="dark">
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render with our custom version
export { renderWithProviders as render }

// Export the test i18n instance for language-switching tests
export { i18n }
