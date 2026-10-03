import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container, SectionHeading } from "@/components/ui/primitives";

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 py-20 sm:py-24">
      <Container>
        <div data-reveal>
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Complete systems around AI, not just model calls."
            intro="Three projects, each with a full case study: the architecture, the decisions and the evidence."
          />
        </div>
        <div className="mt-12 space-y-6 sm:mt-14 sm:space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
