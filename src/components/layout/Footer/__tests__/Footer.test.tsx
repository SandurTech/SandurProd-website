import { describe, it, expect } from 'vitest'
import { renderWithRouter, screen, within } from '../../../../test/test-utils'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders correctly with logo and tagline', async () => {
    renderWithRouter(<Footer />)
    
    expect(await screen.findByLabelText(/Sandur Productions — Home/i)).toBeInTheDocument()
    // Use logoText specifically to avoid matches in copyright or bigText
    const brand = await screen.findByRole('contentinfo')
    expect(within(brand).getByText('Crafting cinematic stories that move, inspire, and provoke thought.')).toBeInTheDocument()
  })

  it('renders navigation link columns', async () => {
    renderWithRouter(<Footer />)
    
    expect(await screen.findByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Legal')).toBeInTheDocument()
    
    // Check some specific links
    const companyCol = screen.getByRole('navigation', { name: /company/i })
    expect(within(companyCol).getByText('Home')).toBeInTheDocument()
    
    const legalCol = screen.getByRole('navigation', { name: /legal/i })
    expect(within(legalCol).getByText('Privacy Policy')).toBeInTheDocument()
  })

  it('renders social media links', async () => {
    renderWithRouter(<Footer />)
    
    const youtubeLink = await screen.findByLabelText('YouTube')
    expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@SandurProductions')
    
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Threads')).toBeInTheDocument()
  })

  it('contains copyright information with current year', async () => {
    renderWithRouter(<Footer />)
    
    const currentYear = new Date().getFullYear().toString()
    const copyright = await screen.findByText(new RegExp(currentYear))
    expect(copyright).toBeInTheDocument()
    expect(screen.getByText(/Amogha Raj Sandur/i)).toBeInTheDocument()
  })

  it('contains "built by" link', async () => {
    renderWithRouter(<Footer />)
    
    expect(await screen.findByText(/Designed, developed & maintained by/i)).toBeInTheDocument()
    const sandurTechLink = screen.getByText('SandurTech (Sandur Technologies)')
    expect(sandurTechLink.closest('a')).toHaveAttribute('href', 'https://sandurtech.vercel.app')
  })
})
