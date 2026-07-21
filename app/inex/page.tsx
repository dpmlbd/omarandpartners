"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine, RiArrowDownLine } from "@remixicon/react";

const categories = [
  { title: "Natural Stone", image: "/images/materials.png", count: "40+" },
  { title: "Structural Metals", image: "/images/architecture.png", count: "35+" },
  { title: "Glass Systems", image: "/images/materials.png", count: "25+" },
  { title: "Timber & Veneers", image: "/images/architecture.png", count: "50+" },
  { title: "Composites", image: "/images/materials.png", count: "30+" },
  { title: "Bespoke Finishes", image: "/images/architecture.png", count: "60+" },
];

export default function InexPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[650px] max-h-[850px] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-foreground text-background px-8 md:px-14 pt-28 pb-8 md:pb-10 z-10 shrink-0">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Building Materials Division</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-col my-auto">
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              INEX<br />Materials
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }} className="h-[1px] bg-primary my-6 w-full" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-background/50 text-sm font-light leading-relaxed max-w-xs">
              Global sourcing and engineering of premium building materials for uncompromising construction quality.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <Link href="/inex/products"
              className="inline-flex items-center gap-3 border border-background/20 text-background px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300">
              Explore Products <RiArrowRightLine size={12} />
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/40 z-20" />

        <div className="w-full md:w-1/2 relative flex-1 overflow-hidden">
          <Image src="/images/materials.png" alt="INEX Materials" fill className="object-cover grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40">
            <span className="text-[9px] uppercase tracking-[0.3em]">Explore</span>
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <RiArrowDownLine size={12} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-5">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-4xl font-light leading-snug tracking-tight">
                  The material <span className="text-foreground font-medium">foundation</span> of every great space.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-4">
              <ScrollReveal delay={0.2}>
                <p>INEX is the materials sourcing and supply arm of the ONP ecosystem. We provide the entire group — and select external partners — with access to the world's finest building and finishing materials.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>From natural stone and structural steel to bespoke glass systems and rare timber veneers, INEX ensures that our buildings are built with the same uncompromising standard that defines our design philosophy.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES GRID ───────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Material Categories</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">Explore our curated collections of premium building materials.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href="/inex/categories" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{cat.count} Items</span>
                      <h3 className="font-heading text-xl font-medium tracking-tight text-white uppercase">{cat.title}</h3>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
