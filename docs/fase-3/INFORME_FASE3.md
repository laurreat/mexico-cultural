# Informe tecnico — Fase 3

**Proyecto:** Mexico Cultural (sitio bilingue ES/EN)
**Asignatura:** Programacion Web — UNAD
**Fase:** 3 — Accesibilidad (WCAG 2.2 AA) y diseno adaptable
**Rama:** `feature/mexico-cultural-fase3`
**Commit base:** `946db6a`
**Fecha de cierre:** 25 de octubre de 2026

---

## 1. Resumen ejecutivo

Se auditaron las 6 paginas del sitio (3 en espanol, 3 en ingles), la hoja de estilos
y el script. Se corrigieron los problemas reales encontrados, se agrego navegacion
movil accesible y se valido el resultado con pruebas ejecutadas: validacion HTML,
axe-core, calculo de contraste, Lighthouse, recorrido de teclado, escenario sin
JavaScript y reflow a 320 px.

Resultado medido en Lighthouse 13.5.0 (movil, todas las paginas):

| Metrica | Antes (`946db6a`) | Despues |
|---|---|---|
| Accesibilidad | 95 | **100** en las 6 paginas |
| Best practices | 96 | **100** |
| SEO | 100 | 100 |
| Performance | 90–100 | 90–100 (sin cambios) |
| CLS | 0 | **0** |

No se declara conformidad total con WCAG 2.2 AA: se declara que las comprobaciones
automatizadas y manuales listadas en la seccion 6 no arrojan fallos, y que quedan las
verificaciones humanas pendientes de la seccion 8.

---

## 2. Problemas encontrados

Clasificados por impacto. La columna "Criterio" referencia WCAG 2.2.

### 2.1 Criticos

| # | Problema | Evidencia | Criterio |
|---|---|---|---|
| 1 | Sin navegacion por debajo de 768 px: `.nav { display: none }` solo se restauraba en `min-width: 768px`. En movil, Festivales, Gastronomia y Contacto eran inalcanzables | `css/styles.css` (base, lineas 113–123) | 1.3.1, 2.4.1 |
| 2 | Texto secundario a 3.28:1 (`--muted-foreground: #8e8e8e` sobre blanco) en enlaces de nav, descripciones de hero y de tarjetas | calculo de contraste + `color-contrast` de axe | 1.4.3 |
| 3 | Copyright a 1.35:1: `opacity: .2` en `.footer-bottom` multiplicada por `opacity: .5` en `.copyright` | calculo de contraste | 1.4.3 |
| 4 | Modo oscuro: boton del CTA invisible (1.04:1, blanco sobre `#fafafa`) y etiqueta amarilla a 1.34:1 | calculo de contraste | 1.4.3 |

### 2.2 Importantes

| # | Problema | Evidencia | Criterio |
|---|---|---|---|
| 5 | `.btn-primary:hover` a 3.79:1 (texto blanco de 12 px sobre `#E65100`) | calculo de contraste | 1.4.3 |
| 6 | `.card:hover .card-link` a 4.17:1 por `opacity: .6` | calculo de contraste | 1.4.3 |
| 7 | Texto secundario del footer en modo oscuro entre 3.06:1 y 4.11:1 | calculo de contraste | 1.4.3 |
| 8 | Enlaces de idioma de ~14 px de alto, por debajo del minimo de 24×24 px, con 8 px de separacion | medicion en navegador | 2.5.8 |
| 9 | `aria-label` sobre un `div` (`.lang-toggle`): no aporta contexto programatico | inspeccion del DOM | 1.3.1 |
| 10 | Tres enlaces "Leer mas" / "Read more" con el mismo nombre accesible y destinos distintos por pagina de inicio | inspeccion del DOM | 2.4.4 |
| 11 | El header sticky tapaba el destino del enlace de salto y de `#contacto` | inspeccion + prueba de teclado | 2.4.11 |
| 12 | `.cards-grid` saltaba de 1 a 3 columnas en 768 px (tarjetas de ~213 px en tablet vertical) | medicion en navegador | 1.4.10 |

### 2.3 Menores

