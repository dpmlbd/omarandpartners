"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

export default function OverviewPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Overview</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            The material foundation of every great space
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            INEX is the materials sourcing and supply arm of the ONP ecosystem. We provide the entire group — and select external partners — with access to the world's finest building and finishing materials.
          </motion.p>
        </div>
      </section>

      {/* ── 01. ABOUT ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-5">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-4xl font-light leading-snug tracking-tight">
                  Engineered for <span className="text-foreground font-medium">perfection</span>.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-4">
              <ScrollReveal delay={0.2}>
                <p>From natural stone and structural steel to bespoke glass systems and rare timber veneers, INEX ensures that our buildings are built with the same uncompromising standard that defines our design philosophy.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>Every material batch is audited at source and tested to international standards before delivery, ensuring zero compromise on quality.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. KEY METRICS ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">By the Numbers</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border">
            {[
              { value: "200+", label: "Material Categories" },
              { value: "30+", label: "Global Partners" },
              { value: "50+", label: "Brands Catalogued" },
              { value: "94%", label: "On-Time Delivery" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col gap-2 p-6 md:p-8 bg-background hover:bg-secondary/20 transition-colors duration-300">
                  <span className="font-heading text-3xl md:text-4xl font-semibold text-primary">{stat.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. CAPABILITIES ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">03</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Core Capabilities</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">End-to-end material sourcing and supply chain management.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {[
              { title: "Global Sourcing", desc: "Direct relationships with quarries, mills, and factories across 5 continents ensure consistent supply and competitive pricing." },
              { title: "Quality Assurance", desc: "Every batch is audited at source and tested to international standards. Defect rate remains below 0.5%." },
              { title: "Technical Support", desc: "Our engineers provide specification guidance, sample coordination, and installation support for complex projects." },
              { title: "Logistics & Delivery", desc: "Consolidated shipping, customs clearance, and just-in-time delivery coordinated with construction schedules." },
              { title: "Sustainable Sourcing", desc: "Prioritizing FSC-certified timber, low-carbon stone, and recycled materials wherever possible." },
              { title: "Integrated Pipeline", desc: "INEX works directly within ONP's project pipeline, ensuring the right materials are specified and delivered on time." },
            ].map((cap, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex flex-col gap-4 p-6 md:p-8 bg-background border-r border-border last:border-r-0 hover:bg-secondary/20 transition-colors duration-300 min-h-[180px]">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-medium">0{i + 1}</span>
                  <h3 className="font-heading text-lg font-medium uppercase tracking-tight">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
