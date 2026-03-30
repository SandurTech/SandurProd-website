import { createFileRoute } from '@tanstack/react-router'
import CookiePolicyPage from '../../pages/Legal/CookiePolicyPage'

export const Route = createFileRoute('/$locale/cookie-policy')({
  component: CookiePolicyPage,
  head: () => ({
    meta: [
      { title: 'Cookie Policy — Sandur Productions' },
      { name: 'description', content: 'Details on how Sandur Productions uses cookies and tracking technologies.' }
    ]
  })
})
