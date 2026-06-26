import { ArrowUpRight } from "lucide-react";
import { Socials } from "@/components/layout/socials";
import { site } from "@/lib/site";

/**
 * PHASE 1 — Contact / Footer. Confident closing line, email + socials,
 * resume, copyright.
 */
export function Contact() {
  return (
    <footer
      id="contact"
      className="border-t border-border/60 px-6 py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
          Contact
        </p>

        <h2 className="mt-6 max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
          Want to build something,
          <br className="hidden sm:block" /> or just talk shop?
        </h2>

        <a
          href={`mailto:${site.links.email}`}
          className="group mt-10 inline-flex items-center gap-2 font-heading text-2xl font-medium tracking-tight text-foreground transition-colors hover:text-primary md:text-3xl"
        >
          {site.links.email}
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <div className="mt-10">
          <Socials />
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-border/60 pt-8 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. Built with Next.js &amp;
            Tailwind.
          </span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
