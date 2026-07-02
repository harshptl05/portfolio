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
    "I'm Harsh Patel, a Computer Science student at UT Dallas (GPA 3.63, graduating December 2026) and a full-stack engineer working at the intersection of web development and AI. I build React and Next.js front ends, Python and Node back ends, and increasingly, multi-agent LLM systems with Claude and OpenAI. I've shipped software for platforms serving 500+ and 20,000+ users, led a 30-person engineering team, and won first place at TAMUHack's Toyota Challenge. I treat AI agents as real engineering leverage — with a heavy emphasis on prompt engineering and validating what the model actually produces.",
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "Java", "SQL", "C++"],
  },
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
      "Component Architecture",
      "Figma-to-Code",
      "Recharts",
      "a11y",
    ],
  },
  {
    group: "Backend & APIs",
    items: [
      "Node.js",
      "Express",
      "Flask",
      "FastAPI",
      "REST",
      "WebSockets/SSE",
      "Event-Driven Workflows",
    ],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "pgvector"],
  },
  {
    group: "AI / LLM",
    items: [
      "Claude API",
      "OpenAI API",
      "Multi-Agent Systems",
      "Agentic Workflows",
      "Prompt Engineering",
      "RAG",
      "LLM Evaluation",
      "Tool Calling",
      "Hallucination Detection",
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      "AWS (S3, Lambda)",
      "GCP",
      "Railway",
      "Docker",
      "Git",
      "CI/CD (GitHub Actions)",
      "Linux/CLI",
    ],
  },
];

export type ProjectLink = { label: string; href: string };
export type Project = {
  index: string;
  name: string;
  award?: string;
  tagline?: string;
  role?: string;
  problem?: string;
  build: string;
  result?: string;
  stack: string[];
  note?: string;
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    index: "01",
    name: "RideIQ",
    award: "🥇 1st Place, Toyota Challenge @ TAMUHack (Jan 2026)",
    tagline: "AI car marketplace with semantic search across 43k vehicles.",
    role: "Front-end lead · 24-hour hackathon",
    problem:
      "Car shoppers face tens of thousands of listings with no way to describe what they actually want in plain language.",
    build:
      "Led front-end for an AI car marketplace — a responsive, production-grade dashboard in Next.js, React, Tailwind. Built semantic search with pgvector embeddings interpreting natural-language queries across 43k vehicles / 62k listings; a 4-car comparison system with React Context + Recharts; and a test-drive booking flow.",
    result: "1st place — full working product built and demoed in 24 hours.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase/PostgreSQL",
      "pgvector",
      "Recharts",
    ],
    links: [
      { label: "Demo", href: "DEMO_URL" },
      { label: "GitHub", href: "GITHUB_URL" },
      { label: "Devpost", href: "DEVPOST_URL" },
    ],
  },
  {
    index: "02",
    name: "DOME",
    award: "Senior Capstone · Glenart Group",
    tagline:
      "13-agent Claude pipeline that extracts structured data from electrical diagrams.",
    role: "Reporting Lead · owned Agent 5 (Redundancy) and Agent 10 (Output Formatting)",
    problem:
      "Extracting equipment data from single-line electrical diagrams was a slow, manual, expensive task ($200K–$500K and 6–12 months per facility).",
    build:
      "Co-developed a 13-agent Claude pipeline that ingests a one-line diagram and outputs structured JSON (equipment ID, type, specs, upstream/downstream connections, breaker ratings). As Reporting Lead I owned the redundancy-detection (Agent 5) and output-formatting (Agent 10) agents, and fixed recurring pipeline bugs.",
    result:
      "95% equipment-level and 81.72% field-level accuracy across 20 real-world diagrams; cut a 2–4 hour task to under 5 minutes (90–95% time reduction).",
    stack: [
      "Next.js",
      "TypeScript",
      "Claude API (Opus)",
      "Multi-Agent Pipeline",
      "JSON",
    ],
    note: "Source code confidential at sponsor's request.",
    links: [{ label: "Details TBD", href: "LINKS_TBD" }],
  },
  {
    index: "03",
    name: "FinanceIQ",
    award: "🏅 4th Place, Goldman Sachs Challenge (Apr 2026)",
    tagline:
      "Full-stack AI investing platform aggregating 7 live financial APIs.",
    role: "Full-stack builder · 36-hour build",
    build:
      "Full-stack AI investing platform aggregating live data from 7 financial APIs (yfinance, Polygon, FRED, NewsAPI, Claude) for personalized, AI-generated insights. Multi-agent Python/FastAPI backend on Railway with scheduled connectors and rate-limit handling; a Claude Sonnet advisor using SSE streaming + 6 tool calls; a responsive React/Next.js dashboard with real-time Recharts visualizations.",
    stack: [
      "Next.js",
      "React",
      "FastAPI",
      "Python",
      "Supabase",
      "Railway",
      "Claude API",
      "Recharts",
    ],
    links: [
      { label: "Demo", href: "DEMO_URL" },
      { label: "GitHub", href: "GITHUB_URL" },
      { label: "Devpost", href: "DEVPOST_URL" },
    ],
  },
  {
    index: "04",
    name: "Your.ai",
    award: "🥈 2nd Place, ACM Projects",
    tagline:
      "LLM scheduling assistant that manages calendars through natural language.",
    role: "Full-stack builder",
    build:
      "LLM-powered scheduling assistant that manages calendars, tasks, and deadlines through natural-language commands and calendar sync. Implemented a RAG pipeline over user schedule/task data for context-aware recommendations; React/TypeScript UI with Google OAuth over a Flask/Express backend.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "OpenAI Assistants API",
      "RAG",
      "Flask/Express",
      "Google OAuth",
    ],
    links: [{ label: "Details TBD", href: "LINKS_TBD" }],
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  detail: string;
};

export const experience: Experience[] = [
  {
    role: "Technology Officer",
    org: "Artificial Intelligence Society",
    period: "Jun 2025 – Present",
    detail:
      "Build & maintain the org's web platform (React, Next.js, TypeScript, Tailwind); integrated reusable components boosting front-end efficiency ~30%; produced docs so non-technical members could use the platform.",
  },
  {
    role: "Project Lead",
    org: "Nebula Labs (UTD Trends)",
    period: "Jan 2025 – May 2025",
    detail:
      "Led 30+ engineers and designers in a full UI redesign of a data-driven course-aggregation site serving 20,000 users; onboarded new members enabling deployment within 5 weeks.",
  },
  {
    role: "SWE Intern",
    org: "Syft (Startup)",
    period: "Sept 2024 – July 2025",
    detail:
      "Built/maintained a Python + Flask app supporting 500+ active users; automated a cloud pipeline (AWS S3 + Firestore, Boto3) for 1,000+ images.",
  },
  {
    role: "SWE Intern",
    org: "Maiya LLC",
    period: "Sept 2023 – March 2024",
    detail:
      "Built a full-stack management system for 500+ monthly customers (React, Node, Express, PostgreSQL); cut check-in/out wait times ~30%.",
  },
];

export const education = {
  degree: "B.S. Computer Science",
  school: "UT Dallas",
  detail: "GPA 3.63 · Aug 2023 – Dec 2026",
};
