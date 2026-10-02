import { site } from "@/data/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const dynamic = "force-static";
export const alt = site.title;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.shortRole,
    title: "I build software that turns business workflows into intelligent systems.",
    subtitle: "Python · TypeScript · FastAPI · NestJS · Laravel · React · Next.js · LLMs",
  });
}
