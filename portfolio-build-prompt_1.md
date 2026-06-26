# PROJECT: Build my developer portfolio website

You are helping me build my personal developer portfolio from scratch. Read this **entire brief** before writing any code. Then follow the build order at the bottom. Do **NOT** dump the whole site in one response — build it section by section and let me review each phase before continuing.

---

## DESIGN DIRECTION (read this first — it defines everything)

**Aesthetic reference:** a blend of two real portfolios —
- **Constance Souville** (constancesouville.com): obsessive GSAP scroll craft, big editorial typography, letters that animate in individually, a clean dark palette, very little clutter.
- **Hamish Williams** (hamishw.com): full-bleed dark sections, large numbered project sections, a side scroll-progress indicator, smooth page-load animation.

**The vibe:** dark, sleek, editorial, confident. Typography-forward. Minimal. Lots of negative space. The animation **is** the design — there are almost no images. It should feel cinematic as you scroll, but never busy or gimmicky.

**Crucial:** My projects should **NOT** be displayed as image/screenshot cards. Present each project as an **animated text/detail block** — the name, the numbers, and the story do the work, revealed through motion. No project thumbnails.

**Color:** dark mode primary (near-black background, off-white text, **ONE** refined accent color — pick something with character like a muted electric blue, warm amber, or acid green; you choose, keep it tasteful). Include a light-mode toggle, but design dark-first.

**Typography:** one strong sans-serif for headings (something with character — a variable font is ideal), a clean readable sans for body. Big heading sizes. Generous line-height. Type is the star.

---

## TECH STACK (use exactly this — it's my stack)

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Lenis** for smooth scroll
- **GSAP** + **ScrollTrigger** + **SplitText** for animations
- **next-themes** for the dark/light toggle
- Deploy target: **Vercel**

---

## SIGNATURE ANIMATION TECHNIQUES (implement THESE specifically)

1. **Lenis smooth scroll** — site-wide, buttery inertia scrolling. This is the foundation; set it up first.
2. **GSAP SplitText heading reveals** — headings split into characters/words that stagger-rise into view as you scroll to them. Use on the hero and every section title.
3. **Scroll-triggered reveals** — each section's content fades + slides up as it enters the viewport (staggered for lists/grids).
4. **Pinned project transitions** — in the projects section, pin the section while scrolling: the large project number/name stays centered while each project's details fade in/out as you scroll through them (Apple-product-page style).
5. **Self-drawing timeline** — the experience/journey section has a vertical line that draws itself as you scroll, with entries revealing alongside it.
6. **Page-load intro animation** — on first load, a clean sequence: hero text animates in (SplitText), then the rest settles. Keep it under ~2 seconds.
7. **Scroll-progress indicator** — a thin progress line (side or top) showing how far through the page you are.

**DO NOT** implement a magnetic cursor. **DO NOT** add 3D/WebGL. **DO NOT** add a custom-drawn cursor. Keep the scope tight — these seven techniques are the whole motion system.

---

## WHO I AM (content)

