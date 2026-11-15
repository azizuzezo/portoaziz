import Image from "next/image";
import type { Image as Img } from "@/lib/content/profile";
import { Zoom } from "@/components/motion/lightbox";
import { Tilt } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

/**
 * A real product screenshot in a thin frame. The top strip carries the domain, so a reader
 * knows which live site they are looking at. Natural aspect ratio, never cropped.
 * Tilts on hover and opens full-size on click.
 */
export function Shot({
  image,
  alt,
  label,
  sizes,
  priority,
  className,
  tilt = 5,
}: {
  image: Img;
  alt: string;
  label?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  tilt?: number;
}) {
  return (
    <Tilt max={tilt} className={cn("min-w-0", className)}>
      <Zoom items={[{ ...image, alt, caption: label ? `${alt} (${label})` : alt }]}>
        <span className="block overflow-hidden rounded-lg border border-line bg-surface">
          {label && (
            <span className="flex items-center gap-2 border-b border-line px-3 py-2">
              <span className="flex gap-1" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </span>
              <span className="truncate text-[11px] text-muted">{label}</span>
            </span>
          )}
          <Image quality={90}
            src={image.src}
            alt={alt}
            width={image.w}
            height={image.h}
            sizes={sizes}
            priority={priority}
            className="block h-auto w-full"
          />
        </span>
      </Zoom>
    </Tilt>
  );
}
