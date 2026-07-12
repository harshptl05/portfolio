---
name: audit-driven-polish
description: Use when the user hands a guidance/rules document ("use this file and fix the site") or asks for a persona audit (recruiter, design director) of an existing build — how to turn rules into verified fixes without redesigning what already works.
---

# Audit-Driven Polish — lessons from the portfolio refinement phase

Context: the portfolio was already built (see `registry-driven-site-build` for the build-phase
rules). This phase was different work: the user pasted guidance documents (`frontend.md`) and
persona prompts ("review as a recruiter with 30 seconds", "review as a design director") and asked
for fixes. These rules are about auditing and refining, not building.

## 1. A guidance file is a checklist to diff against, not a brief to rebuild from

**Summary:** When told "use this file and fix the site," extract the file's falsifiable rules, mark each PASS/FAIL against the current code, and fix only the FAILs.

**Why it mattered:** `frontend.md` contained both hard rules and preferences. Diffing produced a
short violation list — two competing hero CTAs, background `#080808` vs its "never pure black
`#0A0A0F`", faux-bold serif headings, missing favicon/OG — each fixed surgically. Treating it as
a fresh brief would have meant rebuilding a hero the user had iterated on for days.

**Rule:** Output of a guidance pass is a violation table (rule → current state → fix), not a
redesign. If you can't state which sentence of the document a change satisfies, don't make it.

## 2. The standing brief outranks the pasted guidance where they conflict — say which items you refused

**Summary:** Every guidance document contains recommendations that contradict decisions the user already made; skip those and name them in the report.

**Why it mattered:** `frontend.md` preferred a video hero and Motion over GSAP. The site is
deliberately typographic and deeply invested in GSAP/Lenis. Following the file literally would
have destroyed user-approved work. Both refusals were reported with one-line justifications and
the user accepted them silently.

**Rule:** The completion report lists applied fixes AND explicitly declined guidance items with
reasons. A guidance pass with zero declined items means you either got lucky or overwrote a
standing decision.

## 3. Single-weight display font: `font-bold` on it is a rendering bug, grep for it

**Summary:** If the display face ships one weight (Instrument Serif = 400 only), any bold utility on it makes the browser synthesize a smeared fake bold; the check is a grep, not a taste call.

**Why it mattered:** Nine `font-heading` elements carried `font-bold`/`font-semibold` — invisible
in code review, mushy at 8rem on screen. Size, not weight, is what carries hierarchy in an
editorial serif. Real-weight needs (project row titles) moved to the sans face instead.

**Rule:** After any typography pass: `grep "font-heading" -r src | grep -E "font-(bold|semibold)"`
must return zero. Elements that genuinely need weight get the body face, not a synthesized weight.

## 4. Persona audits walk the rendered state per breakpoint, not the code inventory

**Summary:** "Does the site answer X?" must be tested against what a non-interacting visitor actually sees at each breakpoint in the first two viewports — content that exists in code can still be invisible.

**Why it mattered:** Everything a recruiter needs technically existed, yet the 30-second walk
found: the role "Full-Stack & AI Engineer" appeared only in `<title>` metadata — never as visible
hero text (pills hinted, nothing stated); on mobile, BOTH contact affordances were hidden
(`hidden sm:inline-block` on the nav CTA, `hidden md:flex` on the links), leaving logo + theme
toggle only; project awards sat in a `hidden md:block` column, so mobile lost the strongest
signal ("1st Place — Toyota Challenge"); every project row was collapsed, so zero proof rendered
without a click.

**Rule:** For each breakpoint, list literally what renders above the fold and in the first scroll
with no interaction. Each audit question (who / role sought / proof / contact) must be answered by
an item on that list. `hidden {sm,md}:` classes on identity, proof, or contact elements are
findings by definition.

## 5. Default-collapsed lists show zero proof — auto-expand the first item

**Summary:** An accordion where everything starts closed renders only titles to a skimmer; seed the state with the first item's key.

**Why it mattered:** The projects list (the site's entire evidence section) rendered five title
rows and nothing else to a non-clicking visitor. `useState<string | null>("01")` made the
strongest project (1st-place RideIQ, with live GitHub/Devpost links) fully visible by default,
and the helper copy stopped being an instruction ("Click a project to expand ↓") and became
information ("Five builds, four awards · click any row for details").

**Rule:** Any progressive-disclosure list whose content is the page's proof starts with its best
item open. Helper copy states a fact the visitor didn't know, not an instruction the UI's
affordances should already communicate.

## 6. The h1 and the visually dominant element must be the same thing

**Summary:** Check what the `<h1>` actually contains; decorative wrappers drift it away from the page's real title.

**Why it mattered:** The name "Harsh Patel" rendered at 8.5rem inside a plain `<div>` while the
`<h1>` held the tagline fragment "I build [flipping word]" — so the document outline titled the
page "I build full-stack products". Swapped: name (via span-only `RevealText`, safe to nest) into
the h1, tagline demoted to `<p>`. The earlier hydration crash in this project came from exactly
this area — block tags inside `<h1>` — so the fix re-verified the component renders spans only.

**Rule:** Grep the section for `<h1`; confirm it wraps the element a screenshot would call the
title. Before moving a component into a heading, confirm it renders no block elements.

## 7. Placeholder-gated UI: write the conditional now so content ships by data edit alone

**Summary:** For known-missing assets (resume URL), render the UI behind a placeholder test so supplying the real value activates it with zero code changes.

**Why it mattered:** `site.links.resume` is still `"RESUME_URL"`. The nav Resume link renders
behind `!/^[A-Z_]+$/.test(...)` — the same `isPlaceholder` convention the footer already used.
When the user finally pastes the URL into `site.ts`, the nav link, footer link, and
"tailored to your role" line all go live in one edit, and nothing broken ever showed meanwhile.

**Rule:** Reuse the project's existing placeholder convention (here: `/^[A-Z_]+$/`) everywhere a
future asset lands. Never render a dead `href="RESUME_URL"` and never delete the UI — gate it.

## 8. Unimported "source of truth" files are where stale data hides — grep imports before trusting or editing

**Summary:** A file labeled as the content source may no longer feed the render path; verify with an import grep, then delete the dead copy and leave a pointer comment.

**Why it mattered:** `site.ts` was documented as "single source of truth" and still held a
4-project array with `DEMO_URL` placeholders, while the rendered section (`projects.tsx`) carried
its own 5-project array with the real links. A future "update the projects" edit had a coin-flip
chance of landing in the dead file. `grep 'from "@/lib/site"'` proved `projects` and `skills` had
zero importers; both were deleted and replaced with a comment saying where the data actually lives.

**Rule:** Before editing any central data file, grep which exports are actually imported. Dead
exports get deleted the moment they're found — with a comment naming the live location — not left
"for reference."
