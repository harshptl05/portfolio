"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Cover } from "@/components/ui/cover";
import { RevealText } from "@/components/ui/reveal-text";
import { Socials } from "@/components/layout/socials";
import { site } from "@/lib/site";

gsap.registerPlugin(SplitText);

/**
 * PHASE 2 — Hero with page-load intro (technique #6) + SplitText reveal
 * (technique #2). The lead heading splits into characters that stagger-rise,
 * then the rest of the hero settles in under ~2s. Honors reduced motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const split = new SplitText(".hero-lead", { type: "chars" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.from(".hero-eyebrow", { y: 18, autoAlpha: 0, duration: 0.6 })
        .from(
          split.chars,
          { yPercent: 120, autoAlpha: 0, stagger: 0.025, duration: 0.7 },
          "-=0.25",
        )
        .from(
          ".hero-flip",
          { y: 24, autoAlpha: 0, duration: 0.6 },
          "-=0.35",
        )
        .from(".hero-sub", { y: 18, autoAlpha: 0, duration: 0.6 }, "-=0.3")
        .from(
          ".hero-actions > *",
          { y: 16, autoAlpha: 0, stagger: 0.1, duration: 0.5 },
          "-=0.3",
        )
        .from(
          ".hero-stats > *",
          { y: 12, autoAlpha: 0, stagger: 0.04, duration: 0.4 },
          "-=0.2",
        );

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[92vh] items-center px-6 pt-28 pb-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="hero-eyebrow font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          {site.role} · {site.location}
        </p>

        {/* Name — RevealText (springs in, hover sweep) */}
        <div className="mt-6">
          <RevealText
            text="Harsh Patel"
            textColor="text-foreground"
            overlayColor="text-primary"
            fontSize="text-[clamp(3rem,11vw,7.5rem)]"
            letterDelay={0.06}
            overlayDelay={0.04}
            overlayDuration={0.35}
            springDuration={500}
          />
        </div>

        <h1 className="mt-6 max-w-3xl font-heading text-[clamp(1.6rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-tight text-muted-foreground">
          <span className="hero-lead inline">I build</span>{" "}
          <span className="hero-flip inline-block align-bottom">
            <Cover>
              <ContainerTextFlip
                words={[
                  "full-stack products",
                  "AI agents",
                  "things that ship",
                  "multi-agent pipelines",
                  "what matters",
                ]}
                interval={2400}
                className="text-[clamp(1.6rem,4.5vw,3rem)] tracking-tight"
              />
            </Cover>
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A full-stack &amp; AI engineer turning multi-agent LLM systems and
          React/Next.js front ends into products that reach real users.
        </p>

        <div className="hero-actions mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View my work
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <Socials />
        </div>

        {/* Quick-stats bar */}
        <ul className="hero-stats mt-16 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {site.stats.map((s) => (
            <li
              key={s}
              className="rounded-full border border-border px-3 py-1.5"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
