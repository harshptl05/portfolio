"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { RevealText } from "@/components/ui/reveal-text";
import { BgAnimateButton } from "@/components/ui/bg-animate-button";
import { HeroPathBackground } from "@/components/layout/hero-path-background";

gsap.registerPlugin(SplitText);

const rolePills = [
  "Full-Stack",
  "AI / LLM",
  "Multi-Agent",
  "React · Next.js",
  "Python",
];

const affiliations = [
  { name: "AI Society UTD", role: "Tech Officer" },
  { name: "Syft", role: "SWE Intern" },
  { name: "Nebula Labs", role: "Project Lead" },
  { name: "Glenart Group", role: "Capstone" },
  { name: "Maiya LLC", role: "SWE Intern" },
];

/** Live Dallas clock — empty until mounted, so server and client agree. */
function LiveTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/Chicago",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
      dallas, tx · cdt{time ? ` · ${time}` : ""}
    </p>
  );
}

/**
 * Hero — the name is the signature. Everything else stays quiet: live clock,
 * role pills, a flipping tagline, one CTA, and the credential strip. The
 * drifting stat pills sit behind the aurora at 6%.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;

      const split = new SplitText(".hero-lead", { type: "chars" });
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.from(".hero-eyebrow", { y: 14, autoAlpha: 0, duration: 0.5 })
        .from(
          ".hero-pills > *",
          { y: 12, autoAlpha: 0, stagger: 0.05, duration: 0.4 },
          "+=0.5", // let the name spring in first
        )
        .from(
          split.chars,
          { yPercent: 120, autoAlpha: 0, stagger: 0.02, duration: 0.6 },
          "-=0.2",
        )
        .from(".hero-flip", { y: 18, autoAlpha: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-actions", { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.25")
        .from(".hero-below", { autoAlpha: 0, duration: 0.6 }, "-=0.15");

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-24 pb-14"
    >
      {/* Stat pills along a looping path — z-0, beneath everything */}
      <HeroPathBackground />

      {/* Subtle aurora — z-[1], above the path */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 z-[1] h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_10%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="hero-eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/80">
            Full-Stack &amp; AI Engineer
          </p>
          <span aria-hidden className="hidden text-border sm:inline">
            |
          </span>
          <LiveTime />
        </div>

        {/* Name — the signature, and the document's h1 */}
        <h1 className="mt-6">
          <RevealText
            text="Harsh Patel"
            textColor="text-foreground"
            overlayColor="text-primary"
            fontSize="text-[clamp(3.5rem,12vw,8.5rem)]"
            letterDelay={0.06}
            overlayDelay={0.04}
            overlayDuration={0.35}
            springDuration={500}
          />
        </h1>

        {/* Role identity pills */}
        <div className="hero-pills mt-4 mb-6 flex flex-wrap gap-2">
          {rolePills.map((tag) => (
            <span
              key={tag}
              className="cursor-default rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-foreground/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_16px_-4px_rgba(6,182,212,0.5)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p className="max-w-3xl text-xl text-foreground/80 md:text-2xl">
          <span className="hero-lead inline">I build</span>{" "}
          <span className="hero-flip inline-block align-bottom">
            <ContainerTextFlip
              words={[
                "full-stack products",
                "AI agents",
                "things that ship",
                "multi-agent pipelines",
                "what matters",
              ]}
              interval={2400}
              className="text-xl md:text-2xl"
            />
          </span>
        </p>

        {/* One CTA. Never two. */}
        <div className="hero-actions mt-10">
          <BgAnimateButton
            gradient="ocean"
            animation="spin-slow"
            rounded="full"
            onClick={() =>
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="px-2 font-mono text-sm font-semibold text-white">
              View my work →
            </span>
          </BgAnimateButton>
        </div>

        {/* Availability + credential strip */}
        <div className="hero-below mt-14 space-y-2.5">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse"
            />
            B.S. CS @ UT Dallas, Dec 2026 · open to internships &amp; full-time
            roles
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
            {affiliations.map((a, i) => (
              <span key={a.name} className="flex items-center gap-3">
                <span>
                  <span className="text-foreground/70">{a.name}</span> · {a.role}
                </span>
                {i < affiliations.length - 1 && (
                  <span className="text-border">|</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
