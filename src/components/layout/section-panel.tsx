"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic section entrance (technique: layered "panel stack"). Each section
 * slides up + scales in as it enters; reverses when scrolled back past it.
 * Mobile: smaller offset, no scale (avoids jank). Lenis stays active.
 * No-op under prefers-reduced-motion.
 */
export function SectionPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (ctx) => {
          const { isMobile } = ctx.conditions as { isMobile: boolean };
          gsap.fromTo(
            el,
            {
              y: isMobile ? 30 : 70,
              opacity: 0,
              scale: isMobile ? 1 : 0.97,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 40%",
                toggleActions: "play none none reverse",
              },
            },
          );
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  );
}
