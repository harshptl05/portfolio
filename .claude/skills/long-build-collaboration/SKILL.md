---
name: long-build-collaboration
description: Use at the start of any multi-week, prompt-dump-driven build with this user — the process layer for how work was paced, how forks were decided, and what "done" required across the whole portfolio project. Sits above the phase-specific skills (registry-driven-site-build for building, audit-driven-polish for refining).
---

# Long-Build Collaboration — how the whole portfolio project actually ran

Scope: the entire engagement, scaffold → phased build → feature dumps → audits → polish.
Mined from the full 2,284-entry transcript, not memory. The build-phase mechanics live in
`registry-driven-site-build`; the audit mechanics in `audit-driven-polish`. This file is the
layer those two sit inside: pacing, fork decisions, and the definition of done.

## 1. The working cadence is a contract — confirm before changing it, and memorize the trigger phrase that fooled you

**Summary:** A message that *sounds* like a cadence change ("keep going until usage runs out") gets one explicit confirmation before you switch modes; when corrected, save the correction WITH the misleading phrase.

**Why it mattered:** The single worst interaction of the project: "keep going until usage runs
out" was read as "drop the phase stops." Result: two rejected tool calls, two user interrupts,
and three flip-flops in five turns ("won't stop" → "continuous" → "I'll keep the per-phase
stops") before "i want you to run the phase stops like before keep doing that" settled it. The
memory entry that fixed it permanently records not just the preference but the trap phrase.

**Rule:** The stop-per-phase gate survives any message that doesn't literally name it. A process
correction is written to memory in the same turn it happens, phrased as *behavior + the signal to
ignore*. It counts as learned only after it survives a message that superficially contradicts it.

## 2. One decision hierarchy resolved every fork: latest explicit words > standing brief > pasted spec > registry default > my taste

**Summary:** When two levels conflict, name the conflict in the reply; never silently pick.

**Why it mattered:** Every fork in the project was an instance: the pasted generic SaaS
`animated-hero.tsx` ("Managing a small business today is already tough") conflicted with the
brief's "projects must NOT be image cards" → the session's *only* AskUserQuestion, user chose the
brief. Pasted specs' hard-coded `#06B6D4` → theme tokens, flagged as "one deliberate change I'll
flag." `frontend.md`'s video-hero and Motion-over-GSAP preferences → declined by name because the
standing brief outranked them. Silence would have shipped someone else's copy or destroyed
approved work.

**Rule:** Interrupting the user is reserved for level-1-vs-level-2 conflicts (their words vs
their brief). Everything below that: apply the hierarchy, state the deviation in one line, offer
the one-line revert.

## 3. Inferred product decisions get a one-reversal budget — make them single-edit revertible and announced

**Summary:** It's fine to act on inferred intent (three hard-dark prompts in a row → lock dark mode), but only in a form one edit can undo, said out loud.

**Why it mattered:** The dark-mode lock was reversed ("dont lock dark mode keep an option for
both") — and the reversal cost one `forcedTheme` line because the lock had been implemented as a
token/prop change, not scattered `bg-[#080808]` hard-codes (which the user's own pasted patch had
proposed). Same pattern when the Contact section was cut inside a batch: announced in the report,
survived because it was announced. Inference is a feature; unannounced or expensive-to-undo
inference is the bug.

**Rule:** Any decision the user didn't literally request must be (a) implemented at the single
point of control (token, prop, one component), (b) named in the report with its revert. If you
can't satisfy (a), ask instead.

## 4. "Done" had four rungs, and the cheap ones provably don't catch everything

**Summary:** tsc → production build → grep of the actually-served HTML → the user's own eyes; each rung caught bugs the rung below missed, so skipping rungs is a falsifiable lie about verification.

**Why it mattered:** Across the project: 22 `npx tsc --noEmit` runs and 23 `npm run build` runs
gated every batch — tsc caught the `@/utils/cn` bad import, removed lucide `Github`/`Linkedin`
exports, 5 stale `@tsparticles` type errors, and a React-19 `JSX.Element` namespace death. But
the worst bug of the project — the hydration crash from block tags inside the hero `<h1>` —
passed both tsc and build, and was only caught by curling the dev page, and only *proven fixed*
by extracting the served `<h1>` and counting tags ("25 spans, zero `<p>`/`<div>`"). After the
user's standing rule ("stop running the server when u start coding i will do it on my own"),
rung 3 became: state plainly "I'm reading code, not pixels" and hand the visual check to the user.

**Rule:** No batch is reported done without tsc + build exit 0. Any change to SSR markup
structure or client/server component boundaries additionally requires a rendered-HTML assertion —
or an explicit sentence that you couldn't run one. Never claim a visual outcome you didn't render.

## 5. Probe every external the spec names before writing code that imports it

**Summary:** One batch command proving the icon/package/registry item exists (and is accessible) precedes any import — availability failures become a user-facing list, not a build break.

**Why it mattered:** ~8 `node -e "require(...)"` probes across the session. The payoff case:
probing `simple-icons` exports before writing the marquee revealed `siOpenai`, `siAws`, RAG and
pgvector simply don't exist — an unprobed import would have broken the build mid-batch; instead
the user got the exact 4-logo shopping list. Same shape for 21st.dev: the install *attempt*
returned "Marketplace membership required" (a paywall, not an auth bug) → stated plainly, custom
`RevealText` and the curtain footer built to the same prop APIs. No paywall bypass, ever.

**Rule:** Every named asset in a pasted spec gets an existence probe in one batch before
integration starts. Read the error class — auth vs paywall vs wrong-name are three different
next moves. "It's paid" is a complete, acceptable answer when paired with a hand-built equivalent.

## 6. Three correction rounds on the same decorative feature = offer deletion as a first-class option

**Summary:** When a nice-to-have has consumed three user-corrective screenshots, the fourth reply should lead with "we can also just cut it," not another adjustment.

**Why it mattered:** The SVG-path marquee ate five user turns: add it → "make it bigger" → "put
it in the area above the about… make the moving thing a little smaller" → "look at the bottom the
svg path is on the bottom and not even aligned" → "remove teh svg path… on the hero section."
The real mechanism (`preserveAspectRatio` letterboxing) was found on round four — technically a
win, but the user deleted the hero variant anyway. Five turns of both people's time went into a
background decoration. Compare: the Cover sparkles layer was cut in *one* turn the moment its
dependency fought back, and nobody ever missed it.

**Rule:** Track correction rounds per feature. At round three on anything decorative, the reply
must price both paths: "fix is X" vs "delete costs nothing — this is a background layer." The
motion budget (registry skill, rule 9) says the deletion is usually the better product too.

## 7. Green build + broken dev = environment, and this environment has a known failure signature

**Summary:** Before touching source in response to module-resolution/manifest errors, check: did the production build pass recently? how many dev servers are running? is `.next` stale? — in that order.

**Why it mattered:** Twice. First: `Cannot find module '@swc/helpers-<hash>'` looked
catastrophic; the discriminator was "the production build passed minutes ago." Cause: **three**
leaked dev-server processes writing `.next/dev` concurrently under OneDrive sync — killed them,
cleared the cache, done, zero source edits. Second: tsc failing on `.next/dev/types/validator.ts`
— residue from the *user's own* dev run, matched by tsconfig's `**/*.ts`; confirmed port 3000 was
down, deleted `.next/dev`. Editing application code in response to either would have been pure
damage.

**Rule:** In this repo (OneDrive + Windows), `.next` corruption is the default hypothesis for
impossible-looking infra errors. Exactly one dev server, ever — and since the user runs it, that
means zero from you.

## 8. A mega-prompt is answered with a verified slice plus a queue in the user's own words

**Summary:** Slice by conflict boundary (features sharing an animation system ship together), verify the slice, and end with a named queue — because the user actively re-orders it.

**Why it mattered:** The Phase-3 dump alone held ~8 features; shipping all of it would have run
two GSAP reveal systems over the same sections (the new SectionPanel had to actively *unwire* the
old per-section Reveal wrappers). The visible queue wasn't bureaucracy — the user steered with it
twice: "prioritize the 3 21st.dev components (RevealText + footers) next? and finish phase 3,"
then "custom cinematic footer next and then pahse 4 polish." 40 TodoWrite updates kept the queue
real. Deferred items (PointerHighlight, hero stats marquee) shipped turns later *because* the
queue kept them alive; nothing was silently dropped.

**Rule:** Every multi-feature reply ends with the queue, using the user's names for features.
An item leaves the queue only by shipping or by the user cutting it — never by falling off.

## 9. Pasted secrets: home-directory only, then grep the repo for the prefix

**Summary:** The user will paste API keys directly into chat; they go into `~/.claude.json` / `~/.an/credentials`-class locations, never the repo — and the falsifiable check is grepping the repo for the token prefix.

**Why it mattered:** The 21st.dev key (`an_sk_…`) arrived as a bare chat message mid-turn and got
exported into the shell env and the CLI's credential store. Before any commit talk, the repo was
grepped for the prefix and verified clean. On a project that will be pushed to a public GitHub
portfolio, one careless `.env` commit is a permanent leak.

**Rule:** On receiving a pasted credential: write it only to gitignored/home locations, and run a
repo-wide grep for its first 8 characters before reporting any batch that touched config files.
If the key ever needs to live in the repo's env, `.gitignore` gets verified in the same batch.
