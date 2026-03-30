/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { ThemeProvider } from '../context/ThemeContext'
import { CookieConsentProvider } from '../context/CookieConsentContext'
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  createMemoryHistory,
} from '@tanstack/react-router'
import i18n from './i18n-test'

/**
 * Create a minimal test router that wraps content with providers.
 */
function createTestRouter(ui: ReactElement) {
  const rootRoute = createRootRoute({
    component: () => (
      <ThemeProvider defaultPreference="dark">
        <CookieConsentProvider>
          <I18nextProvider i18n={i18n}>
            <main id="main-content">
              <Outlet />
            </main>
          </I18nextProvider>
        </CookieConsentProvider>
      </ThemeProvider>
    ),
  })

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => ui,
  })

  const routeTree = rootRoute.addChildren([indexRoute])

  return createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: ['/'],
    }),
  })
}

/**
 * Custom render that wraps components with all required providers.
 * Use this instead of @testing-library/react's render in all tests.
 */
function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  // For simple component tests, wrap with providers directly
  function AllProviders({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider defaultPreference="dark">
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ThemeProvider>
    )
  }

  return render(ui, { wrapper: AllProviders, ...options })
}

/**
 * Render with a full router context (for components that use TanStack Router hooks).
 */
function renderWithRouter(
  ui: ReactElement,
  options?: RenderOptions,
) {
  const router = createTestRouter(ui)
  return render(<RouterProvider router={router} />, options)
}

// Re-export everything from testing-library
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

// Override render with our custom version
export { renderWithProviders as render, renderWithRouter }

// Export the test i18n instance for language-switching tests
export { i18n }
