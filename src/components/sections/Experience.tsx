import { codezila, earlierWork, education, experience, toolkit } from "@/data/profile";
import { site } from "@/data/site";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import { Container, SectionHeading, cn } from "@/components/ui/primitives";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-16 py-20 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="experience-title"
            eyebrow="Experience & education"
            title="Five years of shipping business software."
            intro="From Laravel business systems to backend architecture, automation and AI-integrated products."
          />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Experience, most recent first */}
          <ol data-reveal className="relative space-y-8 self-start border-l border-line pl-6 sm:pl-8 lg:col-span-7">
            {experience.map((job) => (
              <li key={job.org} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-canvas sm:-left-[37px]",
                    job.current ? "bg-good ring-4 ring-good/15" : "bg-line-strong",
                  )}
                />
                <p className="font-mono text-xs text-ink-3">{job.period}</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight">
                  {job.role} <span className="font-normal text-ink-3">·</span>{" "}
                  <span className="text-accent">{job.org}</span>
                </h3>
                <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink-2">{job.body}</p>
              </li>
            ))}
          </ol>

          <div className="space-y-4 lg:col-span-5">
            <div data-reveal className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Education</p>
              <p className="mt-3 font-semibold tracking-tight">{education.degree}</p>
              <p className="text-sm text-accent">{education.school}</p>
              <p className="mt-1 font-mono text-xs text-ink-3">{education.period}</p>
            </div>

            <div data-reveal className="rounded-2xl border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Toolkit</p>
              <dl className="mt-3 space-y-3">
                {toolkit.map((group) => (
                  <div key={group.title}>
                    <dt className="text-sm font-medium text-ink">{group.title}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-ink-2">{group.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside data-reveal aria-label="Team work" className="rounded-2xl border border-line bg-subtle p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Team work</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{codezila.body}</p>
              <a
                href={codezila.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-accent"
              >
                code-zila.com
                <ArrowUpRightIcon width={15} height={15} />
                <span className="sr-only">(Codezila website, opens in a new tab)</span>
              </a>
            </aside>
          </div>
        </div>

        <div data-reveal className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-3">
            <span className="font-medium text-ink-2">Earlier work on GitHub:</span> chat, RBAC, auth, payments and more.
          </p>
          <ul className="flex flex-wrap gap-2">
            {earlierWork.map((repo) => (
              <li key={repo.name}>
                <a
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={repo.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                >
                  {repo.note}
                  <span className="sr-only">: {repo.name} on GitHub (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[13px] text-white hover:bg-accent-strong"
              >
                <GitHubIcon width={13} height={13} /> All repositories
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
