"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

/**
 * Infinite marquee of minimal font-mono pills (tech names).
 * Adapted from Aceternity's infinite-moving-cards: duplicates its children
 * for a seamless loop, edges fade via mask-image. Animation is disabled
 * under prefers-reduced-motion (motion-reduce:animate-none).
 */
export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: { name: string; icon?: React.ReactNode }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    // Duplicate items for a seamless loop
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const dup = item.cloneNode(true);
      scrollerRef.current?.appendChild(dup);
    });

    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
    containerRef.current.style.setProperty(
      "--animation-duration",
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
    );

    setStart(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-2",
          start && "animate-scroll motion-reduce:animate-none",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
