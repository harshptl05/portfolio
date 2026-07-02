"use client";

import { cn } from "@/lib/utils";

export type ProjectCardData = {
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
  demo: string | null;
  note?: string;
};

/** Placeholder links use ALL-CAPS tokens (DEMO_URL etc.) — render disabled. */
function isPlaceholder(href: string) {
  return /^[A-Z_]+$/.test(href);
}

/**
 * Text-driven project card (NO images). Each card carries its own accent
 * color: a top hairline, ghost number, category label, result rule, and a
 * hover glow all use it.
 */
export function ProjectCard({
  card,
  className,
}: {
  card: ProjectCardData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-[480px] w-[320px] shrink-0 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 md:w-[400px]",
        className,
      )}
    >
      {/* Accent hairline */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: card.accentColor }}
      />

      {/* Ghost number */}
      <div
        className="pointer-events-none absolute top-4 right-6 select-none font-mono text-[8rem] font-bold leading-none"
        style={{ color: card.accentColor, opacity: 0.06 }}
      >
        {card.number}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <p
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.15em]"
            style={{ color: card.accentColor }}
          >
            {card.category}
          </p>
          <p className="mb-6 inline-block rounded-full border border-neutral-800 px-3 py-1 font-mono text-xs text-neutral-500">
            {card.award}
          </p>
          <h3 className="mb-3 text-4xl font-bold tracking-tight text-white">
            {card.title}
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-neutral-400">
            {card.tagline}
          </p>
          <p className="text-xs leading-relaxed text-neutral-500">
            {card.description}
          </p>
        </div>

        <div>
          {/* Result callout */}
          <div
            className="mb-6 border-l-2 pl-3"
            style={{ borderColor: card.accentColor }}
          >
            <p className="text-xs font-medium leading-relaxed text-neutral-300">
              {card.result}
            </p>
          </div>

          {/* Stack */}
          <div className="mb-6 flex flex-wrap gap-1.5">
            {card.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 font-mono text-[10px] text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-3">
            {card.github && !isPlaceholder(card.github) && (
              <a
                href={card.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1.5 font-mono text-xs text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
              >
                GitHub →
              </a>
            )}
            {card.github && isPlaceholder(card.github) && (
              <span className="rounded-full border border-neutral-800 px-3 py-1.5 font-mono text-xs text-neutral-600">
                GitHub (soon)
              </span>
            )}
            {card.demo && !isPlaceholder(card.demo) && (
              <a
                href={card.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-opacity hover:opacity-90"
                style={{
                  background: card.accentColor + "20",
                  color: card.accentColor,
                  border: `1px solid ${card.accentColor}40`,
                }}
              >
                Live demo →
              </a>
            )}
            {card.demo && isPlaceholder(card.demo) && (
              <span
                className="rounded-full px-3 py-1.5 font-mono text-xs"
                style={{
                  color: card.accentColor + "99",
                  border: `1px solid ${card.accentColor}30`,
                }}
              >
                Demo (soon)
              </span>
            )}
            {card.note && (
              <span className="self-center font-mono text-[10px] text-neutral-600">
                {card.note}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${card.accentColor}14 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
