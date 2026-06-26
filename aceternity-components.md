# Aceternity UI — Portfolio Components Reference

All components needed for Harsh Patel's portfolio. Copy-paste ready. Organized by section.

---

## SETUP (do this first, once)

### 1. Prerequisites
Your project needs:
- Next.js 14 (App Router) + TypeScript ✓
- Tailwind CSS v4 ✓
- shadcn/ui initialized

### 2. Register the Aceternity registry in `components.json`
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@aceternity": "https://ui.aceternity.com/registry/{name}.json"
  }
}
```

### 3. Install motion (Framer Motion v11+)
```bash
npm install motion
```

### 4. Install tabler icons (needed by Resizable Navbar)
```bash
npm install @tabler/icons-react
```

---

## COMPONENT 1 — Resizable Navbar
**Used for:** Nav section — shrinks/tightens on scroll, expands back up

### Install via CLI (recommended)
```bash
npx shadcn@latest add @aceternity/resizable-navbar
```

### Or copy-paste manually

**File: `components/ui/resizable-navbar.tsx`**
```tsx
"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}
interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}
interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}
interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}
interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}
interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState<boolean>(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });
  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible ? "0 0 24px rgba(34,42,53,0.06),0 1px 1px rgba(0,0,0,0.05),0 0 0 1px rgba(34,42,53,0.04)" : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn("absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2", className)}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800" />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        width: visible ? "90%" : "100%",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-neutral-950/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 dark:bg-neutral-950", className)}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) =>
  isOpen ? <IconX className="text-black dark:text-white" onClick={onClick} /> : <IconMenu2 className="text-black dark:text-white" onClick={onClick} />;

export const NavbarLogo = () => (
  <a href="#" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal">
    <span className="font-bold text-black dark:text-white">HP</span>
  </a>
);

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";
  const variantStyles = {
    primary: "bg-white text-black shadow-sm",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };
  return <Tag href={href || undefined} className={cn(baseStyles, variantStyles[variant], className)} {...props}>{children}</Tag>;
};
```

### How to use it in your layout
```tsx
// app/layout.tsx or your nav component
"use client";
import {
  Navbar, NavBody, NavItems, MobileNav,
  NavbarLogo, NavbarButton, MobileNavHeader,
  MobileNavToggle, MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function PortfolioNav() {
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Experience", link: "#experience" },
    { name: "Contact", link: "#contact" },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <NavbarButton href="mailto:harshptl2023@gmail.com" variant="dark">
          Get in touch
        </NavbarButton>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          {navItems.map((item, idx) => (
            <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-600 dark:text-neutral-300">
              {item.name}
            </a>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
```

---

## COMPONENT 2 — Text Hover Effect
**Used for:** Project names in the Projects section — gradient reveal on hover

### Install via CLI
```bash
npx shadcn@latest add @aceternity/text-hover-effect
```

### Or copy-paste manually

**File: `components/ui/text-hover-effect.tsx`**
```tsx
"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse" cx="50%" cy="50%" r="25%">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{ opacity: hovered ? 0.7 : 0 }}>
        {text}
      </text>
      <motion.text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}>
        {text}
      </motion.text>
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        stroke="url(#textGradient)" strokeWidth="0.3" mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold">
        {text}
      </text>
    </svg>
  );
};
```

### How to use it for project names
```tsx
// In your Projects section — one per project
<div className="h-24 w-full">
  <TextHoverEffect text="RideIQ" />
</div>
<div className="h-24 w-full">
  <TextHoverEffect text="DOME" />
</div>
```

---

## COMPONENT 3 — Background Lines
**Used for:** Hero section background at low opacity — animated SVG wave paths

### Install via CLI
```bash
npx shadcn@latest add @aceternity/background-lines
```

### Or copy-paste manually

**File: `components/ui/background-lines.tsx`**
```tsx
"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: { duration?: number };
}) => {
  return (
    <div className={cn("h-screen w-full bg-black relative", className)}>
      <SVG svgOptions={svgOptions} />
      {children}
    </div>
  );
};

const pathVariants = {
  initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
  animate: { strokeDashoffset: 0, strokeDasharray: "20 800", opacity: [0, 1, 1, 0] },
};

