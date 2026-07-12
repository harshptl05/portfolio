---
name: registry-driven-site-build
description: How to build a design-brief-driven Next.js site from component registries (shadcn/Aceternity/Cult/21st.dev/fancy) with an iterating owner pasting large prompt dumps. Distilled from the Harsh Patel portfolio build. Use when integrating registry components, reconciling pasted specs against a standing brief, or debugging Next/Turbopack/hydration issues in this repo.
---

# Registry-Driven Site Build — lessons from the portfolio session

Context: dark editorial portfolio (Next 16, React 19, Tailwind v4, GSAP+Lenis), owner pastes
large multi-feature prompt dumps, components come from registries. The authoritative spec is
`portfolio-build-prompt_1.md`. These rules are ordered by how much pain they prevented.

## 1. Reconcile pasted drop-ins against the standing brief before integrating

**Summary:** When a pasted component contradicts the project's written spec, stop and get a decision — never silently integrate.

**Why it mattered:** The user pasted a generic SaaS `animated-hero.tsx` ("Managing a small
business today is already tough…") and `@aceternity/parallax-hero-images` while their own brief
said "projects must NOT be image cards, almost no images, real content only." Integrating as-pasted
would have shipped someone else's copy onto their portfolio.

**Rule:** Before wiring any pasted component, diff its content/behavior against the brief. If they
conflict, present the conflict with a recommendation (we used AskUserQuestion; user chose "follow
the brief" and the drop-ins were discarded). If they don't conflict, just integrate — don't ask.

## 2. Read the installed registry source before wiring it — every component needed surgery

**Summary:** Registry components are drafts to adapt, not finished goods; read the file you just installed.

**Why it mattered:** Literally every install needed changes found only by reading the source:
- `container-text-flip` imported `@/utils/cn` (project uses `@/lib/utils`) and rendered `<p>`/`<div>` — illegal inside our `<h1>`.
- `cover` shipped a `sparkles` dependency with 5 type errors from a stale `@tsparticles` API → stripped the layer, kept the beams.
- `infinite-moving-cards` rendered testimonial quote cards; we needed font-mono pills.
- `card-spotlight` hard-coded `#262626` glow and pulled in three.js.
- Threads (React Bits) attached mouse listeners to its own container — as a `pointer-events-none` background layer those listeners can never fire; moved them to `window` or the advertised interaction would be silently dead.
- `marquee-along-svg-path` defaulted `preserveAspectRatio="xMidYMid meet"`, letterboxing the curve into a small box (user's "it's at the bottom and not aligned" screenshot). Fix was `preserveAspectRatio="none"` — not the path coordinates the user's prompt guessed at.

**Rule:** After `shadcn add`, Read the created file(s) and check: import paths, hard-coded colors,
HTML tag choice vs. where it will nest, event-listener targets vs. pointer-events, default props
that assume a different container shape. Budget one adaptation per component; zero adaptations
means you probably didn't look.

## 3. Verify = tsc + production build after every batch; smoke the rendered HTML after client-component changes

**Summary:** `npx tsc --noEmit` + `npm run build` after each coherent batch, and grep the served HTML when you've touched anything that hydrates.

**Why it mattered:** Build alone missed the worst bug of the session. The hydration crash
(`<div> cannot be a descendant of <p>` inside the h1, plus ThemeToggle's aria-label differing
between server and client) only surfaced by curling the dev page and checking the log. The fix was
verified by extracting the `<h1>` block from served HTML and counting tags: `h1 block tags: h=1 span=25`
— zero `<p>`/`<div>`. Conversely, tsc caught `JSX.Element` (dead under React 19 types), the
`color` prop clashing with `HTMLAttributes` (`Omit<..., "color">`), and a missing `"use client"`
boundary when a client component moved from a client parent to a server page.

**Rule:** Never report a batch done without tsc + build exit 0. If the batch added/moved client
components or changed SSR markup structure, also fetch the page and assert (a) expected strings
render, (b) no invalid nesting in the specific element you changed, (c) the server log has no
hydration lines. Note: the user runs the dev server themselves (see memory) — ask them for the
overlay/console output instead of starting one.

## 4. When infrastructure errors look impossible, suspect the environment before the code

**Summary:** A passing production build plus a broken dev server means corrupted state, not a code bug.

**Why it mattered:** `Cannot find module '@swc/helpers-<hash>'` + "Could not find module
global-error.js in the React Client Manifest" looked catastrophic. The discriminating evidence:
`npm run build` was green minutes earlier. Root cause was three `next dev` processes I'd leaked
writing to the same `.next/dev` concurrently, under OneDrive sync. Fix: kill stray node processes,
`rm -rf .next node_modules/.cache`, exactly one server. Same shape later: `tsc` failing on
`.next/dev/types/validator.ts` — a stale generated file from the user's own dev run, matched by
tsconfig's `**/*.ts` include; deleted `.next/dev` (after confirming port 3000 was down) and tsc went green.

**Rule:** Before editing source in response to a module-resolution or manifest error: (1) check
whether the production build passes, (2) check for multiple dev-server processes, (3) clear `.next`.
This repo lives in OneDrive — never run more than one dev server, and expect `.next` corruption
as the default explanation. Windows extras from this session: `create-next-app` rejects the
capitalized folder name (scaffold in a temp dir, copy back), and symlinks fail without admin
(use `New-Item -ItemType Junction`).

## 5. Paywalled or missing assets: verify availability first, state the block, build the equivalent

**Summary:** Probe that a component/icon actually exists and is accessible before writing code that depends on it — and when it's paywalled, say so and hand-build a substitute rather than work around it.

**Why it mattered:** All three 21st.dev components (`reveal-text`, `animated-footer`,
`motion-footer`) returned "Marketplace membership required" even with the user's valid API key —
they're paid. I said exactly that, then built custom `RevealText` (same prop API) and a custom
curtain-reveal `CinematicFooter`. Same pattern for icons: probed `simple-icons` exports in node
*before* writing imports and discovered `siOpenai`/`siAws` don't exist (brand removals) — an
unprobed import would have broken the build; instead the user was told precisely which 4 logos
they must supply (OpenAI, AWS, RAG, pgvector).

**Rule:** For every registry URL: attempt the install and read the error class — auth failure vs.
membership failure vs. wrong name are different problems. For every icon/font/asset list in a
prompt: probe availability in one batch command first, implement what exists, and report the exact
missing set as a question for the user. Never attempt to bypass a paywall.

## 6. Huge prompt dumps: cut a coherent verified slice, queue the rest visibly

**Summary:** When one message contains 5+ features, pick the subset that ships together without conflicts, build and verify it, and end with an explicit named queue of what's deferred.

**Why it mattered:** The "Phase 3 Upgrades" message alone contained ~8 features (marquee logos,
hero marquee, separators, footer, About fixes, cinematic transitions, Apple carousel, pointer
highlights). Doing all of it in one pass would have produced conflicting GSAP systems (the new
SectionPanel vs. the existing per-section `Reveal` wrappers — which I had to actively unwire to
prevent double-animation). Slicing kept every intermediate state green, and the queue meant
nothing silently dropped — deferred items (PointerHighlight, hero stats marquee) were delivered
in later turns because the queue kept them alive.

**Rule:** Slice by *conflict boundaries*, not by size: features touching the same animation system
or the same component ship together; independent ones can wait. Always print the queue with the
user's own names for the features so they can re-order it.

## 7. Fix the mechanism the user's screenshot shows, not the patch their prompt proposes

**Summary:** User-supplied fix instructions are hypotheses; diagnose the actual cause first — it's often one level deeper.

**Why it mattered:** Three times: (a) "the tagline changes affect the whole page" — cause was
framer-motion's `layout` prop animating the element's width per word; the durable fix was a CSS
grid stack where every word occupies the same cell so the element is permanently sized to the
widest word — no reflow possible, rather than tweaking the animation. (b) The SVG-path marquee
"at the bottom, not aligned" — their prompt proposed new path coordinates and explicit heights;
the real cause was `preserveAspectRatio` letterboxing (one attribute). (c) "Experience section
renders light/white with near-black text" — it wasn't broken CSS, they were viewing light mode;
the styles were token-correct. Applying their literal patch (hard-coding `bg-[#080808]`) would
have destroyed the light theme they asked to keep three turns later.

**Rule:** Reproduce the mechanism from the code before applying a prescribed fix. If your diagnosis
differs from the prompt's, implement your fix and say explicitly "your prompt suggested X; the
actual cause was Y" — the user consistently accepted this when stated plainly.

## 8. Map spec hex values onto the token system; change the token itself when a color recurs across prompts

**Summary:** Hard-coded `#06B6D4`/`neutral-*` in pasted specs get translated to `text-primary`/`border-border` etc.; if the same hex appears in 3+ consecutive prompts, the user has changed the brand color — flip the token, don't scatter the hex.

**Why it mattered:** Cyan `#06B6D4` appeared in the About spec, the card spec, and the marquee spec
while the site token was still blue — the right move was one `--primary` change in globals.css
(announced, one-line revert offered), after which every past and future spec line ("accent color
on hover", "spotlight glow") automatically agreed. Exceptions stayed literal only in deliberately
always-dark islands (project cards) and per-card accent colors (cyan/violet/green/amber), which are
data, not theme. This is also why the "non-negotiable bg-#080808" prompts were satisfied by
retuning the *dark token* to `oklch(0.125 0 0)` instead of hard-coding — which saved us when the
user then said "don't lock dark mode, keep both."

**Rule:** Literal hex survives only where the design is intentionally theme-independent; everything
else goes through tokens. Recurring hex across prompts = token migration, one edit, stated to the user.

## 9. Hold the motion budget: count the moving systems per viewport and say no with numbers

**Summary:** Before adding another background/animation, enumerate what's already moving in that section; past ~3 concurrent systems, recommend a subtraction with every addition.

**Why it mattered:** The brief itself said "cinematic, but never busy or gimmicky," yet accumulated
requests put six animated systems in the hero and four background layers in About (Threads + two
parallax ghosts + radial wash). When asked "should other sections get visuals?", the audited answer
was: only 2 additions (amber DOME ghost, Journey ghost — both reusing the existing
`ParallaxBackground`, ~15 lines), By-the-Numbers deliberately stays plain, and cut About's second
ghost layer. The references the user chose (hamishw.com — fetched live, nearly plain; vladislavkon)
are *more* restrained than the site. Performance is part of the same budget: the StackPanel
`filter: brightness()` scrub (full-section repaints every scroll frame) was replaced with a
composited black-overlay opacity fade, and unused `three`/`@react-three/fiber` were uninstalled
when their consumer died.

**Rule:** Every visual-addition reply names the section's current moving systems and pairs each
accepted addition with a proposed cut. Prefer reusing an existing depth component with new props
over installing a new system. Animating `filter`/`box-shadow` under scrub is banned; transforms
and opacity only.

## 10. Volatile process preferences: write them to memory the moment they're corrected, with the misread that caused them

**Summary:** When the user corrects *how* you work (pace, servers, stops), persist the correction plus the trigger phrase that fooled you — the same ambiguity will recur.

**Why it mattered:** "Keep going until usage runs out" read as "drop the phase stops"; two rejected
tool calls later the user clarified they wanted stops kept. The memory entry records not just the
preference but the trap: "do not switch to building straight through even if a message sounds like
'keep going'." Same for the dev server: after "stop running the server when u start coding," memory
says verify via tsc+build and ask the user to run `npm run dev` — and later turns honored it by
saying "refresh localhost:3000" instead of launching anything. Content decisions went to memory
too (accent migration history, paywalled components, OneDrive gotcha), which is what let later
turns answer "is the prompt finished?" against a checklist instead of vibes.

**Rule:** A process correction gets written to memory in the same turn it happens, phrased as
behavior + the misleading signal to ignore. A preference is not "learned" until it survives a
message that superficially contradicts it.

## 11. Deliver honest reviews ranked by consequence, not by what was asked about

**Summary:** When asked to audit ("as a recruiter/designer"), lead with the highest-consequence finding even if it's outside the visual scope of the question — then rank everything.

**Why it mattered:** The user asked for a design critique; the truthful #1 finding was that every
project link was a `DEMO_URL` placeholder rendering "(soon)" — for a recruiter, dead links on
award-claim projects undermine the entire site, outweighing any animation polish. Stating that
bluntly ("this single fix matters more than everything visual we've built combined") is what got
the real repo URLs supplied two turns later. The same review quantified the over-animation problem
(counting six hero systems) instead of saying "maybe too busy," which made the later cut
recommendations land.

**Rule:** Audits open with the one finding that changes the user's outcomes most, tagged with who
it affects and why; aesthetic findings follow. Every criticism carries a count, a file, or a
concrete comparison (e.g., "your reference sites use 3–4 signature moves") — no unfalsifiable
taste claims. State what you could not verify (no browser: "I'm reading code, not pixels") instead
of faking a visual inspection.
