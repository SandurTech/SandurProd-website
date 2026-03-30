import { createFileRoute } from '@tanstack/react-router'
import AboutPage from '../../pages/About/AboutPage'

export const Route = createFileRoute('/$locale/about')({
  component: AboutPage,
  head: () => {
    return {
      meta: [
        { title: 'About Us — Sandur Productions' },
        { name: 'description', content: 'Learn more about Amogha Raj Sandur and the mission behind Sandur Productions.' },
        { property: 'og:title', content: 'About Us — Sandur Productions' },
        { property: 'og:description', content: 'Learn more about Amogha Raj Sandur and the mission behind Sandur Productions.' },
      ]
    }
  }
})
