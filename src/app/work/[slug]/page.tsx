import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { CaseSectionView } from "@/components/projects/CaseBlocks";
import { ProjectVisualView } from "@/components/projects/ProjectCard";
import { Contact } from "@/components/sections/Contact";
import { ArrowLeftIcon, ArrowRightIcon, GitHubIcon, LockIcon } from "@/components/ui/icons";
import { Container, Tag } from "@/components/ui/primitives";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name}: case study`;
  const path = `/work/${project.slug}/`;
  return {
    title,
    description: project.seoDescription,
    alternates: { canonical: path },
    openGraph: { type: "article", title, description: project.seoDescription, url: path },
    twitter: { card: "summary_large_image", title, description: project.seoDescription },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <article>
      <header className="border-b border-line">
        <Container className="pt-10 pb-14 sm:pt-14 sm:pb-20">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink">
            <ArrowLeftIcon width={16} height={16} /> All work
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink-3">
                <span className="text-accent">{project.number}</span>
                <span aria-hidden className="h-px w-6 bg-line-strong" />
                {project.category}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.name}</h1>
              <p className="mt-3 text-xl text-ink-2">{project.tagline}</p>
              <p className="mt-6 text-[17px] leading-relaxed text-ink-2">{project.summary}</p>

              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                {project.repos.map((repo) => (
                  <a
                    key={repo.href}
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 font-medium hover:bg-subtle"
                  >
                    <GitHubIcon width={16} height={16} /> {repo.label}
                  </a>
                ))}
                {project.privateRepoNote && (
                  <span className="inline-flex items-center gap-2 text-ink-3">
                    <LockIcon width={15} height={15} /> {project.privateRepoNote}
                  </span>
                )}
              </div>
            </div>
            <div className="lg:col-span-6">
              <ProjectVisualView visual={project.visual} priority />
            </div>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
            {project.facts.map((f) => (
              <div key={f.label} className="bg-surface p-4">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Container className="lg:grid lg:grid-cols-12 lg:gap-10">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-24 py-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">On this page</p>
            <ul className="mt-4 space-y-1 border-l border-line">
              {project.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#s-${s.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-ink-2 hover:border-ink hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="lg:col-span-9">
          {project.sections.map((section) => (
            <CaseSectionView key={section.id} section={section} />
          ))}
        </div>
      </Container>

      <Container>
        <nav aria-label="More case studies" className="grid gap-3 border-t border-line pt-10 sm:grid-cols-2">
          {previous ? (
            <Link href={`/work/${previous.slug}/`} className="group rounded-xl border border-line bg-surface p-5 hover:shadow-card">
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <ArrowLeftIcon width={15} height={15} /> Previous
              </span>
              <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:text-accent">{previous.name}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link href={`/work/${next.slug}/`} className="group rounded-xl border border-line bg-surface p-5 text-right hover:shadow-card">
              <span className="flex items-center justify-end gap-2 text-sm text-ink-3">
                Next <ArrowRightIcon width={15} height={15} />
              </span>
              <span className="mt-1 block text-lg font-semibold tracking-tight group-hover:text-accent">{next.name}</span>
            </Link>
          )}
        </nav>
      </Container>

      <Contact />
    </article>
  );
}
