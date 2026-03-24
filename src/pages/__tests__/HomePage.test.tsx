import { describe, it, expect } from 'vitest'
import { render, screen, within } from '../../test/test-utils'
import HomePage from '../HomePage'

describe('HomePage', () => {
  // ---------------------------------------------------------------------------
  // Structure & Layout
  // ---------------------------------------------------------------------------

  it('renders a <main> element with correct id', () => {
    render(<HomePage />)
    const main = document.getElementById('main-content')
    expect(main).toBeInTheDocument()
    expect(main?.tagName.toLowerCase()).toBe('main')
  })

  it('renders all four sections', () => {
    render(<HomePage />)
    expect(document.getElementById('hero')).toBeInTheDocument()
    expect(document.getElementById('works')).toBeInTheDocument()
    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
  })

  it('sections are inside the main landmark', () => {
    render(<HomePage />)
    const main = document.getElementById('main-content')!
    const mainContent = within(main)

    expect(mainContent.getByText('Sandur Productions')).toBeInTheDocument()
    expect(mainContent.getByText('Our Works')).toBeInTheDocument()
    expect(mainContent.getByText('About')).toBeInTheDocument()
    expect(mainContent.getByText('Get in Touch')).toBeInTheDocument()
  })

  // ---------------------------------------------------------------------------
  // Hero Section
  // ---------------------------------------------------------------------------

  describe('Hero Section', () => {
    it('renders the brand title as h1', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Sandur Productions')
    })

    it('renders the subtitle', () => {
      render(<HomePage />)
      expect(
        screen.getByText('Crafting cinematic stories that move, inspire, and provoke thought.')
      ).toBeInTheDocument()
    })

    it('has correct aria-label', () => {
      render(<HomePage />)
      const hero = document.getElementById('hero')!
      expect(hero).toHaveAttribute('aria-label', 'Sandur Productions')
    })
  })

  // ---------------------------------------------------------------------------
  // Works Section
  // ---------------------------------------------------------------------------

  describe('Works Section', () => {
    it('renders the works heading as h2', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { name: /our works/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', () => {
      render(<HomePage />)
      const works = document.getElementById('works')!
      expect(works).toHaveAttribute('aria-label', 'Our Works')
    })
  })

  // ---------------------------------------------------------------------------
  // About Section
  // ---------------------------------------------------------------------------

  describe('About Section', () => {
    it('renders the about heading as h2', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { name: /^about$/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', () => {
      render(<HomePage />)
      const about = document.getElementById('about')!
      expect(about).toHaveAttribute('aria-label', 'About')
    })
  })

  // ---------------------------------------------------------------------------
  // Contact Section
  // ---------------------------------------------------------------------------

  describe('Contact Section', () => {
    it('renders the contact heading as h2', () => {
      render(<HomePage />)
      const heading = screen.getByRole('heading', { name: /get in touch/i })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('has correct aria-label', () => {
      render(<HomePage />)
      const contact = document.getElementById('contact')!
      expect(contact).toHaveAttribute('aria-label', 'Get in Touch')
    })
  })

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------

  describe('Accessibility', () => {
    it('has exactly one h1', () => {
      render(<HomePage />)
      const h1s = screen.getAllByRole('heading', { level: 1 })
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
