"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";
import {
  graphicDesignWork,
  socialDesignPosts,
  socialMediaWork,
} from "@/lib/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function GraphicDesignSection() {
  return (
    <section id="graphic-design" className="section-shell">
      <SectionHeading
        eyebrow="Graphic Design"
        title="Design work from the CSOT Creative Team"
        description="Brand identity, campaign design, and social content built while running the Customer Service On Train Instagram presence."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {graphicDesignWork.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            className="glass-panel overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-video w-full bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-contain p-6"
              />
            </div>
            <div className="p-6 pt-0">
              <Badge className="mb-3">{item.tag}</Badge>
              <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-mist">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel-strong mt-10 rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-aurora-rose">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {socialMediaWork.handle}
                </h3>
                <p className="text-xs text-mist">{socialMediaWork.followers} followers</p>
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm text-mist">{socialMediaWork.description}</p>
          </div>
          <Button href={socialMediaWork.url} external variant="outline" size="sm">
            <Instagram className="h-4 w-4" />
            Visit @csot.kaicommuter
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:w-fit sm:grid-cols-2">
          {socialMediaWork.metrics.map((metric) => (
            <div key={metric.label} className="glass-panel rounded-2xl px-5 py-4">
              <span className="font-display text-2xl font-bold text-gradient-aurora">
                {metric.value}
              </span>
              <p className="mt-1 text-xs text-mist">{metric.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-10">
        <h3 className="font-display text-lg font-semibold text-ink">
          Social campaign designs
        </h3>
        <p className="mt-1 text-sm text-mist">
          All created while serving on the Customer Service On Train Creative Team.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {socialDesignPosts.map((post, i) => (
            <motion.div
              key={post.image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-ink/10"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xs text-white">{post.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
