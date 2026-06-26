import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconFileText,
} from "@tabler/icons-react";
import { site } from "@/lib/site";

const items = [
  { label: "Email", href: `mailto:${site.links.email}`, Icon: IconMail, external: false },
  { label: "LinkedIn", href: site.links.linkedin, Icon: IconBrandLinkedin, external: true },
  { label: "GitHub", href: site.links.github, Icon: IconBrandGithub, external: true },
  { label: "Resume", href: site.links.resume, Icon: IconFileText, external: true },
];

export function Socials({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Icon className="h-4.5 w-4.5" stroke={1.75} />
          </a>
        </li>
      ))}
    </ul>
  );
}
