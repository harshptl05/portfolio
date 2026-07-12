"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Threads from "@/components/ui/threads";
import { ParallaxBackground } from "@/components/layout/parallax-background";
import { about, education } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * About — editorial two-column. Left: availability badge, bio with cyan stat
 * highlights (underline draws on scroll), pull quote, education. Right:
 * inline grouped skills text (vladislavkon style — no pill grid), staggered
 * in on scroll. Ghost "01" behind the heading.
 */

// Phrases highlighted inline in the bio; underline draws in on scroll.
const HIGHLIGHTS: { match: string; className: string }[] = [
  { match: "Harsh Patel", className: "stat-hl text-primary font-semibold text-[1.06em] underline decoration-primary/30 underline-offset-4" },
  { match: "TAMUHack's Toyota Challenge", className: "stat-hl text-primary font-semibold" },
  { match: "20,000+", className: "stat-hl text-primary font-semibold" },
  { match: "500+", className: "stat-hl text-primary font-semibold" },
  { match: "30-person", className: "stat-hl text-primary font-semibold" },
  { match: "first place", className: "stat-hl text-primary font-semibold" },
];

function highlight(text: string) {
  const escaped = HIGHLIGHTS.map((h) =>
    h.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  return text.split(re).map((part, i) => {
    const rule = HIGHLIGHTS.find((h) => h.match === part);
    return rule ? (
      <span key={i} className={rule.className}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

// Inline grouped skills — one editorial line per group (merged from resume).
const skillGroups = [
  {
    label: "Languages",
    skills: "TypeScript, JavaScript, Python, Java, SQL, C++, HTML, CSS",
  },
  {
    label: "AI / LLM",
    skills:
      "LLM APIs (Claude, OpenAI, Hugging Face), Prompt Engineering, Prompt Chaining, Agentic Workflows, Multi-Agent Orchestration, LangChain, CrewAI, RAG, Semantic Search, Model Fine-Tuning, Generative AI",
  },
  {
    label: "Frontend & Tooling",
    skills:
      "React, Next.js, Vue.js, Tailwind CSS, Framer Motion, Recharts, Figma, Front-End Integration, a11y",
  },
  {
    label: "Backend & Data",
    skills:
      "Node.js, Express, Flask, FastAPI, REST APIs, WebSockets/SSE, Asynchronous Programming, Vector Databases (pgvector), PostgreSQL, MySQL, MongoDB, Supabase, Firebase",
  },
  {
    label: "Cloud & DevOps",
    skills:
      "AWS (S3, Lambda), GCP, Railway, Docker, Git/GitHub, CI/CD (GitHub Actions), Linux",
  },
];

// Bio splits around the pull-quote sentence so no copy is lost.
const PULL_QUOTE = "I treat AI agents as real engineering leverage.";
const [bioMain] = about.paragraph.split(" I treat AI agents");
const bioTail =
  "— with a heavy emphasis on prompt engineering and validating what the model actually produces.";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      // Stat underlines draw left-to-right when the bio enters
      gsap.fromTo(
        ".stat-hl",
        { backgroundSize: "0% 2px" },
        {
          backgroundSize: "100% 2px",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".about-bio", start: "top 75%" },
        },
      );

      // Skill rows stagger up
      gsap.from(".skill-row", {
        y: 14,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".skills-col", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Flowing WebGL thread lines — cyan, scrolls with the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-30 dark:opacity-25"
      >
        <Threads
          color={[0.024, 0.714, 0.831]} // #06B6D4
          amplitude={1.4}
          distance={0}
          enableMouseInteraction
        />
      </div>

      {/* Parallax ghost — drifts as you scroll */}
      <ParallaxBackground
        text="About"
        speed={0.15}
        opacity={0.03}
        fontSize="clamp(10rem, 25vw, 22rem)"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm uppercase tracking-widest text-primary">
            01
          </span>
          <h2 className="font-heading text-5xl tracking-tight md:text-7xl">
            About
          </h2>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_auto_1fr] lg:gap-10">
          {/* Bio (left) */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 -m-6 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)]" />

            {/* Availability badge */}
            <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
              Available Dec 2026
            </div>

            <p className="about-bio relative text-lg font-light leading-loose text-foreground/80 md:text-xl">
              {highlight(bioMain)}
            </p>

            {/* Pull quote — subtle cyan wash for weight */}
            <blockquote className="relative my-10 rounded-r-lg border-l-2 border-primary bg-primary/[0.03] py-4 pl-5">
              <p className="font-heading text-xl italic text-foreground md:text-2xl">
                {PULL_QUOTE}
              </p>
              <p className="mt-2 text-sm font-light text-muted-foreground">
                {bioTail}
              </p>
            </blockquote>

            {/* Education */}
            <div className="relative mt-10 border-t border-border pt-8">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-semibold text-foreground">
                  {education.degree}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {education.school} · {education.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical column rule */}
          <div className="hidden w-px self-stretch bg-gradient-to-b from-transparent via-border to-transparent lg:block" />

          {/* Skills (right) — inline editorial rows, hover brightens */}
          <div className="skills-col lg:pt-2">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="skill-row group border-b border-border/50 py-4 transition-colors first:pt-0 last:border-0 hover:border-border"
              >
                <div className="flex items-baseline gap-3">
                  <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                    {group.label}
                  </span>
                  <span className="font-mono text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/80">
                    {group.skills.replace(/, /g, " · ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
