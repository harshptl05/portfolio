import { Nav } from "@/components/layout/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { DomeCallout } from "@/components/sections/dome-callout";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { ByTheNumbers } from "@/components/sections/by-the-numbers";
import { CinematicFooter } from "@/components/sections/cinematic-footer";
import { StackPanel } from "@/components/layout/stack-panel";
import { ScrollProgress } from "@/components/layout/scroll-progress";

/**
 * Stacked-deck scroll: hero is the base; each section is an opaque rounded
 * card (StackPanel) that lifts over the previous and recedes as the next
 * rises. The whole main finally lifts over the spacer to reveal the fixed
 * CinematicFooter beneath.
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
          <DomeCallout />
        </StackPanel>

        <StackPanel index={2}>
          <TechMarquee />
        </StackPanel>

        <StackPanel index={3}>
          <Projects />
        </StackPanel>

        <StackPanel index={4}>
          <Experience />
        </StackPanel>

        <StackPanel index={5}>
          <ByTheNumbers />
        </StackPanel>
      </main>

      {/* Scroll room that reveals the fixed footer beneath */}
      <div aria-hidden className="h-[100svh]" />
      <CinematicFooter />
    </>
  );
}
