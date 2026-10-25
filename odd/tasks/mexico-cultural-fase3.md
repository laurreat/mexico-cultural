# Fase 3 — Accesibilidad y adaptabilidad

Branch: `feature/mexico-cultural-fase3`
Base: `main` @ 946db6a (worktree clean; only untracked `.atl/` from tooling)

## Objective

Complete Phase 3 of the UNAD "Programación Web" course on the existing bilingual
México Cultural site: WCAG 2.2 AA accessibility corrections and responsive
adaptability, preserving the visual identity, content, bilingual pages and
existing behaviour.

## Problem

The site was audited page by page. It already had good foundations (semantic
landmarks, one `h1` per page, complete `alt` text, skip link, visible focus ring,
no broken assets). The real defects found:

1. **No navigation below 768px.** `css/styles.css:113-117` set `.nav { display: none }`
   and only restored it at `min-width: 768px`. On phones Festivales, Gastronomía
   and Contacto were unreachable. (WCAG 1.3.1, 2.4.1)
2. **Muted body text at 3.28:1.** `--muted-foreground: #8e8e8e` on `#ffffff`
   drove nav links, hero/page descriptions, card/tradition/heritage descriptions.
   Requires 4.5:1. (1.4.3)
3. **Copyright at 1.35:1.** `.footer-bottom` `opacity: .2` multiplied by
   `.copyright` `opacity: .5` composited to 10% alpha on the footer background. (1.4.3)
4. **Dark-mode CTA button invisible (1.04:1) and yellow tag at 1.34:1.**
   `.cta-card` inverts to a light card in dark mode while `.btn-outline` and
   `.cta-tag` kept hard-coded light colours. (1.4.3)
5. **`.btn-primary:hover` at 3.79:1** (white 12px bold on `#E65100`). (1.4.3)
6. **`.card:hover .card-link` at 4.17:1** from `opacity: .6`. (1.4.3)
7. **Dark-mode footer secondary text at 3.06:1–4.11:1.** (1.4.3)
8. **Language links ~14px tall** (`.lang-toggle a` padding `0 .15rem`), below the
   24px target minimum, with only an 8px gap between ES and EN. (2.5.8)
9. **`aria-label` on a plain `div`** (`.lang-toggle`) was inert. (1.3.1)
10. **Three identical "Leer mas"/"Read more" link names per home page** pointing
    to different destinations. (2.4.4)
11. **Sticky header obscured scroll targets** — no `scroll-margin-top`. (2.4.11)
12. **`white-space: nowrap` on `.btn`** could not survive text-spacing overrides
    (1.4.12) and could overflow at 200% zoom on small screens.
13. **`.cards-grid` jumped 1 column -> 3 columns at 768px**, giving ~213px cards at
    tablet portrait width.
14. **Reduced-motion block only killed transitions**, not the hover `translateY`.
15. **Missing favicon** produced a console 404 (Lighthouse best practices).
16. **Relative `hreflang` alternates** are invalid for Lighthouse/Google and the
    site has no fixed domain.
17. **Pre-existing UTF-8 BOM** in the 6 HTML files blocked `html-validate`.

## Scope

In: `css/styles.css`, `script.js`, the 6 HTML pages, Phase 3 documentation.
Out: content rewrite, new frameworks, build tooling, visual redesign, the
"Contacto" content decision (documented as pending), dead `.image-placeholder`
CSS removal (kept to avoid review noise), image re-encoding.

## Route

Substantial, 8 files, 1 writer delegated (writer trigger: 2+ non-trivial files).
Verification is a bounded parent action (html-validate, Node, Playwright + Edge,
axe-core, Lighthouse) plus screenshots. TDD: not configured in this project ->
ordinary functional checks.

## Tasks

- [x] T1 Branch `feature/mexico-cultural-fase3` + this document + Engram mirror
- [x] T2 CSS contrast corrections (items 2,3,4,5,6,7 + font sizes 10px -> 11px)
- [x] T3 CSS responsive navigation (mobile disclosure), focus/scroll hardening,
      reduced motion, text-spacing safe buttons, fluid cards grid
- [x] T4 HTML x6: nav disclosure button, lang switcher as labelled `nav`,
      `aria-current="page"`, `tabindex="-1"` on `main`, distinct card link names,
      footer language group, Fase 3 credit
- [x] T5 `script.js`: progressive enhancement for the nav disclosure, dead
      `#inicio` branch removed, active-link logic intact
- [x] T6 Verification: HTML validation, asset/link integrity, contrast math,
      axe-core, keyboard, no-JS, reflow, Lighthouse, screenshots
