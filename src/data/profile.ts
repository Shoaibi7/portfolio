export const capabilities = [
  {
    title: "AI & Automation",
    summary: "Model features with guardrails, evidence and measurable behaviour.",
    items: ["LLM integration", "Structured model outputs", "RAG", "Embeddings & vector retrieval", "LLM workflows", "Browser automation (Playwright)"],
  },
  {
    title: "Backend Engineering",
    summary: "APIs and services that stay correct under retries and failures.",
    items: ["Python", "FastAPI", "NestJS", "Node.js", "PHP / Laravel", "REST APIs", "Background workers"],
  },
  {
    title: "Frontend Engineering",
    summary: "Product interfaces for real workflows, not just landing pages.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Data & Infrastructure",
    summary: "Relational and document stores, queues and storage.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Docker", "AWS S3 / S3-compatible storage", "Nginx"],
  },
  {
    title: "Engineering Practice",
    summary: "The unglamorous parts that make software trustworthy.",
    items: ["Authentication & JWT", "RBAC", "Queues & idempotency", "Rate limiting", "Data lifecycle", "Automated testing", "API design"],
  },
] as const;

export type JourneyStep = { period: string; title: string; org?: string; body: string };

export const journey: JourneyStep[] = [
  {
    period: "2016 – 2020",
    title: "BS Computer Science",
    org: "Institute of Southern Punjab, Multan",
    body: "Computer science foundations.",
  },
  {
    period: "2021 – 2022",
    title: "Full Stack Developer (Internship)",
    org: "Softagics",
    body: "Built a job-management system end to end in Laravel, from schema design to UI.",
  },
  {
    period: "2022 – 2023",
    title: "Laravel Developer",
    org: "Xohoa Ltd",
    body: "Developed and maintained production Laravel applications, including a school CRM and an inventory system, with REST APIs for integrations and internal tooling.",
  },
  {
    period: "2024 – present",
    title: "Full Stack Developer",
    org: "Cyberify Ltd",
    body: "Client applications across Laravel, FastAPI and React/Next.js: API design, authentication, real-time features with Laravel Reverb, S3 file storage, and AI chatbots and lead-automation systems.",
  },
  {
    period: "2025 – 2026",
    title: "AI-integrated products",
    body: "RAG experiments, then HireSignal and LeadForge AI: complete systems around LLMs, with queues, workers, safety controls and measured results.",
  },
];

export type MoreWorkGroup = {
  title: string;
  body: string;
  repos: { name: string; href?: string; note: string }[];
};

const gh = (name: string) => `https://github.com/Shoaibi7/${name}`;

export const moreWork: MoreWorkGroup[] = [
  {
    title: "Business systems & RBAC",
    body: "Role-based admin applications and business tools on Laravel.",
    repos: [
      { name: "Laravel + React roles platform", note: "Laravel, Inertia, React, Spatie permissions (private)" },
      { name: "laravel-spatie-permissions-and-roles", href: gh("laravel-spatie-permissions-and-roles"), note: "Role and permission management" },
      { name: "pdf-tools-app", href: gh("pdf-tools-app"), note: "Laravel, Inertia, React, pdf.js" },
    ],
  },
  {
    title: "Authentication across stacks",
    body: "The same problem solved in four ecosystems: sessions, tokens and protected APIs.",
    repos: [
      { name: "fastapi_chat_with_nextjs", href: gh("fastapi_chat_with_nextjs"), note: "FastAPI chatbot: JWT, email verification, OpenAI, chat history" },
      { name: "nest_auth_todo_backend", href: gh("nest_auth_todo_backend"), note: "NestJS API with auth" },
      { name: "mern-auth", href: gh("mern-auth"), note: "Express + MongoDB REST API" },
      { name: "laravel-api-with-sanctum", href: gh("laravel-api-with-sanctum"), note: "Laravel Sanctum API" },
    ],
  },
  {
    title: "Real-time applications",
    body: "Chat and live updates over WebSockets.",
    repos: [
      { name: "laravel_chat_app", href: gh("laravel_chat_app"), note: "Laravel chat API with Pusher broadcasting" },
      { name: "react_vite_chat", href: gh("react_vite_chat"), note: "React client using Laravel Echo" },
    ],
  },
  {
    title: "Payments & deployment",
    body: "Payment gateway integrations and cloud deployment practice.",
    repos: [
      { name: "binance_payment_gateway", href: gh("binance_payment_gateway"), note: "Laravel crypto payment integration" },
      { name: "laravel_stripe_app", href: gh("laravel_stripe_app"), note: "Laravel + Stripe" },
      { name: "aws-test-app", href: gh("aws-test-app"), note: "Express app for AWS deployment practice" },
    ],
  },
];
