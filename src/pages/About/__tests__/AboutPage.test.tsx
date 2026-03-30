import { describe, it, expect } from 'vitest'
import { renderWithRouter, screen } from '../../../test/test-utils'
import AboutPage from '../AboutPage'

describe('AboutPage', () => {
  it('renders correctly with heading and description', async () => {
    renderWithRouter(<AboutPage />)
    
    expect(await screen.findByText('About Sandur Productions')).toBeInTheDocument()
    expect(screen.getByText(/Sandur Productions is an independent student-led production house/i)).toBeInTheDocument()
  })

  it('renders info cards', async () => {
    renderWithRouter(<AboutPage />)
    expect(await screen.findByText('Founded')).toBeInTheDocument()
    expect(screen.getByText('Based in')).toBeInTheDocument()
    expect(screen.getByText('Our Projects')).toBeInTheDocument()
    expect(screen.getAllByText('Our Mission')).toHaveLength(2)
  })

  it('renders social links', async () => {
    renderWithRouter(<AboutPage />)
    
    expect(await screen.findByLabelText('YouTube')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument()
    expect(screen.getByLabelText('Threads')).toBeInTheDocument()
  })

  it('renders contact section', async () => {
    renderWithRouter(<AboutPage />)
    
    expect(await screen.findByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText(/Interested in collaborating or have a project in mind?/i)).toBeInTheDocument()
  })
})
