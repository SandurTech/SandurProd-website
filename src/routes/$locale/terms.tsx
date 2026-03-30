import { createFileRoute } from '@tanstack/react-router'
import TermsPage from '../../pages/Legal/TermsPage'

export const Route = createFileRoute('/$locale/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: 'Terms of Use — Sandur Productions' },
      { name: 'description', content: 'Terms of Use and conditions for using Sandur Productions website.' }
    ]
  })
})
