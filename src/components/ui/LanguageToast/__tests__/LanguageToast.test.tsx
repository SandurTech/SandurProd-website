import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, i18n } from '../../../../test/test-utils'
import { LanguageToast } from '../LanguageToast'

describe('LanguageToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('is initially not visible', () => {
    render(<LanguageToast />)
    expect(screen.queryByText(/Select language/i)).not.toBeInTheDocument()
  })

  it('becomes visible when language changes', () => {
    render(<LanguageToast />)
    
    act(() => {
      i18n.emit('languageChanged', 'hi')
    })
    
    // Should be visible immediately after event
    expect(screen.getByText(/Select language/i)).toBeInTheDocument()
    
    act(() => {
      vi.advanceTimersByTime(800)
    })
    
    // Should disappear after timeout
    expect(screen.queryByText(/Select language/i)).not.toBeInTheDocument()
  })
})
