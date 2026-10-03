// Business problems described in terms a client recognises, each tied to work that proves it.
export type Solution = {
  title: string;
  problem: string;
  build: string[];
  proof: { label: string; href: string };
};

export const solutions: Solution[] = [
  {
    title: "Lead generation & sales pipelines",
    problem: "Prospect lists built by hand, contact details copied from websites and follow-ups tracked in spreadsheets.",
    build: [
      "Business discovery and enrichment that records where every fact came from",
      "A CRM with pipeline stages, CSV import and bulk actions",
      "Outreach campaigns with templates, retries, tracking and a safe test mode",
    ],
    proof: { label: "See LeadForge AI", href: "/work/leadforge/" },
  },
  {
    title: "AI-assisted review with people in charge",
    problem: "Teams reading every application, document or request by hand, or trusting an AI that decides alone.",
    build: [
      "Intake forms and embeddable widgets with secure file uploads",
      "AI evaluation that shows its reasoning and evidence",
      "Review queues where a person makes the final, audited decision",
    ],
    proof: { label: "See HireSignal", href: "/work/hiresignal/" },
  },
  {
    title: "Knowledge assistants & customer chat",
    problem: "Answers buried in PDFs, policies and internal documents, and the same customer questions handled again and again.",
    build: [
      "Document ingestion, embeddings and vector search",
      "Answers grounded in your own documents, with sources",
      "Chat assistants that answer customer enquiries and qualify leads",
    ],
    proof: { label: "See the RAG project", href: "/work/rag-knowledge-assistant/" },
  },
  {
    title: "Internal tools, CRMs & dashboards",
    problem: "Operations running on spreadsheets, email threads and tools that don't talk to each other.",
    build: [
      "Role-based admin panels, CRMs and reporting dashboards",
      "APIs and integrations with the systems you already use",
      "Background jobs, notifications and real-time updates",
    ],
    proof: { label: "See my experience", href: "/#experience" },
  },
];
