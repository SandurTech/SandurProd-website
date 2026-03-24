# Sandur Productions — Project Context

> Canonical context for AI agents. Last updated: 2026-03-24

## Overview

**SPA landing page** for Sandur Productions — independent solopreneur student-led production house by **Amogha Raj Sandur**.
Stack: **Vite 8 + React 19 + TypeScript + SCSS** | Status: Pre-Revenue | Parent: Sandur Group Ventures

**Major Works:** THE SCAM (finance web series), UTTARA (short film)

## Brand Rules

**Colors** — ALL colors MUST derive from these 3 bases via `sass:color.mix()`:
- Accent: `#ffa31a` (Orange) — CTAs, links, highlights
- Primary: `#262626` (Dark Slate) — backgrounds, surfaces
- Secondary: `#f2f2f2` (Light Gray) — text on dark, borders

**Fonts:** Impact (headings, uppercase, system font) | Inter (body/UI, Google Fonts CDN, Sandur Group family font)

**Icons:** `@mui/icons-material` only. No other icon libraries except for social media icons and if a content-matching icon not found in MUI.

**Logos:** `src/assets/images/` — SVG + PNG for logo and YT banner

**Social:**
YouTube: https://www.youtube.com/@SandurProductions |
LinkedIn: https://www.linkedin.com/company/sandur-productions/ |
Instagram: https://www.instagram.com/sandur_productions/ |
Threads: https://www.threads.com/@sandur_productions
(Referenced in JSON-LD `sameAs` in `index.html`)

## Structure

```
src/
├── components/{layout,sections,seo,ui}/  ← React components
├── context/ThemeContext.tsx               ← Dark/Light theme provider
├── locales/{en,hi,kn}/common.json        ← i18n translations
├── pages/HomePage.tsx                     ← Main SPA page
├── scss/{abstracts,base,components,layout,pages,themes,vendors}/main.scss  ← 7-1 SCSS
├── test/{setup.ts,i18n-test.ts,test-utils.tsx}  ← Test infrastructure
├── i18n.ts                                ← i18n config
├── App.tsx → main.tsx                     ← Entry chain
public/{robots.txt,sitemap.xml}           ← SEO files
.agents/{AGENTS.MD,dumps/MEMORY_DUMP.MD}  ← AI agent context
```

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

## i18n

`react-i18next` — config in `src/i18n.ts`, imported in `main.tsx` before App.
Languages: **en** (default/fallback), **hi**, **kn** — files in `src/locales/{lang}/common.json`.
- Never hardcode user-facing strings — use `t('section.key')`
- Add all 3 languages when adding new strings
- Detection: localStorage → browser → HTML lang (no query params)
- ⏳ Route-based i18n (`/:lang/`) planned via **TanStack Router**

## SEO

`index.html`: meta tags (OG, Twitter Card, robots), JSON-LD `@graph` (Organization, WebSite, WebPage, CreativeWork×2).
`robots.txt`: allows AI bots (GPTBot, PerplexityBot, ClaudeBot, Google-Extended), blocks CCBot.
⏳ Canonical URL and OG image pending (domain not finalized).

## SPA Sections

`/` → `#hero` (brand statement) | `#works` (THE SCAM + UTTARA) | `#about` | `#contact`
Router: **TanStack Router** (to be installed for route-based i18n)

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

1. No phone numbers or domains in code (TBD)
2. All colors from 3 bases only — never add arbitrary colors
3. Material Icons only — no other icon libs
4. Use `var(--color-*)` for theme-reactive colors, SCSS vars for static tokens
5. Pre-revenue — minimal dependencies
6. Router: TanStack Router (for route-based i18n)

## Memory Dumps

**Read `.agents/dumps/MEMORY_DUMP.MD` at session START.** Append a dated entry at session END with: what was done, decisions, open items, gotchas. Never delete entries.
