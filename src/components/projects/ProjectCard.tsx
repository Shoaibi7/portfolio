import Link from "next/link";
import type { Project, ProjectVisual } from "@/types/project";
import { ArrowRightIcon, GitHubIcon, LockIcon } from "@/components/ui/icons";
import { Tag, cn } from "@/components/ui/primitives";
import { BrowserFrame, ComparisonVisual, FlowStrip } from "./visuals";

export function ProjectVisualView({ visual, priority }: { visual: ProjectVisual; priority?: boolean }) {
  switch (visual.type) {
    case "screenshot":
      return <BrowserFrame shot={visual.shot} sizes="(min-width: 1024px) 640px, 100vw" priority={priority} />;
    case "flow":
      return <FlowStrip steps={visual.steps} />;
    case "comparison":
      return <ComparisonVisual before={visual.before} after={visual.after} />;
  }
}

export function ProjectCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  const href = `/work/${project.slug}/`;
  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="group grid items-center gap-8 rounded-2xl border border-line bg-surface/60 p-5 transition-shadow duration-300 hover:shadow-lift sm:p-8 lg:grid-cols-12 lg:gap-12"
    >
      <div
        className={cn(
          "lg:col-span-7",
          project.visual.type !== "screenshot" && "sm:min-h-[320px] lg:min-h-[400px] [&>*]:min-h-[inherit]",
          reverse && "lg:order-2",
        )}
      >
        <ProjectVisualView visual={project.visual} />
      </div>

      <div className={cn("lg:col-span-5", reverse && "lg:order-1")}>
        <div className="flex items-center gap-3 font-mono text-xs text-ink-3">
          <span className="text-accent">{project.number}</span>
          <span aria-hidden className="h-px w-6 bg-line-strong" />
          <span>{project.category}</span>
        </div>
        <h3 id={`project-${project.slug}`} className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-lg text-ink-2">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-ink-2">{project.summary}</p>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] leading-snug text-ink-2">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            View case study
            <span className="sr-only">: {project.name}</span>
            <ArrowRightIcon width={16} height={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          {project.repos.map((repo) => (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 hover:text-ink"
            >
              <GitHubIcon width={16} height={16} /> {repo.label}
            </a>
          ))}
          {project.repos.length === 0 && project.privateRepoNote && (
            <span className="inline-flex items-center gap-2 text-sm text-ink-3">
              <LockIcon width={15} height={15} /> Private source
            </span>
          )}
        </div>
        <p className="mt-4 font-mono text-[11.5px] text-ink-3">Status: {project.status}</p>
      </div>
    </article>
  );
}
