"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

/**
 * Minimal nav: name left, links center, toggle + pill CTA right.
 * Transparent at the top; gains blur + hairline after 100px of scroll.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="#top"
          className="font-heading text-lg tracking-tight"
          aria-label={`${site.name} — home`}
        >
          Harsh<span className="text-primary">.</span>
        </Link>

        {/* Centered links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {nav.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                className="font-mono text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Renders once the real resume URL replaces the placeholder */}
          {!/^[A-Z_]+$/.test(site.links.resume) && (
            <a
              href={site.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
            >
              Resume
            </a>
          )}
          <a
            href={`mailto:${site.links.email}`}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground transition-colors hover:border-primary"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
