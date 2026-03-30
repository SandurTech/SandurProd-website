import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithRouter, fireEvent, screen, act, within } from '../../../../test/test-utils'
import Header from '../Header'

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.scrollY = 0
  })

  it('renders correctly with logo and nav links', async () => {
    renderWithRouter(<Header />)
    
    expect(await screen.findByLabelText(/Sandur Productions — Home/i)).toBeInTheDocument()
    // Use the logo span to check for text
    const header = await screen.findByRole('banner')
    expect(within(header).getByText(/SANDUR PRODUCTIONS/i)).toBeInTheDocument()
    
    // Check main nav links
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(within(nav).getByText('Home')).toBeInTheDocument()
    expect(within(nav).getByText('About')).toBeInTheDocument()
    expect(within(nav).getByText('Projects')).toBeInTheDocument()
    expect(within(nav).getByText('Blog')).toBeInTheDocument()
  })

  it('toggles search overlay', async () => {
    renderWithRouter(<Header />)
    
    const searchBtn = await screen.findByLabelText('Search')
    fireEvent.click(searchBtn)
    
    const searchOverlay = await screen.findByRole('search')
    expect(searchOverlay).toBeInTheDocument()
    expect(within(searchOverlay).getByPlaceholderText('Search by project, crew, cast, or genre...')).toBeInTheDocument()
    
    const closeBtn = screen.getByLabelText('Close search')
    fireEvent.click(closeBtn)
    
    expect(screen.queryByRole('search')).not.toBeInTheDocument()
  })

  it('handles search input and displays results', async () => {
    renderWithRouter(<Header />)
    
    fireEvent.click(await screen.findByLabelText('Search'))
    const searchOverlay = await screen.findByRole('search')
    const input = within(searchOverlay).getByPlaceholderText('Search by project, crew, cast, or genre...')
    
    fireEvent.change(input, { target: { value: 'scam' } })
    
    // Wait for results
    expect(await screen.findByRole('status')).toBeInTheDocument()
    // Find result specifically within the search overlay to avoid matches in Sidebar
    expect(within(searchOverlay).getByText('THE SCAM')).toBeInTheDocument()
  })

  it('toggles theme', async () => {
    renderWithRouter(<Header />)
    
    const themeBtn = await screen.findByLabelText('Switch to light mode')
    fireEvent.click(themeBtn)
    
    expect(await screen.findByLabelText('Switch to dark mode')).toBeInTheDocument()
  })

  it('opens and closes language dropdown', async () => {
    renderWithRouter(<Header />)
    
    const header = await screen.findByRole('banner')
    // Get the language switcher button (NOT the sidebar select)
    const langBtn = within(header).getByRole('button', { name: /select language/i })
    fireEvent.click(langBtn)
    
    const listbox = await screen.findByRole('listbox', { name: /select language/i })
    expect(listbox).toBeInTheDocument()
    
    // Check if languages are listed
    expect(within(listbox).getAllByText('English')[0]).toBeInTheDocument()
    expect(within(listbox).getByText('हिन्दी')).toBeInTheDocument()
    expect(within(listbox).getByText('ಕನ್ನಡ')).toBeInTheDocument()
    
    fireEvent.click(langBtn)
    // Wait for it to disappear
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('updates header class on scroll', async () => {
    renderWithRouter(<Header />)
    const header = await screen.findByRole('banner')
    
    expect(header).not.toHaveClass(/scrolled/)
    
    act(() => {
      window.scrollY = 100
      window.dispatchEvent(new Event('scroll'))
    })
    
    expect(header).toHaveClass(/scrolled/)
  })

  it('opens mobile menu', async () => {
    renderWithRouter(<Header />)
    
    const menuBtn = await screen.findByLabelText('Open menu')
    fireEvent.click(menuBtn)
    
    // Sidebar should be open (using findByRole which waits)
    expect(await screen.findByRole('complementary')).toBeVisible()
  })
})
