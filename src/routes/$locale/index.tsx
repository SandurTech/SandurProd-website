import { createFileRoute } from '@tanstack/react-router'
import HomePage from '../../pages/Home/HomePage'

export const Route = createFileRoute('/$locale/')({
  component: HomePage,
  head: () => {
    return {
      meta: [
        { title: 'Sandur Productions — Cinematic Stories by Amogha Raj Sandur' },
        { name: 'description', content: 'Sandur Productions is an independent student-led production house. Creators of THE SCAM finance web series and UTTARA short film.' },
        { property: 'og:title', content: 'Sandur Productions — Cinematic Stories by Amogha Raj Sandur' },
        { property: 'og:description', content: 'Sandur Productions is an independent student-led production house. Creators of THE SCAM finance web series and UTTARA short film.' },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://sandurproductions.vercel.app/#webpage",
                "url": "https://sandurproductions.vercel.app/en/",
                "name": "Sandur Productions — Cinematic Stories by Amogha Raj Sandur",
                "description": "Sandur Productions is an independent student-led production house. Creators of THE SCAM finance web series and UTTARA short film.",
                "isPartOf": {
                  "@id": "https://sandurproductions.vercel.app/#website"
                },
                "about": {
                  "@id": "https://sandurproductions.vercel.app/#organization"
                },
                "datePublished": "2026-03-24",
                "dateModified": "2026-03-30",
                "inLanguage": "en",
                "breadcrumb": {
                  "@id": "https://sandurproductions.vercel.app/#breadcrumb"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://sandurproductions.vercel.app/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://sandurproductions.vercel.app/en/"
                  }
                ]
              },
              {
                "@type": "CreativeWork",
                "name": "THE SCAM",
                "description": "A gripping finance web series exploring the world of financial fraud and deception.",
                "creator": {
                  "@id": "https://sandurproductions.vercel.app/#organization"
                },
                "genre": "Finance / Drama",
                "inLanguage": "en"
              },
              {
                "@type": "CreativeWork",
                "name": "UTTARA",
                "description": "A compelling short film by Sandur Productions.",
                "creator": {
                  "@id": "https://sandurproductions.vercel.app/#organization"
                },
                "genre": "Short Film",
                "inLanguage": "en"
              }
            ]
          })
        }
      ]
    }
  }
})