| # | Problema | Evidencia | Criterio |
|---|---|---|---|
| 13 | `white-space: nowrap` en `.btn` impedia sobrevivir a ajustes de espaciado de texto | inspeccion CSS | 1.4.12 |
| 14 | El bloque `prefers-reduced-motion` solo anulaba transiciones, no el `translateY` de hover | inspeccion CSS | 2.3.3 |
| 15 | Favicon ausente: 404 en consola registrado por Lighthouse | `errors-in-console` | — |
| 16 | `<link rel="alternate" hreflang>` con URL relativas: invalido para Lighthouse/Google y el sitio no tiene dominio fijo | auditoria `hreflang` | — |
| 17 | BOM UTF-8 en los 6 HTML: preexistente, impedia que `html-validate` pasara | `html-validate` | — |

---

## 3. Archivos modificados

| Archivo | Cambio |
|---|---|
| `css/styles.css` | Contraste, navegacion movil, layout fluido, foco, reduced motion, objetivos tactiles. +186 / −37 lineas |
| `script.js` | Disclosure del menu movil con mejora progresiva; se conserva la logica de enlace activo. +36 / −3 |
| `index.html`, `festivals.html`, `gastronomy.html` | Boton de menu, nav de idioma semantica, `tabindex="-1"` en `main`, nombres accesibles de tarjetas, favicon, sin BOM |
| `index-en.html`, `festivals-en.html`, `gastronomy-en.html` | Los mismos cambios con sus etiquetas en ingles (`Menu`, `Language`, `Change language`, `Read more: ...`) |
| `images/favicon.svg` | Nuevo. Icono SVG simple con la paleta del sitio |

### 3.1 Explicacion por archivo

**`css/styles.css`**
- `--muted-foreground` pasa de `#8e8e8e` a `#6f6f6f` (solo tema claro).
- `.nav` deja de ocultarse por defecto: es `flex` con `flex-wrap`, y el colapso movil
  se activa solo cuando existe la clase `.js` en `<html>`.
- Nuevo bloque movil (`max-width: 767px`): header con `flex-wrap`, nav en columna a
  ancho completo, `.nav-toggle` visible solo con `.js`.
- `.cards-grid` usa `repeat(auto-fit, minmax(16rem, 1fr))` desde 640 px.
- Footer: se eliminan las opacidades que hundian el contraste; el divisor se mantiene
  con `color-mix` bajo `@supports`.
- Botones: `:hover` con `--cempasuchil-darker` (`#9E3400`) y `.btn-outline` heredando
  color, con regla especifica para el CTA en modo oscuro.
- Foco visible de 3 px, `scroll-margin-top: 5.5rem` para el header sticky,
  `.visually-hidden`, y bloque de `prefers-reduced-motion` que anula tambien el
  `transform`.

**`script.js`**
- Agrega el comportamiento del boton de menu: `aria-expanded`, clase `is-open`,
  cierre con `Escape` devolviendo el foco, cierre al pulsar un enlace y al pasar a
  `>= 768 px`.
- Mantiene intacta la deteccion del enlace activo.
- La clase `.js` se aplica desde un script inline en el `<head>` de cada pagina (ver
  3.2), no desde este archivo.

**Los 6 HTML**
- Boton `.nav-toggle` con `aria-controls="primary-nav"` y texto solo para lectores de
  pantalla.
- `.lang-toggle` pasa de `div` a `nav` con etiqueta; `aria-current="true"` pasa a
  `aria-current="page"`.
- `<main tabindex="-1">` para que el enlace de salto mueva el foco de verdad.
- Nombres accesibles distintos en los tres enlaces de tarjeta de cada inicio.
- Footer: bloque de idioma como `nav` etiquetado.
- Credito del footer: `Fase 2` → `Fase 3`. Unico cambio de texto visible.

### 3.2 Correccion de una regresion propia

Al medir contra la linea base aparecio un CLS de **0.183** que no existia antes.
Causa: `script.js` aplicaba la clase `.js` al final del `<body>`, de modo que en red
lenta el navegador pintaba el menu movil abierto (header alto) y luego lo colapsaba.
Se movio esa marca a un script inline en el `<head>` de las 6 paginas:

```html
<script>document.documentElement.classList.add('js');</script>
```

Sin JavaScript el script no corre, la clase no existe y el menu sigue visible: la
mejora progresiva se conserva. CLS volvio a **0**.

### 3.3 Commits

```
1321374  fix(css): raise text contrast to WCAG AA and repair dark mode CTA
ed10725  feat(css): add mobile navigation and fluid responsive layout
c29a0db  fix(html): expose language switcher and label repeated links
5affc42  feat(js): progressive-enhance the mobile navigation disclosure
e1b03e0  fix(css): enlarge language switcher targets to 24x24
d940bda  fix(html): add favicon and drop invalid relative hreflang alternates
fe833f5  perf(js): apply js class in head to prevent nav layout shift
```

