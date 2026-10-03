// Compact skill groups (shown as a toolkit list, not a logo wall).
export const toolkit = [
  { title: "AI & automation", items: ["LLM integration", "RAG", "Embeddings & vector search", "LLM workflows", "Playwright automation"] },
  { title: "Backend", items: ["Python", "FastAPI", "NestJS", "Node.js", "PHP / Laravel", "REST APIs", "Background workers"] },
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Data & infrastructure", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "AWS S3", "Nginx"] },
  { title: "Practice", items: ["Auth & RBAC", "Queues & idempotency", "Rate limiting", "Data lifecycle", "Automated testing"] },
] as const;

export type ExperienceItem = { period: string; role: string; org: string; body: string; current?: boolean };

// Most recent first.
export const experience: ExperienceItem[] = [
  {
    period: "2026 – now",
    role: "Full-Stack Engineer",
    org: "Independent",
    body: "Building AI-integrated products end to end, including HireSignal and LeadForge AI. Open to freelance, contract and full-time work.",
    current: true,
  },
  {
    period: "2024 – 2026",
    role: "Full Stack Developer",
    org: "Cyberify Ltd",
    body: "Client applications across Laravel, FastAPI and React/Next.js: API design, authentication, real-time features with Laravel Reverb, S3 storage, and AI chatbots and lead-automation systems.",
  },
  {
    period: "2022 – 2023",
    role: "Laravel Developer",
    org: "Xohoa Ltd",
    body: "Production Laravel applications, including a school CRM and an inventory system, with REST APIs for integrations and internal tooling.",
  },
  {
    period: "2021 – 2022",
    role: "Full Stack Developer (Internship)",
    org: "Softagics",
    body: "Built a job-management system end to end in Laravel, from schema design to UI.",
  },
];

export const education = {
  period: "2016 – 2020",
  degree: "BS Computer Science",
  school: "Institute of Southern Punjab, Multan",
};

export const codezila = {
  name: "Codezila",
  href: "https://code-zila.com/",
  body: "Alongside my own projects, I'm also involved in building Codezila with a small software engineering team, working across custom SaaS, business automation and AI-integrated systems. Work shown on the Codezila site is the team's, not all of it built by me personally.",
};

const gh = (name: string) => `https://github.com/Shoaibi7/${name}`;

// A few public repositories from earlier work. Everything else is on GitHub.
export const earlierWork = [
  { name: "laravel_chat_app", href: gh("laravel_chat_app"), note: "Real-time chat with Pusher" },
  { name: "laravel-spatie-permissions-and-roles", href: gh("laravel-spatie-permissions-and-roles"), note: "RBAC" },
  { name: "fastapi_chat_with_nextjs", href: gh("fastapi_chat_with_nextjs"), note: "FastAPI chatbot + auth" },
  { name: "nest_auth_todo_backend", href: gh("nest_auth_todo_backend"), note: "NestJS API" },
  { name: "binance_payment_gateway", href: gh("binance_payment_gateway"), note: "Payments" },
  { name: "pdf-tools-app", href: gh("pdf-tools-app"), note: "Laravel + React" },
];
