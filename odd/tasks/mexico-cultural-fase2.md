# Feature: mexico-cultural-fase2 — Sitio final Fase 2 UNAD

## Objective
Evolucionar prototipo a sitio final presentable Fase 2 sin reconstruir, sobre base Multi-Page estatica.

## Problem
Wireframe con placeholders, identidad monocromatica, i18n falso, links muertos (#galeria/#contacto), nav ES/EN mezclado.

## Why
Actividad Fase 2 Programacion Web 213025 UNAD: coherencia con Fase 1 + accesibilidad + bilinguismo real ES/EN.

## Scope
IN: 3 paginas ES + 3 EN espejo, assets/img local SVG, paleta #E65100/#4A148C/#FDD835 minimalista, links reales, footer academico sin sociales falsas, a11y, responsive 360/768/1280, file:// sin build.
OUT: React/Vue/npm/build/backend/DB/API/SPA, rediseño total, contenido inventado, botones falsos.

## Constraints
- file:// doble clic, rutas relativas, sin dependencias externas runtime
- No inventar datos historicos, conservar contenido cultural
- Mono-repo simple, Conventional Commits, work-unit commits en feature branch

## Authorized scope
Prompt aprobado por usuario 2026-09-23: implementacion completa Fase 2 segun Improved Prompt Final. Push/PR/merge decision del usuario.

## Acceptance criteria
- [ ] 6 paginas abren por file:// con fotos visibles, 0 placeholders
- [ ] Toggle ES<->EN navega a par real, sin mezcla idiomas
- [ ] 0 href a #galeria / #contacto inexistente
- [ ] Toda img con alt especifico, h1 unico, :focus-visible, lang correcto
- [ ] Paleta visible en CTA/acentos, estetica editorial intacta
- [ ] 360px sin scroll horizontal

## Applicable checks
- Abrir 6 paginas file://, grep image-placeholder/#galeria/IMAGEN=0, grep img sin alt=0, recorrido ES-EN, tab focus, 360/768/1280, consola sin errores
- TDD: OFF (sin runner, sin framework test en repo). Fuente: config ausente + decision implicita proyecto estatico academico. Checks funcionales ordinarios.

## Delivery strategy
ask-on-risk (default). Forecast ~700 lineas autoradas (3 EN nuevas ~400 + edits + CSS). Supera 400 -> documentar slices por commits work-unit, sin PR automatico (repo academico local).

## Route declaration
Ruta: delegated direct intentada -> fallback direct inline (Task explore fallo: free tier solo dentro OpenCode). Triggers: mapping 4+ files (fired, fallback inline por runtime), writer 2+ files (fired, inline por runtime sin subagentes).

## Tasks
- [ ] T1 CSS identidad/a11y (tokens, focus, img, CTA naranja, tags morados) — evidencia: styles.css diff
- [ ] T2 assets/img 10 SVG locales (hero, muertos, mariachi, gastro, origen, cempasuchil, guelaguetza, patrimonio, mole, tacos, bebidas) — evidencia: ls assets/img
- [ ] T3 index.html ES (imgs, links a festivals/gastronomy, toggle a index-en, footer UNAD, roles cleanup) — evidencia: commit
- [ ] T4 festivals.html ES (imgs, CTA->gastronomy, footer, a11y) — evidencia: commit
- [ ] T5 gastronomy.html ES (imgs, footer, a11y) — evidencia: commit
- [ ] T6 3 paginas EN espejo + script.js active EN — evidencia: 3 files + commit
- [ ] T7 verificacion final (greps, file://, responsive, a11y) — evidencia: reporte

## Progress
- 2026-09-23 branch feature/mexico-cultural-fase2 creada desde main a15035b

## Verification evidence
- pendiente

## Next step
- T1 CSS

## Rationale
- SVG local: offline, 0 deps, presentable academico, evita hotlink/internet (decision usuario Local assets/img)
- Duplicacion EN: simple, file:// compatible, sin JS i18n (preferencia prompt)
- CTA festivals->gastronomy: unica pagina real afin existente, evita galeria ficticia
- Footer sin sociales: no inventar, credito UNAD real

## Verification evidence (2026-09-23)
- Placeholders HTML: 0 (grep image-placeholder/IMAGEN=0)
- #galeria: 0, #contacto solo a footer existente id=contacto (ES) / id=contact (EN) -> valido
- IMG 22/22 con alt especifico por idioma
- h1 unico en las 6 paginas verificado
- lang es/en correcto, skip-link, :focus-visible, tokens cempasuchil/obispo/fiesta presentes
- Commits: 28a193e diseno+assets, 6192f88 ES+script, e561bef EN+tracking. Branch feature/mexico-cultural-fase2. Push/PR pendientes decision usuario.
- Limitacion honesta: SVG ilustrativos locales (no fotos). Reemplazables 1:1 por jpg/webp en misma ruta. Sin servidor/build verificado por estructura file:// + rutas relativas.