Nada fue publicado (`git push` no se ejecuto).

---

## 4. Mejoras de accesibilidad

| Area | Antes | Despues |
|---|---|---|
| Landmarks | `div` con `aria-label` para idioma | `nav` etiquetado en header y footer |
| Jerarquia | correcta (un `h1` por pagina) | sin cambios |
| Nombres accesibles | 3 enlaces "Leer mas" ambiguos | nombre distinto por tarjeta, empezando por el texto visible |
| Foco | anillo de 3 px ya existente | se conserva y se verifica en teclado |
| Salto de contenido | enlace presente, foco no se movia | `tabindex="-1"` en `main`: el foco llega al contenido |
| Objetivos tactiles | idioma 14 px de alto | 24×24 px; enlaces de nav movil 360×40 px |
| Contraste | 4 pares bajo AA (1.04 a 4.17) | todos los pares medidos ≥ 4.5:1 |
| Movimiento | transiciones anuladas, `transform` no | `transform` y `animation` anulados |
| Scroll | header tapaba el destino | `scroll-margin-top` en `main` y anclas |

### 4.1 Contraste medido (formula WCAG, no estimacion visual)

| Elemento | Antes | Despues |
|---|---|---|
| Nav y descripciones (claro) | 3.28:1 ❌ | 5.02:1 ✅ |
| Copyright (claro) | 1.35:1 ❌ | 7.90:1 ✅ |
| Boton CTA (oscuro) | 1.04:1 ❌ | 14.69:1 ✅ |
| Etiqueta CTA (oscuro) | 1.34:1 ❌ | 5.51:1 ✅ |
| `.btn-primary:hover` | 3.79:1 ❌ | 7.13:1 ✅ |
| `.card-link` en hover | 4.17:1 ❌ | 6.69:1 ✅ |
| Footer secundario (oscuro) | 3.06–4.11:1 ❌ | 5.58:1 ✅ |
| Texto de cuerpo | 15.33:1 ✅ | 15.33:1 ✅ |

---

## 5. Mejoras de diseno adaptable

- **Navegacion movil real**: boton de divulgacion de 44×44 px con `aria-expanded`,
  cierre con `Escape`, cierre al navegar y al superar 768 px.
- **Sin JavaScript**: el menu sigue visible y utilizable (161 px de alto, 4 enlaces),
  el boton se oculta.
- **Grillas fluidas**: `auto-fit` + `minmax(16rem, 1fr)`; 1 columna en movil,
  2 en tablet vertical, 3 desde 1024 px.
- **Sin desbordamiento horizontal** en 320, 360, 390, 768, 1024 y 1440 px, en tema
  claro y oscuro (0 px de `scrollWidth` extra en los 72 casos medidos).
- **Imagenes**: `width`/`height` presentes en las 4 imagenes de cada pagina, con
  `loading="lazy"` salvo el hero, que lleva `fetchpriority="high"`.
- **Reflow**: a 320 px con densidad 2× (equivalente funcional a 200 % de zoom) no hay
  desbordamiento en las paginas probadas.
- **Breakpoints justificados por contenido**: 640 px (grilla de tarjetas), 768 px
  (nav horizontal, dos columnas de texto), 1024 px (tres columnas).
- **Movimiento reducido**: respetado a nivel de transicion, animacion y transform.

---

## 6. Pruebas ejecutadas

Todo lo que sigue se ejecuto sobre el estado final. No hay resultados simulados.

### 6.1 Validacion HTML

```
npx html-validate index.html index-en.html festivals.html festivals-en.html gastronomy.html gastronomy-en.html
```

Resultado: **exit 0, sin mensajes**. (Antes fallaba solo por el BOM preexistente.)

### 6.2 axe-core

