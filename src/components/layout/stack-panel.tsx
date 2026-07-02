"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * Stacked-deck section. Each panel is an opaque rounded card that overlaps the
 * previous one (negative margin + rising z-index + upward shadow). On enter it
 * lifts gently into place; as the NEXT card rises over it, it recedes — scaling
 * down and dimming into shadow, the same "lift to reveal" language as the
 * footer curtain. Only outer transforms are touched, so in-section animations
 * (timeline scrub, carousel, etc.) are untouched.
 *
 * Recede is desktop-only (avoids mobile jank); all motion is skipped under
 * prefers-reduced-motion.
 */
export function StackPanel({
  children,
  index = 0,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      // Gentle lift-in (no opacity, so inner reveals aren't double-hidden)
      gsap.from(card, {
        y: isMobile ? 28 : 64,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
      });

      // Recede as the next card rises over it (desktop only)
      if (!isMobile) {
        gsap.fromTo(
          card,
          { scale: 1, filter: "brightness(1)" },
          {
            scale: 0.93,
            filter: "brightness(0.5)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "bottom 80%",
              end: "bottom 25%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      style={{ zIndex: 10 + index }}
      className={cn(
        "relative -mt-8 origin-top rounded-t-[2.5rem] border-t border-border/40 bg-background shadow-[0_-30px_60px_-30px_rgba(0,0,0,0.55)] will-change-transform md:-mt-14",
        className,
      )}
    >
      {children}
    </div>
  );
}
