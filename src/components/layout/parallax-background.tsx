"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBackgroundProps {
  text: string;
  color?: string;
  /** scrub lag — 0.1 slow drift, 0.4 fast; keep < 1 */
  speed?: number;
  /** drift direction as you scroll down */
  direction?: "up" | "down";
  fontSize?: string;
  opacity?: number;
  top?: string;
  left?: string;
  className?: string;
}

/**
 * Massive, barely-visible background text that drifts (GSAP scrub) at a
 * different speed than the page — parallax depth behind a section.
 * Static on mobile (<768px) and under prefers-reduced-motion.
 */
export function ParallaxBackground({
  text,
  color = "#06B6D4",
  speed = 0.2,
  direction = "up",
  fontSize = "clamp(8rem, 20vw, 18rem)",
  opacity = 0.04,
  top = "10%",
  left = "-2%",
  className,
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      gsap.to(textRef.current, {
        y: direction === "up" ? "-25%" : "25%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className ?? ""}`}
    >
      <div
        ref={textRef}
        style={{
          fontSize,
          color,
          opacity,
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-display)",
          whiteSpace: "nowrap",
          position: "absolute",
          top,
          left,
          willChange: "transform",
        }}
      >
        {text}
      </div>
    </div>
  );
}
