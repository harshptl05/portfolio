import { SectionHeading } from "@/components/layout/section-heading";
import { experience } from "@/lib/site";

/**
 * PHASE 1 — Experience/Journey timeline (static). A vertical line with
 * entries, most recent first. The self-drawing line + alongside reveals
 * (technique #5) get added in the motion phase.
 */
export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-border/60 px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="03" title="Journey" />

        <ol className="mt-16 border-l border-border/70 pl-8 md:pl-12">
          {experience.map((item) => (
            <li key={item.role + item.org} className="relative pb-14 last:pb-0">
              {/* node */}
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary md:-left-[calc(3rem+5px)]" />

              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight md:text-2xl">
                {item.role}{" "}
                <span className="text-primary">· {item.org}</span>
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
