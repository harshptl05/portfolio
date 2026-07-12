"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Letters spring in on mount; on hover a colored overlay sweeps across the
 * text left-to-right. Custom build (the 21st.dev original is paywalled) that
 * matches the same prop API. Honors prefers-reduced-motion.
 */
export function RevealText({
  text,
  textColor = "text-foreground",
  overlayColor = "text-primary",
  fontSize = "text-7xl",
  letterDelay = 0.06,
  overlayDelay = 0.04,
  overlayDuration = 0.35,
  springDuration = 500,
  className,
}: {
  text: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const letters = Array.from(text);

  return (
    <span
      className={cn(
        "group inline-flex flex-wrap font-heading leading-[1.05] tracking-tight",
        fontSize,
        className,
      )}
      aria-label={text}
    >
      {letters.map((ch, i) => {
        const glyph = ch === " " ? " " : ch;
        return (
          <span
            key={i}
            aria-hidden
            className="relative inline-block overflow-hidden"
          >
            {/* Base letter — springs up into place */}
            <motion.span
              className={cn("inline-block", textColor)}
              initial={reduced ? false : { y: "115%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      duration: springDuration / 1000,
                      bounce: 0.35,
                      delay: i * letterDelay,
                    }
              }
            >
              {glyph}
            </motion.span>

            {/* Hover overlay — sweeps up to cover the base letter */}
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 inline-block translate-y-full transition-transform ease-out group-hover:translate-y-0 motion-reduce:transition-none",
                overlayColor,
              )}
              style={{
                transitionDelay: `${i * overlayDelay}s`,
                transitionDuration: `${overlayDuration}s`,
              }}
            >
              {glyph}
            </span>
          </span>
        );
      })}
    </span>
  );
}
