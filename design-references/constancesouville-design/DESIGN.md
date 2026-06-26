# constancesouville DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 7 · Fonts: 2 · Components: 4
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: subtle

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![constancesouville Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a neutral, approachable feel. The light background emphasizes content clarity. Typography pairs **PP Editorial New** for display/headings with **PP Neue Montreal** for body text, creating clear visual hierarchy through type contrast. Spacing follows a **8px base grid** (standard density), with scale: 8, 16, 32, 96, 112, 144, 160px. Motion is subtle — smooth transitions (150-300ms) ease state changes without drawing attention.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| background | `#ffffff` | background | Page background, darkest surface |
| surface | `#fbefdf` | surface | Card and panel backgrounds |
| theme-color | `#c1c0b6` | text-muted | Captions, placeholders, secondary info |
| border | `#3f3b37` | border | Dividers, card borders, outlines |
| tile-color | `#db4c44` | danger | Error states, destructive actions |
| warning | `#e7aa2c` | warning | Warning states, caution indicators |
| unknown | `#b2b2a8` | unknown | Palette color |


---

## 3. Typography Rules

**Font Stack:**
- **PP Neue Montreal** — Heading 1, Heading 2, Heading 3
- **PP Editorial New** — Body, Caption

**Font Sources:**

```css
@font-face {
  font-family: "PP Editorial New";
  src: url("https://constancesouville.com/fonts/PPEditorialNew-Regular.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "PP Neue Montreal";
  src: url("https://constancesouville.com/fonts/PPNeueMontreal-Regular.woff2") format("woff2");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | PP Neue Montreal | 26rem | 700 |
| Heading 2 | PP Neue Montreal | 12.4rem | 700 |
| Heading 3 | PP Neue Montreal | 12rem | 700 |
| Body | PP Editorial New | 1.4rem | 400 |
| Caption | PP Editorial New | max(3rem,20px) | 400 |

**Typographic Rules:**
- Limit to 2 font families max per screen
- Use **PP Neue Montreal** for body/UI text, **PP Editorial New** for display/headings
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

### Data Display (2)

**Card** — `html`
- Variants: `-list`

**List** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 8px
- **Spacing scale:** 8, 16, 32, 96, 112, 144, 160
- **Border radius:** 1.6rem, 2rem, 2.4rem, 2.8rem, 3.2rem, inherit
- **Max content width:** 1019.98px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

No box-shadow values detected. The design appears to use a flat visual style.

**Z-Index Scale:** `0, 1, 2, 10`


---

## 7. Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without demanding attention.

### CSS Animations

- `@keyframes marquee-right`
- `@keyframes marquee-left`

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#ffffff` as the primary page background
- Pair **PP Neue Montreal** (body) with **PP Editorial New** (display) — these are the only allowed fonts
- Follow the **8px** spacing grid for all margins, padding, and gaps
- Use border and background shifts for elevation — not shadows
- Use border-radius from the scale: 1.6rem, 2rem, 2.4rem, 2.8rem, 3.2rem
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't introduce additional font families beyond PP Neue Montreal and PP Editorial New
- Don't use arbitrary spacing values — stick to multiples of 8px
- Don't add box-shadow — this design system uses flat elevation
- Don't use gradients — the design uses solid colors only
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No box-shadow on any element
- No gradient backgrounds
- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| xs | 479.98px | css |
| xs | 480px | css |
| md | 767.98px | css |
| md | 768px | css |
| lg | 1019.98px | css |
| lg | 1020px | css |
| 2xl | 1440px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #fbefdf
Border: 1px solid #3f3b37
Radius: 2.8rem
Padding: 32px
Font: PP Neue Montreal
No shadows — use borders and surface colors for depth.
```

### Build a Button

```
Primary: bg var(--accent), text white
Ghost: bg transparent, border #3f3b37
Padding: 16px 32px
Radius: 2.8rem
Hover: opacity 0.9 or lighter shade
Focus: ring with var(--accent)
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1019.98px, centered
Grid: 8px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #fbefdf
Label: #c1c0b6 (muted, 12px, uppercase)
Value: var(--text-primary) (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #3f3b37
Focus: border-color var(--accent)
Label: #c1c0b6 12px
Spacing: 32px between fields
Radius: 2.8rem
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: PP Neue Montreal, type scale from Section 3
4. Spacing: 8px grid
5. Components: match patterns from Section 4
6. Elevation: flat, surface shifts
```
