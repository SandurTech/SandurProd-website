import { describe, it, expect, vi } from 'vitest'
import { projects, searchProjects, projectCategories } from '../projects'

describe('Projects Data', () => {
  it('has valid project structure', () => {
    projects.forEach((project) => {
      expect(project.id).toBeDefined()
      expect(project.titleKey).toContain('projects.')
      expect(project.genreKey).toContain('projects.')
      expect(project.descKey).toContain('projects.')
      expect(['web-series', 'short-film', 'documentary']).toContain(project.category)
      expect(['released', 'in-production', 'upcoming']).toContain(project.status)
      expect(typeof project.year).toBe('number')
    })
  })

  it('has unique project IDs', () => {
    const ids = projects.map((p) => p.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('projectCategories contains all unique categories', () => {
    const categoriesFromProjects = [...new Set(projects.map((p) => p.category))]
    expect(projectCategories).toHaveLength(categoriesFromProjects.length)
    categoriesFromProjects.forEach((cat) => {
      expect(projectCategories).toContain(cat)
    })
  })
})

describe('searchProjects()', () => {
  const mockT = vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'projects.theScam.title': 'THE SCAM',
      'projects.theScam.genre': 'Finance Web Series',
      'projects.theScam.description': 'A gripping finance web series',
      'projects.uttara.title': 'UTTARA',
      'projects.uttara.genre': 'Short Film',
      'projects.uttara.description': 'A compelling short film',
    }
    return translations[key] || key
  })

  it('returns all projects for empty query', () => {
    expect(searchProjects('', mockT)).toHaveLength(projects.length)
    expect(searchProjects('   ', mockT)).toHaveLength(projects.length)
  })

  it('searches by translated title', () => {
    const results = searchProjects('SCAM', mockT)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('the-scam')
  })

  it('searches by translated genre', () => {
    const results = searchProjects('Short Film', mockT)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('uttara')
  })

  it('searches by crew name', () => {
    const results = searchProjects('Amogha', mockT)
    // Both projects have Amogha as director
    expect(results).toHaveLength(2)
  })

  it('searches by category', () => {
    const results = searchProjects('web-series', mockT)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('the-scam')
  })

  it('returns empty array for no matches', () => {
    const results = searchProjects('nonexistent', mockT)
    expect(results).toHaveLength(0)
  })

  it('is case-insensitive', () => {
    const results = searchProjects('scam', mockT)
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('the-scam')
  })
})
