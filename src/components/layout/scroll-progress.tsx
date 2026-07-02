"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin scroll-progress indicator (technique #7) — a cyan line across the top
 * that fills as you move through the page. Tracks window scroll (Lenis-driven).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-primary"
    />
  );
}
