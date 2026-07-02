"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Carousel } from "@/components/ui/apple-cards-carousel";
import { ProjectCard, type ProjectCardData } from "@/components/project-card";

gsap.registerPlugin(ScrollTrigger);

const projectCards: ProjectCardData[] = [
  {
    number: "01",
    category: "AI · Full-Stack · Hackathon",
    award: "🥇 1st Place — Toyota Challenge @ TAMUHack",
    title: "RideIQ",
    tagline: "AI car marketplace. Semantic search across 43k vehicles.",
    description:
      "Led front-end for an AI-powered car marketplace built in 24 hours. pgvector semantic search over 43k vehicles and 62k listings. 4-car comparison with Recharts. Test-drive booking flow with Resend.",
    result: "1st place. Full working product in 24 hours.",
    stack: ["React", "Next.js", "TypeScript", "pgvector", "Supabase", "Recharts", "Tailwind"],
    accentColor: "#06B6D4",
    github: "GITHUB_URL",
    demo: "DEMO_URL",
  },
  {
    number: "02",
    category: "AI · Multi-Agent · Capstone",
    award: "Industry Capstone — Glenart Group",
    title: "DOME",
    tagline: "13-agent Claude pipeline. 95% accuracy on electrical diagrams.",
    description:
      "Co-developed a 13-agent Claude API pipeline that ingests one-line electrical diagrams and outputs structured JSON. Owned Agent 5 (Redundancy Detection) and Agent 10 (Output Formatting). Cut a 2–4 hour manual task to under 5 minutes per diagram.",
    result: "95% equipment accuracy. 81.72% field accuracy. 90–95% time reduction.",
    stack: ["TypeScript", "Next.js", "Claude API", "Multi-Agent", "Prompt Engineering"],
    accentColor: "#8B5CF6",
    github: null,
    demo: null,
    note: "Source code confidential at sponsor request.",
  },
  {
    number: "03",
    category: "AI · Full-Stack · Hackathon",
    award: "🏅 4th Place — Goldman Sachs Challenge",
    title: "FinanceIQ",
    tagline: "AI investing platform. 7 live financial APIs in one dashboard.",
    description:
      "Full-stack AI investing platform aggregating yfinance, Polygon, FRED, NewsAPI, and Claude into personalized portfolio insights. Multi-agent FastAPI backend on Railway. Claude Sonnet advisor using SSE streaming with 6 tool calls.",
    result: "4th place at Goldman Sachs Challenge.",
    stack: ["Next.js", "FastAPI", "Python", "Claude API", "Supabase", "Railway", "Recharts"],
    accentColor: "#10B981",
    github: "GITHUB_URL",
    demo: "DEMO_URL",
  },
  {
    number: "04",
    category: "AI · Full-Stack · LLM",
    award: "🥈 2nd Place — ACM Projects",
    title: "Your.ai",
    tagline: "LLM scheduling assistant. Natural language → calendar.",
    description:
      "LLM-powered scheduling assistant with a RAG pipeline over user schedule and task data. Natural-language commands sync with Google Calendar via OAuth. React/TypeScript frontend over Flask/Express backend.",
    result: "2nd place at ACM Projects.",
    stack: ["React", "TypeScript", "OpenAI API", "RAG", "Flask", "Google OAuth", "Vite"],
    accentColor: "#F59E0B",
    github: "GITHUB_URL",
    demo: null,
  },
];

/**
 * PHASE 3 — Projects as a horizontal Apple-style cards carousel (desktop)
 * and a stacked column (mobile). Heading rises in; the carousel slides in
 * from the right. Per-card accent colors. NO images. Reduced-motion safe.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".projects-heading",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".projects-deck",
        { x: 80, opacity: 0, scale: 0.97 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  const cards = projectCards.map((card) => (
    <ProjectCard key={card.title} card={card} />
  ));

  return (
    <section ref={sectionRef} id="projects" className="overflow-hidden py-20">
      <div className="projects-heading relative mb-12 px-6 md:px-16">
        <span className="pointer-events-none absolute -top-8 left-4 select-none font-mono text-[10rem] font-bold leading-none text-primary/[0.05]">
          02
        </span>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.15em] text-primary">
          02
        </p>
        <h2 className="font-heading text-5xl font-semibold tracking-tight md:text-7xl">
          Projects
        </h2>
        <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground">
          Drag or use the arrows to browse →
        </p>
      </div>

      <div className="projects-deck">
        {/* Desktop: horizontal carousel */}
        <div className="hidden md:block">
          <Carousel items={cards} />
        </div>

        {/* Mobile: stacked column */}
        <div className="flex flex-col items-center gap-6 px-6 md:hidden">
          {projectCards.map((card) => (
            <ProjectCard
              key={card.title}
              card={card}
              className="w-full max-w-[400px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