// SVG paths (abbreviated — full paths from source above)
const SVG = ({ svgOptions }: { svgOptions?: { duration?: number } }) => {
  const paths = [
    "M720 450C720 450 742.459 440.315 755.249 425.626C768.039 410.937 778.88 418.741 789.478 401.499C800.076 384.258 817.06 389.269 826.741 380.436C836.423 371.603 851.957 364.826 863.182 356.242C874.408 347.657 877.993 342.678 898.867 333.214C919.741 323.75 923.618 319.88 934.875 310.177C946.133 300.474 960.784 300.837 970.584 287.701C980.384 274.564 993.538 273.334 1004.85 263.087C1016.15 252.84 1026.42 250.801 1038.22 242.1",
    "M720 450C720 450 741.044 435.759 753.062 410.636C765.079 385.514 770.541 386.148 782.73 370.489C794.918 354.83 799.378 353.188 811.338 332.597C823.298 312.005 825.578 306.419 843.707 295.493C861.837 284.568 856.194 273.248 877.376 256.48C898.558 239.713 887.536 227.843 909.648 214.958",
    "M720 450C720 450 712.336 437.768 690.248 407.156C668.161 376.544 672.543 394.253 665.951 365.784C659.358 337.316 647.903 347.461 636.929 323.197C625.956 298.933 626.831 303.639 609.939 281.01C593.048 258.381 598.7 255.282 582.342 242.504C565.985 229.726 566.053 217.66 559.169 197.116",
    "M720 450C720 450 738.983 448.651 790.209 446.852C841.436 445.052 816.31 441.421 861.866 437.296C907.422 433.172 886.273 437.037 930.656 436.651C975.04 436.264 951.399 432.343 1001.57 425.74C1051.73 419.138 1020.72 425.208 1072.85 424.127",
    "M720 450C720 450 695.644 482.465 682.699 506.197C669.755 529.929 671.059 521.996 643.673 556.974C616.286 591.951 625.698 590.8 606.938 615.255C588.178 639.71 592.715 642.351 569.76 665.92C546.805 689.49 557.014 687.498 538.136 722.318",
  ];
  const colors = ["#46A5CA", "#8C2F2F", "#4FAE4D", "#D6590C", "#247AFB"];

  return (
    <motion.svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
      {paths.map((path, idx) => (
        <motion.path key={`path-${idx}`} d={path} stroke={colors[idx]} strokeWidth="2.3" strokeLinecap="round"
          variants={pathVariants} initial="initial" animate="animate"
          transition={{ duration: svgOptions?.duration || 10, ease: "linear", repeat: Infinity, repeatType: "loop", delay: Math.floor(Math.random() * 10), repeatDelay: Math.floor(Math.random() * 10 + 2) }} />
      ))}
    </motion.svg>
  );
};
```

> **Note:** The full path data is in the source you pasted above (document index 49). Copy all 21 paths into the `paths` array and all 21 colors into the `colors` array for the full effect. The abbreviated version above shows the pattern.

### How to use it in your Hero
```tsx
// Hero section
<BackgroundLines className="min-h-screen flex items-center justify-center" svgOptions={{ duration: 12 }}>
  <div className="relative z-10 text-center">
    <h1 className="text-7xl font-bold text-white">Harsh Patel</h1>
    <p className="text-xl text-neutral-400 mt-4">Full-Stack & AI Engineer</p>
  </div>
</BackgroundLines>
```

---

## COMPONENT 4 — Google Gemini Effect
**Used for:** Scroll-triggered SVG beam divider between Hero and Projects

### Install via CLI
```bash
npx shadcn@latest add @aceternity/google-gemini-effect
```

### Or copy-paste manually

**File: `components/ui/google-gemini-effect.tsx`**
```tsx
"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue } from "motion/react";
import React from "react";

const transition = { duration: 0, ease: "linear" as const };

