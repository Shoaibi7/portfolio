import type { Project } from "@/types/project";

const shot = (name: string, alt: string, width: number, height: number, caption?: string) => ({
  src: `/images/leadforge/${name}.webp`,
  alt,
  width,
  height,
  caption,
});

const DEMO = "Captured from a local run with fictional demo data.";

export const leadforge: Project = {
  slug: "leadforge",
  number: "02",
  name: "LeadForge AI",
  tagline: "Lead discovery, CRM and outreach, built to be trusted.",
  category: "Lead discovery · CRM · Outreach automation",
  summary:
    "Finds local businesses on Google Maps, keeps every lead fact traceable to its source, and sends campaigns through a fault-tolerant background pipeline with a safe simulation mode.",
  status: "Engineering build · not deployed",
  stack: ["NestJS", "Next.js", "TypeScript", "MongoDB", "Redis + Bull", "Playwright", "Gemini / OpenRouter"],
  highlights: [
    "Found a 90% company-name error rate in live Maps validation, then redesigned extraction to 0/50",
    "Provenance-first CRM: no guessed email addresses, ever",
    "Durable campaign delivery with retries, recovery and a safe simulation mode",
  ],
  visual: {
    type: "screenshot",
    shot: shot("crm", "LeadForge Leads CRM listing demo businesses with owner names, confirmed email provenance, industry and pipeline status.", 1680, 900),
  },
  repos: [{ label: "Frontend repository", href: "https://github.com/Shoaibi7/leadforge-frontend" }],
  privateRepoNote: "Backend source is private.",
  seoDescription:
    "Case study: LeadForge AI, a NestJS + Next.js lead discovery, CRM and outreach system. How live validation exposed a 90% company-name error rate in Google Maps extraction, and how an identity-safe redesign brought it to 0/50.",
  facts: [
    { label: "Role", value: "Solo: architecture, backend, frontend, testing" },
    { label: "Type", value: "CRM and outreach automation platform" },
    { label: "Status", value: "Pilot-ready codebase, not deployed" },
    { label: "Year", value: "2026" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "LeadForge automates small-business prospecting end to end: discover businesses on Google Maps, verify which business each fact belongs to, enrich and store leads with provenance, analyse websites, draft outreach with an LLM, and deliver campaigns through a background pipeline.",
            "It is not just a scraper. Most of the engineering went into making automated data and automated email trustworthy: proving data belongs to the right business, never inventing contact details and never sending the same email twice.",
          ],
        },
        {
          type: "screenshots",
          shots: [
            shot("overview", "LeadForge overview dashboard with lead, campaign and conversion totals, lead status distribution and recent campaigns.", 1680, 560, `Overview dashboard. ${DEMO}`),
            shot("crm", "LeadForge Leads CRM with search, filters, email provenance badges and pipeline statuses.", 1680, 900, `Leads CRM with email provenance on every contact. ${DEMO}`),
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "The business problem",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Prospecting small businesses is manual and error-prone: names and phone numbers are copied from Google Maps, emails are guessed, and outreach tools rarely show what actually happened to each message.",
            "Automating it naively makes things worse: scraped data attached to the wrong business, invented email addresses, duplicate sends after crashes and runaway browser processes on a small server.",
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "System workflow",
      blocks: [
        {
          type: "flow",
          steps: [
            { label: "Maps discovery", detail: "Playwright worker" },
            { label: "Identity verification", detail: "Panel + Maps feature id" },
            { label: "Lead store", detail: "MongoDB with provenance" },
            { label: "Enrichment", detail: "Published emails only" },
            { label: "Website analysis", detail: "SSRF-safe fetch + LLM summary" },
            { label: "Outreach drafting", detail: "Gemini, OpenRouter fallback" },
            { label: "Campaign queue", detail: "Bull on Redis" },
            { label: "Delivery & recovery", detail: "Durable records + sweeper" },
          ],
          caption: "MongoDB is the system of record; Redis holds disposable queue state. Losing every Redis job is recovered from MongoDB.",
        },
        {
          type: "points",
          columns: 3,
          items: [
            { title: "CRM", body: "Leads, CSV import, bulk actions, per-user ownership, admin views, open and signed click tracking, analytics." },
            { title: "Auth", body: "JWT access tokens with rotating httpOnly refresh cookies, verification and reset flows, user and admin roles." },
            { title: "Operations", body: "Health and readiness probes, an operator status endpoint, structured logs without personal data." },
          ],
        },
        {
          type: "screenshots",
          shots: [
            shot("maps-scraper", "LeadForge Google Maps Lead Scraper settings with a search query, listing limit and an explanation of the scraping and enrichment pipeline.", 1439, 520, "Maps discovery runs as a background job; results land in the CRM only after identity checks."),
          ],
        },
      ],
    },
    {
      id: "maps-extraction",
      title: "The Maps extraction challenge",
      intro: "The most important part of this project is a bug that unit tests did not catch.",
      blocks: [
        {
          type: "timeline",
          steps: [
            { label: "Problem", title: "Data looked plausible, and was wrong", body: "Leads were being created with sensible-looking names, phones and websites. Nothing failed, so nothing looked broken." },
            { label: "Measure", title: "Live validation with independent ground truth", body: "An external harness ran real Google Maps queries against throwaway databases and compared stored leads to the actual listings. 45 of 50 leads had the wrong company name, and 24 of 50 results had no contact data." },
            { label: "Root cause", title: "Unsafe DOM assumptions", body: "A fallback selector matched the results list, so the first result's name was assigned to most leads. A fixed 2-second wait missed slow detail panels, and after a click Maps can update the URL before replacing the old panel, so stale data could be read as the new business." },
            { label: "Decision", title: "Verify identity before accepting any field", body: "Fields are accepted only from a panel element created after the click, whose label and heading equal the clicked card's name, while the URL carries the clicked result's Maps feature id, all checked in one page snapshot. Anything unverifiable is skipped, never stored partially." },
            { label: "Implement", title: "Bounded, condition-based waits", body: "Page-global selectors were removed and fixed sleeps replaced with bounded waits on real conditions. Real-browser tests on a simulated Maps page cover stale panels, same-name panels, slow panels, Sponsored results and scrolling." },
            { label: "Validate", title: "A second live run", body: "Same method, new run: 0 of 50 company names wrong, 0 of 199 verified fields contaminated, and every organic result verified." },
          ],
        },
        {
          type: "comparison",
          title: "Company-name errors per 50 leads",
          before: { value: "45/50", label: "wrong company names", context: "Original scraper, live validation sample" },
          after: { value: "0/50", label: "wrong company names", context: "After the identity-safe redesign, same method" },
        },
        {
          type: "metrics",
          metrics: [
            { value: "90% → 0%", label: "Company-name errors", context: "45/50 before, 0/50 after, in live Google Maps validation samples (5 queries × 10 organic results)." },
            { value: "0/199", label: "Contaminated fields", context: "Verified fields checked for cross-business contamination in the validation re-run." },
            { value: "0/10", label: "Duplicates on a repeated query", context: "Versus 4 of 8 before Maps-place identity matching was added." },
          ],
        },
        {
          type: "table",
          columns: ["Metric", "Before the identity fix", "After"],
          rows: [
            ["Wrong company name", "45 / 50", "0 / 50"],
            ["Cross-business field contamination", "Present", "0 / 199 fields"],
            ["Results skipped or partial", "24 / 50", "0 / 50"],
            ["Duplicates on a repeated query", "4 of 8", "0 of 10"],
            ["Sponsored leads imported", "7", "0"],
          ],
          caption: "Small samples from one machine and one session, against real Google Maps. They are evidence, not guarantees.",
        },
      ],
    },
    {
      id: "provenance",
      title: "Identity and provenance",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "No guessed emails", body: "Addresses are stored only when published on the business's own website, with the source page and method. No code path invents an email." },
            { title: "Provenance model", body: "Every email is manual, website, imported, inferred or unknown. One eligibility policy is enforced when planning a campaign and re-checked before each send." },
            { title: "Identity-aware merging", body: "Leads match by Maps place first, then email, then website, but leads belonging to different Maps places are never merged, and names are never used for matching." },
            { title: "Safe data migration", body: "Migration and cleanup scripts for legacy data run as dry runs by default; unverified addresses are excluded from outreach until a person confirms them." },
          ],
        },
      ],
    },
    {
      id: "campaigns",
      title: "Campaign reliability",
      intro: "A queue job can run twice, and Redis can lose jobs. Either can mean duplicate or missing emails.",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Durable delivery records", body: "One record per campaign and lead in MongoDB, protected by a unique index. Redis only carries the work." },
            { title: "Atomic claims", body: "Workers claim a delivery with a token and a lease before sending, so duplicate or concurrent job runs send each eligible recipient once (covered by tests)." },
            { title: "Retry classification", body: "Transient errors retry with backoff, permanent errors fail, and ambiguous SMTP outcomes become 'uncertain' and are never retried automatically. The operator resolves them." },
            { title: "Recovery sweeper", body: "Re-enqueues lost work and finalises campaigns from MongoDB state, so losing every Redis job is recoverable." },
          ],
        },
      ],
    },
    {
      id: "resources",
      title: "Concurrency and resource management",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "One headless Chromium uses roughly 0.6–0.8 GB of memory. The website analyser originally launched a browser per request, so a few users could exhaust a small host while a Maps job was running.",
            "A process-wide FIFO semaphore now shares Chromium between the Maps worker and the analyser. Waits are bounded, browsers close before permits are released, and the analyser falls back to a static fetch instead of opening a second browser. Tests prove the two never run Chromium at the same time and that permits are released on success, failure and launch errors. Maps jobs also have result caps, deadlines and graceful shutdown.",
          ],
        },
      ],
    },
    {
      id: "safety",
      title: "Security and outreach safety",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Outreach kill switch", body: "Real outreach requires an explicit flag. With SMTP configured and the flag unset, an end-to-end test proves a full campaign never calls the email provider." },
            { title: "Simulation mode", body: "Simulated deliveries are recorded, counted and labelled separately in the API and UI. Server email logs contain metadata only: no recipients, bodies or tokens." },
            { title: "SSRF-safe fetching", body: "All outbound requests, including headless-browser sub-requests and redirects, go through a client with DNS pinning and server-side redirect validation." },
            { title: "Proxy-aware rate limiting", body: "Explicit trusted-proxy configuration gives separate limits per real client IP and ignores forged forwarding headers." },
            { title: "Fail-fast production config", body: "Placeholder secrets, open CORS or missing settings stop startup instead of running insecurely." },
            { title: "Signed tracking links", body: "HMAC-signed click links prevent open redirects; CSV uploads are size-limited and the reply webhook is disabled unless a secret is set." },
          ],
        },
        {
          type: "screenshots",
          shots: [
            shot("campaign-simulation", "LeadForge campaign analytics showing a 'Simulation only' notice and ten deliveries marked SIMULATED: not sent because outreach email is disabled.", 1024, 772, `A campaign run with outreach disabled: every delivery is recorded and clearly marked as simulated. ${DEMO}`),
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Testing",
      blocks: [
        {
          type: "metrics",
          metrics: [
            { value: "644", label: "Automated tests passing", context: "292 backend unit + 265 backend e2e + 87 frontend tests at the final reported checkpoint." },
            { value: "69/69", label: "Maps and provenance regression set", context: "End-to-end regression cases added around the extraction redesign." },
          ],
        },
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Unit tests for policies", body: "Provenance, merge rules, the delivery state machine, panel verification, identity parsing, configuration and the browser limiter." },
            { title: "End-to-end against real MongoDB", body: "An isolated database per test file, fake queues and a recording email provider: no external side effects." },
            { title: "Real-browser tests", body: "A simulated Google Maps page served to headless Chromium with all network blocked." },
            { title: "SSRF tests", body: "Local servers attempt redirects and browser sub-requests to internal addresses." },
          ],
        },
      ],
    },
    {
      id: "status",
      title: "Current status",
      blocks: [
        {
          type: "callout",
          title: "Completed engineering build, not deployed",
          body: [
            "The codebase is pilot-ready: production Dockerfiles, deployment documentation, health probes and configuration validation are written. Deployment and a real SMTP provider were intentionally outside the completed validation checkpoint.",
            "There are no users or customers. Known limits: it depends on Google Maps' page structure and on how Google treats the host's IP; one browser task runs at a time per process; it has not been load tested or externally security-reviewed.",
          ],
        },
      ],
    },
    {
      id: "lessons",
      title: "Engineering lessons",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Measure before fixing", body: "Live validation with independent ground truth found a 90% error that a passing test suite did not." },
            { title: "Missing is better than wrong", body: "Skipping uncertain data is safer than storing it. 'Missing' and 'wrong' are different failures." },
            { title: "Reliability is durable state", body: "Distributed-job reliability comes from durable records and honest failure modes, not from more retries." },
            { title: "Safety defaults are features", body: "Simulation mode, kill switches and fail-fast config belong in the first design, not the last sprint." },
          ],
        },
      ],
    },
  ],
};
