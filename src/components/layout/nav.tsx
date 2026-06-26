import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav, site } from "@/lib/site";

/**
 * PHASE 1 — static nav. Minimal: monogram left, section links + theme
 * toggle + CTA right. The scroll-driven shrink/hide behavior (Resizable
 * Navbar) gets wired in the motion phase.
 */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="#top"
          className="font-heading text-base font-semibold tracking-tight"
          aria-label={`${site.name} — home`}
        >
          Harsh<span className="text-primary">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.links.email}`}
            className="hidden rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary sm:inline-block"
          >
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