export const GoogleGeminiEffect = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("sticky top-80", className)}>
      {title && <p className="text-lg md:text-7xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">{title}</p>}
      {description && <p className="text-xs md:text-xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">{description}</p>}
      <svg width="1440" height="890" viewBox="0 0 1440 890" xmlns="http://www.w3.org/2000/svg" className="absolute -top-60 md:-top-40 w-full">
        <motion.path
          d="M0 663C145.5 663 191 666.265 269 647C326.5 630 339.5 621 397.5 566C439 531.5 455 529.5 490 523C509.664 519.348 521 503.736 538 504.236C553.591 504.236 562.429 514.739 584.66 522.749C592.042 525.408 600.2 526.237 607.356 523.019C624.755 515.195 641.446 496.324 657 496.735C673.408 496.735 693.545 519.572 712.903 526.769C718.727 528.934 725.184 528.395 730.902 525.965C751.726 517.115 764.085 497.106 782 496.735C794.831 496.47 804.103 508.859 822.469 518.515C835.13 525.171 850.214 526.815 862.827 520.069C875.952 513.049 889.748 502.706 903.5 503.736C922.677 505.171 935.293 510.562 945.817 515.673C954.234 519.76 963.095 522.792 972.199 524.954C996.012 530.611 1007.42 534.118 1034 549C1077.5 573.359 1082.5 594.5 1140 629C1206 670 1328.5 662.5 1440 662.5"
          stroke="#FFB7C5" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[0] }} transition={transition} />
        <motion.path
          d="M0 587.5C147 587.5 277 587.5 310 573.5C348 563 392.5 543.5 408 535C434 523.5 426 526.235 479 515.235C494 512.729 523 510.435 534.5 512.735C554.5 516.735 555.5 523.235 576 523.735C592 523.735 616 496.735 633 497.235C648.671 497.235 661.31 515.052 684.774 524.942C692.004 527.989 700.2 528.738 707.349 525.505C724.886 517.575 741.932 498.33 757.5 498.742C773.864 498.742 791.711 520.623 810.403 527.654C816.218 529.841 822.661 529.246 828.451 526.991C849.246 518.893 861.599 502.112 879.5 501.742C886.47 501.597 896.865 506.047 907.429 510.911C930.879 521.707 957.139 519.639 982.951 520.063C1020.91 520.686 1037.5 530.797 1056.5 537C1102.24 556.627 1116.5 570.704 1180.5 579.235C1257.5 589.5 1279 587 1440 588"
          stroke="#FFDDB7" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[1] }} transition={transition} />
        <motion.path
          d="M0 514C147.5 514.333 294.5 513.735 380.5 513.735C405.976 514.94 422.849 515.228 436.37 515.123C477.503 514.803 518.631 506.605 559.508 511.197C564.04 511.706 569.162 512.524 575 513.735C588 516.433 616 521.702 627.5 519.402C647.5 515.402 659 499.235 680.5 499.235C700.5 499.235 725 529.235 742 528.735C757.654 528.735 768.77 510.583 791.793 500.59C798.991 497.465 807.16 496.777 814.423 499.745C832.335 507.064 850.418 524.648 866 524.235C882.791 524.235 902.316 509.786 921.814 505.392C926.856 504.255 932.097 504.674 937.176 505.631C966.993 511.248 970.679 514.346 989.5 514.735C1006.3 515.083 1036.5 513.235 1055.5 513.235C1114.5 513.235 1090.5 513.235 1124 513.235C1177.5 513.235 1178.99 514.402 1241 514.402C1317.5 514.402 1274.5 512.568 1440 513.235"
          stroke="#B1C5FF" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[2] }} transition={transition} />
        <motion.path
          d="M0 438.5C150.5 438.5 261 438.318 323.5 456.5C351 464.5 387.517 484.001 423.5 494.5C447.371 501.465 472 503.735 487 507.735C503.786 512.212 504.5 516.808 523 518.735C547 521.235 564.814 501.235 584.5 501.235C604.5 501.235 626 529.069 643 528.569C658.676 528.569 672.076 511.63 695.751 501.972C703.017 499.008 711.231 498.208 718.298 501.617C735.448 509.889 751.454 529.98 767 529.569C783.364 529.569 801.211 507.687 819.903 500.657C825.718 498.469 832.141 499.104 837.992 501.194C859.178 508.764 873.089 523.365 891 523.735C907.8 524.083 923 504.235 963 506.735C1034.5 506.735 1047.5 492.68 1071 481.5C1122.5 457 1142.23 452.871 1185 446.5C1255.5 436 1294 439 1439.5 439"
          stroke="#4FABFF" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[3] }} transition={transition} />
        <motion.path
          d="M0.5 364C145.288 362.349 195 361.5 265.5 378C322 391.223 399.182 457.5 411 467.5C424.176 478.649 456.916 491.677 496.259 502.699C498.746 503.396 501.16 504.304 503.511 505.374C517.104 511.558 541.149 520.911 551.5 521.236C571.5 521.236 590 498.736 611.5 498.736C631.5 498.736 652.5 529.236 669.5 528.736C685.171 528.736 697.81 510.924 721.274 501.036C728.505 497.988 736.716 497.231 743.812 500.579C761.362 508.857 778.421 529.148 794 528.736C810.375 528.736 829.35 508.68 848.364 502.179C854.243 500.169 860.624 500.802 866.535 502.718C886.961 509.338 898.141 519.866 916 520.236C932.8 520.583 934.5 510.236 967.5 501.736C1011.5 491 1007.5 493.5 1029.5 480C1069.5 453.5 1072 440.442 1128.5 403.5C1180.5 369.5 1275 360.374 1439 364"
          stroke="#076EFF" strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} style={{ pathLength: pathLengths[4] }} transition={transition} />
        <defs>
          <filter id="blurMe"><feGaussianBlur in="SourceGraphic" stdDeviation="5" /></filter>
        </defs>
      </svg>
    </div>
  );
};
```

### How to use it as a divider
```tsx
"use client";
import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GeminiDivider() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div className="h-[150vh] bg-black w-full relative overflow-clip" ref={ref}>
      <GoogleGeminiEffect pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]} />
    </div>
  );
}
```

---

## COMPONENT 5 — Container Text Flip
**Used for:** Hero tagline word cycling — "I build [full-stack apps / AI agents / things that ship]"

### Install via CLI
```bash
npx shadcn@latest add @aceternity/container-text-flip
```

### Or copy-paste manually

**File: `components/ui/container-text-flip.tsx`**
```tsx
"use client";
import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.scrollWidth + 30);
    }
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.span
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center font-bold text-black dark:text-white",
        "[background:linear-gradient(to_bottom,#1f2937,#111827)]",
        "shadow-[inset_0_-1px_#374151,inset_0_0_0_1px_hsla(205,89%,46%,.24)]",
        className
      )}
      key={words[currentWordIndex]}
    >
      <motion.div transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
        className={cn("inline-block", textClassName)} ref={textRef} layoutId={`word-div-${words[currentWordIndex]}-${id}`}>
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span key={index}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: index * 0.02 }}>
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.span>
  );
}
```

### How to use it in your Hero
```tsx
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

