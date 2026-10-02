// Workaround for a Next.js static-export bug on Windows.
//
// The client router prefetches flat files such as
//   work/hiresignal/__next.work.$d$slug.__PAGE__.txt
// but on Windows the exporter splits the segment path on "\" instead of "/",
// writing nested folders (work/hiresignal/__next.work/$d$slug/__PAGE__.txt).
// This moves those files to the flat name the client requests.
// On Linux/macOS builds there is nothing to fix and the script does nothing.

import { readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");
let fixed = 0;

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) await flatten(dir, full, entry.name);
    else await walk(full);
  }
}

async function flatten(parent, segmentDir, prefix) {
  for (const entry of await readdir(segmentDir, { withFileTypes: true })) {
    const full = path.join(segmentDir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) await flatten(parent, full, name);
    else {
      await rename(full, path.join(parent, name));
      fixed++;
    }
  }
  await rm(segmentDir, { recursive: true, force: true });
}

if (await stat(OUT).catch(() => null)) {
  await walk(OUT);
  if (fixed) console.log(`fix-export-segments: flattened ${fixed} prefetch file(s)`);
}
