# Sandur Productions — Project Context

> Canonical context for AI agents. Last updated: 2026-03-30

## Overview

**Multi-page website** for Sandur Productions — independent solopreneur student-led production house by **Amogha Raj Sandur**.
Stack: **Vite 8 + React 19 + TypeScript + SCSS + TanStack Router** | Status: Pre-Revenue | Parent: Sandur Group Ventures

**Deployment:** `https://sandurproductions.vercel.app` (Vercel)

**Major Works:** THE SCAM (finance web series), UTTARA (short film)

## Brand Rules

**Colors** — ALL colors MUST derive from these 3 bases via `sass:color.mix()`:
- Accent: `#ffa31a` (Orange) — CTAs, links, highlights
- Primary: `#262626` (Dark Slate) — backgrounds, surfaces
- Secondary: `#f2f2f2` (Light Gray) — text on dark, borders

**Fonts:** Impact (headings, uppercase, system font) | Inter (body/UI, Google Fonts CDN, Sandur Group family font) | Noto Sans Devanagari (Hindi) | Noto Sans Kannada (Kannada)

**Icons:** `@mui/icons-material` primary. `react-icons` (FaYoutube, FaLinkedin, FaInstagram, RiThreadsFill) for social media only.

**Logos:** `src/assets/images/` — SVG + PNG for logo and YT banner. Favicon: `public/favicon.svg`

**Social:**
YouTube: https://www.youtube.com/@SandurProductions |
LinkedIn: https://www.linkedin.com/company/sandur-productions/ |
Instagram: https://www.instagram.com/sandur_productions/ |
Threads: https://www.threads.net/@sandur_productions

## Project Structure

```
src/
├── assets/images/                              ← Brand logos (SVG/PNG)
├── components/
│   ├── layout/
│   │   ├── Header/Header.tsx + .module.scss     ← Floating pill header, search, theme/lang switcher
│   │   ├── Sidebar/Sidebar.tsx + .module.scss   ← Mobile slide-in nav drawer (uses inert)
│   │   ├── Footer/Footer.tsx + .module.scss     ← 4-col footer + 3D "Big Text"
│   │   └── LegalPageLayout/                     ← Shared layout for legal pages
│   └── ui/
│       ├── CookieConsent/CookieBanner.tsx       ← GDPR cookie consent toast
│       ├── CookieConsent/CookieModal.tsx        ← Granular cookie preferences modal
│       └── LanguageToast/LanguageToast.tsx      ← Language switch animation
├── context/
│   ├── ThemeContext.tsx                          ← Dark/Light theme provider
│   └── CookieConsentContext.tsx                 ← GDPR consent state management
├── data/projects.ts                             ← Centralized project metadata
├── locales/{en,hi,kn}/common.json               ← i18n translations
├── pages/
│   ├── Home/HomePage.tsx                        ← Landing page (hero, works, about, contact)
│   ├── About/AboutPage.tsx + .module.scss       ← About page
│   ├── Projects/ProjectsPage.tsx + .module.scss ← Projects gallery
│   ├── Blog/BlogPage.tsx + .module.scss         ← Blog (coming soon placeholder)
│   └── Legal/PrivacyPolicyPage.tsx etc.         ← Legal pages (under development)
├── routes/
│   ├── __root.tsx                               ← Root layout (Header, Footer, CookieConsent)
│   └── $locale/ (index, about, projects, blog, privacy, cookie-policy, terms, gdpr)
├── scss/                                        ← 7-1 SCSS architecture
│   ├── abstracts/ (_variables, _mixins)
│   ├── base/ (_reset, _base, _typography)
│   └── themes/ (_default — CSS custom properties)
├── utils/analytics.ts                           ← GA + Clarity (consent-gated)
├── i18n.ts                                      ← i18n config (path-based detection)
├── App.tsx → main.tsx                           ← Entry chain
public/
├── favicon.svg                                  ← Brand logo SVG
├── robots.txt                                   ← SEO + AI bot access rules
├── sitemap.xml                                  ← 24 URLs (8 routes × 3 locales + hreflang)
└── llms.txt                                     ← AI-readable site summary
.agents/{AGENTS.MD, dumps/MEMORY_DUMP.MD}        ← AI agent context
```

## Routing

**TanStack Router** — file-based routes under `src/routes/$locale/`.

| Route | Page | Description |
|-------|------|-------------|
| `/$locale/` | HomePage | Hero, Works, About, Contact sections |
| `/$locale/about` | AboutPage | Company & founder info |
| `/$locale/projects` | ProjectsPage | Project cards with filtering |
| `/$locale/blog` | BlogPage | Coming soon placeholder |
| `/$locale/privacy` | LegalPageLayout | Privacy Policy (under dev) |
| `/$locale/cookie-policy` | LegalPageLayout | Cookie Policy (under dev) |
| `/$locale/terms` | LegalPageLayout | Terms of Use (under dev) |
| `/$locale/gdpr` | LegalPageLayout | GDPR Compliance (under dev) |

Locale redirect: unprefixed paths → `/{detected-lang}/` automatically via `__root.tsx`.

## Styling & Theming

**SCSS 7-1 pattern** with `@use`/`@forward` (not `@import`).
Components use co-located **`.module.scss`** files: `@use '../../scss/abstracts/variables' as vars;`
BEM naming, max 3 levels nesting. Spacing unit: 8px. Breakpoints: 576/768/992/1200/1400px.

