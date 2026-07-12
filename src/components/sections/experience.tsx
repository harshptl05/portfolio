"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParallaxBackground } from "@/components/layout/parallax-background";
import { FractalDotGrid } from "@/components/ui/bg-animated-fractal-dot-grid";
import { experience } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience — self-drawing timeline (gradient line fading out at the bottom,
 * hollow cyan dots) with one large stat per role. Ghost "Experience" drifts
 * behind, right side, barely visible. Token colors only (dark-first).
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const list = root.current?.querySelector(".timeline-list");
      if (!list) return;

      gsap.from(".exp-heading", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".exp-heading", start: "top 85%" },
      });

      // line draws itself as you scroll through the list
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 78%",
            end: "bottom 65%",
            scrub: true,
          },
        },
      );

      // entries + nodes reveal alongside the line
      gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((el) => {
        const node = el.querySelector(".timeline-node");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        tl.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
        });
        if (node) {
          tl.from(
            node,
            { scale: 0, autoAlpha: 0, duration: 0.4, ease: "back.out(2)" },
            "-=0.35",
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Fractal dot grid — slow ambient wave, desktop only */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <FractalDotGrid
          dotSize={3}
          dotSpacing={22}
          dotOpacity={0.15}
          waveIntensity={25}
          waveRadius={180}
          dotColor="rgba(6, 182, 212, 1)"
          glowColor="rgba(6, 182, 212, 1)"
          enableNoise={true}
          noiseOpacity={0.02}
          enableMouseGlow={false}
          initialPerformance="medium"
        />
      </div>

      {/* Ghost — right side, partially cropped, barely visible */}
      <ParallaxBackground
        text="Experience"
        speed={0.15}
        opacity={0.03}
        fontSize="clamp(9rem, 22vw, 19rem)"
        top="12%"
        left="55%"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="exp-heading mb-16">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            03
          </p>
          <h2 className="font-heading text-5xl tracking-tight md:text-7xl">
            Experience
          </h2>
        </div>

        <ol className="timeline-list relative pl-8 md:pl-12">
          {/* self-drawing gradient line — fades out at the bottom */}
          <span
            aria-hidden
            className="timeline-line absolute top-1.5 left-0 h-[calc(100%-0.375rem)] w-px origin-top bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
          />
          {experience.map((item, i) => (
            <li
              key={item.role + item.org}
              className="timeline-entry relative"
            >
              {/* hollow node */}
              <span className="timeline-node absolute -left-[calc(2rem+7px)] top-1.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background md:-left-[calc(3rem+7px)]" />

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
                {/* One large stat — column sized to fit "20,000" without overlap */}
                <div className="shrink-0 border-t border-primary/20 pt-4 sm:w-44 sm:text-right">
                  <p className="text-4xl font-bold leading-none tracking-tight text-primary md:text-5xl">
                    {item.stat}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/80 sm:ml-auto sm:max-w-[130px]">
                    {item.statLabel}
                  </p>
                </div>

                {/* Role details */}
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <h3 className="font-sans text-xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    <span className="rounded-full border border-primary/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary/70">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mb-3 font-mono text-xs text-muted-foreground">
                    {item.org} · {item.period}
                  </p>
                  <p className="mb-3 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground/80">
                    <span className="mr-2 font-mono text-[9px] uppercase text-muted-foreground/70">
                      Stack —
                    </span>
                    {item.stack}
                    {item.link && (
                      <>
                        {"  "}
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-3 text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          GitHub →
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* separator between roles */}
              {i < experience.length - 1 && (
                <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
