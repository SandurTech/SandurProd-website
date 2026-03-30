import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, i18n } from '../../test/test-utils'
import { act } from '@testing-library/react'
import HomePage from '../../pages/Home/HomePage'

describe('HomePage i18n Integration', () => {
  beforeEach(async () => {
    await act(async () => {
      await i18n.changeLanguage('en')
    })
  })

  it('renders English content by default', () => {
    render(<HomePage />)
    expect(screen.getByText('Sandur Productions')).toBeInTheDocument()
    expect(screen.getByText('Our Projects')).toBeInTheDocument()
    expect(screen.getByText('About Sandur Productions')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('switches to Hindi when language changes', async () => {
    render(<HomePage />)

    await act(async () => {
      await i18n.changeLanguage('hi')
    })

    expect(screen.getByText('सांदुर प्रोडक्शंस')).toBeInTheDocument()
    expect(screen.getByText('हमारे प्रोजेक्ट्स')).toBeInTheDocument()
    expect(screen.getByText('सांदुर प्रोडक्शंस के बारे में')).toBeInTheDocument()
    expect(screen.getByText('संपर्क करें')).toBeInTheDocument()
  })

  it('switches to Kannada when language changes', async () => {
    render(<HomePage />)

    await act(async () => {
      await i18n.changeLanguage('kn')
    })

    expect(screen.getByText('ಸಂದೂರ ಪ್ರೊಡಕ್ಷನ್ಸ್')).toBeInTheDocument()
    expect(screen.getByText('ನಮ್ಮ ಯೋಜನೆಗಳು')).toBeInTheDocument()
    expect(screen.getByText('ಸಂದೂರ ಪ್ರೊಡಕ್ಷನ್ಸ್ ಬಗ್ಗೆ')).toBeInTheDocument()
    expect(screen.getByText('ಸಂಪರ್ಕಿಸಿ')).toBeInTheDocument()
  })

  it('updates aria-labels when language changes', async () => {
    render(<HomePage />)

    // Default: English
    const hero = document.getElementById('hero')!
    expect(hero).toHaveAttribute('aria-label', 'Sandur Productions')

    // Switch to Hindi
    await act(async () => {
      await i18n.changeLanguage('hi')
    })

    expect(hero).toHaveAttribute('aria-label', 'सांदुर प्रोडक्शंस')
  })
})
