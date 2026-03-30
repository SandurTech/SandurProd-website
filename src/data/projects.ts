// ==========================================================================
// Project Data — Sandur Productions
// ==========================================================================
// This file is the single source of truth for all production projects.
// Non-technical maintainers: to add a new project, copy an existing entry
// and update the fields. Translation keys must also be added to locale files.
//
// Fields:
//   id         — unique identifier (lowercase, no spaces)
//   titleKey   — i18n translation key for the title
//   genreKey   — i18n translation key for the genre label
//   descKey    — i18n translation key for the description
//   category   — filterable category: 'web-series' | 'short-film' | 'documentary'
//   year       — production year
//   status     — 'released' | 'in-production' | 'upcoming'
//   thumbnail  — path to thumbnail image (relative to src/assets/)
//   links      — optional external links (YouTube, IMDb, etc.)

export type ProjectCategory = 'web-series' | 'short-film' | 'documentary'
export type ProjectStatus = 'released' | 'in-production' | 'upcoming'

export interface Project {
  id: string
  titleKey: string
  genreKey: string
  descKey: string
  category: ProjectCategory
  year: number
  status: ProjectStatus
  thumbnail?: string
  links?: {
    youtube?: string
    imdb?: string
  }
  /** Crew members — add names here for search functionality */
  crew?: {
    role: string
    name: string
  }[]
  /** Cast members — add names here for search functionality */
  cast?: string[]
}

// --------------------------------------------------------------------------
// ⬇️  ADD NEW PROJECTS HERE  ⬇️
// --------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'the-scam',
    titleKey: 'projects.theScam.title',
    genreKey: 'projects.theScam.genre',
    descKey: 'projects.theScam.description',
    category: 'web-series',
    year: 2026,
    status: 'in-production',
    links: {
      youtube: 'https://www.youtube.com/@SandurProductions',
    },
    crew: [
      { role: 'Director', name: 'Amogha Raj Sandur' },
      { role: 'Producer', name: 'Sandur Productions' },
    ],
    cast: [],
  },
  {
    id: 'uttara',
    titleKey: 'projects.uttara.title',
    genreKey: 'projects.uttara.genre',
    descKey: 'projects.uttara.description',
    category: 'short-film',
    year: 2026,
    status: 'released',
    links: {
      youtube: 'https://www.youtube.com/@SandurProductions',
    },
    crew: [
      { role: 'Director', name: 'Amogha Raj Sandur' },
      { role: 'Producer', name: 'Sandur Productions' },
    ],
    cast: [],
  },
]

// --------------------------------------------------------------------------
// Helper: Get all unique categories from projects
// --------------------------------------------------------------------------

export const projectCategories: ProjectCategory[] = [
  ...new Set(projects.map((p) => p.category)),
]

// --------------------------------------------------------------------------
// Helper: Search projects by text (crew, cast, title key, genre)
// --------------------------------------------------------------------------

export function searchProjects(
  query: string,
  t: (key: string) => string,
): Project[] {
  if (!query || !query.trim()) return projects
  const q = query.trim().toLowerCase()

  return projects.filter((p) => {
    // Search translated title and genre
    const title = t(p.titleKey).toLowerCase()
    const genre = t(p.genreKey).toLowerCase()
    const desc = t(p.descKey).toLowerCase()

    // Search crew names
    const crewMatch = p.crew?.some(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q),
    )

    // Search cast names
    const castMatch = p.cast?.some((c) => c.toLowerCase().includes(q))

    return (
      title.includes(q) ||
      genre.includes(q) ||
      desc.includes(q) ||
      crewMatch ||
      castMatch ||
      p.category.includes(q)
    )
  })
}
