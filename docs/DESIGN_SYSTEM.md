# Design System: "Beep to Receipt"

**Version:** 3.0  
**Concept:** Physical Computing Journey & Thermal Receipt Ledger  
**Target:** WCAG 2.2 AA Contrast, Zero-Pill Discipline, Non-Color Status Encoding

---

## 1. Color Palette & Surface Tokens

| Token Name | Hex Value | Purpose / Usage | WCAG AA Contrast |
| :--- | :--- | :--- | :--- |
| `--surface-canvas` | `#090D16` | Deep baseline dark canvas | Baseline background |
| `--surface-raised` | `#0F172A` | Lifted stratum card surface step 1 | Meets 4.5:1 with text-slate-200 |
| `--surface-overlay` | `#162036` | Detail inspector panels, popovers | Meets 4.5:1 with text-white |
| `--surface-terminal` | `#060911` | Deep well for CLI, trace guides, code | Meets 7:1 with text-slate-300 |
| `--accent-trace` | `#F59E0B` | Thermal trace laser line & active step | 3:1 graphical contrast against canvas |
| `--accent-trace-glow`| `rgba(245, 158, 11, 0.25)` | Subtle trace dispersion halo | Decorative only |
| `--structure-border` | `#1E293B` | Hairline 1px structural framing rules | 3:1 against surface steps |
| `--structure-subtle` | `#334155` | Secondary grid lines & tick marks | Non-text structural boundary |
| `--text-primary` | `#F8FAFC` | Primary headlines and high-emphasis labels | > 14:1 on canvas |
| `--text-secondary` | `#CBD5E1` | Body reading text, descriptions (60-75ch) | > 8:1 on canvas |
| `--text-muted` | `#94A3B8` | Monospace coordinates, timestamps, layers | > 4.5:1 on canvas |
| `--paper-bg` | `#FAF8F5` | Authentic thermal receipt & Plain view bg | Light theme document surface |
| `--paper-ink` | `#1C1917` | High-contrast thermal ink imprint text | > 15:1 on paper-bg |
| `--paper-rule` | `#E7E5E4` | Perforated receipt rules & tear-lines | Non-text visual divider |

---

## 2. Evidence Status Encoding (Shape + Pattern + Text, NEVER Color Alone)

To satisfy Rule 1 and WCAG 2.2 Non-Color Encoding, evidence statuses are visually and textually differentiated across all views:

1. **Professional (`professional`)**
   * Visual Shape: Solid Filled Diamond (`◆`)
   * Fill Pattern: Solid high-contrast glyph + solid border
   * Text Label: `[PROFESSIONAL]`
   * Definition: Verified paid employment substantiation. Requires `evidenceRef`.
2. **Project (`project`)**
   * Visual Shape: Solid Filled Hexagon / Square (`■`)
   * Fill Pattern: Heavy bordered square
   * Text Label: `[PROJECT]`
   * Definition: Completed personal/academic system implementation. Requires `evidenceRef`.
3. **Experiment (`experiment`)**
   * Visual Shape: Hollow Triangle / Delta (`△`)
   * Fill Pattern: Outlined glyph with tick-mark
   * Text Label: `[EXPERIMENT]`
   * Definition: Working browser-run simulation or interactive tool built for this portfolio.
4. **Foundation (`foundation`)**
   * Visual Shape: Circle with Crosshair (`⊕`)
   * Fill Pattern: Concentric stroke
   * Text Label: `[FOUNDATION]`
   * Definition: Formally accredited degree, certification, or academic coursework.
5. **Learning (`learning`)**
   * Visual Shape: Unfilled Circle (`○`)
   * Fill Pattern: Dashed perimeter
   * Text Label: `[LEARNING]`
   * Definition: Active technical study and ongoing investigation.
6. **Exploring (`exploring`)**
   * Visual Shape: Dotted Compass Needle (`◇`)
   * Fill Pattern: Dotted boundary
   * Text Label: `[EXPLORING]`
   * Definition: Roadmap curiosity item on Aries' future horizons list.

---

## 3. Typography System

* **Primary Family:** `Plus Jakarta Sans`, system-ui fallback (font-display: swap).
* **Code & Monospace Family:** `JetBrains Mono`, ui-monospace fallback with `font-feature-settings: "tnum" 1` (tabular numerals).
* **Fluid Scale Tokens (`clamp()` math):**
  * Display Headline: `clamp(2rem, 1.6rem + 2vw, 3.25rem)` (32px to 52px)
  * Stratum Title: `clamp(1.5rem, 1.25rem + 1.2vw, 2.25rem)` (24px to 36px)
  * Section Eyebrow: `clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)` (12px to 13px)
  * Body Reading: `clamp(0.9375rem, 0.9rem + 0.15vw, 1.0625rem)` (15px to 17px) — constrained to `max-w-[68ch]`
  * Micro Metadata: `0.6875rem` to `0.75rem` (11px to 12px)
* **Zero-Pill Discipline:**
  * Static metadata rendered as unboxed typography separated by `·` or `/`.
  * No rounded candy chips or pill capsules wrapping dates, tags, or categories.
  * Interactive tabs are styled as clean segmented controls with button semantics.

---

## 4. Spacing, Grid & Layout Geometry

* **Base Unit:** 8px rhythm.
* **Layout Grid:**
  * Desktop (1024px+): 12-column grid with side rail and 1280px max-width container.
  * Tablet (768px–1023px): 8-column layout with split canvas/list.
  * Mobile (360px–767px): 4-column single flow, top progress bar, no horizontal overflow.
* **Nested Radius Formula:**
  $r_{\text{inner}} = r_{\text{outer}} - \text{padding}$
  * Card outer $r=16\text{px}$, inner item padding $12\text{px} \rightarrow r_{\text{inner}}=4\text{px}$ to $8\text{px}$.

---

## 5. Motion Principles

* **Durations:** Fast: `120ms` (hover, active), Normal: `200ms` (fade, toggle), Slow: `320ms` (drawer, tab switch).
* **Signature Dynamic:** Things **trace, print, and settle**.
  * Continuous SVG trace line progresses downwards with scroll position.
  * Thermal receipt lines print sequentially in under 1.5 seconds on view entry (instantly skippable and disabled under `prefers-reduced-motion`).
  * No continuous spinning particles or disorienting 3D tumbling.
* **Reduced Motion:** If `prefers-reduced-motion: reduce`, all transitions are instantaneous (`0ms`), trace lines are rendered fully static, and animations do not autoplay.

---

## 6. Accessibility & State Matrices

* **Interactive States:**
  * Default: Clear 1px boundary, WCAG AA text contrast.
  * Hover (pointer-only): Hairline highlight or subtle background lift.
  * Focus-Visible: 2px high-visibility amber/sky ring with `2px` offset (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  * Active / Pressed: 1px downward translation or inset state.
  * Disabled: Reduced opacity (0.4), `aria-disabled="true"`, pointer-events disabled.
