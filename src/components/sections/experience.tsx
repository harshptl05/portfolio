"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/layout/section-heading";
import { experience } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * PHASE 3 — Self-drawing Journey timeline (technique #5). The vertical line
 * draws itself (scrubbed to scroll) while each entry + node reveals as it
 * enters. Owns its own entrance (not wrapped in SectionPanel).
 * No-op under prefers-reduced-motion.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const list = root.current?.querySelector(".timeline-list");
      if (!list) return;

      // heading
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
    <section ref={root} id="experience" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="exp-heading">
          <SectionHeading index="03" title="Journey" />
        </div>

        <ol className="timeline-list relative mt-16 pl-8 md:pl-12">
          {/* self-drawing line */}
          <span
            aria-hidden
            className="timeline-line absolute top-1.5 left-0 h-[calc(100%-0.375rem)] w-px origin-top bg-border"
          />
          {experience.map((item) => (
            <li
              key={item.role + item.org}
              className="timeline-entry relative pb-14 last:pb-0"
            >
              <span className="timeline-node absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-primary md:-left-[calc(3rem+5px)]" />

              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {item.period}
              </p>
              <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight md:text-2xl">
                {item.role} <span className="text-primary">· {item.org}</span>
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
