import { describe, it, expect } from 'vitest'
import { renderWithRouter as render, screen, within } from '../../test/test-utils'
import HomePage from '../../pages/Home/HomePage'

describe('HomePage', () => {
  // ---------------------------------------------------------------------------
  // Structure & Layout
  // ---------------------------------------------------------------------------

  it('renders a <main> element with correct id', async () => {
    render(<HomePage />)
    const main = await screen.findByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
  })

  it('renders all four sections', async () => {
    render(<HomePage />)
    expect(await screen.findByLabelText('Sandur Productions')).toBeInTheDocument()
    expect(screen.getByLabelText('Our Projects')).toBeInTheDocument()
    expect(screen.getByLabelText('About Sandur Productions')).toBeInTheDocument()
    expect(screen.getByLabelText('Get in Touch')).toBeInTheDocument()
  })

  it('sections are inside the main landmark', async () => {
    render(<HomePage />)
    const main = await screen.findByRole('main')
    const mainContent = within(main)

    expect(mainContent.getByText('Sandur Productions')).toBeInTheDocument()
    expect(mainContent.getByText('Our Projects')).toBeInTheDocument()
    expect(mainContent.getByText('About Sandur Productions')).toBeInTheDocument()
    expect(mainContent.getByText('Get in Touch')).toBeInTheDocument()
  })

  // ---------------------------------------------------------------------------
  // Hero Section
  // ---------------------------------------------------------------------------

  describe('Hero Section', () => {
    it('renders the brand title as h1', async () => {
      render(<HomePage />)
      const heading = await screen.findByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Sandur Productions')
    })

    it('renders the subtitle', async () => {
      render(<HomePage />)
      expect(
        await screen.findByText('Crafting cinematic stories that move, inspire, and provoke thought.')
      ).toBeInTheDocument()
    })

    it('has correct aria-label', async () => {
      render(<HomePage />)
      const hero = await screen.findByLabelText('Sandur Productions')
      expect(hero).toHaveAttribute('id', 'hero')
    })
  })

  // ---------------------------------------------------------------------------
  // Works Section
  // ---------------------------------------------------------------------------

  describe('Works Section', () => {
    it('renders the works heading as h2', async () => {
      render(<HomePage />)
      const heading = await screen.findByRole('heading', { name: /our projects/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', async () => {
      render(<HomePage />)
      const works = await screen.findByLabelText('Our Projects')
      expect(works).toHaveAttribute('id', 'works')
    })
  })

  // ---------------------------------------------------------------------------
  // About Section
  // ---------------------------------------------------------------------------

  describe('About Section', () => {
    it('renders the about heading as h2', async () => {
      render(<HomePage />)
      const heading = await screen.findByRole('heading', { name: /about sandur productions/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', async () => {
      render(<HomePage />)
      const about = await screen.findByLabelText('About Sandur Productions')
      expect(about).toHaveAttribute('id', 'about')
    })
  })

  // ---------------------------------------------------------------------------
  // Contact Section
  // ---------------------------------------------------------------------------

  describe('Contact Section', () => {
    it('renders the contact heading as h2', async () => {
      render(<HomePage />)
      const heading = await screen.findByRole('heading', { name: /get in touch/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', async () => {
      render(<HomePage />)
      const contact = await screen.findByLabelText('Get in Touch')
      expect(contact).toHaveAttribute('id', 'contact')
    })
  })

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------

  describe('Accessibility', () => {
    it('has exactly one h1', async () => {
      render(<HomePage />)
      const h1s = await screen.findAllByRole('heading', { level: 1 })
      expect(h1s).toHaveLength(1)
    })

    it('all sections have aria-label attributes', () => {
      render(<HomePage />)
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        expect(section).toHaveAttribute('aria-label')
        expect(section.getAttribute('aria-label')).not.toBe('')
      })
    })

    it('sections have unique IDs', () => {
      render(<HomePage />)
      const sections = document.querySelectorAll('section')
      const ids = Array.from(sections).map((s) => s.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })
})
