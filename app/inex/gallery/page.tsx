"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

const galleryImages = [
  "/images/materials.png",
  "/images/architecture.png",
  "/images/materials.png",
  "/images/hero_architecture.png",
  "/images/architecture.png",
  "/images/materials.png",
  "/images/hero_architecture.png",
  "/images/architecture.png",
  "/images/materials.png",
];

export default function GalleryPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Gallery</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Material Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            A visual reference of our materials in context — from raw quarry samples to finished installations.
          </motion.p>
        </div>
      </section>

      {/* ── GALLERY GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Selected Imagery</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">Materials in situ — texture, scale, and light.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-border">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={img}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
