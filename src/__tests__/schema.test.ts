/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest'
import { Route as rootRoute } from '../routes/__root'
import { Route as indexRoute } from '../routes/$locale/index'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const indexPath = resolve(process.cwd(), 'index.html')

describe('Schema Markup (Dynamic via TanStack Router)', () => {
  function getRootSchema() {
    const headResult = rootRoute.options.head!({ location: { pathname: '/en/' } } as any)
    const script = headResult.scripts?.find((s: any) => s.type === 'application/ld+json')
    expect(script).toBeDefined()
    return JSON.parse(script!.children as string)
  }

  function getIndexSchema() {
    const headResult = indexRoute.options.head!({
      location: { pathname: '/en/' },
      params: { locale: 'en' },
      loaderData: undefined,
      routeContext: undefined,
      match: undefined as any
    } as any)
    const script = headResult.scripts?.find((s: any) => s.type === 'application/ld+json')
    expect(script).toBeDefined()
    return JSON.parse(script!.children as string)
  }

  describe('Organization Schema (__root.tsx)', () => {
    it('has an Organization entity', () => {
      const schema = getRootSchema()
      const org = schema['@graph'].find((e: any) => e['@type'] === 'Organization')
      expect(org).toBeDefined()
    })

    it('has correct name', () => {
      const schema = getRootSchema()
      const org = schema['@graph'].find((e: any) => e['@type'] === 'Organization')!
      expect(org.name).toBe('Sandur Productions')
    })

    it('has a founder', () => {
      const schema = getRootSchema()
      const org = schema['@graph'].find((e: any) => e['@type'] === 'Organization')!
      const founder = org.founder as Record<string, string>
      expect(founder).toBeDefined()
      expect(founder['@type']).toBe('Person')
      expect(founder.name).toBe('Amogha Raj Sandur')
    })

    it('has social media profiles in sameAs', () => {
      const schema = getRootSchema()
      const org = schema['@graph'].find((e: any) => e['@type'] === 'Organization')!
      const sameAs = org.sameAs as string[]
      expect(sameAs).toBeDefined()
      expect(sameAs.length).toBeGreaterThanOrEqual(4)
    })
  })

  describe('WebSite Schema (__root.tsx)', () => {
    it('has a WebSite entity', () => {
      const schema = getRootSchema()
      const ws = schema['@graph'].find((e: any) => e['@type'] === 'WebSite')
      expect(ws).toBeDefined()
    })

    it('supports multiple languages', () => {
      const schema = getRootSchema()
      const ws = schema['@graph'].find((e: any) => e['@type'] === 'WebSite')!
      const langs = ws.inLanguage as string[]
      expect(langs).toContain('en')
      expect(langs).toContain('hi')
      expect(langs).toContain('kn')
    })
  })

  describe('WebPage Schema (index.tsx)', () => {
    it('has a WebPage entity', () => {
      const schema = getIndexSchema()
      const wp = schema['@graph'].find((e: any) => e['@type'] === 'WebPage')
      expect(wp).toBeDefined()
    })

    it('has publication and modification dates', () => {
      const schema = getIndexSchema()
      const wp = schema['@graph'].find((e: any) => e['@type'] === 'WebPage')!
      expect(wp.datePublished).toBeTruthy()
      expect(wp.dateModified).toBeTruthy()
    })
  })

  describe('CreativeWork Schemas (index.tsx)', () => {
    it('has exactly 2 CreativeWork entities', () => {
      const schema = getIndexSchema()
      const works = schema['@graph'].filter((e: any) => e['@type'] === 'CreativeWork')
      expect(works).toHaveLength(2)
    })

    it('includes THE SCAM and UTTARA', () => {
      const schema = getIndexSchema()
      const scam = schema['@graph'].find((e: any) => e['@type'] === 'CreativeWork' && e.name === 'THE SCAM')
      const uttara = schema['@graph'].find((e: any) => e['@type'] === 'CreativeWork' && e.name === 'UTTARA')
      expect(scam).toBeDefined()
      expect(uttara).toBeDefined()
    })
  })

  describe('Meta Tags Tracking (index.html)', () => {
    it('maintains fallback title tag', () => {
      const html = readFileSync(indexPath, 'utf-8')
      expect(html).toMatch(/<title>.*Sandur Productions.*<\/title>/)
    })

    it('maintains fallback meta description', () => {
      const html = readFileSync(indexPath, 'utf-8')
      expect(html).toMatch(/name="description"/)
    })

    it('maintains fallback Open Graph meta tags', () => {
      const html = readFileSync(indexPath, 'utf-8')
      expect(html).toContain('og:title')
      expect(html).toContain('og:description')
      expect(html).toContain('og:site_name')
    })
  })
})
