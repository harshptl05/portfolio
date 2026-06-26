---
name: hamishw-design
description: Design system skill for hamishw. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX.
---

# hamishw Design System

You are building UI for **hamishw**. Dark-themed, neutral palette, sans-serif typography (IPA Gothic), standard density on a 10px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![hamishw Homepage](screenshots/homepage.png)

> Read `references/DESIGN.md` for full token details.

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Type pairing** — IPA Gothic for body/UI text, Gotham for headings/display. Never introduce a third typeface.
- **standard density** — 10px base grid. Every dimension is a multiple of 10.
- **neutral palette** — the color temperature runs neutral, matching the sans-serif typography.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#111111` | Page/app background |
| Surface | `--surface` | `#000000` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#ffffff` | Headings, body text |

### CSS Variable Tokens

```css
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(96.12%0 0);
--backgroundLight: var(--white);
--primary: var(--black);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(96.12%0 0);
--backgroundLight: var(--white);
--primary: var(--black);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
```

## Typography

### Font Stack

- **IPA Gothic** — Heading 1, Heading 2, Heading 3
- **Gotham** — Body, Caption

### Font Sources

```css
@font-face {
  font-family: "Gotham";
  src: url("fonts/Gotham-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Gotham";
  src: url("fonts/Gotham-700.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "IPA Gothic";
  src: url("fonts/IPAGothic-Regular.woff2") format("woff2");
  font-weight: 400;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | IPA Gothic | 1.5rem | 700 |
| Heading 2 | IPA Gothic | 1.375rem | 700 |
| Heading 3 | IPA Gothic | 1.125rem | 700 |
| Body | Gotham | var(--fontSizeBodyS) | 400 |
| Caption | Gotham | var(--fontSizeBodyM) | 400 |

### Typography Rules

- Body/UI: **IPA Gothic**, Headings: **Gotham** — these are the only display fonts
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 10px

Every dimension (margin, padding, gap, width, height) must be a multiple of **10px**.

### Spacing Scale

`10, 20, 30, 40, 50, 60, 70, 80, 120, 140, 160` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 5-10px | Tight: related items within a group |
| 20px | Medium: between groups |
| 30-40px | Wide: between sections |
| 60px+ | Vast: major section breaks |

### Border Radius

Scale: `4px, 20px`
Default: `20px`

### Container

Max-width: `1040px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| xs | 400px |
| md | 696px |
| lg | 820px |
| xl | 1040px |
| xl | 1190px |
| xl | 1200px |
| 2xl | 1680px |
| 2xl | 2080px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #000000;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 0 0 4px var(--background),0 0 0 8px var(--text);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #444444;
  color: #ffffff;
  border-radius: 20px;
  padding: 20px 30px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #444444;
  color: #ffffff;
  border-radius: 20px;
  padding: 20px 30px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #111111;
  border: 1px solid #444444;
  border-radius: 20px;
  padding: 20px 30px;
  color: #ffffff;
  font-size: 14px;
}
.input:focus { border-color: var(--accent); outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #000000;
  color: #8c8c8c;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #000000;
  border-radius: 20px;
  padding: 30px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 50px 100px -20px color-mix(in lab,var(--black) 25%,transparent),0 30px 60px -30px color-mix(in lab,var(--black) 30%,transparent);
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 20px 30px;
  font-weight: 500;
  font-size: 12px;
  color: #8c8c8c;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #444444;
}
.table td {
  padding: 30px;
  border-bottom: 1px solid #444444;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px 30px;
}
.nav-link {
  color: #8c8c8c;
  padding: 20px 30px;
  border-radius: 20px;
  transition: color 150ms;
}
.nav-link:hover { color: #ffffff; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (7 items)
- **Hero** — Hero section (detected from heading structure)
- **Footer** — Page footer with links and info (1 items)
- **Faq** — FAQ/accordion section

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `_loaderSpan_1o1zt_1`
- `fade-in`
- `reveal`
- `_introTextReveal_x8c4c_1`
- `_introLine_x8c4c_1`

### Motion Tokens

- **Duration scale:** `0ms`, `.8s`, `1.5s`, `100ms`, `200ms`, `400ms`, `500ms`, `1000ms`, `1200ms`, `1400ms`, `2000ms`, `5000000ms`
- **Easing functions:** `ease`, `cubic-bezier(.8,.1,.27,1)`, `linear`
- **Animated properties:** `transform`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (0ms) for micro-interactions, long (5000000ms) for page transitions
- **Easing:** Use `ease` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `inset 0-2px 0 0 var(--inputUnderlineColor)`
- Raised (cards, buttons): `0 0 0 4px var(--background),0 0 0 8px var(--text)`
- Overlay (modals, dialogs): `0 50px 100px -20px color-mix(in lab,var(--black) 25%,transparent),0 30px 60px -30px color-mix(in lab,var(--black) 30%,transparent)`
- Overlay (modals, dialogs): `0 0 0 1000px color-mix(in lab,var(--text) 10%,transparent) inset`

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 10px
- **No extra fonts** — only IPA Gothic and Gotham are allowed
- **No arbitrary border-radius** — use the scale: 4px, 20px
- **No opacity for disabled states** — use muted colors instead
- **No pill shapes** — this design doesn't use rounded-full / 9999px radius

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — IPA Gothic, Gotham only, using the type scale
4. **Build layout** on the 10px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://hamishw.com`
- **Brand typeface:** IPA Gothic

## Quick Reference

```
Background:     #111111
Surface:        #000000
Text:           #ffffff / (not extracted)
Accent:         (not extracted)
Border:         (not extracted)
Font:           IPA Gothic
Spacing:        10px grid
Radius:         20px
Components:     7 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for hamishw
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "hamishw" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# hamishw DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 3 · Fonts: 2 · Components: 7
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![hamishw Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a neutral tone. Depth is expressed through layered shadows and subtle surface color variation. Typography pairs **Gotham** for display/headings with **IPA Gothic** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **10px base grid** (standard density), with scale: 10, 20, 30, 40, 50, 60, 70, 80px. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| theme-color | `#111111` | background | Page background, darkest surface |
| surface | `#000000` | surface | Card and panel backgrounds |
| text-primary | `#ffffff` | text-primary | Headings and body text |

### CSS Variable Tokens

```css
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(96.12%0 0);
--backgroundLight: var(--white);
--primary: var(--black);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(96.12%0 0);
--backgroundLight: var(--white);
--primary: var(--black);
--accent: oklch(84.42%0.19 202.24);
--background: oklch(17.76%0 0);
--backgroundLight: oklch(21.78%0 0);
--primary: oklch(84.42%0.19 202.24);
--accent: oklch(84.42%0.19 202.24);
```


---

## 3. Typography Rules

**Font Stack:**
- **IPA Gothic** — Heading 1, Heading 2, Heading 3
- **Gotham** — Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "Gotham";
  src: url("fonts/Gotham-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Gotham";
  src: url("fonts/Gotham-700.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "IPA Gothic";
  src: url("fonts/IPAGothic-Regular.woff2") format("woff2");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | IPA Gothic | 1.5rem | 700 |
| Heading 2 | IPA Gothic | 1.375rem | 700 |
| Heading 3 | IPA Gothic | 1.125rem | 700 |
| Body | Gotham | var(--fontSizeBodyS) | 400 |
| Caption | Gotham | var(--fontSizeBodyM) | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **IPA Gothic** for body/UI text, **Gotham** for display/headings
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 10px
- **Spacing scale:** 10, 20, 30, 40, 50, 60, 70, 80, 120, 140, 160
- **Border radius:** 4px, 20px
- **Max content width:** 1040px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 5-10px | Tight: related items within a group |
| 20px | Medium: between groups |
| 30-40px | Wide: between sections |
| 60px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `inset 0-2px 0 0 var(--inputUnderlineColor)`

### Raised — cards, buttons, interactive elements

- `0 0 0 4px var(--background),0 0 0 8px var(--text)`

### Overlay — full-screen overlays, top-level dialogs

- `0 50px 100px -20px color-mix(in lab,var(--black) 25%,transparent),0 30px 60px -30px color-mix(in lab,var(--black) 30%,transparent)`
- `0 0 0 1000px color-mix(in lab,var(--text) 10%,transparent) inset`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes _loaderSpan_1o1zt_1`
- `@keyframes fade-in`
- `@keyframes reveal`
- `@keyframes _introTextReveal_x8c4c_1`
- `@keyframes _introLine_x8c4c_1`
- `@keyframes _introScrollIndicator_x8c4c_1`
- `@keyframes _introMobileScrollIndicator_x8c4c_1`
- `@keyframes _labelIn_nr520_1`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#111111` as the primary page background
- Pair **IPA Gothic** (body) with **Gotham** (display) — these are the only allowed fonts
- Follow the **10px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: 4px, 20px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond IPA Gothic and Gotham
- Don't use arbitrary spacing values — stick to multiples of 10px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| xs | 400px | css |
| md | 696px | css |
| lg | 820px | css |
| xl | 1040px | css |
| xl | 1190px | css |
| xl | 1200px | css |
| 2xl | 1680px | css |
| 2xl | 2080px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #000000
Border: 1px solid var(--border)
Radius: 20px
Padding: 30px
Font: IPA Gothic
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg var(--accent), text white
Ghost: bg transparent, border var(--border)
Padding: 20px 30px
Radius: 20px
Hover: opacity 0.9 or lighter shade
Focus: ring with var(--accent)
```

### Build a Page Layout

```
Background: #111111
Max-width: 1040px, centered
Grid: 10px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #000000
Label: var(--text-muted) (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #111111
Input border: 1px solid var(--border)
Focus: border-color var(--accent)
Label: var(--text-muted) 12px
Spacing: 30px between fields
Radius: 20px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: IPA Gothic, type scale from Section 3
4. Spacing: 10px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/Gotham-500.woff2`
- `fonts/Gotham-700.woff2`
- `fonts/Gotham-Regular.woff2`
- `fonts/IPAGothic-Regular.woff2`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

