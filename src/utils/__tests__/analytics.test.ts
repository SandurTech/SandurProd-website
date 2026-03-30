import { describe, it, expect, vi, beforeEach } from 'vitest'
import { initAnalytics } from '../analytics'

describe('analytics utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('blocks tracking when analytics consent is false', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    initAnalytics({ analytics: false })
    
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Blocked by GDPR preferences.')
    consoleSpy.mockRestore()
  })

  it('initializes tracking when analytics consent is true', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    initAnalytics({ analytics: true })
    
    expect(consoleSpy).toHaveBeenCalledWith('[Analytics] Initialized tracking.')
    consoleSpy.mockRestore()
  })
})
