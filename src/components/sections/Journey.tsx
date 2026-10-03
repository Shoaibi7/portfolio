import { codezila, journey, moreWork } from "@/data/profile";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="journey-title"
          eyebrow="Engineering journey"
          title="From full-stack foundations to AI-integrated business systems."
          intro="Business software came first: CRMs, admin systems, APIs and real-time features. Backend architecture, automation and AI work build on that foundation."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {journey.map((step, i) => (
            <li key={step.title} className={i === journey.length - 1 ? "bg-accent-soft p-5 sm:col-span-2 lg:col-span-1" : "bg-surface p-5"}>
              <p className="font-mono text-xs text-ink-3">{step.period}</p>
              <h3 className="mt-2 font-semibold tracking-tight">{step.title}</h3>
              {step.org && <p className="text-sm text-accent">{step.org}</p>}
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>

        <aside
          aria-label="Team work"
          className="mt-4 flex flex-col gap-3 rounded-xl border border-line bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
        >
          <p className="max-w-3xl text-sm leading-relaxed text-ink-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Team work · </span>
            {codezila.body}
          </p>
          <a
            href={codezila.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-accent"
          >
            code-zila.com
            <ArrowUpRightIcon width={15} height={15} />
            <span className="sr-only">(Codezila website, opens in a new tab)</span>
          </a>
        </aside>

        <div className="mt-20">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">Other things I&apos;ve built</h3>
          <p className="mt-2 max-w-2xl text-ink-2">
            A selection from my GitHub, grouped by the engineering problem rather than listed one by one.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {moreWork.map((group) => (
              <div key={group.title} className="rounded-xl border border-line bg-surface p-6">
                <h4 className="font-semibold tracking-tight">{group.title}</h4>
                <p className="mt-1 text-sm text-ink-3">{group.body}</p>
                <ul className="mt-4 divide-y divide-line">
                  {group.repos.map((repo) => (
                    <li key={repo.name} className="py-2.5">
                      {repo.href ? (
                        <a
                          href={repo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start justify-between gap-4"
                        >
                          <span>
                            <span className="font-mono text-[13px] text-ink group-hover:text-accent">{repo.name}</span>
                            <span className="block text-sm text-ink-3">{repo.note}</span>
                          </span>
                          <ArrowUpRightIcon width={16} height={16} className="mt-0.5 shrink-0 text-ink-3 group-hover:text-accent" />
                          <span className="sr-only">(opens GitHub in a new tab)</span>
                        </a>
                      ) : (
                        <span>
                          <span className="text-[13px] font-medium text-ink">{repo.name}</span>
                          <span className="block text-sm text-ink-3">{repo.note}</span>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