Motor: axe-core fijado por version en un entorno temporal fuera del repositorio.
Reglas: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`.
Alcance: 6 paginas × tema claro/oscuro = 12 combinaciones.

Resultado: **0 violaciones en las 12 combinaciones**.

Control de validez del arnes: al eliminar los `alt` en tiempo de ejecucion, axe
detecto `image-alt (critical) × 4`. Esto confirma que la corrida no es ciega.

### 6.3 Contraste

Calculado con la formula de luminancia relativa de WCAG sobre los pares reales de
color, independientemente de axe. Ver tabla 4.1: **15 de 15 pares pasan**.

### 6.4 Lighthouse 13.5.0

Servidor local `python -m http.server`, perfil movil por defecto de Lighthouse.

| Pagina | Perf. antes | Perf. despues | A11y antes | A11y despues | BP antes | BP despues | SEO | CLS |
|---|---|---|---|---|---|---|---|---|
| `index.html` | 90 | 90 | 95 | **100** | 96 | **100** | 100 | 0 |
| `index-en.html` | 90 | 90 | 95 | **100** | 96 | **100** | 100 | 0 |
| `festivals.html` | 100 | 100 | 95 | **100** | 96 | **100** | 100 | 0 |
| `festivals-en.html` | 100 | 100 | 95 | **100** | 96 | **100** | 100 | 0 |
| `gastronomy.html` | 93 | 93 | 95 | **100** | 96 | **100** | 100 | 0 |
| `gastronomy-en.html` | 100 | 100 | 95 | **100** | 96 | **100** | 100 | 0 |

En la linea base, la unica auditoria de accesibilidad que fallaba era
`color-contrast`. Las mejoras de best practices corresponden al favicon (se elimino
el 404 de consola) y al retiro de los `hreflang` relativos.

Performance no se movio respecto de la base. Las dos paginas de inicio y
`gastronomy.html` quedan en 90–93 por LCP de 3.3–3.8 s: es un comportamiento
preexistente, no una regresion.

### 6.5 Teclado (360 px)

| Paso | Resultado observado |
|---|---|
| Primer `Tab` | enlace "Saltar al contenido", anillo `solid 3px rgb(230, 81, 0)` |
| `Enter` en el salto | foco en `main#contenido` |
| `Tab` hasta el boton | `BUTTON.nav-toggle`, etiqueta "Menu", mismo anillo visible |
| `Enter` | `aria-expanded="true"`, nav `flex`, alto 162 px |
| `Tab` | primer enlace de nav ("Inicio"), 360×40 px |
| `Escape` | nav cerrado, `aria-expanded="false"`, foco devuelto al boton |
| `Tab` con menu cerrado | no entra al nav oculto; pasa al selector de idioma |
| Idiomas | ES y EN de 24×24 px, ambos alcanzables |

### 6.6 Sin JavaScript (360 px)

```json
{"navDisplay":"flex","navHeight":161,"toggleDisplay":"none","links":4,"overflow":0}
```

### 6.7 Reflow y desbordamiento

- 6 paginas × 6 anchos (320/360/390/768/1024/1440) × 2 temas: **0 px de
  desbordamiento horizontal**.
- 320 px con densidad 2× en `index.html`, `gastronomy.html`, `gastronomy-en.html`:
  **0 px de desbordamiento**, ningun elemento fuera del viewport.

### 6.8 Integridad de enlaces y recursos

128 referencias `href`/`src` revisadas en las 6 paginas: **0 archivos faltantes**.
Las 14 anclas internas (`#contenido`, `#content`, `#contacto`, `#contact`,
`#destacados`, `#featured`) resuelven a un `id` existente. Los pares ES↔EN apuntan
al archivo correcto en ambas direcciones.

### 6.9 Consola del navegador

**0 errores** de consola en las 12 combinaciones pagina/tema.

---

## 7. Lo que no se cambio y por que

- **Contenido y textos**: intactos. El sitio omite acentos deliberadamente; no se
  "corrigio" la ortografia para no alterar el trabajo entregado.
- **Identidad visual**: se conservaron paleta, tipografia, espaciados y estructura.
  Los unicos ajustes visuales son de contraste y de menu movil.
- **`#contacto`**: el enlace del nav apunta al `id="contacto"` del footer, que existe.
  No hay seccion de contacto como tal. Es una decision de contenido pendiente, no un
  defecto tecnico, y no se invento contenido nuevo.
- **CSS muerto** (`.image-placeholder`): se dejo como estaba para no mezclar limpieza
  con cambios funcionales.
- **Imagenes**: no se regeneraron ni recomprimieron; eso explica el LCP preexistente.

---

## 8. Pendientes y verificacion manual

Estos puntos **no** se ejecutaron y no deben presentarse como resueltos:

1. **Revision visual humana de las capturas.** El entorno automatizado genero las
   imagenes, pero este asistente no puede interpretar imagenes; la comprobacion de
   identidad visual queda para el autor.
2. **Lectores de pantalla reales** (NVDA en Windows, VoiceOver en macOS/iOS): no
   ejecutado. axe no sustituye una prueba con lector de pantalla.
