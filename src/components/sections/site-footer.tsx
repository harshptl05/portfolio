"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, SplitText);

const linkCols = [
  { label: "Email", href: `mailto:${site.links.email}`, value: site.links.email, external: false },
  { label: "LinkedIn", href: site.links.linkedin, value: "in/harsh-pate1", external: true },
  { label: "GitHub", href: site.links.github, value: "harshptl05", external: true },
];

// repeated marquee unit
const marqueeItems = Array.from({ length: 8 }, () => "Get in touch");

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const target = ref.current?.querySelector(".footer-headline");
      if (!target) return;
      const split = new SplitText(target as HTMLElement, { type: "words,chars" });
      gsap.from(split.chars, {
        yPercent: 120,
        autoAlpha: 0,
        stagger: 0.02,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: target, start: "top 85%" },
      });
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <footer
      ref={ref}
      className="border-t border-border/60 px-6 pt-24 pb-12 md:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="footer-headline font-heading text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tighter">
          Let&apos;s build something.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Open to full-time roles, internships, and interesting projects.
        </p>
      </div>

      {/* Running mailto marquee */}
      <a
        href={`mailto:${site.links.email}`}
        aria-label="Get in touch by email"
        className="group mt-16 block overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_6%,white_94%,transparent)]"
      >
        <div className="flex w-max gap-8 animate-scroll motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-8 font-heading text-4xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-6xl"
            >
              {text}
              <span className="text-primary/60">·</span>
            </span>
          ))}
        </div>
      </a>

      {/* Link columns */}
      <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
        {linkCols.map((col) => (
          <a
            key={col.label}
            href={col.href}
            {...(col.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group flex items-center justify-between border-t border-border pt-4 transition-colors hover:border-primary/50"
          >
            <span>
              <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {col.label}
              </span>
              <span className="mt-1 block text-foreground transition-colors group-hover:text-primary">
                {col.value}
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </a>
        ))}
      </div>

      <p className="mx-auto mt-20 w-full max-w-6xl font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name} — Built with Next.js, Tailwind,
        GSAP
      </p>
    </footer>
  );
}
