import type { Project } from "@/types/project";

const shot = (name: string, alt: string, width: number, height: number, caption?: string) => ({
  src: `/images/hiresignal/${name}.webp`,
  alt,
  width,
  height,
  caption,
});

const scorecard = shot(
  "scorecard",
  "HireSignal candidate page showing an overall alignment score of 67 out of 100, a written explanation and a requirements check listing evidence for each skill.",
  1670,
  832,
  "Scorecard from a test application using my own CV. The score comes with its reasoning, missing requirements and the evidence behind each one.",
);

export const hiresignal: Project = {
  slug: "hiresignal",
  number: "01",
  name: "HireSignal",
  tagline: "See the signal behind every candidate.",
  category: "Applicant tracking · AI screening",
  summary:
    "An applicant tracking and candidate-screening platform for small and mid-sized companies. AI surfaces the evidence; recruiters make the hiring decision.",
  status: "Pilot-ready · pre-launch",
  stack: ["FastAPI", "Python 3.12", "PostgreSQL", "Redis + ARQ", "React", "TypeScript", "OpenRouter", "S3-compatible storage"],
  highlights: [
    "Evidence-backed screening; routing decided in code, not by the model",
    "AI never rejects on its own: failures and missing evidence go to a person",
    "Background workers with retries and recovery; 439 backend tests",
  ],
  visual: {
    type: "screenshot",
    shot: shot(
      "scorecard-crop",
      "HireSignal candidate scorecard: overall alignment 67 out of 100 with a written explanation, and a requirements check listing evidence per skill.",
      1100,
      560,
    ),
  },
  repos: [],
  privateRepoNote: "Source is private. Walkthrough available on request.",
  seoDescription:
    "Case study: HireSignal, an evidence-backed candidate-screening SaaS built with FastAPI, PostgreSQL, Redis/ARQ workers, React and OpenRouter LLMs, with human-in-the-loop safety by default.",
  facts: [
    { label: "Role", value: "Product design and full-stack engineering" },
    { label: "Type", value: "Multi-tenant B2B SaaS" },
    { label: "Status", value: "Pilot-ready, not yet publicly deployed" },
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
            "HireSignal helps small hiring teams create jobs, collect applications through an embeddable careers widget and screen candidates against the actual job requirements.",
            "Its design rule is simple: AI surfaces the evidence, humans make the hiring decision. Every recommendation comes with scores, reasoning and the sources it relied on, and the recruiter always has the final call.",
          ],
        },
        {
          type: "screenshots",
          shots: [
            shot("login", "HireSignal sign-in page with the tagline 'See the signal behind every candidate' and three product promises.", 1910, 857, "Product branding: the safety promise is stated on the very first screen."),
            shot("pipeline", "HireSignal pipeline board with columns for in progress, human review, shortlisted and rejected candidates.", 1912, 858, "Pipeline board: every candidate is routed into a stage a recruiter can act on."),
          ],
        },
      ],
    },
    {
      id: "problem",
      title: "The problem",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "Small companies get more applications than they can read carefully, and keyword filters drop good candidates who describe their experience differently.",
            "Handing the decision to a language model creates a different problem: a candidate can disappear because a model misread a CV, a PDF did not parse, or an external profile could not be fetched. I wanted screening that saves time without making those failures invisible.",
          ],
        },
      ],
    },
    {
      id: "approach",
      title: "Product approach",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Jobs from a one-line brief", body: "A recruiter writes one sentence. The system extracts a structured spec (requirements, skills, experience), lets them fill gaps, then streams a job description that uses the company's own knowledge base." },
            { title: "Embeddable careers widget", body: "One script tag embeds a single job or a full careers page on any site. Candidates apply with a PDF CV, profile links and screening answers." },
            { title: "Evidence over keywords", body: "Each claim is traced to a source: CV, GitHub, LinkedIn or screening answers. A requirement only counts as failed when the evidence clearly shows it." },
            { title: "Recruiter pipeline", body: "Candidates land in in-progress, human review, shortlisted or rejected. Recruiters move them, and every change is recorded with who made it and why." },
          ],
        },
        {
          type: "screenshots",
          shots: [
            shot("composer", "HireSignal job composer with a three-step flow: brief, review spec, publish.", 1901, 858, "Job composer: brief → reviewed spec → published job."),
            shot("jobs", "HireSignal jobs dashboard listing a published React developer role with seniority, mode and requirements.", 1907, 858, "Jobs dashboard with embeddable widget codes."),
          ],
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      intro: "Applications are accepted quickly and screened in the background, so slow model calls never block a candidate or a recruiter.",
      blocks: [
        {
          type: "flow",
          steps: [
            { label: "Candidate", detail: "Embedded widget" },
            { label: "Application", detail: "FastAPI · PDF validated · CV stored" },
            { label: "Queue", detail: "ARQ on Redis" },
            { label: "Screening worker", detail: "Enrichment + evidence extraction" },
            { label: "Gate → Align", detail: "LLMs via OpenRouter" },
            { label: "Routing", detail: "Deterministic thresholds in code" },
            { label: "Recruiter review", detail: "Final, audited decision" },
          ],
          caption: "PostgreSQL is the system of record. CVs go to local disk or a private S3-compatible bucket behind one storage interface.",
        },
        {
          type: "points",
          columns: 3,
          items: [
            { title: "Backend", body: "FastAPI, Pydantic v2, async SQLAlchemy 2 with asyncpg, Alembic migrations, JWT authentication." },
            { title: "Workers", body: "ARQ on Redis for screening, retention, cleanup and recovery jobs." },
            { title: "Frontend", body: "React, Vite, TypeScript and Tailwind for the recruiter app and the embeddable widget." },
          ],
        },
      ],
    },
    {
      id: "screening",
      title: "Evidence-backed screening",
      blocks: [
        {
          type: "timeline",
          steps: [
            { label: "1", title: "Enrichment", body: "Collects CV text, public GitHub profile and repositories, and an optional LinkedIn profile. Profile links found in the CV are used if form fields are empty." },
            { label: "2", title: "Evidence extraction", body: "Decides which sources are actually usable. PDF glyph garbage, letter-spaced text and near-empty pages are removed; profiles count only if fetched and non-empty." },
            { label: "3", title: "Gate", body: "A fast model reports only clear failures of objective hard requirements. A blocker counts only if it is evidenced, tied to a structured job field and not refuted by deterministic evidence." },
            { label: "4", title: "Align", body: "A stronger model scores fit per dimension against the job and the company knowledge base, with reasoning and evidence." },
            { label: "5", title: "Deterministic routing", body: "Plain code maps the result to a route: ≥ 70 shortlist, 40–69 human review, below 40 or a gate failure becomes an AI reject suggestion." },
          ],
        },
        { type: "screenshots", shots: [scorecard] },
      ],
    },
    {
      id: "safety",
      title: "Human-in-the-loop safety",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Safe mode by default", body: "An AI reject is shown to the recruiter as “AI suggests reject” in human review. Automatic rejection is an explicit per-job opt-in." },
            { title: "Missing evidence is not a rejection", body: "An unreadable CV, a missing profile or a failed fetch sends the candidate to human review marked insufficient data." },
            { title: "Failures go to people", body: "If screening fails after every retry, the candidate goes to human review, never to rejection." },
            { title: "Audited decisions", body: "Recruiter decisions are written to an event history with actor and reason. The worker never overwrites a recruiter decision." },
          ],
        },
      ],
    },
    {
      id: "reliability",
      title: "Reliability",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "One transaction per attempt", body: "A failed screening attempt rolls back fully and leaves no partial writes." },
            { title: "Bounded retries", body: "Three attempts with timeouts and backoff. The final failure records the stage, error and attempt, then routes to human review." },
            { title: "Idempotent jobs", body: "Deterministic job IDs collapse duplicate enqueues into one job, and replaying a finished job does nothing." },
            { title: "Stuck-screening recovery", body: "A cron sweeper finds applications whose job vanished after a worker crash or lost enqueue and screens them again." },
            { title: "Row locking", body: "Workers lock the application row. A recruiter decision made during screening gets a conflict instead of being silently overwritten." },
            { title: "Public endpoint protection", body: "Redis-backed rate limits, duplicate-application prevention, optional Cloudflare Turnstile and trusted-proxy handling for real client IPs." },
          ],
        },
      ],
    },
    {
      id: "data-lifecycle",
      title: "Candidate-data lifecycle",
      intro: "Candidate CVs are personal data, so storing them safely and deleting them reliably were treated as product features.",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Private CV storage", body: "Server-generated keys, no public or presigned URLs. CVs are served only through an authenticated, company-scoped endpoint." },
            { title: "Application deletion", body: "Deletes the row, evaluations, history and answers in one transaction. If storage fails, a durable cleanup task retries CV deletion with backoff." },
            { title: "Workers can't resurrect data", body: "Every screening attempt starts by locking the row; if the application is gone or pending deletion, the job exits without writing." },
            { title: "Retention and orphan cleanup", body: "Configurable retention (off by default) and a sweeper that removes only unreferenced CV objects matching the exact key shape after a grace period." },
          ],
        },
      ],
    },
    {
      id: "testing",
      title: "Engineering and testing",
      blocks: [
        {
          type: "metrics",
          metrics: [
            { value: "439", label: "Backend tests passing", context: "At the reported pre-launch checkpoint. The suite runs without external services (SQLite, fake LLM fixtures, fake S3)." },
            { value: "41/41", label: "Screening reference cases", context: "Offline regression benchmark with fixture model outputs, run deterministically in pytest." },
            { value: "0", label: "False rejections in that benchmark", context: "Offline fixture benchmark only. This is a regression guard, not a claim about live-model accuracy." },
          ],
        },
        {
          type: "prose",
          paragraphs: [
            "The benchmark tracks routing and gate agreement, shortlist precision and recall, false rejections and explainability failures. Any false rejection fails the thresholds, and changes to prompts, models or thresholds have to pass it.",
            "Smoke scripts exercise rate limits, the GitHub cache and data-lifecycle behaviour against real PostgreSQL and Redis. The frontend typecheck, lint and production build passed at the same checkpoint.",
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
          title: "Pilot-ready, pre-launch",
          body: [
            "Built and tested locally, with deployment preparation done: a production Docker image, configuration validation, health checks and deployment docs.",
            "Not yet done: public deployment and hosting choice, a paid live-model benchmark with production models, billing, team invites, transactional email and legal review of the policy pages.",
            "HireSignal has no security certification or regulatory compliance attestation, and its recommendations can be wrong. That is exactly why a person makes the decision.",
          ],
        },
      ],
    },
    {
      id: "lessons",
      title: "Engineering decisions and lessons",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Keep decisions out of the model", body: "Models produce evidence and scores; plain, tested code decides the route. That makes behaviour predictable and easy to change safely." },
            { title: "Design the failure path first", body: "Every failure mode (bad PDF, failed fetch, worker crash, lost job) has a defined destination, and none of them is rejection." },
            { title: "Measure model changes", body: "A fixed reference set turns prompt and model changes into reviewable regressions instead of guesses." },
            { title: "Deletion is a distributed problem", body: "Database rows, object storage and in-flight workers all need coordinating for a delete to actually be complete." },
          ],
        },
      ],
    },
  ],
};