**Theme system:** CSS custom properties via `[data-theme]` attribute on `<html>`.
- Dark (default): bg=`$color-primary` (#262626), text=`$color-secondary` (#f2f2f2)
- Light: bg=`$color-secondary` (#f2f2f2), text=`$color-primary` (#262626)
- Use `var(--color-*)` for all theme-reactive colors, SCSS vars for static tokens (spacing, fonts)
- Provider: `src/context/ThemeContext.tsx` — exports `ThemeProvider`, `useTheme()`
- Persistence: localStorage key `sandurprod-theme`

**Accessibility:** `prefers-reduced-motion` supported across 6+ components. `prefers-contrast: more` support in `_base.scss`.

## i18n

`react-i18next` — config in `src/i18n.ts`, imported in `main.tsx` before App.
Languages: **en** (default/fallback), **hi** (Hindi), **kn** (Kannada) — files in `src/locales/{lang}/common.json`.
- Never hardcode user-facing strings — use `t('section.key')`
- Add all 3 languages when adding new strings
- Detection: path → localStorage → browser → htmlTag
- Persistence: localStorage key `sandurprod-lang`
- `<html lang>` and `<html class="lang-xx">` dynamically updated per route via `__root.tsx`
- Language-specific SCSS in `_typography.scss` adjusts font-size and line-height for HI/KN.

## SEO & AI Visibility

**index.html**: meta tags (OG, Twitter Card, robots), `og:image` = `/favicon.svg`, JSON-LD `@graph`:
- `Organization` (with url, logo, founder, foundingDate, sameAs)
- `WebSite`
- `WebPage` (with breadcrumb reference)
- `BreadcrumbList`
- `CreativeWork` × 2 (THE SCAM, UTTARA)

**robots.txt**: allows AI bots (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, Bingbot), blocks CCBot + GPTBot-training.

**sitemap.xml**: 24 URLs (8 routes × 3 locales) with `xhtml:link` hreflang alternates (en, hi, kn, x-default).

**llms.txt**: AI-readable site summary with pages, projects, social links, founder info.

**Dynamic SEO (in `__root.tsx`):**
- `<html lang>` updates per locale
- `<link rel="canonical">` dynamically set per route
- `<link rel="alternate" hreflang>` dynamically injected for all locales + x-default

## GDPR & Privacy

**Cookie Consent:** strictly **default-denied** architecture.
- `CookieConsentContext` manages preferences in localStorage
- Analytics (GA) & Marketing (Clarity) scripts gated on explicit user consent
- `CookieBanner` appears on first visit; `CookieModal` for granular toggle control
- "Privacy Preferences" accessible from mobile Sidebar

## Testing

**Vitest + React Testing Library + jest-dom + jsdom** — 111 tests, 8 suites.
Always use `render` from `src/test/test-utils.tsx` (wraps with ThemeProvider + I18nextProvider).
Tests use `tsconfig.test.json` (separate from app config). Co-locate in `__tests__/` dirs.

## Commands

```bash
npm run dev / build / lint / preview
npm test / test:watch / test:coverage
```

## Key Constraints

1. All colors from 3 bases only — never add arbitrary colors
2. MUI Icons primary — `react-icons` for social media only
3. Use `var(--color-*)` for theme-reactive colors, SCSS vars for static tokens
4. Pre-revenue — minimal dependencies
5. Always add translation keys to all 3 locales (en, hi, kn) when adding strings
6. GDPR: Analytics/tracking must be OFF by default until explicit user consent
7. Accessibility: use `inert` (not `aria-hidden`) for off-screen interactive elements

## Definition of Done (DoD)

### Implementation
- [ ] **No Hardcoded Strings**: All user-facing text uses `t()` with keys in all 3 locale files.
- [ ] **Brand Consistency**: Colors strictly derived from the 3 base colors via `sass:color.mix()`.
- [ ] **Styling**: BEM naming convention, modular SCSS, responsive design (mobile-first).
- [ ] **Typography**: Language-specific fonts (Noto Sans) and spacing adjustments verified for HI/KN.

### Quality & Testing
- [ ] **Test Coverage**: 90%+ line coverage; all existing and new tests passing.
- [ ] **Zero Errors**: No lint errors (`npm run lint`) or TypeScript errors (`tsc`).
- [ ] **Performance**: Optimized asset loading, minimal cumulative layout shift (CLS).

### Compliance & Accessibility
- [ ] **GDPR**: Analytics/Marketing strictly gated by `CookieConsentContext`; default-denied.
- [ ] **Accessibility**: WCAG 2.1 AA compliant; semantic HTML, `inert` for hidden menus, skip links.
- [ ] **SEO/AI**: Canonical tags, hreflang alternates, sitemap.xml, and llms.txt updated for new routes.

### Finalization
- [ ] **Verification**: Behavioral correctness verified through manual testing across locales.
- [ ] **Documentation**: `AGENTS.MD` and `MEMORY_DUMP.MD` updated with session details and architectural changes.

## Memory Dumps

**Read `.agents/dumps/MEMORY_DUMP.MD` at session START.** Append a dated entry at session END with: what was done, decisions, open items, gotchas. Never delete entries.