- [x] T7 Documentation `docs/fase-3/INFORME_FASE3.md`
- [x] T8 Follow-ups from measurement: 24x24 language targets, favicon, drop
      relative hreflang, strip BOM, move `.js` class to `<head>` to remove CLS

## Acceptance criteria

- Every page reachable and navigable on 320px and 360px viewports without
  horizontal scroll.
- ES and EN pages keep working language switching and active nav state.
- No text/background pair below 4.5:1 (normal) or 3:1 (large/UI) in light or dark.
- Keyboard: skip link, disclosure button, nav links and lang links all usable
  with a visible focus indicator.
- All existing content, imagery and identity preserved.
- Real command output recorded; nothing invented.

All criteria verified (see below).

## Verification evidence

### Commits

```
1321374  fix(css): raise text contrast to WCAG AA and repair dark mode CTA
ed10725  feat(css): add mobile navigation and fluid responsive layout
c29a0db  fix(html): expose language switcher and label repeated links
5affc42  feat(js): progressive-enhance the mobile navigation disclosure
e1b03e0  fix(css): enlarge language switcher targets to 24x24
d940bda  fix(html): add favicon and drop invalid relative hreflang alternates
fe833f5  perf(js): apply js class in head to prevent nav layout shift
```

Diff vs base `946db6a`: 9 files, +323 / -108.

### HTML validation

`npx html-validate index.html index-en.html festivals.html festivals-en.html gastronomy.html gastronomy-en.html`
-> exit 0, zero messages. (Base failed only on `no-utf8-bom`.)

### axe-core

Tags `wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa`; 6 pages x light/dark = 12 runs.
**0 violations in all 12.** Control run with `alt` removed at runtime detected
`image-alt (critical) x4`, proving the harness is live.

### Contrast (computed, WCAG formula)

All 15 measured pairs pass. Before -> after highlights: nav 3.28 -> 5.02;
copyright 1.35 -> 7.90; dark CTA button 1.04 -> 14.69; dark CTA tag 1.34 -> 5.51;
button hover 3.79 -> 7.13; card-link hover 4.17 -> 6.69; dark footer 3.06-4.11 -> 5.58.

### Lighthouse 13.5.0 (mobile, local http.server)

| Page | Perf before/after | A11y before/after | BP before/after | SEO | CLS |
|---|---|---|---|---|---|
| index.html | 90 / 90 | 95 / **100** | 96 / **100** | 100 | 0 |
| index-en.html | 90 / 90 | 95 / **100** | 96 / **100** | 100 | 0 |
| festivals.html | 100 / 100 | 95 / **100** | 96 / **100** | 100 | 0 |
| festivals-en.html | 100 / 100 | 95 / **100** | 96 / **100** | 100 | 0 |
| gastronomy.html | 93 / 93 | 95 / **100** | 96 / **100** | 100 | 0 |
| gastronomy-en.html | 100 / 100 | 95 / **100** | 96 / **100** | 100 | 0 |

Baseline failing a11y audit: `color-contrast` only. Baseline BP failure:
`errors-in-console` (favicon 404). Both resolved.

Regression found and fixed: the mobile disclosure initially produced CLS 0.183
(menu painted open, then collapsed). Moving `document.documentElement.classList.add('js')`
into an inline `<head>` script restored CLS 0 and kept the no-JS fallback.

### Keyboard (360px)

skip link -> `main#contenido`; toggle reachable with 3px orange outline; Enter sets
`aria-expanded=true`, nav 162px; nav links 360x40; Escape closes, returns focus;
collapsed nav not in tab order; ES/EN 24x24.

### No-JS fallback (360px)

`{"navDisplay":"flex","navHeight":161,"toggleDisplay":"none","links":4,"overflow":0}`

### Reflow / overflow

6 pages x 6 widths (320, 360, 390, 768, 1024, 1440) x 2 schemes: 0 px horizontal
overflow. 320px @ density 2x on index/gastronomy/gastronomy-en: 0 overflow, no
element outside viewport.

### Integrity

128 `href`/`src` references: 0 missing files. 14 internal anchors resolve. ES<->EN
pairs correct in both directions. 0 console errors in 12 runs.

### Screenshots

`docs/fase-3/capturas/` — 10 PNG files (dimensions verified non-empty). Visual
review by a human is still pending because this agent cannot interpret images.

## Next step

Report delivered at `docs/fase-3/INFORME_FASE3.md`. Nothing pushed. Pending human
checks: visual review of screenshots, screen-reader test, physical devices, native
200% browser zoom.
