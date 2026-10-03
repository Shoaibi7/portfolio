# Muhammad Shoaib: Portfolio

Personal portfolio for Muhammad Shoaib, Full-Stack Engineer (AI automation and AI-integrated business systems).

It is a fully static site: a home page and three case studies (HireSignal, LeadForge AI, RAG Knowledge Assistant). There's no backend, database or CMS. All content lives in typed data files.

**Stack:** Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS v4. The only dev dependency beyond the scaffold is `sharp`, used for image processing.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Static production build into `out/` (and the post-build fix below) |
| `npm run typecheck` | `tsc --noEmit` (run after a build or `next dev`, which generate route types) |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate responsive, redacted screenshots (see below) |

To preview the production build locally, serve `out/` with any static server, for example `npx serve out`.

## Project structure

```
src/
  app/                    Routes and metadata files
    page.tsx              Home page (composes the sections)
    work/[slug]/          Case-study template + per-project OG image
    opengraph-image.tsx   Site social preview (generated at build time)
    sitemap.ts, robots.ts, icon.svg, not-found.tsx
  components/
    layout/               Navbar (accessible mobile menu), Footer
    sections/             Hero, FeaturedWork, Capabilities, Journey, About, Contact
    projects/             ProjectCard, CaseBlocks (case-study renderer), visuals
    ui/                   Buttons, tags, headings, inline SVG icons
  data/
    site.ts               Name, links, email, site URL, navigation
    profile.ts            Capabilities, journey timeline, "other things I've built"
    projects/             One file per case study + index (order, lookup)
  lib/                    Image loader for static export, OG image renderer
  types/project.ts        Typed content model for projects and case-study blocks
scripts/
  process-screenshots.mjs Raw screenshots -> redacted WebP at 640/960/1280/1920
  fix-export-segments.mjs Post-build workaround (see "Windows build note")
public/
  images/                 Generated screenshots (committed)
  _headers                Cloudflare Pages / Netlify headers
```

## Updating content

- **Profile, links and email:** `src/data/site.ts`.
- **Capabilities, journey and the older-projects list:** `src/data/profile.ts`.
- **A case study:** edit `src/data/projects/<project>.ts`. A case study is a list of `sections`, and each section is a list of typed `blocks`:
  - `prose`
  - `points` (a card grid)
  - `flow` (a numbered workflow diagram)
  - `metrics`
  - `screenshots`
  - `timeline`
  - `table`
  - `callout`

  One template renders every case study, so no markup needs changing.
- **A new project:** create a file in `src/data/projects/`, then add it to the array in `src/data/projects/index.ts`. Its route, sitemap entry and OG image are generated automatically.

**Metrics must include `context`.** The type requires it, so a number is never shown without saying what it measured. Only publish verified figures.

**Repository links:** add only public repositories to `repos`. For private source, use `privateRepoNote`.

## Adding screenshots

Raw captures often contain personal data, so they **stay outside the repository**. Only processed, redacted output is committed.

1. Put the raw PNGs in a folder outside the repo.
2. Add an entry to the `shots` array in `scripts/process-screenshots.mjs`:
   - `src`: the raw file name
   - `out`: for example `leadforge/campaigns`
   - `crop` (optional)
   - `redact`: rectangles to blur, in source pixels
3. Run:
   ```bash
   SCREENSHOT_DIR="C:/path/to/raw" npm run images
   ```
4. Check the output in `public/images/` to confirm the redaction covers everything sensitive.
5. Reference the image in project data as `/images/<project>/<name>.webp`, using the source width and height. The custom loader (`src/lib/image-loader.ts`) serves the closest generated width.

## Deployment (free)

The build output is plain static files in `out/`. Set `NEXT_PUBLIC_SITE_URL` to the final URL so canonical links, the sitemap and OG tags are correct. Without it, the build falls back to `https://portfolio.imshoaibdev.workers.dev`. A missing `https://` is added automatically.

### Cloudflare Pages (recommended)

1. Push this repository to GitHub.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and choose the repository.
3. Use these build settings:
   - Framework preset: *None*
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add environment variables:
   - `NODE_VERSION` = `22`
   - `NEXT_PUBLIC_SITE_URL` = `https://<project>.pages.dev`, or your custom domain
5. Deploy. `public/_headers` sets the content type for the social images and adds caching and security headers.
6. Optionally add a custom domain under **Custom domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

### Cloudflare Workers (if the project was created as a Worker)

Cloudflare's dashboard may create a **Worker** instead of a Pages project. `wrangler.jsonc` in the repo root makes this work: it deploys `out/` as static assets, with no server code. Without the file, `wrangler deploy` tries to convert the app to a server build with OpenNext, and that fails on a static export.

Use these settings:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build variable: `NEXT_PUBLIC_SITE_URL` = `https://portfolio.<your-subdomain>.workers.dev`, or your custom domain

`_headers` is supported here too.

### Netlify

Use build command `npm run build` and publish directory `out`, with the same environment variables. `_headers` is supported.

### GitHub Pages

This works, with two caveats:
- If the site is served from a sub-path (`/<repo>/`), you must set `basePath` in `next.config.ts`.
- GitHub Pages ignores `_headers`.

Use a user site (`<user>.github.io`) or a custom domain to avoid the sub-path.

## Windows build note

On Windows, Next.js 16's static export writes client prefetch files into nested folders instead of the flat filenames the client requests, which causes 404s during navigation. `scripts/fix-export-segments.mjs` runs automatically after `npm run build` and flattens them. On Linux and macOS, including Cloudflare's build servers, it finds nothing to do.

## Content honesty

Everything on the site is backed by the project repositories and their documentation. Statuses are stated as they are: HireSignal is pre-launch, LeadForge is not deployed, and the RAG project is a learning build. There are no testimonials, invented customers or unverified metrics. Keep it that way when editing.
