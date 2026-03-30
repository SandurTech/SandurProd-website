import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const publicDir = resolve(process.cwd(), 'public')

describe('SEO Files', () => {
  // ---------------------------------------------------------------------------
  // robots.txt
  // ---------------------------------------------------------------------------

  describe('robots.txt', () => {
    const robotsPath = resolve(publicDir, 'robots.txt')

    it('exists in public directory', () => {
      expect(existsSync(robotsPath)).toBe(true)
    })

    it('has valid content', () => {
      const content = readFileSync(robotsPath, 'utf-8')
      expect(content).toBeTruthy()
    })

    it('allows all crawlers by default', () => {
      const content = readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('User-agent: *')
      expect(content).toContain('Allow: /')
    })

    it('references the sitemap', () => {
      const content = readFileSync(robotsPath, 'utf-8')
      expect(content).toContain('Sitemap:')
      expect(content).toContain('sitemap.xml')
    })

    it('allows AI search bots', () => {
      const content = readFileSync(robotsPath, 'utf-8')
      const aiBots = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']
      for (const bot of aiBots) {
        expect(content).toContain(bot)
      }
    })

    it('blocks training-only crawlers', () => {
      const content = readFileSync(robotsPath, 'utf-8')
      expect(content).toMatch(/User-agent:\s*CCBot[\s\S]*?Disallow:\s*\//)
    })
  })

  // ---------------------------------------------------------------------------
  // sitemap.xml
  // ---------------------------------------------------------------------------

  describe('sitemap.xml', () => {
    const sitemapPath = resolve(publicDir, 'sitemap.xml')

    it('exists in public directory', () => {
      expect(existsSync(sitemapPath)).toBe(true)
    })

    it('is valid XML', () => {
      const content = readFileSync(sitemapPath, 'utf-8')
      expect(content).toMatch(/^<\?xml/)
      expect(content).toContain('<urlset')
      expect(content).toContain('</urlset>')
    })

    it('contains the homepage URL', () => {
      const content = readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('<loc>')
      expect(content).toContain('<priority>1.0</priority>')
    })

    it('contains locale-prefixed URLs', () => {
      const content = readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('/en/')
      expect(content).toContain('/hi/')
      expect(content).toContain('/kn/')
    })

    it('contains main page URLs', () => {
      const content = readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('/about')
      expect(content).toContain('/projects')
      expect(content).toContain('/blog')
      expect(content).toContain('/privacy')
    })

    it('has lastmod dates', () => {
      const content = readFileSync(sitemapPath, 'utf-8')
      expect(content).toContain('<lastmod>')
    })
  })
})
