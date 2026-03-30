import { createFileRoute } from '@tanstack/react-router'
import ProjectsPage from '../../pages/Projects/ProjectsPage'

export const Route = createFileRoute('/$locale/projects')({
  component: ProjectsPage,
  head: () => {
    return {
      meta: [
        { title: 'Projects — Sandur Productions' },
        { name: 'description', content: 'Explore the cinematic works of Sandur Productions, including THE SCAM and UTTARA.' },
        { property: 'og:title', content: 'Projects — Sandur Productions' },
        { property: 'og:description', content: 'Explore the cinematic works of Sandur Productions, including THE SCAM and UTTARA.' },
      ]
    }
  }
})
