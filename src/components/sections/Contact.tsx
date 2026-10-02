import { site } from "@/data/site";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
  { label: "LinkedIn", value: "muhammad-shoaib-104350186", href: site.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: "Shoaibi7", href: site.github, Icon: GitHubIcon, external: true },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-12 sm:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/60">Contact</p>
          <h2 id="contact-title" className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Have a product, an automation problem or an engineering role?
          </h2>
          <p className="mt-4 text-lg text-white/75">Let&apos;s build something useful.</p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-4 transition-colors hover:border-white/35 hover:bg-white/[0.08] focus-visible:outline-white"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-white/60">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                  <ArrowUpRightIcon width={16} height={16} className="shrink-0 text-white/50 group-hover:text-white" />
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
