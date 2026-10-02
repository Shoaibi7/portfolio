import type { Project } from "@/types/project";

export const rag: Project = {
  slug: "rag-knowledge-assistant",
  number: "03",
  name: "RAG Knowledge Assistant",
  tagline: "Answers grounded in your own documents.",
  category: "Retrieval-Augmented Generation · Python",
  summary:
    "A compact RAG pipeline that indexes a folder of documents and answers natural-language questions from the retrieved context, returning the source files it used.",
  status: "Learning project · local pipeline",
  stack: ["Python", "LangChain", "Chroma", "bge-small embeddings", "Ollama (phi3)", "FastAPI"],
  highlights: [
    "Local embeddings and a persisted Chroma vector store: no paid API needed",
    "Relevance threshold, deduplication and strict context-only prompting",
    "CLI and FastAPI interfaces over the same pipeline",
  ],
  visual: {
    type: "flow",
    steps: [
      { label: "Documents" },
      { label: "Chunk + embed" },
      { label: "Chroma" },
      { label: "Retrieve top-k" },
      { label: "LLM" },
      { label: "Answer + sources" },
    ],
  },
  repos: [{ label: "Backend repository", href: "https://github.com/Shoaibi7/rag-app-python-backend" }],
  seoDescription:
    "Case study: a Retrieval-Augmented Generation pipeline in Python using LangChain, local bge-small embeddings, a Chroma vector store and a local LLM via Ollama, with CLI and FastAPI interfaces.",
  facts: [
    { label: "Role", value: "Solo" },
    { label: "Type", value: "RAG pipeline (backend)" },
    { label: "Interface", value: "CLI and a FastAPI endpoint" },
    { label: "Scope", value: "Small, focused learning build" },
  ],
  sections: [
    {
      id: "overview",
      title: "Overview",
      blocks: [
        {
          type: "prose",
          paragraphs: [
            "A Retrieval-Augmented Generation pipeline: documents are split, embedded and stored in a vector database; a question retrieves the most relevant passages, and the model answers using only that context instead of relying on its general knowledge.",
            "It is a deliberately small project. I built it to understand each stage of RAG directly (chunking, embedding, retrieval thresholds and grounded prompting) before using LLMs inside larger products.",
          ],
        },
      ],
    },
    {
      id: "workflow",
      title: "How it works",
      blocks: [
        {
          type: "flow",
          steps: [
            { label: "Knowledge", detail: "PDF, TXT, Markdown in a folder" },
            { label: "Processing", detail: "Recursive splitter · 512 / 64 overlap" },
            { label: "Embeddings", detail: "BAAI/bge-small-en-v1.5 on CPU" },
            { label: "Retrieval store", detail: "Chroma, persisted to disk" },
            { label: "Question", detail: "CLI or POST /ask" },
            { label: "Context retrieval", detail: "Top 3 · relevance ≥ 0.2 · deduplicated" },
            { label: "LLM", detail: "phi3 via Ollama, temperature 0" },
            { label: "Answer", detail: "With source file names" },
          ],
        },
      ],
    },
    {
      id: "decisions",
      title: "Implementation details",
      blocks: [
        {
          type: "points",
          columns: 2,
          items: [
            { title: "Ingestion", body: "LangChain directory loaders read PDF, text and Markdown files, then a recursive character splitter creates overlapping chunks so answers are not cut mid-thought." },
            { title: "Local embeddings", body: "Normalised bge-small embeddings run on the CPU through HuggingFace, so indexing needs no API key and costs nothing." },
            { title: "Retrieval guardrails", body: "Results below a relevance threshold are dropped and duplicate chunks removed. With nothing relevant, the system says it couldn't find information instead of guessing." },
            { title: "Grounded generation", body: "A strict prompt tells the model to answer only from the provided context and to say “I don't know” otherwise. Responses include the source files used and the number of chunks." },
          ],
        },
      ],
    },
    {
      id: "scope",
      title: "Scope and next steps",
      blocks: [
        {
          type: "callout",
          title: "What this project is, and isn't",
          body: [
            "Documents are indexed by a developer command from a local folder; there is no upload flow, user accounts or production deployment, and the repository has no automated tests yet.",
            "The patterns it explores (chunking, retrieval thresholds, grounded prompts and source attribution) informed how I approach LLM features in larger systems like HireSignal, where evidence and traceability matter.",
          ],
        },
      ],
    },
  ],
};
