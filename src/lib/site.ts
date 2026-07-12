/**
 * Single source of truth for site content / identity.
 * All copy pulled from portfolio-build-prompt_1.md. Placeholders
 * (RESUME_URL, DEMO_URL, etc.) are intentional — never invent links.
 */

export const site = {
  name: "Harsh Patel",
  role: "Full-Stack & AI Engineer",
  hook: "I build full-stack products and AI agents that actually ship.",
  location: "Dallas, TX (open to remote)",
  links: {
    email: "harshptl2023@gmail.com",
    linkedin: "https://linkedin.com/in/harsh-pate1",
    github: "https://github.com/harshptl05",
    resume: "RESUME_URL", // placeholder — provided later
  },
  stats: [
    "4+ Award-Winning Projects",
    "20,000+ Users Reached",
    "3 Internships",
    "1st-Place Hackathon Winner",
    "Industry-Sponsored Capstone",
  ],
} as const;

export const nav = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
] as const;

export const about = {
  paragraph:
    "I'm Harsh Patel, a Computer Science student at UT Dallas and a full-stack engineer working at the intersection of web development and AI. I build React and Next.js front ends, Python and Node back ends, and increasingly, multi-agent LLM systems with Claude and OpenAI. I've shipped software for platforms serving 500+ and 20,000+ users, led a 30-person engineering team, and won first place at TAMUHack's Toyota Challenge. I treat AI agents as real engineering leverage — with a heavy emphasis on prompt engineering and validating what the model actually produces.",
};

// NOTE: project and skills data live where they render —
// src/components/sections/projects.tsx and about.tsx. The copies that used to
// sit here went stale (placeholder links, 4 of 5 projects) and nothing
// imported them, so they were removed. Add new projects in projects.tsx.

export type Experience = {
  role: string;
  org: string;
  period: string;
  badge: string;
  stat: string;
  statLabel: string;
  detail: string;
  stack: string;
  link?: string;
};

export const experience: Experience[] = [
  {
    role: "Technology Officer",
    org: "Artificial Intelligence Society",
    period: "Jun 2025 – Present",
    badge: "Current",
    stat: "30%",
    statLabel: "front-end efficiency boost",
    detail:
      "Built and maintained the org's web platform serving active members across UT Dallas. Engineered a reusable React component library that cut feature development time by 30%. Defined front-end standards for consistency across concurrent projects and enabled non-technical officers to manage content independently through documentation and internal tooling.",
    stack: "React · Next.js · TypeScript · Tailwind",
  },
  {
    role: "Project Lead",
    org: "Nebula Labs — UTD Trends",
    period: "Jan 2025 – May 2025",
    badge: "Leadership",
    stat: "20,000",
    statLabel: "users on the redesigned platform",
    detail:
      "Owned end-to-end delivery of a complete platform redesign for UTDTrends, a course-aggregation tool used by 20,000 UT Dallas students. Coordinated 30+ engineers and designers across parallel workstreams — setting sprint cycles, reviewing PRs, and unblocking the team. Brought the platform from design to production in 5 weeks and established CI/CD pipelines with GitHub Actions to automate deployment and reduce manual release overhead.",
    stack: "React · GitHub Actions · CI/CD",
  },
  {
    role: "Software Engineer Intern",
    org: "Syft (Startup)",
    period: "Sept 2024 – July 2025",
    badge: "Internship",
    stat: "500+",
    statLabel: "active users supported",
    detail:
      "Joined an early-stage fashion-tech startup building AI-powered trend categorization tools. Developed and shipped features for an internal Flask web app used by 500+ active users to classify product images into defined fashion trend categories. Automated the bulk image ingestion pipeline — replacing a manual upload process with an AWS S3 + Firestore integration via Boto3, processing 1,000+ images per run.",
    stack: "Python · Flask · AWS S3 · Firestore · Boto3",
    link: "https://github.com/harshptl05/Syft-Internal-Trend-APP",
  },
  {
    role: "Software Engineer Intern",
    org: "Maiya LLC",
    period: "Sept 2023 – March 2024",
    badge: "Internship",
    stat: "30%",
    statLabel: "reduction in check-in wait times",
    detail:
      "Built a full-stack property management system for a motel business serving 500+ monthly guests — replacing manual processes with a unified dashboard for bookings, reservations, and financial tracking. Designed the check-in/check-out flow in React with a Node.js/PostgreSQL backend, cutting average wait times by 30%. Built scalable REST endpoints that automated data sync across front desk, billing, and reporting systems.",
    stack: "React · Node.js · Express · PostgreSQL",
  },
];

export const education = {
  degree: "B.S. Computer Science",
  school: "UT Dallas",
  detail: "GPA 3.63 · Aug 2023 – Dec 2026",
};
