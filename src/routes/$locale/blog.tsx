import { createFileRoute } from '@tanstack/react-router'
import { BlogPage } from '../../pages/Blog/BlogPage'

export const Route = createFileRoute('/$locale/blog')({
  component: BlogPage,
  head: () => {
    return {
      meta: [
        { title: 'Stories & Behind the Scenes — Sandur Productions' },
        { name: 'description', content: 'Read stories, news, and behind the scenes insights from Sandur Productions.' },
        { property: 'og:title', content: 'Stories & Behind the Scenes — Sandur Productions' },
        { property: 'og:description', content: 'Read stories, news, and behind the scenes insights from Sandur Productions.' },
      ]
    }
  }
})
