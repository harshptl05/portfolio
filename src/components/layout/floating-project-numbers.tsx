"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const numbers = [
  { num: "01", left: "5%", top: "5%" },
  { num: "02", left: "45%", top: "15%" },
  { num: "03", left: "20%", top: "55%" },
  { num: "04", left: "68%", top: "65%" },
  { num: "05", left: "85%", top: "30%" },
];

/**
 * Four huge project numbers drifting at slightly different scrub speeds —
 * multi-layer parallax depth behind the Projects section. Barely visible
 * (3% opacity): felt, not seen. Static on mobile / reduced motion.
 */
export function FloatingProjectNumbers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const speeds = [0.1, 0.25, 0.15, 0.3, 0.2];
      gsap.utils.toArray<HTMLElement>(".float-num").forEach((el, i) => {
        gsap.to(el, {
          y: `-${15 + i * 8}%`,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: speeds[i],
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      {numbers.map(({ num, left, top }) => (
        <div
          key={num}
          className="float-num absolute font-mono font-bold"
          style={{
            left,
            top,
            fontSize: "clamp(6rem, 14vw, 12rem)",
            color: "#06B6D4",
            opacity: 0.03,
            lineHeight: 1,
            willChange: "transform",
          }}
        >
          {num}
        </div>
      ))}
    </div>
  );
}
