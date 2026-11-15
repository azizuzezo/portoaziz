import { Reveal, SplitWords } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

/**
 * Section opener: a large display heading, with the intro beside it on wide screens.
 */
export function SectionHeading({
  title,
  intro,
  className,
}: {
  /** Section name, for the reader of the code only. */
  label?: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8", className)}>
      <div className="md:col-span-8">
        <h2 className="display text-[clamp(2.5rem,5.5vw,4.75rem)] text-balance">
          <SplitWords text={title} stagger={0.035} />
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.1} className="text-lg leading-relaxed text-muted md:col-span-4 md:self-end">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
