import Link from "next/link";
import { site } from "@/data/site";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ButtonLink, Container } from "@/components/ui/primitives";

const techStrip = ["Python", "TypeScript", "FastAPI", "NestJS", "Laravel", "React", "Next.js", "PostgreSQL", "MongoDB", "Redis", "Docker", "LLMs"];

const evidence = [
  { value: "439", label: "backend tests", project: "HireSignal", href: "/work/hiresignal/#s-testing" },
  { value: "90% → 0%", label: "Maps name errors after redesign", project: "LeadForge AI", href: "/work/leadforge/#s-maps-extraction" },
  { value: "644", label: "automated tests", project: "LeadForge AI", href: "/work/leadforge/#s-testing" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,black,transparent_75%)] bg-[size:56px_56px] opacity-50"
      />
      <Container className="relative grid gap-12 pt-16 pb-20 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-28">
        <div className="lg:col-span-8">
          <p className="reveal font-mono text-xs font-medium tracking-[0.08em] sm:text-[13px]">
            <span className="block text-ink">{site.name}</span>
            <span className="mt-1 block text-accent">{site.role}</span>
          </p>
          <h1
            id="hero-title"
            className="reveal reveal-delay-1 mt-5 text-[2.4rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]"
          >
            I build software that turns business workflows into intelligent systems.
          </h1>
          <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-2">
            I&apos;m Muhammad Shoaib, a full-stack engineer focused on AI-integrated applications, automation and
            backend systems. I work across Python, TypeScript, Laravel and modern AI tooling to take ideas from APIs
            and databases to complete products.
          </p>

          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#work">
              Explore my work <ArrowRightIcon width={16} height={16} />
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Let&apos;s talk
            </ButtonLink>
          </div>

          <p className="reveal reveal-delay-3 mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-good/40 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-good" />
            </span>
            <span className="font-medium text-ink">Available for</span>
            {site.availability.join(" · ")} work
          </p>
        </div>

        <aside aria-label="Selected evidence" className="reveal reveal-delay-2 lg:col-span-4 lg:self-end">
          <div className="rounded-2xl border border-line bg-surface/80 p-5 shadow-card backdrop-blur">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Measured, not claimed</p>
            <ul className="mt-3 divide-y divide-line">
              {evidence.map((e) => (
                <li key={e.label}>
                  <Link href={e.href} className="group flex items-baseline justify-between gap-4 py-3">
                    <span>
                      <span className="block font-mono text-xl font-semibold text-ink tabular-nums">{e.value}</span>
                      <span className="text-sm text-ink-2">{e.label}</span>
                    </span>
                    <span className="shrink-0 text-xs text-ink-3 group-hover:text-accent">{e.project} →</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-relaxed text-ink-3">
              Figures from each project&apos;s reported checkpoint. See the case studies for context.
            </p>
          </div>
        </aside>

        <div className="lg:col-span-12">
          <p className="sr-only">Core technologies:</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 font-mono text-[12.5px] text-ink-3">
            {techStrip.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
