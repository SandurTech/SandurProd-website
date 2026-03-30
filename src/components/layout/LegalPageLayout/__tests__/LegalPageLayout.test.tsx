import { describe, it, expect } from 'vitest'
import { renderWithRouter, screen } from '../../../../test/test-utils'
import { LegalPageLayout } from '../LegalPageLayout'

describe('LegalPageLayout', () => {
  it('renders correctly with given title key', async () => {
    renderWithRouter(<LegalPageLayout titleKey="legal.privacy" />)
    
    expect(await screen.findByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('In development & refinement')).toBeInTheDocument()
  })

  it('renders back link to home', async () => {
    renderWithRouter(<LegalPageLayout titleKey="legal.privacy" />)
    
    const backLink = await screen.findByText('Home')
    expect(backLink.closest('a')).toHaveAttribute('href', expect.stringMatching(/\//))
  })
})
