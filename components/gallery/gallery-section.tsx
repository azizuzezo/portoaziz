"use client";

import { motion } from "framer-motion";
import { gallery } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function GallerySection() {
  return (
    <section id="gallery" className="section-shell">
      <SectionHeading
        eyebrow="Gallery"
        title="Documentation of a work life"
        description="Moments from the floor — stations, studios, and client meetings."
      />

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4">
        {gallery.map((item, i) => (
          <motion.div
            key={item.image}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
              <p className="text-sm font-medium text-fog">{item.caption}</p>
              <p className="mt-0.5 text-xs text-mist">{item.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
