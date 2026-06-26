import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { projects, type Project } from "@/lib/site";

/**
 * PHASE 1 — Projects as animated text/detail blocks (NOT image cards).
 * Number + name + award + problem + build + result + stack + links.
 * The pinned scroll transition (technique #4) and Text Hover Effect on
 * names get layered in during the motion phase.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-border/60 px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading index="02" title="Selected work" />
        <div className="mt-16 divide-y divide-border/60">
          {projects.map((project) => (
            <ProjectBlock key={project.index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Placeholder links use ALL-CAPS tokens (DEMO_URL etc.) — render disabled. */
function isPlaceholder(href: string) {
  return /^[A-Z_]+$/.test(href);
}

function ProjectBlock({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 py-14 md:grid-cols-[auto_1fr] md:gap-12 md:py-20">
      {/* Big index */}
      <div className="font-heading text-5xl font-semibold leading-none text-muted-foreground/30 md:text-7xl">
        {project.index}
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h3 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
            {project.name}
          </h3>
          {project.award && (
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {project.award}
            </span>
          )}
        </div>

        {project.problem && (
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            <span className="text-foreground/70">The problem — </span>
            {project.problem}
          </p>
        )}

        <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
          {project.build}
        </p>

        {project.result && (
          <p className="mt-5 max-w-2xl border-l-2 border-primary/50 pl-4 text-base font-medium text-foreground">
            {project.result}
          </p>
        )}

        {project.note && (
          <p className="mt-4 text-sm italic text-muted-foreground">
            {project.note}
          </p>
        )}

        {/* Stack */}
        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-secondary px-2.5 py-1 font-mono text-xs text-secondary-foreground/80"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((link) =>
            isPlaceholder(link.href) ? (
              <span
                key={link.label}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground/50"
                title="Link coming soon"
              >
                {link.label} <span className="text-xs">(soon)</span>
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-primary"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )
          )}
        </div>
      </div>
    </article>
  );
}
