import Image from "next/image";
import type { FlowStep, Metric, Screenshot } from "@/types/project";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";

export function BrowserFrame({
  shot,
  sizes,
  priority,
  className,
}: {
  shot: Screenshot;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-line bg-surface shadow-card", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-subtle px-3 py-2" aria-hidden>
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
      </div>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full"
      />
    </div>
  );
}

export function ScreenshotFigure({ shot, sizes }: { shot: Screenshot; sizes: string }) {
  return (
    <figure>
      <BrowserFrame shot={shot} sizes={sizes} />
      {shot.caption && <figcaption className="mt-3 text-sm leading-relaxed text-ink-3">{shot.caption}</figcaption>}
    </figure>
  );
}

/** Detailed, numbered workflow used on case-study pages. */
export function FlowDiagram({ steps, caption }: { steps: FlowStep[]; caption?: string }) {
  return (
    <figure>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.label} className="relative rounded-xl border border-line bg-surface p-4 shadow-card">
            <span className="font-mono text-[11px] font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-1 font-medium tracking-tight text-ink">{step.label}</p>
            {step.detail && <p className="mt-1 text-sm leading-snug text-ink-3">{step.detail}</p>}
            {i < steps.length - 1 && (
              <ArrowRightIcon
                width={14}
                height={14}
                className="absolute top-1/2 -right-[11px] hidden -translate-y-1/2 rounded-full bg-canvas text-ink-3 lg:block [li:nth-child(4n)>&]:hidden"
              />
            )}
          </li>
        ))}
      </ol>
      {caption && <figcaption className="mt-4 text-sm leading-relaxed text-ink-3">{caption}</figcaption>}
    </figure>
  );
}

/** Compact pipeline used as a card visual. */
export function FlowStrip({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Pipeline</p>
      <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-[12.5px]",
                i === steps.length - 1
                  ? "border-accent/30 bg-accent-soft text-accent-strong"
                  : "border-line bg-subtle text-ink-2",
              )}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && <ArrowRightIcon width={14} height={14} className="text-ink-3" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ComparisonVisual({ before, after }: { before: Metric; after: Metric }) {
  const rows = [
    { tone: "warn" as const, tag: "Before", metric: before, pct: ratio(before.value) },
    { tone: "good" as const, tag: "After", metric: after, pct: ratio(after.value) },
  ];
  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Live Maps validation</p>
      <p className="mt-2 text-lg font-semibold tracking-tight">Company-name errors per 50 leads</p>
      <dl className="mt-6 space-y-5">
        {rows.map((row) => (
          <div key={row.tag}>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-sm text-ink-2">
                {row.tag} <span className="text-ink-3">· {row.metric.context}</span>
              </dt>
              <dd
                className={cn(
                  "shrink-0 font-mono text-2xl font-semibold tabular-nums",
                  row.tone === "warn" ? "text-warn" : "text-good",
                )}
              >
                {row.metric.value}
              </dd>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-subtle" aria-hidden>
              <div
                className={cn("h-full rounded-full", row.tone === "warn" ? "bg-warn/80" : "bg-good")}
                style={{ width: `${Math.max(row.pct * 100, 1.5)}%` }}
              />
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ratio(value: string) {
  const [a, b] = value.split("/").map(Number);
  return b ? a / b : 0;
}

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className={cn("grid gap-3", metrics.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col rounded-xl border border-line bg-surface p-5 shadow-card">
          <dt className="order-2 mt-2 font-medium text-ink">{m.label}</dt>
          <dd className="order-1 font-mono text-3xl font-semibold tracking-tight text-accent tabular-nums sm:text-4xl">
            {m.value}
          </dd>
          <dd className="order-3 mt-2 text-sm leading-relaxed text-ink-3">{m.context}</dd>
        </div>
      ))}
    </dl>
  );
}
