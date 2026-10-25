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

In: `css/styles.css`, `script.js`, the 6 HTML pages, Phase 3 documentation, and
(additive, T9) responsive WebP derivatives under `images/`.
Out: content rewrite, new frameworks, build tooling, visual redesign, the
"Contacto" content decision (documented as pending), dead `.image-placeholder`
CSS removal (kept to avoid review noise), modification or re-compression of the 12
original images.

T9 was added on explicit user request after the Phase 3 verification closed, so the
"image re-encoding" exclusion applies to the originals only: the derivatives are new
files and the originals remain untouched as the `src` fallback.

## Route

Substantial, 8 files, 1 writer delegated (writer trigger: 2+ non-trivial files).
Verification is a bounded parent action (html-validate, Node, Playwright + Edge,
axe-core, Lighthouse) plus screenshots. TDD: not configured in this project ->
ordinary functional checks.

T9 (image optimization) ran after the Phase 3 verification, on explicit user
request, as a measured loop: render widths measured first, variants generated with
local Pillow, the 6-file HTML edit applied by script, then before/after Lighthouse
runs. It never changed content, layout or compression quality of the originals.

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
- [x] T9 LCP optimization: 44 responsive WebP variants (480/640/800/1200),
      `srcset`/`sizes` on all 11 content images, `fetchpriority="high"` + no lazy
      on each page's first image; re-measured with 3 Lighthouse runs per page

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
c5b2d44  perf(images): add responsive WebP variants for all content images
c325e48  perf(html): serve responsive images and prioritize the LCP image
```

Diff vs base `946db6a`: 9 text files, +323 / -108, plus 44 new WebP binaries
(`c5b2d44`, 4.15 MB on disk; one variant is downloaded per image at runtime).

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

Final state, median of 3 runs per page (LCP was bimodal before T9, so a single run
was not representative).

| Page | Perf | A11y | BP | SEO | LCP median | CLS | Bytes |
|---|---|---|---|---|---|---|---|
| index.html | 99 | 100 | 100 | 100 | 2.19 s | 0 | 313 KB |
| index-en.html | 99 | 100 | 100 | 100 | 2.19 s | 0 | 313 KB |
| festivals.html | 100 | 100 | 100 | 100 | 1.41 s | 0 | 249 KB |
| festivals-en.html | 100 | 100 | 100 | 100 | 1.82 s | 0 | 249 KB |
| gastronomy.html | 100 | 100 | 100 | 100 | 1.85 s | 0 | 320 KB |
| gastronomy-en.html | 99 | 100 | 100 | 100 | 1.96 s | 0 | 320 KB |

Accessibility went 95 -> 100 and best practices 96 -> 100 in the Phase 3 commits
(the baseline failures were `color-contrast` and `errors-in-console` from the
favicon 404). Both resolved.

Regression found and fixed: the mobile disclosure initially produced CLS 0.183
(menu painted open, then collapsed). Moving `document.documentElement.classList.add('js')`
into an inline `<head>` script restored CLS 0 and kept the no-JS fallback.

### LCP optimization (T9)

Diagnosis: `image-delivery-insight` estimated 567-573 KiB of waste; all 11 images
were served at 1448x1086 while rendering at 270-718 px. In `gastronomy*` the LCP
element was the first `heritage-image` with `loading="lazy"` (`lcp-discovery-insight`
= 0). In `index*` the hero was already discoverable and prioritized; its 3.8 s was
the simulated transfer of 266 KB, not server or CPU time.

Applied: 44 WebP variants (11 x 480/640/800/1200, Pillow LANCZOS, quality 82,
method 6), `srcset` with the untouched original as the 1448w step and `src`
fallback, container-derived `sizes`, and `fetchpriority="high"` with no lazy on the
first image of `gastronomy*` and `festivals*`. No `<link rel="preload">`: the
resource was already discoverable, so the fix was priority, not discovery.

| Page | LCP before | LCP after | Change | Perf | Bytes |
|---|---|---|---|---|---|
| index.html | 3.77 s | 2.19 s | -42% | 89 -> 99 | 731 -> 313 KB |
| index-en.html | 3.71 s | 2.19 s | -41% | 90 -> 99 | 731 -> 313 KB |
| gastronomy.html | 3.27 s | 1.85 s | -44% | 93 -> 100 | 743 -> 320 KB |
| gastronomy-en.html | 1.25 s | 1.96 s | +58%* | 100 -> 99 | 742 -> 320 KB |

\* Lucky branch of a bimodal distribution. Pooling both gastronomy pages: 6 runs
before median 2.26 s / worst 3.33 s; after median 1.94 s / worst 1.98 s. The
bimodality is gone.

`festivals*` has no 3-run baseline (single Phase 3 run: 0.9 s / 1.2 s at 554 KB).
Same LCP element, unchanged FCP, identical Lighthouse version and throttling: the
observed difference is recorded as simulation variance, not improvement or
regression. `image-delivery-insight` dropped to 66-86 KiB per page.

No-visual-regression evidence: variant SSIM 0.9979-0.9992 against the LANCZOS
reference; bytes-per-pixel 1.4x-2.6x the original; browser-rendered PSNR 28.0-33.5
dB with gradient energy 0.86x-1.14x (4 of 6 at or above 1.0, i.e. resampling
variance, not systematic softening); 18 before/after screenshots at PSNR 34.9-38.6
dB full page, 43.5 dB open menu, 99.0 dB focus crop (identical). `currentSrc`
verified: 412@1.75 -> 640, 390@1 -> 480, 390@2 -> 800, 1280@2 -> 1200, 768 -> 800
on cards.

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

169 local paths checked across the 6 pages (86 `href`, 28 `src`, 55 `srcset`
entries): 0 missing files. 14 internal anchors resolve. All 11 HTML-referenced
images have `srcset`; all 44 variants are referenced (0 orphans); ES<->EN pairs
correct in both directions. 0 console errors in 12 runs. The 12 original images are
unmodified (`git status` shows no ` M` under `images/`).

### Screenshots

`docs/fase-3/capturas/` — 10 PNG files (dimensions verified non-empty), captured
before T9 and intentionally not overwritten: they serve as the "before" evidence.
Same dimensions as the final state; diff 34.85-38.57 dB, focus crop identical.
Visual review by a human is still pending because this agent cannot interpret
images.

## Next step

Report delivered at `docs/fase-3/INFORME_FASE3.md`. Nothing pushed. Pending human
checks: visual review of screenshots and of the image variants, screen-reader test,
physical devices, native 200% browser zoom. Optional: close the residual 66-86 KiB
by lowering WebP quality or moving to AVIF — deliberately not done without author
approval.
