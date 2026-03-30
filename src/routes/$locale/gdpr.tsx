import { createFileRoute } from '@tanstack/react-router'
import GdprPage from '../../pages/Legal/GdprPage'

export const Route = createFileRoute('/$locale/gdpr')({
  component: GdprPage,
  head: () => ({
    meta: [
      { title: 'GDPR Compliance — Sandur Productions' },
      { name: 'description', content: 'GDPR compliance data subject rights and information for Sandur Productions.' }
    ]
  })
})
