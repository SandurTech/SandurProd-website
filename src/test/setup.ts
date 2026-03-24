import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Mock window.matchMedia (jsdom doesn't implement it)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false, // Default: prefers dark
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Automatic cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock CSS/SCSS module imports
vi.mock('*.module.scss', () => new Proxy({}, {
  get: (_target, name) => name,
}))

// Mock SCSS imports (global styles)
vi.mock('../scss/main.scss', () => ({}))

// Mock SVG/image imports
vi.mock('*.svg', () => ({ default: 'mocked-svg' }))
vi.mock('*.png', () => ({ default: 'mocked-png' }))
