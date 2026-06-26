import { SectionHeading } from "@/components/layout/section-heading";
import { about, skills, education } from "@/lib/site";

/**
 * PHASE 1 — About: bio + grouped skills (no bars/percentages) + education.
 * Scroll reveals get added in the motion phase.
 */
export function About() {
  return (
    <section
      id="about"
      className="border-t border-border/60 px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="01" title="About" />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Bio */}
          <div>
            <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl md:leading-relaxed">
              {about.paragraph}
            </p>

            <div className="mt-10 border-l-2 border-primary/40 pl-5">
              <p className="font-heading text-base font-medium">
                {education.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {education.school} · {education.detail}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.group}>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {group.group}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-border bg-card/40 px-2.5 py-1 text-sm text-foreground/80 transition-colors hover:border-primary/50 hover:text-foreground"
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
