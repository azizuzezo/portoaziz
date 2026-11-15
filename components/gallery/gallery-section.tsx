import Image from "next/image";
import { gallery } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Zoom } from "@/components/motion/lightbox";
import { Reveal } from "@/components/motion/motion";

const items = gallery.map((g) => ({ ...g.image, alt: g.caption, caption: `${g.caption}, ${g.org}` }));

/**
 * Photos only, in justified rows: every photo in a row shares one height and keeps its own
 * aspect ratio (each grows in proportion to width/height), so rows run edge to edge and nothing
 * is cropped. Captions live in the alt text and the full-size viewer, not under the photos.
 */
export function GallerySection() {
  return (
    <section id="gallery" className="anchor shell py-24 md:py-32">
      <SectionHeading label="On the job" title="Offices, stations, lobbies, studios and an expo floor" />
      <ul className="mt-12 flex flex-wrap gap-3">
        {gallery.map((item, i) => {
          const ratio = item.image.w / item.image.h;
          return (
            <Reveal
              as="li"
              key={item.image.src}
              delay={(i % 3) * 0.06}
              className="min-w-0"
              style={{ flex: `${ratio} 1 ${(ratio * 14).toFixed(2)}rem` }}
            >
              <Zoom items={items} index={i} className="overflow-hidden rounded-xl">
                <span className="relative block w-full bg-sunken" style={{ aspectRatio: `${item.image.w} / ${item.image.h}` }}>
                  <Image quality={90}
                    src={item.image.src}
                    alt={`${item.caption}, ${item.org}`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-contain transition-transform duration-500 ease-out group-hover/zoom:scale-[1.03]"
                  />
                </span>
              </Zoom>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
