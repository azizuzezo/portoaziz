import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Buttons are the one pill shape; cards and images use smaller radii, so actions stand out.
// Hover lifts 2px and press sinks: immediate feedback on every action.
const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transform-none",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-ink shadow-[0_8px_20px_-10px_var(--accent)] hover:shadow-[0_12px_24px_-10px_var(--accent)]",
        secondary: "border border-line bg-surface text-ink hover:border-ink",
        quiet: "px-2 text-ink underline decoration-line underline-offset-4 hover:translate-y-0 hover:decoration-accent",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

type Common = VariantProps<typeof buttonVariants> & { className?: string; children: React.ReactNode };

type AsLink = Common & { href: string; external?: boolean; download?: boolean } & Omit<
    React.ComponentProps<"a">,
    "href" | "className" | "children"
  >;
type AsButton = Common & { href?: undefined } & Omit<React.ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  if (props.href !== undefined) {
    const { variant, className, external, children, ...rest } = props as AsLink;
    return (
      <a
        {...rest}
        className={cn(buttonVariants({ variant }), className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  const { variant, className, children, type, ...rest } = props as AsButton;
  return (
    <button type={type ?? "button"} {...rest} className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
}
