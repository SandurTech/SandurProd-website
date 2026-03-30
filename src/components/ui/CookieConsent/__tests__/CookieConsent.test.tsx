import { describe, it, expect } from 'vitest'
import { renderWithRouter, fireEvent, screen } from '../../../../test/test-utils'
import { CookieBanner } from '../CookieBanner'
import { CookieModal } from '../CookieModal'
import { CookieConsentProvider, useCookieConsent } from '../../../../context/CookieConsentContext'
import type { ReactNode } from 'react'

const Wrapper = ({ children }: { children: ReactNode }) => (
  <CookieConsentProvider>
    {children}
  </CookieConsentProvider>
)

describe('CookieConsent UI Components', () => {
  describe('CookieBanner', () => {
    it('renders when showBanner is true', async () => {
      renderWithRouter(<CookieBanner />, { wrapper: Wrapper })
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
      expect(screen.getByText('We value your privacy')).toBeInTheDocument()
    })

    it('calls acceptAll when button is clicked', async () => {
      renderWithRouter(<CookieBanner />, { wrapper: Wrapper })
      fireEvent.click(await screen.findByText('Accept All'))
      // Banner should disappear after acceptAll
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('calls rejectAll when button is clicked', async () => {
      renderWithRouter(<CookieBanner />, { wrapper: Wrapper })
      fireEvent.click(await screen.findByText('Reject All'))
      // Banner should disappear after rejectAll
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('CookieModal', () => {
    it('renders when isPreferencesModalOpen is true', async () => {
      const TestTrigger = () => {
        const { openPreferencesModal } = useCookieConsent()
        return <button onClick={openPreferencesModal}>Open</button>
      }

      renderWithRouter(
        <CookieConsentProvider>
          <TestTrigger />
          <CookieModal />
        </CookieConsentProvider>
      )

      fireEvent.click(await screen.findByText('Open'))
      expect(await screen.findByRole('dialog', { name: 'Privacy Preferences' })).toBeInTheDocument()
    })

    it('toggles preferences and saves', async () => {
      const TestTrigger = () => {
        const { openPreferencesModal } = useCookieConsent()
        return <button onClick={openPreferencesModal}>Open</button>
      }

      renderWithRouter(
        <CookieConsentProvider>
          <TestTrigger />
          <CookieModal />
        </CookieConsentProvider>
      )

      fireEvent.click(await screen.findByText('Open'))
      
      const analyticsCheckbox = await screen.findByLabelText('Analytics & Tracking')
      fireEvent.click(analyticsCheckbox)
      
      fireEvent.click(screen.getByText('Save Preferences'))
      
      // Modal should close
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('calls closePreferencesModal on close button click', async () => {
      const TestTrigger = () => {
        const { openPreferencesModal } = useCookieConsent()
        return <button onClick={openPreferencesModal}>Open</button>
      }

      renderWithRouter(
        <CookieConsentProvider>
          <TestTrigger />
          <CookieModal />
        </CookieConsentProvider>
      )

      fireEvent.click(await screen.findByText('Open'))
      fireEvent.click(await screen.findByLabelText('Close'))
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
