"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import { ParallaxBackground } from "@/components/layout/parallax-background";
import { FloatingProjectNumbers } from "@/components/layout/floating-project-numbers";

gsap.registerPlugin(ScrollTrigger);

type ProjectRow = {
  number: string;
  category: string;
  award: string;
  title: string;
  tagline: string;
  description: string;
  result: string;
  stack: string[];
  accentColor: string;
  github: string | null;
  devpost?: string | null;
  demo: string | null;
  note?: string;
  role?: string;
};

const projects: ProjectRow[] = [
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
    github: "https://github.com/joshuaraja1/HackTamu2026",
    devpost: "https://devpost.com/software/rideiq",
    demo: null,
    role: "team · hackathon",
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
    role: "reporting lead",
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
    github: "https://github.com/joshuaraja1/financeiq",
    demo: null,
    role: "full-stack",
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
    github: "https://github.com/acm-projects/Your.ai",
    demo: null,
    role: "builder",
  },
  {
    number: "05",
    category: "Full-Stack · IoT · UTD EPICS",
    award: "UTD EPICS Program · Aug 2024 – Dec 2024",
    title: "UTDesign Monitor",
    tagline:
      "Built the frontend for a Raspberry Pi-powered remote display system running live across UTD's SPN building.",
    description:
      "Implemented the web application layer for a remote digital signage platform — building the frontend that lets UTDesign staff and students retrieve, store, and present design presentations through a network-accessible database. Built dynamic frontend components in Vue.js, styled with Tailwind CSS, and templated with Pug for a responsive, maintainable UI. The system pushes dashboards — slideshows of images, videos, and web pages — directly to Raspberry Pi devices mounted on monitors across the building, which connect on boot and display their assigned content automatically.",
    result:
      "Live across monitors in UTD's SPN building. 246 commits shipped across the team.",
    stack: ["Vue.js", "TypeScript", "Nuxt.js", "Tailwind CSS", "Pug", "SQLite", "Prisma", "Auth0"],
    accentColor: "#6366F1",
    github: "https://github.com/UTDallasEPICS/UTDesign-Monitor-Dashboard",
    demo: null,
    role: "contributor · team project",
  },
];

function isPlaceholder(href: string) {
  return /^[A-Z_]+$/.test(href);
}

/**
 * Projects — editorial vertical list (vladislavkon style). Each row: number,
 * title, award + stack preview, arrow. Click toggles an expanding detail
 * (AnimatePresence height animation). Hover fills the row from the left via
 * CSS transform (no GSAP — cheap). Parallax "Projects" text + floating
 * numbers drift behind. Reduced-motion / mobile safe.
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  // First project starts expanded so a skimming visitor sees real content
  // (links, result, stack) without having to interact.
  const [active, setActive] = useState<string | null>("01");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".projects-heading", {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".project-row", {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".projects-list", start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Parallax depth layers */}
      <ParallaxBackground
        text="Projects"
        speed={0.2}
        fontSize="clamp(8rem, 18vw, 16rem)"
      />
      <FloatingProjectNumbers />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="projects-heading">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm uppercase tracking-widest text-primary">
              02
            </span>
            <h2 className="font-heading text-5xl tracking-tight md:text-7xl">
              Projects
            </h2>
          </div>
          <p className="mt-3 max-w-md font-mono text-sm text-muted-foreground">
            Five builds, four awards · click any row for details
          </p>
        </div>

        <div className="projects-list mt-14">
          {projects.map((project) => {
            const isOpen = active === project.number;
            return (
              <div
                key={project.number}
                className="project-row group relative cursor-pointer overflow-hidden border-b border-border py-8 transition-colors duration-300 first:border-t hover:border-foreground/25"
                onClick={() =>
                  setActive(isOpen ? null : project.number)
                }
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(isOpen ? null : project.number);
                  }
                }}
              >
                {/* Hover fill — slides in from the left (pure CSS) */}
                <div className="absolute inset-0 translate-x-[-101%] bg-card/60 transition-transform duration-500 ease-out group-hover:translate-x-0 motion-reduce:transition-none" />

                <div className="relative z-10 flex items-start justify-between gap-8">
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-muted-foreground/80">
                      {project.number}/{String(projects.length).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-sans text-2xl font-bold tracking-tight transition-colors duration-300 md:text-3xl"
                      style={isOpen ? { color: project.accentColor } : undefined}
                    >
                      <span className="group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </span>
                    </h3>
                  </div>

                  <div className="hidden text-right md:block">
                    <p className="mb-1 font-mono text-xs text-muted-foreground">
                      {project.award}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/75">
                      {project.stack.slice(0, 3).join(" · ")}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-muted-foreground/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary ${isOpen ? "rotate-90 text-primary" : ""}`}
                  >
                    →
                  </span>
                </div>

                {/* Award is the strongest signal — keep it visible on mobile,
                    where the right-hand column above is hidden */}
                <p className="relative z-10 mt-2 font-mono text-[10px] text-muted-foreground md:hidden">
                  {project.award}
                </p>

                {/* Expandable detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="pt-6 pb-2">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span
                            className="font-mono text-[10px] uppercase tracking-[0.15em]"
                            style={{ color: project.accentColor }}
                          >
                            {project.category}
                          </span>
                          {project.role && (
                            <span className="rounded border border-border px-2 py-0.5 font-mono text-[9px] uppercase text-muted-foreground">
                              {project.role}
                            </span>
                          )}
                        </div>

                        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        <p
                          className="mb-4 max-w-2xl border-l-2 pl-3 text-sm font-semibold text-foreground"
                          style={{ borderColor: project.accentColor }}
                        >
                          {project.result}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-border px-2 py-1 font-mono text-[10px] text-muted-foreground/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div
                          className="flex flex-wrap items-center gap-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.github &&
                            (isPlaceholder(project.github) ? (
                              <span className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground/75">
                                GitHub (soon)
                              </span>
                            ) : (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                              >
                                GitHub →
                              </a>
                            ))}
                          {project.devpost && (
                            <a
                              href={project.devpost}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                            >
                              Devpost →
                            </a>
                          )}
                          {project.demo &&
                            (isPlaceholder(project.demo) ? (
                              <span
                                className="rounded-full px-3 py-1.5 font-mono text-xs"
                                style={{
                                  color: project.accentColor + "99",
                                  border: `1px solid ${project.accentColor}30`,
                                }}
                              >
                                Demo (soon)
                              </span>
                            ) : (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full px-3 py-1.5 font-mono text-xs transition-opacity hover:opacity-90"
                                style={{
                                  background: project.accentColor + "20",
                                  color: project.accentColor,
                                  border: `1px solid ${project.accentColor}40`,
                                }}
                              >
                                Live demo →
                              </a>
                            ))}
                          {project.note && (
                            <span className="font-mono text-[10px] text-muted-foreground/75">
                              {project.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
