import { Fragment } from "react";
import { about, skills, education } from "@/lib/site";

/**
 * PHASE 2.5 — About visual upgrade.
 * Ghost section number, inline stat highlights, accented name anchor,
 * stronger education block, accent skill labels, subtle radial wash.
 * Uses theme tokens (text-primary = site accent) instead of a hard-coded
 * hex so it stays cohesive and light-mode safe.
 */

// Phrases highlighted inline in the bio so recruiters catch them fast.
const HIGHLIGHTS: { match: string; className: string }[] = [
  { match: "Harsh Patel", className: "text-primary font-semibold text-[1.06em]" },
  { match: "TAMUHack's Toyota Challenge", className: "text-primary font-semibold" },
  { match: "20,000+", className: "text-primary font-semibold" },
  { match: "500+", className: "text-primary font-semibold" },
  { match: "30-person", className: "text-primary font-semibold" },
  { match: "first place", className: "text-primary font-semibold" },
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

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading + massive ghost number behind it */}
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -left-1 select-none font-heading text-[8rem] font-bold leading-none text-primary/10 md:-top-24 md:text-[12rem]"
          >
            01
          </span>
          <div className="relative flex items-baseline gap-4">
            <span className="font-mono text-sm uppercase tracking-widest text-primary">
              01
            </span>
            <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              About
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Bio (left) */}
          <div className="relative">
            {/* subtle radial warmth behind the text only */}
            <div className="pointer-events-none absolute inset-0 -m-6 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--primary)_8%,transparent),transparent_60%)]" />

            <p className="relative text-xl font-light leading-loose text-foreground/70 md:text-2xl">
              {highlight(about.paragraph)}
            </p>

            {/* Education */}
            <div className="relative mt-8 mb-6 border-t border-border" />
            <div className="relative border-l-2 border-primary pl-4">
              <p className="font-heading text-base font-semibold text-foreground">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {education.school} · {education.detail}
              </p>
            </div>
          </div>

          {/* Skills (right) */}
          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
                  {group.group}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-card/40 px-2.5 py-1 text-sm text-foreground/80 transition-colors duration-200 hover:border-primary/50 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
