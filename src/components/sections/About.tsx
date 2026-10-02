import { site } from "@/data/site";
import { Container, Eyebrow } from "@/components/ui/primitives";

const facts = [
  { label: "Based in", value: site.location },
  { label: "Focus", value: "AI-integrated SaaS, automation, backend systems" },
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
            I&apos;m Muhammad Shoaib, a full-stack engineer based in Pakistan. I build web applications, APIs,
            CRM and business systems, and automation.
          </p>
          <p>
            I started with traditional full-stack development in Laravel, JavaScript and React, and have since moved
            into Python backend engineering, LLM integrations, RAG and automated workflows.
          </p>
          <p>
            What interests me most is the engineering around AI. Calling a model API is the easy part. The real work
            is the authentication, databases, queues, workers, safeguards and user experience that turn a model&apos;s
            capabilities into software people can rely on.
          </p>
          <p>
            My recent work includes <span className="font-medium text-ink">HireSignal</span>, an evidence-backed
            candidate-screening platform, and <span className="font-medium text-ink">LeadForge AI</span>, a lead
            discovery, CRM and outreach automation system.
          </p>
        </div>
      </Container>
    </section>
  );
}
