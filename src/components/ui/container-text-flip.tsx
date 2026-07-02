"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for each word */
  textClassName?: string;
}

/**
 * Cycling word with ZERO layout reflow.
 *
 * Every word is rendered into the SAME CSS grid cell (col/row start 1), so
 * the element is permanently sized to the WIDEST word — the surrounding
 * headline text never shifts when the word changes. The active word
 * cross-fades + rises in; the rest are hidden. No framer-motion `layout`
 * (which was re-measuring on scroll and nudging the whole page).
 * Respects prefers-reduced-motion via motion-reduce.
 */
export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 2600,
  className,
  textClassName,
}: ContainerTextFlipProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span
      className={cn(
        "relative inline-grid align-bottom font-semibold text-primary",
        className,
      )}
    >
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:blur-0",
            i === index
              ? "translate-y-0 opacity-100 blur-0"
              : "pointer-events-none translate-y-[0.3em] opacity-0 blur-[6px]",
            textClassName,
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