3. **Dispositivos fisicos**: las pruebas usan emulacion de viewport, no hardware.
4. **Zoom nativo del navegador al 200 %**: se uso el proxy de 320 px con densidad 2×.
5. **LCP de 3.3–3.8 s** en `index.html`, `index-en.html` y `gastronomy.html`:
   preexistente. Mejorarlo requiere imagenes responsive (`srcset`, AVIF/WebP de menor
   resolucion) y queda fuera del alcance de la Fase 3.
6. **`hreflang`**: se retiro porque las URL relativas son invalidas para Lighthouse y
   el sitio no tiene dominio publicado. Si se publica en un dominio fijo, conviene
   reponer `link rel="alternate" hreflang` con URL absolutas.
7. **Contacto**: si la asignatura exige una seccion de contacto, hay que crearla; hoy
   el enlace lleva al footer.

### Verificacion manual sugerida (5 minutos)

1. Abrir `index.html` y redimensionar de 1440 a 320 px: el menu debe colapsar en un
   boton y abrir/cerrar sin desbordar.
2. Navegar solo con teclado: `Tab` debe mostrar siempre el anillo naranja de 3 px.
3. Activar el modo oscuro del sistema y revisar footer y CTA.
4. Desactivar JavaScript en DevTools y recargar: el menu debe seguir visible.
5. Ejecutar Lighthouse en Chrome/Edge sobre `index.html` en modo movil.

---

## 9. Capturas para el informe academico

Carpeta: `docs/fase-3/capturas/`

| Archivo | Que demuestra |
|---|---|
| `01-index-escritorio.png` | Identidad visual conservada en 1440 px |
| `02-index-tableta.png` | Grilla de 2 columnas en 768 px |
| `03-index-movil.png` | Layout de 1 columna en 360 px, sin desbordamiento |
| `04-index-movil-320.png` | Reflow en el ancho minimo exigido |
| `05-index-en-movil.png` | Version en ingles con el mismo comportamiento |
| `06-festivales-escritorio.png` | Segunda pagina con la misma estructura |
| `07-festivales-movil-oscuro.png` | Modo oscuro en movil con contraste corregido |
| `08-gastronomia-tableta.png` | Tercera pagina en tablet |
| `09-index-movil-menu-abierto.png` | Menu movil desplegado (162 px, 4 enlaces) |
| `10-foco-teclado-toggle.png` | Anillo de foco visible sobre el boton de menu |

Sugerencia para el documento: usar 03/04 para "diseno adaptable", 07 para "modo
oscuro", 09/10 para "navegacion accesible" y 01 para "identidad visual".

Si se necesita evidencia adicional, conviene capturar: Lighthouse con 100 en
accesibilidad, el panel de accesibilidad de DevTools y una prueba con lector de
pantalla.

---

## 10. Como ejecutar y verificar localmente

```powershell
# 1. Servir el sitio (necesario para Lighthouse; abrir con file:// tambien funciona)
python -m http.server 8099 --bind 127.0.0.1
# abrir http://127.0.0.1:8099/index.html

# 2. Validacion HTML
npx html-validate index.html index-en.html festivals.html festivals-en.html gastronomy.html gastronomy-en.html

# 3. Sintaxis del script
node --check script.js

# 4. Lighthouse (Edge o Chrome instalado)
$env:CHROME_PATH = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
npx lighthouse http://127.0.0.1:8099/index.html --only-categories=accessibility,performance,best-practices,seo --view
```

Para axe-core: extension "axe DevTools" en Chrome/Edge, o el paquete `axe-core`
inyectado desde un script de Playwright/Puppeteer.

---

## 11. Conclusion y limitaciones

El sitio pasa de 95 a 100 en accesibilidad medida por Lighthouse en las 6 paginas,
sin perder rendimiento y sin cambiar su identidad visual ni su contenido. Los
problemas corregidos eran reales y verificables: navegacion inexistente en movil,
cuatro combinaciones de color bajo AA, nombres de enlace ambiguos y objetivos
tactiles por debajo del minimo.

Limitaciones que deben declararse en la entrega:

- Las herramientas automatizadas detectan una parte de los problemas de accesibilidad;
  no certifican conformidad total con WCAG 2.2 AA.
- No se ejecutaron pruebas con lectores de pantalla ni en dispositivos fisicos.
- El rendimiento en las paginas con imagenes grandes sigue limitado por assets
  preexistentes, fuera del alcance de esta fase.

Este informe documenta unicamente resultados observados en las ejecuciones descritas.
