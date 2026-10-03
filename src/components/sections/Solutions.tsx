import Link from "next/link";
import type { CSSProperties } from "react";
import { solutions } from "@/data/solutions";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="solutions-title"
            eyebrow="Business solutions"
            title="Specific problems I solve for businesses."
            intro="Each one is backed by something I've actually built."
          />
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {solutions.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as CSSProperties}
              className="group flex flex-col rounded-2xl border border-line bg-canvas p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card sm:p-7"
            >
              <p className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-3">
                <span className="font-medium text-ink-2">The problem: </span>
                {s.problem}
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">What I build</p>
              <ul className="mt-2 space-y-1.5">
                {s.build.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px] leading-snug text-ink-2">
                    <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={s.proof.href}
                className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent hover:text-accent-strong"
              >
                {s.proof.label}
                <ArrowRightIcon width={15} height={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
