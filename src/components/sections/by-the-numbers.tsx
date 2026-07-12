"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

/**
 * "by the numbers." — four big CountUp stats. Custom count-up (no extra deps):
 * numbers animate from 0 when the section scrolls into view, once. Static
 * under prefers-reduced-motion.
 */
const stats = [
  { number: 4, suffix: "+", label: "Award-winning projects" },
  { number: 20000, suffix: "+", label: "Users reached" },
  { number: 3, suffix: "", label: "Internships" },
  { number: 1, suffix: "st", label: "Place hackathon finish" },
];

function CountUp({ target, start }: { target: number; start: boolean }) {
  const value = useMotionValue(0);
  const text = useTransform(value, (v) =>
    Math.round(v).toLocaleString("en-US"),
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduced) {
      value.set(target);
      return;
    }
    const controls = animate(value, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [start, target, value, reduced]);

  return <motion.span>{text}</motion.span>;
}

export function ByTheNumbers() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section ref={ref} aria-label="By the numbers" className="px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-16 font-heading text-4xl tracking-tight md:text-5xl">
          by the numbers.
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              {/* clamp keeps "20,000+" inside its column at every width */}
              <p className="text-[clamp(2.25rem,4.5vw,4.25rem)] font-bold leading-none tracking-tight text-primary">
                <CountUp target={stat.number} start={inView} />
                <span className="text-muted-foreground">{stat.suffix}</span>
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
