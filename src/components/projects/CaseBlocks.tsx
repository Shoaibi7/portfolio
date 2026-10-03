import type { Block, CaseSection } from "@/types/project";
import { cn } from "@/components/ui/primitives";
import { ComparisonVisual, FlowDiagram, MetricGrid, ScreenshotFigure } from "./visuals";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="max-w-3xl space-y-4 text-[17px] leading-relaxed text-ink-2">
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      );

    case "points":
      return (
        <ul className={cn("grid gap-3", block.columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
          {block.items.map((item) => (
            <li key={item.title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-medium tracking-tight text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{item.body}</p>
            </li>
          ))}
        </ul>
      );

    case "flow":
      return <FlowDiagram steps={block.steps} caption={block.caption} />;

    case "metrics":
      return <MetricGrid metrics={block.metrics} />;

    case "screenshots":
      return (
        <div className={cn("grid gap-8", block.shots.length > 1 && "lg:grid-cols-2")}>
          {block.shots.map((shot) => (
            <ScreenshotFigure
              key={shot.src}
              shot={shot}
              sizes={block.shots.length > 1 ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1152px) 1120px, 100vw"}
            />
          ))}
        </div>
      );

    case "timeline":
      return (
        <ol className="relative max-w-3xl space-y-8 border-l border-line pl-6 sm:pl-8">
          {block.steps.map((step) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-canvas bg-accent ring-1 ring-accent/30 sm:-left-[37px]"
              />
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">{step.label}</p>
              <h3 className="mt-1 text-lg font-medium tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{step.body}</p>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <figure className="max-w-3xl">
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-subtle text-ink-2">
                <tr>
                  {block.columns.map((c) => (
                    <th key={c} scope="col" className="px-4 py-3 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {block.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="px-4 py-3 font-normal text-ink">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="px-4 py-3 font-mono tabular-nums text-ink-2">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-3 text-sm text-ink-3">{block.caption}</figcaption>}
        </figure>
      );

    case "comparison":
      return <ComparisonVisual title={block.title} before={block.before} after={block.after} />;

    case "callout":
      return (
        <div className="max-w-3xl rounded-xl border border-line bg-subtle p-6">
          <p className="flex items-center gap-2 font-medium text-ink">
            <span aria-hidden className="size-2 rounded-full bg-warn" />
            {block.title}
          </p>
          <div className="mt-3 space-y-3 leading-relaxed text-ink-2">
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      );
  }
}

export function CaseSectionView({ section }: { section: CaseSection }) {
  return (
    <section aria-labelledby={`s-${section.id}`} className="scroll-mt-24 border-t border-line py-14 sm:py-20">
      <h2 id={`s-${section.id}`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {section.title}
      </h2>
      {section.intro && <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-2">{section.intro}</p>}
      <div className="mt-8 space-y-10">
        {section.blocks.map((block, i) => (
          <div key={i} data-reveal>
            <BlockView block={block} />
          </div>
        ))}
      </div>
    </section>
  );
}
