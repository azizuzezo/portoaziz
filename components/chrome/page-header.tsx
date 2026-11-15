import { RailHeader } from "@/components/chrome/rail-backdrop";
import { cn } from "@/lib/utils";
import { CountUp, Reveal, SplitWords } from "@/components/motion/motion";

/**
 * Opening block for inner pages (Work, About, Creative): a large title,
 * an intro, and optional real figures from the CV. Pages each pick their own figures.
 */
export function PageHeader({
  backdrop,
  title,
  intro,
  stats,
  children,
}: {
  /** Page name, for the reader of the code; the navbar already marks the page. */
  label?: string;
  /** Page-specific backdrop (shows the page's own content); the running rail if omitted. */
  backdrop?: React.ReactNode;
  title: string;
  intro?: React.ReactNode;
  stats?: { value: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden">
      {backdrop ?? <RailHeader />}
      <div className={cn("shell pt-36 pb-16 md:pt-44 md:pb-24", backdrop && "flex flex-col justify-center md:min-h-[80svh]")}>
      <h1 className={cn("display text-[clamp(2.75rem,7vw,6.25rem)] text-balance", backdrop ? "max-w-3xl md:max-w-[52%]" : "max-w-5xl")}>
        <SplitWords text={title} immediate stagger={0.05} />
      </h1>
      {intro && (
        <Reveal delay={0.15}>
          <div className={cn("mt-6 text-lg leading-relaxed text-muted sm:text-xl", backdrop ? "max-w-md" : "max-w-2xl")}>{intro}</div>
        </Reveal>
      )}
      {stats && (
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.2 + i * 0.06} className="flex flex-col-reverse justify-end rounded-2xl bg-paper/90 p-5 ring-1 ring-line backdrop-blur-[2px]">
              <dt className="mt-2 text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="display text-4xl sm:text-5xl">
                <CountUp value={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      )}
      {children}
      </div>
    </header>
  );
}
