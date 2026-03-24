import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.getElementById('main-content')).toBeInTheDocument()
  })

  it('renders the skip navigation link', () => {
    render(<App />)
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
    expect(skipLink).toHaveClass('skip-link')
  })

  it('skip link points to main content landmark', () => {
    render(<App />)
    const skipLink = screen.getByText('Skip to main content')
    const targetId = skipLink.getAttribute('href')?.replace('#', '')
    const mainContent = document.getElementById(targetId!)
    expect(mainContent).toBeInTheDocument()
    expect(mainContent?.tagName.toLowerCase()).toBe('main')
  })

  it('renders the HomePage component', () => {
    render(<App />)
    // HomePage renders the hero title
    expect(screen.getByText('Sandur Productions')).toBeInTheDocument()
  })
})
