import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1 text-sm text-ink-3">{site.shortRole}</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-ink-2">
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
            <GitHubIcon width={16} height={16} /> GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
            <LinkedInIcon width={16} height={16} /> LinkedIn
          </a>
          <span className="text-ink-3">© {new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
}
