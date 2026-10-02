// Converts raw screenshots into redacted, responsive WebP files in public/images.
//
// Raw captures stay OUTSIDE the repository (they can contain personal data).
// Usage:  SCREENSHOT_DIR="C:/path/to/raw" npm run images
//
// Each entry lists its source file, output path, optional crop and the
// rectangles to blur (in source pixels) before anything is written.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SOURCE_DIR = process.env.SCREENSHOT_DIR;
const OUT_DIR = path.resolve("public/images");
const WIDTHS = [640, 960, 1280, 1920];

const shots = [
  { src: "Screenshot 2026-10-01 002619.png", out: "hiresignal/login" },
  { src: "Screenshot 2026-10-01 002752.png", out: "hiresignal/jobs" },
  { src: "Screenshot 2026-10-01 004742.png", out: "hiresignal/composer" },
  {
    src: "Screenshot 2026-10-01 002847.png",
    out: "hiresignal/pipeline",
    redact: [{ left: 1204, top: 418, width: 190, height: 24 }],
  },
  {
    src: "Screenshot 2026-10-01 004443.png",
    out: "hiresignal/scorecard",
    redact: [{ left: 48, top: 173, width: 164, height: 24 }],
  },
  {
    // Tighter crop for the homepage card, where the full page is too dense to read.
    src: "Screenshot 2026-10-01 004443.png",
    out: "hiresignal/scorecard-crop",
    crop: { left: 0, top: 60, width: 1100, height: 560 },
    redact: [{ left: 48, top: 113, width: 164, height: 24 }],
  },
];

async function blurRegions(input, regions) {
  if (!regions?.length) return input;
  const overlays = await Promise.all(
    regions.map(async (r) => ({
      input: await sharp(input).extract(r).blur(8).toBuffer(),
      left: r.left,
      top: r.top,
    })),
  );
  return sharp(input).composite(overlays).png().toBuffer();
}

async function run() {
  if (!SOURCE_DIR) {
    console.error("Set SCREENSHOT_DIR to the folder containing the raw screenshots.");
    process.exit(1);
  }

  for (const shot of shots) {
    let buffer = await sharp(path.join(SOURCE_DIR, shot.src)).png().toBuffer();
    if (shot.crop) buffer = await sharp(buffer).extract(shot.crop).png().toBuffer();
    buffer = await blurRegions(buffer, shot.redact);

    const { width, height } = await sharp(buffer).metadata();
    const outBase = path.join(OUT_DIR, shot.out);
    await mkdir(path.dirname(outBase), { recursive: true });

    for (const w of WIDTHS) {
      await sharp(buffer)
        .resize({ width: Math.min(w, width) })
        .webp({ quality: 82 })
        .toFile(`${outBase}-${w}.webp`);
    }
    console.log(`${shot.out}: ${width}x${height}`);
  }
}

run();
