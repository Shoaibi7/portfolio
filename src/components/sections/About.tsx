import { site } from "@/data/site";
import { Container, Eyebrow } from "@/components/ui/primitives";

const facts = [
  { label: "Based in", value: site.location },
  { label: "Focus", value: "Business workflow automation, backend systems, AI integration" },
  { label: "Open to", value: "Freelance, contract and full-time roles" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div data-reveal className="lg:col-span-5">
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Building business software first. Adding AI where it creates value.
          </h2>
        </div>
        <div data-reveal className="lg:col-span-7 lg:pt-8">
          <div className="space-y-5 text-[17px] leading-relaxed text-ink-2">
            <p>
              I&apos;m Muhammad Shoaib, a full-stack engineer based in Pakistan. I started in full-stack web development
              with Laravel, JavaScript and React, then moved deeper into backend architecture, automation and
              AI-integrated systems. Today I work across the product stack, focused on software that automates real
              business workflows.
            </p>
            <p>
              AI helps with many of those workflows, but only with solid engineering around it: authentication,
              databases, queues, workers, safeguards and an interface people can actually use. I didn&apos;t trade
              traditional engineering for AI. My work combines the two.
            </p>
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="border-l-2 border-accent/30 pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{f.label}</dt>
                <dd className="mt-0.5 text-sm text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
