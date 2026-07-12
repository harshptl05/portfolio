"use client";

import { useEffect, useState } from "react";
import MarqueeAlongSvgPath from "@/components/fancy/blocks/marquee-along-svg-path";

/**
 * Hero background: achievement stat pills drifting along a looping path,
 * extremely subtle (z-0, under the aurora, under all text). Desktop-only;
 * skipped entirely under prefers-reduced-motion.
 */
const heroPath =
  "M-50,400 C100,350 200,100 400,80 C600,60 700,300 600,350 C500,400 300,420 200,350 C100,280 150,150 350,120 C550,90 800,200 900,180 C1000,160 1050,300 1100,280";

const heroItems = [
  { label: "20,000+ users", color: "#06B6D4" },
  { label: "1st place", color: "#F59E0B" },
  { label: "95% accuracy", color: "#8B5CF6" },
  { label: "13 agents", color: "#06B6D4" },
  { label: "3 internships", color: "#10B981" },
  { label: "500+ users", color: "#06B6D4" },
  { label: "30-person team", color: "#F59E0B" },
  { label: "4 hackathons", color: "#10B981" },
  { label: "UT Dallas", color: "#06B6D4" },
  { label: "GPA 3.63", color: "#8B5CF6" },
  { label: "Full-Stack + AI", color: "#F59E0B" },
  { label: "Dec 2026", color: "#06B6D4" },
];

export function HeroPathBackground() {
  // Render nothing until mounted (SSR-safe) and never under reduced motion.
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      style={{ opacity: 0.06 }}
    >
      <MarqueeAlongSvgPath
        path={heroPath}
        viewBox="0 0 1000 500"
        baseVelocity={3}
        slowdownOnHover={false}
        draggable={false}
        repeat={2}
        responsive
        className="h-full w-full"
      >
        {heroItems.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5"
            style={{
              borderColor: item.color + "40",
              background: item.color + "10",
            }}
          >
            <span
              className="font-mono text-[11px] font-semibold"
              style={{ color: item.color }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  );
}
