import { ParallaxBackground } from "@/components/layout/parallax-background";

/**
 * FEATURED WORK — DOME. Full-width amber-accented callout between About and
 * the tech marquee. One project, three big stats, Apple-product-page feel.
 * Faint amber "DOME" parallax ghost drifts behind for depth.
 */
const stats = [
  { num: "95%", label: "Equipment-level accuracy" },
  { num: "5 min", label: "Down from 2–4 hours" },
  { num: "13", label: "Agents in the pipeline" },
];

const AMBER = "#F59E0B";

export function DomeCallout() {
  return (
    <section
      aria-label="Featured work — DOME"
      className="relative overflow-hidden px-6 py-20 md:px-16"
    >
      {/* Amber parallax ghost — ties the callout into the site's depth language */}
      <ParallaxBackground
        text="DOME"
        color={AMBER}
        speed={0.12}
        opacity={0.035}
        fontSize="clamp(10rem, 24vw, 20rem)"
        top="15%"
        left="40%"
      />

      <div className="relative z-10">
      <p
        className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: AMBER }}
      >
        Featured Work · Industry Capstone
      </p>
      <h2 className="mb-4 font-heading text-4xl tracking-tight md:text-6xl">
        DOME — Glenart Group
      </h2>
      <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">
        A 13-agent Claude API pipeline that extracts structured equipment data
        from single-line electrical diagrams — cutting a 2–4 hour manual task
        to under 5 minutes.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.num}
            className="border-t pt-6"
            style={{ borderColor: `${AMBER}33` }}
          >
            <p
              className="mb-2 text-4xl font-bold md:text-5xl"
              style={{ color: AMBER }}
            >
              {stat.num}
            </p>
            <p className="font-mono text-sm uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground/75">
        Source code confidential · Sponsor: Glenart Group · Spring 2026
      </p>
      </div>
    </section>
  );
}
