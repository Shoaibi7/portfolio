import { site } from "@/data/site";
import { Container, Eyebrow } from "@/components/ui/primitives";

const facts = [
  { label: "Based in", value: site.location },
  { label: "Focus", value: "Business workflow automation, backend systems, AI integration" },
  { label: "Open to", value: "Freelance, contract and full-time roles" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Building business software first. Adding AI where it creates value.
          </h2>
          <dl className="mt-8 space-y-4">
            {facts.map((f) => (
              <div key={f.label} className="border-l-2 border-accent/30 pl-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{f.label}</dt>
                <dd className="mt-0.5 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-2 lg:col-span-7 lg:pt-8">
          <p>
            I&apos;m Muhammad Shoaib, a full-stack engineer based in Pakistan. I started in full-stack web development
            with Laravel, JavaScript and React, then moved steadily deeper into backend architecture, automation and
            AI-integrated systems. Today I work across the product stack, with a particular focus on software that
            automates real business workflows.
          </p>
          <p>
            That means the everyday problems businesses run into: manual operations work, sales pipelines and CRM
            data, customer communication, booking and approval flows, internal tools, and the documents and knowledge
            a team depends on.
          </p>
          <p>
            AI helps with many of these, but only with solid engineering around it: authentication, databases,
            queues, workers, safeguards and an interface people can actually use. I didn&apos;t trade traditional
            engineering for AI. My work combines the two.
          </p>
          <p>
            My recent projects show what that looks like in practice:{" "}
            <span className="font-medium text-ink">HireSignal</span>, an evidence-backed candidate-screening platform,
            and <span className="font-medium text-ink">LeadForge AI</span>, a lead discovery, CRM and outreach
            automation system.
          </p>
        </div>
      </Container>
    </section>
  );
}
