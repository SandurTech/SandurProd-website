import { describe, it, expect } from 'vitest'
import { renderWithRouter, screen } from '../../../test/test-utils'
import { BlogPage } from '../BlogPage'

describe('BlogPage', () => {
  it('renders correctly with heading and subtitle', async () => {
    renderWithRouter(<BlogPage />)
    
    expect(await screen.findByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Stories, behind the scenes, and updates from Sandur Productions.')).toBeInTheDocument()
  })

  it('displays development status', async () => {
    renderWithRouter(<BlogPage />)
    
    expect(await screen.findByText('In development, coming soon.')).toBeInTheDocument()
    expect(screen.getByText(/We are currently crafting stories/i)).toBeInTheDocument()
  })

  it('renders back link to home', async () => {
    renderWithRouter(<BlogPage />)
    
    const backLink = await screen.findByText('Home')
    expect(backLink.closest('a')).toHaveAttribute('href', expect.stringMatching(/\//))
  })
})
