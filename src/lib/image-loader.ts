// Maps a requested width to the nearest pre-generated WebP file.
// "/images/hiresignal/jobs.webp" at 900px -> "/images/hiresignal/jobs-960.webp"
const WIDTHS = [640, 960, 1280, 1920];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return src.replace(/\.webp$/, `-${target}.webp`);
}
