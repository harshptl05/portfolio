"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial section divider: a gradient hairline + ✦ that draws itself
 * left-to-right on scroll enter. Themed via tokens. Reduced-motion: static.
 */
export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const lines = ref.current?.querySelectorAll<HTMLElement>(".divider-line");
      if (!lines?.length) return;
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 90%" },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className="mx-auto my-2 flex w-full max-w-6xl items-center gap-4 px-6"
    >
      <div className="divider-line h-px flex-1 origin-left bg-gradient-to-r from-transparent via-border to-transparent" />
      <span className="font-mono text-xs text-muted-foreground/50">✦</span>
      <div className="divider-line h-px flex-1 origin-left bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
