import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Complete systems around AI, not just model calls."
          intro="Three projects, each with a case study covering the architecture, the decisions and the evidence. The first two are the deepest."
        />
        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
