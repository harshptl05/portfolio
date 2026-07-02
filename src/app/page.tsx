import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { CinematicFooter } from "@/components/sections/cinematic-footer";
import { StackPanel } from "@/components/layout/stack-panel";
import { ScrollProgress } from "@/components/layout/scroll-progress";

/**
 * Stacked-deck scroll: the hero is the base; each section is an opaque rounded
 * card (StackPanel) that lifts over the previous and recedes as the next rises.
 * The whole main is a z-10 card that finally lifts away over the spacer to
 * reveal the fixed CinematicFooter beneath — one continuous "lift to reveal"
 * language from top to bottom.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />

      <main className="relative z-10 rounded-b-[2.5rem] bg-background shadow-2xl shadow-black/40">
        <Hero />

        <StackPanel index={0}>
          <About />
        </StackPanel>

        <StackPanel index={1}>
          <TechMarquee />
        </StackPanel>

        <StackPanel index={2}>
          <Projects />
        </StackPanel>

        <StackPanel index={3}>
          <Experience />
        </StackPanel>
      </main>

      {/* Scroll room that reveals the fixed footer beneath */}
      <div aria-hidden className="h-[100svh]" />
      <CinematicFooter />
    </>
  );
}
