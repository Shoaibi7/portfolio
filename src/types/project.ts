export type Metric = {
  value: string;
  label: string;
  /** Required so a number is never shown without what it actually measured. */
  context: string;
};

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type FlowStep = { label: string; detail?: string };

export type Block =
  | { type: "prose"; paragraphs: string[] }
  | { type: "points"; items: { title: string; body: string }[]; columns?: 2 | 3 }
  | { type: "flow"; steps: FlowStep[]; caption?: string }
  | { type: "metrics"; metrics: Metric[] }
  | { type: "screenshots"; shots: Screenshot[] }
  | { type: "timeline"; steps: { label: string; title: string; body: string }[] }
  | { type: "table"; columns: string[]; rows: string[][]; caption?: string }
  | { type: "callout"; title: string; body: string[] }
  | { type: "comparison"; title: string; before: Metric; after: Metric };

export type CaseSection = {
  id: string;
  title: string;
  intro?: string;
  blocks: Block[];
};

export type ProjectVisual =
  | { type: "screenshot"; shot: Screenshot }
  | { type: "flow"; steps: FlowStep[] };

export type RepoLink = { label: string; href: string };

export type Project = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  category: string;
  summary: string;
  status: string;
  stack: string[];
  highlights: string[];
  visual: ProjectVisual;
  /** Only public repositories. Private repositories are listed in `privateRepoNote`. */
  repos: RepoLink[];
  privateRepoNote?: string;
  seoDescription: string;
  facts: { label: string; value: string }[];
  sections: CaseSection[];
};
