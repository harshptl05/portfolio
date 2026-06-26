import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

/**
 * PHASE 1 — static, stacked, responsive layout with real content.
 * No scroll/intro animations yet (Lenis + GSAP arrive in Phase 2–3).
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
