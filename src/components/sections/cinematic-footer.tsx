import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Custom cinematic footer (the 21st.dev "motion-footer" is paywalled).
 *
 * Curtain reveal: this footer is FIXED at the viewport bottom (z-0). The main
 * content sits above it (z-10, opaque, rounded bottom) and lifts away as you
 * scroll past it — revealing this footer beneath. A full-height spacer in the
 * page provides the scroll room. Pure CSS, so it works with Lenis and is
 * reduced-motion safe.
 *
 * Theme-aware: surfaces/text use tokens, so it flips to light mode with the
 * rest of the site. The reveal stays readable via the main card's drop shadow
 * + the cyan aurora.
 */
const marqueeUnit = ["Get in touch", site.links.email];

const links = [
  { label: "Email", href: `mailto:${site.links.email}`, external: false },
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Resume", href: site.links.resume, external: true },
];

function isPlaceholder(href: string) {
  return /^[A-Z_]+$/.test(href);
}

export function CinematicFooter() {
  return (
    <footer
      aria-label="Contact"
      className="fixed inset-x-0 bottom-0 z-0 flex h-[100svh] flex-col justify-between overflow-hidden border-t border-border bg-background px-6 pt-24 pb-10 text-foreground"
    >
      {/* Aurora glow (cyan) — works on both themes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_70%)] blur-3xl [animation-duration:9s] motion-safe:animate-pulse"
      />

      {/* Headline */}
      <div className="relative mx-auto w-full max-w-6xl pt-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
          Contact
        </p>
        <h2 className="mt-6 font-heading text-[clamp(2.5rem,9vw,8rem)] font-semibold leading-[0.92] tracking-tighter">
          Let&apos;s build something.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Open to full-time roles, internships, and interesting problems.
        </p>
      </div>

      {/* Diagonal running marquee (mailto) */}
      <a
        href={`mailto:${site.links.email}`}
        aria-label="Email Harsh Patel"
        className="group relative -rotate-2 overflow-hidden border-y border-border py-4 [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)]"
      >
        <div className="flex w-max gap-8 animate-scroll motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {Array.from({ length: 8 }).flatMap((_, i) =>
            marqueeUnit.map((text, j) => (
              <span
                key={`${i}-${j}`}
                className="flex shrink-0 items-center gap-8 font-heading text-3xl font-bold tracking-tight text-foreground/90 transition-colors group-hover:text-primary md:text-5xl"
              >
                {text}
                <span className="text-primary/50">·</span>
              </span>
            )),
          )}
        </div>
      </a>

      {/* Links + copyright */}
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {links.map((link) =>
            isPlaceholder(link.href) ? (
              <span
                key={link.label}
                className="flex items-center justify-between border-t border-border pt-3 font-mono text-sm text-muted-foreground"
              >
                {link.label}
                <span className="text-xs">(soon)</span>
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group/link flex items-center justify-between border-t border-border pt-3 font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            ),
          )}
        </div>
        <p className="mt-10 font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name} — Built with Next.js,
          Tailwind, GSAP
        </p>
      </div>
    </footer>
  );
}
