"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { RiArrowRightLine, RiArrowDownLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

const services = [
  { type: "stat" as const, title: "Interiors Completed", stat: "80+", statLabel: "Spanning residential, hospitality, and corporate.", colSpan: 1 as const },
  { type: "image" as const, title: "Luxury Residences", image: "/images/interior.png", colSpan: 1 as const, rowSpan: 2 as const },
  { type: "stat" as const, title: "Client Satisfaction", stat: "5★", statLabel: "Average project rating across all delivered work.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Material Curation", description: "We source rare and premium materials from global suppliers — natural stone, bespoke joinery, and custom textiles — working closely with INEX.", colSpan: 2 as const },
  { type: "list" as const, title: "Design Benchmarks", items: [{ label: "Avg. Lead Time", value: "6 mo." }, { label: "Bespoke Pieces", value: "40%" }, { label: "Repeat Clients", value: "68%" }], colSpan: 1 as const, rowSpan: 2 as const },
  { type: "image" as const, title: "Hospitality Design", image: "/images/materials.png", colSpan: 1 as const },
  { type: "stat" as const, title: "Design Awards", stat: "05", statLabel: "Regional and international recognition.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Full-Service Studio", description: "From concept mood boards to furniture specification and on-site supervision, Kolpokowsol delivers total interior experiences.", colSpan: 1 as const },
];

export default function KolpokowsolPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[650px] max-h-[850px] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-foreground text-background px-8 md:px-14 pt-28 pb-8 md:pb-10 z-10 shrink-0">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Interior Design Division</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-col my-auto">
            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
              Kolpo<br />kowsol
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }} className="h-[1px] bg-primary my-6 w-full" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-background/50 text-sm font-light leading-relaxed max-w-xs">
              Refined interior design that transforms built shells into extraordinary human environments through material, light, and spatial narrative.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <Link href="/kolpokowsol/projects"
              className="inline-flex items-center gap-3 border border-background/20 text-background px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300">
              View Projects <RiArrowRightLine size={12} />
            </Link>
          </motion.div>
        </div>

        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/40 z-20" />

        <div className="w-full md:w-1/2 relative flex-1 overflow-hidden">
          <Image src="/images/interior.png" alt="Kolpokowsol Interiors" fill className="object-cover grayscale" priority />
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
                  Design that <span className="text-foreground font-medium">defines</span> how you feel in a space.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-4">
              <ScrollReveal delay={0.2}>
                <p>Kolpokowsol is the interior design studio of the ONP ecosystem. We specialize in high-end residential, hospitality, and corporate interior projects where atmosphere is everything.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>Our designers work at the intersection of aesthetics and function, creating interior worlds that feel entirely personal yet architecturally coherent.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES BENTO ───────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Services Overview</h2>
              </ScrollReveal>
            </div>
          </div>
          <ServicesBentoGrid services={services} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-10">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Begin your interior journey</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link href="/kolpokowsol/request-consultation"
              className="inline-flex items-center gap-3 border border-background/20 text-background px-6 py-4 text-xs uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300 group shrink-0">
              Request Consultation <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
