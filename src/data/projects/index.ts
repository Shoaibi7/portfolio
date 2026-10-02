import type { Project } from "@/types/project";
import { hiresignal } from "./hiresignal";
import { leadforge } from "./leadforge";
import { rag } from "./rag";

export const projects: Project[] = [hiresignal, leadforge, rag];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    previous: i > 0 ? projects[i - 1] : undefined,
    next: i < projects.length - 1 ? projects[i + 1] : undefined,
  };
}
