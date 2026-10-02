export const site = {
  name: "Muhammad Shoaib",
  role: "Full-Stack Engineer · AI Automation · AI-Integrated Business Systems",
  shortRole: "Full-Stack Engineer · AI Automation",
  title: "Muhammad Shoaib — Full-Stack Engineer & AI Automation",
  description:
    "Full-Stack Engineer building AI-integrated SaaS products, automation systems, APIs and business software with Python, TypeScript, FastAPI, NestJS, Laravel, React and Next.js.",
  // Set NEXT_PUBLIC_SITE_URL at build time once the final domain is known.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhammad-shoaib.pages.dev").replace(/\/$/, ""),
  location: "Multan, Pakistan",
  email: "imshoaibdev@gmail.com",
  github: "https://github.com/Shoaibi7",
  linkedin: "https://www.linkedin.com/in/muhammad-shoaib-104350186/",
  availability: ["Freelance", "Contract", "Full-time"],
} as const;

export const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Journey", href: "/#journey" },
  { label: "About", href: "/#about" },
] as const;
