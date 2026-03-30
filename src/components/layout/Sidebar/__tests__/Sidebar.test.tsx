import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithRouter, fireEvent, screen } from '../../../../test/test-utils'
import Sidebar from '../Sidebar'
import { CookieConsentProvider } from '../../../../context/CookieConsentContext'
import type { ReactNode } from 'react'

// Wrapper to provide CookieConsentContext
const Wrapper = ({ children }: { children: ReactNode }) => (
  <CookieConsentProvider>
    {children}
  </CookieConsentProvider>
)

describe('Sidebar', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    navLinks: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About' },
    ],
    currentLocale: 'en',
    localePath: (path: string) => `/en${path}`,
    isActive: vi.fn().mockReturnValue(false),
    onLanguageChange: vi.fn(),
    searchQuery: '',
    onSearchChange: vi.fn(),
    searchResults: [],
    onResultClick: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    document.body.style.overflow = ''
  })

  it('renders when isOpen is true', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    expect(await screen.findByRole('complementary')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })

  it('is inert when isOpen is false', async () => {
    renderWithRouter(<Sidebar {...mockProps} isOpen={false} />, { wrapper: Wrapper })
    // findByRole with hidden: true will find it even if it's inert/hidden
    const sidebar = await screen.findByRole('complementary', { hidden: true })
    expect(sidebar).toHaveAttribute('inert')
  })

  it('calls onClose when close button is clicked', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    fireEvent.click(await screen.findByLabelText('Close menu'))
    expect(mockProps.onClose).toHaveBeenCalled()
  })

  it('renders navigation links', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    expect(await screen.findByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('handles search input', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    const input = await screen.findByPlaceholderText('Search by project, crew, cast, or genre...')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(mockProps.onSearchChange).toHaveBeenCalled()
  })

  it('toggles theme', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    const themeBtn = await screen.findByLabelText('Toggle theme')
    fireEvent.click(themeBtn)
    expect(themeBtn).toBeInTheDocument()
  })

  it('handles language change', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    const select = await screen.findByLabelText('Select language')
    fireEvent.change(select, { target: { value: 'hi' } })
    expect(mockProps.onLanguageChange).toHaveBeenCalledWith('hi')
  })

  it('locks body scroll when open', async () => {
    renderWithRouter(<Sidebar {...mockProps} />, { wrapper: Wrapper })
    await screen.findByRole('complementary')
    expect(document.body.style.overflow).toBe('hidden')
  })
})
