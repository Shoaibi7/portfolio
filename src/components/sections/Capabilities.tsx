import { capabilities } from "@/data/profile";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16 border-t border-line bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="capabilities-title"
          eyebrow="Capabilities"
          title="The whole stack an AI product needs."
          intro="Interfaces, APIs, data, queues, safeguards and the model integration, built to work together."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group, i) => (
            <div key={group.title} className="bg-surface p-6 sm:p-7">
              <p className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{group.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md bg-subtle px-2.5 py-1 text-[13px] text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="flex flex-col justify-end bg-subtle p-6 sm:p-7">
            <p className="text-[15px] leading-relaxed text-ink-2">
              I didn&apos;t leave traditional engineering for AI. I use it to make AI features reliable.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
