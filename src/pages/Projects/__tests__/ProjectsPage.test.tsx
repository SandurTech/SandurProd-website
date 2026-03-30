import { describe, it, expect, beforeEach } from 'vitest'
import { renderWithRouter, fireEvent, screen } from '../../../test/test-utils'
import ProjectsPage from '../ProjectsPage'

describe('ProjectsPage', () => {
  beforeEach(() => {
    // Reset any state if needed
  })

  it('renders correctly with all projects initially', async () => {
    renderWithRouter(<ProjectsPage />)
    
    expect(await screen.findByText('Our Projects')).toBeInTheDocument()
    
    // Check both projects are present
    expect(screen.getByText('THE SCAM')).toBeInTheDocument()
    expect(screen.getByText('UTTARA')).toBeInTheDocument()
  })

  it('filters by category', async () => {
    renderWithRouter(<ProjectsPage />)
    
    // Click 'Short Films' filter
    const shortFilmBtn = await screen.findByText('Short Films')
    fireEvent.click(shortFilmBtn)
    
    // Only Uttara should be visible
    expect(screen.queryByText('THE SCAM')).not.toBeInTheDocument()
    expect(screen.getByText('UTTARA')).toBeInTheDocument()
    
    // Click 'Web Series' filter
    const webSeriesBtn = screen.getByText('Web Series')
    fireEvent.click(webSeriesBtn)
    
    // Only The Scam should be visible
    expect(screen.getByText('THE SCAM')).toBeInTheDocument()
    expect(screen.queryByText('UTTARA')).not.toBeInTheDocument()
  })

  it('displays "No results" when a category is empty', async () => {
    renderWithRouter(<ProjectsPage />)
    
    // Click 'Documentaries' filter (no projects in this category in our sample data)
    const docBtn = await screen.findByText('Documentaries')
    fireEvent.click(docBtn)
    
    expect(await screen.findByText('No projects found matching your search.')).toBeInTheDocument()
    expect(screen.queryByText('THE SCAM')).not.toBeInTheDocument()
  })

  it('displays correct status labels', async () => {
    renderWithRouter(<ProjectsPage />)
    
    // The Scam is 'in-production'
    expect(await screen.findByText('In Production')).toBeInTheDocument()
    
    // Uttara is 'released'
    expect(screen.getByText('Released')).toBeInTheDocument()
  })

  it('renders watch link for released projects', async () => {
    renderWithRouter(<ProjectsPage />)
    
    const watchLinks = await screen.findAllByText(/View Project/i)
    expect(watchLinks.length).toBeGreaterThan(0)
    expect(watchLinks[0].closest('a')).toHaveAttribute('href', expect.stringMatching(/youtube\.com/))
  })
})
