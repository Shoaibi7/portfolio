import { getProject, projects } from "@/data/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "Case study by Muhammad Shoaib";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: `Case study ${project?.number ?? ""}`,
    title: project?.name ?? "Case study",
    subtitle: project?.tagline ?? "",
  });
}
