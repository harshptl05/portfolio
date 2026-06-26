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
  src: url("https://hamishw.com/assets/gotham-book-Bnaws0Ef.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "Gotham";
  src: url("https://hamishw.com/assets/gotham-bold-D1kvQ7KV.woff2") format("woff2");
  font-weight: 700;
}
@font-face {
  font-family: "IPA Gothic";
  src: url("https://hamishw.com/assets/ipa-gothic-DimHCOud.woff2") format("woff2");
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
