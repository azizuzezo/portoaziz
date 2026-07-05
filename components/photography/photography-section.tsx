"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { photographyNote, photographyWork } from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";

export function PhotographySection() {
  return (
    <section id="photography" className="section-shell">
      <SectionHeading
        eyebrow="Photography"
        title="Behind the lens"
        description="Trains, crews, and station life — shot around the job."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {photographyWork.map((photo, i) => (
          <motion.div
            key={photo.image}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
          >
            <Image
              src={photo.image}
              alt={photo.caption}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-sm text-fog">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-mist/70">
        <Camera className="h-3.5 w-3.5" />
        {photographyNote}
      </div>
    </section>
  );
}