// Inside your Hero component
<h1 className="text-5xl md:text-7xl font-bold text-white">
  I build{" "}
  <ContainerTextFlip
    words={["full-stack apps", "AI agents", "things that ship", "what matters"]}
    interval={2500}
    className="text-5xl md:text-7xl"
  />
</h1>
```

---

## COMPONENT 6 — Wispr Flow Text Animation
**Used for:** Optional decorative text marquee on a curved SVG path — good for the hero or a stats section

### ⚠️ Important — This is a LABS component
This is under `ui.aceternity.com/labs` — it does NOT have an `npx shadcn` CLI command. It **cannot** be installed via CLI. The only way to use it is to copy the full component code from the source you pasted (document index 53 in this conversation — the `Hero` component with `ORIGINAL_SEGMENTS`, `splitCubic`, etc.) and drop it into your project manually.

### How to add it

1. Create `components/ui/wispr-flow.tsx`
2. Copy the entire export from the source you pasted — the `Hero` component (exports `Hero`, `controls`, `HeroProps`)
3. Strip the interactive editing UI (the `editing` state and the SVG handle dots) if you just want the animated text marquee
4. The core is this part:
```tsx
<path id="first-curve" fill="transparent" stroke="transparent" d={d} />
<text x="0" style={{ fontSize }}>
  <textPath href="#first-curve" className="font-normal" style={{ fill: textColor, opacity: textOpacity }}>
    {YOUR_MARQUEE_TEXT}
  </textPath>
  <animate attributeName="x" dur={`${65 - speed}s`} values="-2000;0" repeatCount="indefinite" />
</text>
```

### Minimal stripped version for your portfolio
```tsx
"use client";
import { useRef } from "react";

const CURVE_PATH = "M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235";

const STATS_TEXT = "4+ Award-Winning Projects · 20,000+ Users Reached · 3 Internships · 1st-Place Hackathon Winner · Industry-Sponsored Capstone · Full-Stack & AI Engineer ·";

export function WisprFlowText({ speed = 25, fontSize = 13 }: { speed?: number; fontSize?: number }) {
  return (
    <svg viewBox="0 0 1048 594" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-32 opacity-60">
      <path id="stats-curve" fill="transparent" stroke="transparent" d={CURVE_PATH} />
      <text x="0" style={{ fontSize }}>
        <textPath href="#stats-curve" className="font-normal" style={{ fill: "#a3a3a3" }}>
          {STATS_TEXT}
        </textPath>
        <animate attributeName="x" dur={`${65 - speed}s`} values="-2000;0" repeatCount="indefinite" />
      </text>
    </svg>
  );
}
```

---

## COMPLETE INSTALL CHECKLIST

Run these commands in your project root before Phase 0:

```bash
# 1. Core dependencies
npm install motion @tabler/icons-react

# 2. Register Aceternity in components.json (see SETUP section above)

# 3. Install components via CLI (easiest)
npx shadcn@latest add @aceternity/resizable-navbar
npx shadcn@latest add @aceternity/text-hover-effect
npx shadcn@latest add @aceternity/background-lines
npx shadcn@latest add @aceternity/google-gemini-effect
npx shadcn@latest add @aceternity/container-text-flip

# Wispr Flow — manual copy only (no CLI, it's a Labs component)
# Copy from components/ui/wispr-flow.tsx manually
```

---

## WHERE EACH COMPONENT GOES IN THE PORTFOLIO

| Component | Section | Notes |
|---|---|---|
| Resizable Navbar | Nav | Fixed top, shrinks on scroll |
| Background Lines | Hero background | `opacity-10`, pointer-events-none |
| Container Text Flip | Hero tagline | Word cycling inside the h1 |
| Google Gemini Effect | Hero → Projects divider | Needs a tall scroll container |
| Text Hover Effect | Projects section | One per project name |
| Wispr Flow Text | Stats bar or hero footer | Optional — curved marquee |

---

*All component source code is from Aceternity UI (ui.aceternity.com) — MIT licensed for personal use.*
