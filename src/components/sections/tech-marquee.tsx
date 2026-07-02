import {
  siTypescript,
  siReact,
  siNextdotjs,
  siPython,
  siNodedotjs,
  siFastapi,
  siFlask,
  siPostgresql,
  siSupabase,
  siClaude,
  siRailway,
  siDocker,
  siGithubactions,
  siTailwindcss,
} from "simple-icons";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

/**
 * PHASE 3 — Infinite tech-stack marquee with brand SVG logos (Simple Icons).
 * Two rows, opposite directions on desktop; single row on mobile.
 * Brands not in Simple Icons (OpenAI, AWS, RAG, pgvector) render text-only.
 * Animation pauses on hover; disabled under prefers-reduced-motion.
 */
function BrandIcon({ d, color }: { d: string; color: string }) {
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0"
      fill={color}
    >
      <path d={d} />
    </svg>
  );
}

// "currentColor" for brands whose true hue is near-black (invisible on dark bg)
const row1 = [
  { name: "TypeScript", icon: <BrandIcon d={siTypescript.path} color="#3178C6" /> },
  { name: "React", icon: <BrandIcon d={siReact.path} color="#61DAFB" /> },
  { name: "Next.js", icon: <BrandIcon d={siNextdotjs.path} color="currentColor" /> },
  { name: "Python", icon: <BrandIcon d={siPython.path} color="#3776AB" /> },
  { name: "Node.js", icon: <BrandIcon d={siNodedotjs.path} color="#5FA04E" /> },
  { name: "FastAPI", icon: <BrandIcon d={siFastapi.path} color="#009688" /> },
  { name: "Flask", icon: <BrandIcon d={siFlask.path} color="currentColor" /> },
  { name: "PostgreSQL", icon: <BrandIcon d={siPostgresql.path} color="#4169E1" /> },
  { name: "Supabase", icon: <BrandIcon d={siSupabase.path} color="#3FCF8E" /> },
];

const row2 = [
  { name: "Claude API", icon: <BrandIcon d={siClaude.path} color="#D97757" /> },
  { name: "OpenAI API" },
  { name: "RAG" },
  { name: "pgvector" },
  { name: "AWS S3" },
  { name: "Railway", icon: <BrandIcon d={siRailway.path} color="currentColor" /> },
  { name: "Docker", icon: <BrandIcon d={siDocker.path} color="#2496ED" /> },
  { name: "GitHub Actions", icon: <BrandIcon d={siGithubactions.path} color="#2088FF" /> },
  { name: "Tailwind CSS", icon: <BrandIcon d={siTailwindcss.path} color="#06B6D4" /> },
];

export function TechMarquee() {
  return (
    <section aria-label="Tech stack" className="overflow-hidden py-16">
      <div className="relative">
        {/* subtle cyan glow behind the whole marquee */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_70%)]" />

        <p className="relative mb-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Built with
        </p>
        <InfiniteMovingCards
          items={row1}
          direction="left"
          speed="slow"
          pauseOnHover
          className="relative mx-auto"
        />
        <div className="relative mt-3 hidden md:block">
          <InfiniteMovingCards
            items={row2}
            direction="right"
            speed="slow"
            pauseOnHover
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
