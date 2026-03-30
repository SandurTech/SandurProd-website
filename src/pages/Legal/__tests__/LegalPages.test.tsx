import { describe, it, expect } from 'vitest'
import { renderWithRouter, screen } from '../../../test/test-utils'
import PrivacyPolicyPage from '../PrivacyPolicyPage'
import TermsPage from '../TermsPage'
import GdprPage from '../GdprPage'
import CookiePolicyPage from '../CookiePolicyPage'

describe('Legal Pages', () => {
  it('PrivacyPolicyPage renders with correct title', async () => {
    renderWithRouter(<PrivacyPolicyPage />)
    expect(await screen.findByText('Privacy Policy')).toBeInTheDocument()
  })

  it('TermsPage renders with correct title', async () => {
    renderWithRouter(<TermsPage />)
    expect(await screen.findByText('Terms of Use')).toBeInTheDocument()
  })

  it('GdprPage renders with correct title', async () => {
    renderWithRouter(<GdprPage />)
    expect(await screen.findByText('GDPR Compliance')).toBeInTheDocument()
  })

  it('CookiePolicyPage renders with correct title', async () => {
    renderWithRouter(<CookiePolicyPage />)
    expect(await screen.findByText('Cookie Policy')).toBeInTheDocument()
  })
})
