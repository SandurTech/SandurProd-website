import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicyPage from '../../pages/Legal/PrivacyPolicyPage'

export const Route = createFileRoute('/$locale/privacy')({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: 'Privacy Policy — Sandur Productions' },
      { name: 'description', content: 'Privacy Policy and data handling practices for Sandur Productions.' }
    ]
  })
})
