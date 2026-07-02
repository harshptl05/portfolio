"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal (technique #3). Fades + slides its content up as
 * it enters the viewport. Pass `stagger` to animate direct children in
 * sequence (good for lists/grids). No-op under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  y = 28,
  stagger,
  start = "top 82%",
  duration = 0.8,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      const targets =
        stagger != null ? (Array.from(el.children) as HTMLElement[]) : el;

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
