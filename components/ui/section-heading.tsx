import { Reveal, SplitWords } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

/**
 * Section opener: a numbered label (the case-log motif repeated across the page)
 * and a heading, with the intro beside it on wide screens.
 */
export function SectionHeading({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string;
  label: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8", className)}>
      <div className="md:col-span-7">
        <p className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-sm font-semibold text-accent">
          {index}
          <span className="mx-2 text-line" aria-hidden>
            /
          </span>
          {label}
        </p>
        <h2 className="mt-3 text-3xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem]">
          <SplitWords text={title} stagger={0.035} />
        </h2>
      </div>
      {intro && (
        <div className="text-base leading-relaxed text-muted md:col-span-5 md:self-end">{intro}</div>
      )}
    </Reveal>
  );
}