- **Name:** Harsh Patel
- **Role / title:** Full-Stack & AI Engineer
- **Hero hook (refine, keep it short and confident):** "I build full-stack products and AI agents that actually ship."
- **Location:** Dallas, TX (open to remote)
- **Links (use these real values):**
  - Email: `harshptl2023@gmail.com`
  - LinkedIn: `linkedin.com/in/harsh-pate1`
  - GitHub: `github.com/harshptl05`
  - Resume PDF: `RESUME_URL` *(placeholder — I'll provide)*

### About paragraph (use this, lightly tighten if needed)
I'm Harsh Patel, a Computer Science student at UT Dallas (GPA 3.63, graduating December 2026) and a full-stack engineer working at the intersection of web development and AI. I build React and Next.js front ends, Python and Node back ends, and increasingly, multi-agent LLM systems with Claude and OpenAI. I've shipped software for platforms serving 500+ and 20,000+ users, led a 30-person engineering team, and won first place at TAMUHack's Toyota Challenge. I treat AI agents as real engineering leverage — with a heavy emphasis on prompt engineering and validating what the model actually produces.

### Quick-stats bar (display near the hero)
`4+ Award-Winning Projects · 20,000+ Users Reached · 3 Internships · 1st-Place Hackathon Winner · Industry-Sponsored Capstone`

---

## SKILLS (group these — do NOT use skill bars or percentages, they look amateurish)

- **Languages:** JavaScript, TypeScript, Python, Java, SQL, C++
- **Frontend:** React, Next.js, Vue.js, Tailwind CSS, Component Architecture, Figma-to-Code, Recharts, a11y
- **Backend & APIs:** Node.js, Express, Flask, FastAPI, REST, WebSockets/SSE, Event-Driven Workflows
- **Databases:** PostgreSQL, MySQL, MongoDB, Supabase, Firebase, pgvector
- **AI / LLM:** Claude API, OpenAI API, Multi-Agent Systems, Agentic Workflows, Prompt Engineering, RAG, LLM Evaluation, Tool Calling, Hallucination Detection
- **Cloud & DevOps:** AWS (S3, Lambda), GCP, Railway, Docker, Git, CI/CD (GitHub Actions), Linux/CLI

---

## PROJECTS (4 featured — animated text/detail blocks, NOT image cards)

Each block should show: number, name, award badge (where relevant), one-line problem, what I built, the quantified result, stack tags, and links.

### 1. RideIQ — AI Car-Recommendation Platform  🥇 1st Place, Toyota Challenge @ TAMUHack (Jan 2026)
- **Problem:** Car shoppers face tens of thousands of listings with no way to describe what they actually want in plain language.
- Led front-end for an AI car marketplace — a responsive, production-grade dashboard in Next.js, React, Tailwind.
- Built semantic search with pgvector embeddings interpreting natural-language queries across 43k vehicles / 62k listings; a 4-car comparison system with React Context + Recharts; and a test-drive booking flow.
- **Result:** 1st place — full working product built and demoed in 24 hours.
- **Stack:** React · Next.js · TypeScript · Tailwind · Supabase/PostgreSQL · pgvector · Recharts
- **Links:** `DEMO_URL` · `GITHUB_URL` · `DEVPOST_URL` *(placeholders)*

### 2. DOME — One-Line Diagram Extraction (Senior Capstone, Glenart Group)
- **Problem:** Extracting equipment data from single-line electrical diagrams was a slow, manual, expensive task ($200K–$500K and 6–12 months per facility).
- Co-developed a **13-agent Claude pipeline** that ingests a one-line diagram and outputs structured JSON (equipment ID, type, specs, upstream/downstream connections, breaker ratings). I was Reporting Lead — owned the redundancy-detection (Agent 5) and output-formatting (Agent 10) agents, and fixed recurring pipeline bugs.
- **Result:** 95% equipment-level and 81.72% field-level accuracy across 20 real-world diagrams; cut a 2–4 hour task to under 5 minutes (90–95% time reduction).
- **Stack:** Next.js · TypeScript · Claude API (Opus) · Multi-Agent Pipeline · JSON
- **Note:** source code confidential at sponsor's request.
- **Links:** `LINKS_TBD` *(I'll confirm what's shareable with Glenart)*

### 3. FinanceIQ — AI Investing Platform  🏅 4th Place, Goldman Sachs Challenge (Apr 2026)
- Full-stack AI investing platform aggregating live data from 7 financial APIs (yfinance, Polygon, FRED, NewsAPI, Claude) for personalized, AI-generated insights.
- Multi-agent Python/FastAPI backend on Railway with scheduled connectors and rate-limit handling; a Claude Sonnet advisor using SSE streaming + 6 tool calls; a responsive React/Next.js dashboard with real-time Recharts visualizations.
- **Stack:** Next.js · React · FastAPI · Python · Supabase · Railway · Claude API · Recharts
- **Links:** `DEMO_URL` · `GITHUB_URL` · `DEVPOST_URL` *(placeholders)*

### 4. Your.ai — LLM Scheduling Assistant  🥈 2nd Place, ACM Projects
- LLM-powered scheduling assistant that manages calendars, tasks, and deadlines through natural-language commands and calendar sync.
- Implemented a RAG pipeline over user schedule/task data for context-aware recommendations; React/TypeScript UI with Google OAuth over a Flask/Express backend.
- **Stack:** React · TypeScript · Vite · Tailwind · OpenAI Assistants API · RAG · Flask/Express · Google OAuth
- **Links:** `LINKS_TBD` *(placeholders)*

---

## EXPERIENCE / JOURNEY (self-drawing timeline, most recent first)

- **Technology Officer — Artificial Intelligence Society** · Jun 2025–Present. Build & maintain the org's web platform (React, Next.js, TypeScript, Tailwind); integrated reusable components boosting front-end efficiency ~30%; produced docs so non-technical members could use the platform.
- **Project Lead — Nebula Labs (UTD Trends)** · Jan 2025–May 2025. Led 30+ engineers and designers in a full UI redesign of a data-driven course-aggregation site serving **20,000 users**; onboarded new members enabling deployment within 5 weeks.
- **SWE Intern — Syft (Startup)** · Sept 2024–July 2025. Built/maintained a Python + Flask app supporting **500+ active users**; automated a cloud pipeline (AWS S3 + Firestore, Boto3) for 1,000+ images.
- **SWE Intern — Maiya LLC** · Sept 2023–March 2024. Built a full-stack management system for **500+ monthly customers** (React, Node, Express, PostgreSQL); cut check-in/out wait times ~30%.

**Education (place near experience or in footer):** B.S. Computer Science, UT Dallas · GPA 3.63 · Aug 2023–Dec 2026.

---

## REQUIRED SECTIONS (in this order)

1. **Nav** — minimal: name/logo left, section links + theme toggle right. Subtle; can fade/hide on scroll-down and reappear on scroll-up.
2. **Hero** — name, hook, one CTA ("View my work") + social links. Big type. SplitText load animation. Quick-stats bar.
3. **About** — bio + grouped skills (clean, no bars). Reveal on scroll.
4. **Projects** — the 4 projects as pinned, animated detail blocks (technique #4). NO image cards.
5. **Experience / Journey** — self-drawing timeline (technique #5).
6. **Contact / Footer** — confident closing line ("Want to build something, or just talk shop?"), email + social links, resume link, copyright.

---

## NON-NEGOTIABLES

- Fully **responsive** (mobile, tablet, desktop). Test the pinned projects section carefully on mobile — simplify to a plain stacked reveal there if the pin fights you.
- Respect **`prefers-reduced-motion`** — disable heavy scroll animations and just show content cleanly when it's set.
- **Fast load.** No animation should block content from appearing. Keep Lighthouse performance high.
- **Semantic, accessible HTML** — alt text, keyboard nav, proper heading hierarchy, visible focus states.
- **Clean, commented, component-based code** I can maintain and extend.
- Use **placeholders** (`DEMO_URL`, `GITHUB_URL`, etc.) wherever I haven't given a real link — never invent links.

---

## BUILD ORDER (follow this — STOP after each phase for my review)

**Phase 0 — Scaffold.** Set up the Next.js + TS + Tailwind project. Install all dependencies (Lenis, GSAP, next-themes). Set up the design-token system (colors, fonts, spacing) and the theme toggle. Show me the file/folder structure. **STOP.**

**Phase 1 — Static layout.** Build all 6 sections as static, stacked, responsive components with my real content — **no animations yet**. Make it readable and well-typeset. **STOP.**

**Phase 2 — Scroll + intro.** Add Lenis smooth scroll site-wide. Then add the page-load intro animation and hero SplitText reveal. **STOP.**

**Phase 3 — Section motion.** Add scroll-triggered reveals to About, the pinned Projects transitions, and the self-drawing Experience timeline — **one at a time, stopping after each.**

**Phase 4 — Polish.** Add the scroll-progress indicator, polish hover/focus states, wire up `prefers-reduced-motion`, and do a performance + mobile pass. **STOP.**

---

Start with **Phase 0.** Ask me any genuinely ambiguous clarifying questions before you begin — otherwise proceed.
