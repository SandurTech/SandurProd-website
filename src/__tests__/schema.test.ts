import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const indexPath = resolve(process.cwd(), 'index.html')

describe('Schema Markup (index.html)', () => {
  let html: string
  let schema: {
    '@context': string
    '@graph': Array<Record<string, unknown>>
  }

  function parseSchema() {
    html = readFileSync(indexPath, 'utf-8')
    const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
    expect(match).not.toBeNull()
    schema = JSON.parse(match![1])
  }

  it('index.html exists', () => {
    expect(existsSync(indexPath)).toBe(true)
  })

  it('contains a valid JSON-LD script block', () => {
    parseSchema()
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@graph']).toBeDefined()
    expect(Array.isArray(schema['@graph'])).toBe(true)
  })

  // ---------------------------------------------------------------------------
  // Organization Schema
  // ---------------------------------------------------------------------------

  describe('Organization', () => {
    it('has an Organization entity', () => {
      parseSchema()
      const org = schema['@graph'].find((e) => e['@type'] === 'Organization')
      expect(org).toBeDefined()
    })

    it('has correct name', () => {
      parseSchema()
      const org = schema['@graph'].find((e) => e['@type'] === 'Organization')!
      expect(org.name).toBe('Sandur Productions')
    })

    it('has a founder', () => {
      parseSchema()
      const org = schema['@graph'].find((e) => e['@type'] === 'Organization')!
      const founder = org.founder as Record<string, string>
      expect(founder).toBeDefined()
      expect(founder['@type']).toBe('Person')
      expect(founder.name).toBe('Amogha Raj Sandur')
    })

    it('has social media profiles in sameAs', () => {
      parseSchema()
      const org = schema['@graph'].find((e) => e['@type'] === 'Organization')!
      const sameAs = org.sameAs as string[]
      expect(sameAs).toBeDefined()
      expect(sameAs.length).toBeGreaterThanOrEqual(4)
      expect(sameAs).toContain('https://www.youtube.com/@SandurProductions')
      expect(sameAs).toContain('https://www.linkedin.com/company/sandur-productions/')
      expect(sameAs).toContain('https://www.instagram.com/sandur_productions/')
      expect(sameAs).toContain('https://www.threads.com/@sandur_productions')
    })
  })

  // ---------------------------------------------------------------------------
  // WebSite Schema
  // ---------------------------------------------------------------------------

  describe('WebSite', () => {
    it('has a WebSite entity', () => {
      parseSchema()
      const ws = schema['@graph'].find((e) => e['@type'] === 'WebSite')
      expect(ws).toBeDefined()
    })

    it('supports multiple languages', () => {
      parseSchema()
      const ws = schema['@graph'].find((e) => e['@type'] === 'WebSite')!
      const langs = ws.inLanguage as string[]
      expect(langs).toContain('en')
      expect(langs).toContain('hi')
      expect(langs).toContain('kn')
    })
  })

  // ---------------------------------------------------------------------------
  // WebPage Schema
  // ---------------------------------------------------------------------------

  describe('WebPage', () => {
    it('has a WebPage entity', () => {
      parseSchema()
      const wp = schema['@graph'].find((e) => e['@type'] === 'WebPage')
      expect(wp).toBeDefined()
    })

    it('has publication and modification dates', () => {
      parseSchema()
      const wp = schema['@graph'].find((e) => e['@type'] === 'WebPage')!
      expect(wp.datePublished).toBeTruthy()
      expect(wp.dateModified).toBeTruthy()
    })
  })

  // ---------------------------------------------------------------------------
  // CreativeWork Schemas
  // ---------------------------------------------------------------------------

  describe('CreativeWork', () => {
    it('has exactly 2 CreativeWork entities', () => {
      parseSchema()
      const works = schema['@graph'].filter((e) => e['@type'] === 'CreativeWork')
      expect(works).toHaveLength(2)
    })

    it('includes THE SCAM', () => {
      parseSchema()
      const scam = schema['@graph'].find(
        (e) => e['@type'] === 'CreativeWork' && e.name === 'THE SCAM'
      )
      expect(scam).toBeDefined()
      expect(scam!.genre).toBeTruthy()
    })

    it('includes UTTARA', () => {
      parseSchema()
      const uttara = schema['@graph'].find(
        (e) => e['@type'] === 'CreativeWork' && e.name === 'UTTARA'
      )
      expect(uttara).toBeDefined()
      expect(uttara!.genre).toBeTruthy()
    })
  })

  // ---------------------------------------------------------------------------
  // Meta Tags
  // ---------------------------------------------------------------------------

  describe('Meta Tags', () => {
    it('has a title tag', () => {
      html = readFileSync(indexPath, 'utf-8')
      expect(html).toMatch(/<title>.*Sandur Productions.*<\/title>/)
    })

    it('has a meta description', () => {
      html = readFileSync(indexPath, 'utf-8')
      expect(html).toMatch(/name="description"/)
    })

    it('has Open Graph meta tags', () => {
      html = readFileSync(indexPath, 'utf-8')
      expect(html).toContain('og:title')
      expect(html).toContain('og:description')
      expect(html).toContain('og:site_name')
    })

    it('has Twitter Card meta tags', () => {
      html = readFileSync(indexPath, 'utf-8')
      expect(html).toContain('twitter:card')
      expect(html).toContain('twitter:title')
    })

    it('has robot directives', () => {
      html = readFileSync(indexPath, 'utf-8')
      expect(html).toContain('name="robots"')
      expect(html).toContain('index, follow')
    })
  })
})
