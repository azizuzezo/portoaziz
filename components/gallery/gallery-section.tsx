import Image from "next/image";
import { gallery } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Zoom } from "@/components/motion/lightbox";
import { Reveal } from "@/components/motion/motion";

const items = gallery.map((g) => ({ ...g.image, alt: g.caption, caption: `${g.caption}, ${g.org}` }));

// Captions sit under each photo, not over it, so they stay readable on any image.
export function GallerySection() {
  return (
    <section id="gallery" className="anchor shell py-16 md:py-24">
      <SectionHeading index="06" label="On the job" title="Stations, lobbies, studios and an expo floor" />
      <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {gallery.map((item, i) => (
          <Reveal as="li" key={item.image.src} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
            <Zoom items={items} index={i} className="overflow-hidden rounded-xl">
              <Image
                src={item.image.src}
                alt={item.caption}
                width={item.image.w}
                height={item.image.h}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full bg-sunken transition-transform duration-500 ease-out group-hover/zoom:scale-[1.03]"
              />
            </Zoom>
            <p className="mt-2 text-sm font-medium">{item.caption}</p>
            <p className="text-xs text-muted">{item.org}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
