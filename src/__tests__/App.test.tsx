import { describe, it, expect } from 'vitest'
import { render, screen } from '../test/test-utils'
import App from '../App'

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />)
    // App uses the router, so we need to wait for it to render
    const main = await screen.findByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
  })
})
