"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

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
            Architecture as an act of cultural endurance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Kolpoporisor is the architectural arm of the Omar & Partners ecosystem. We design structures that harmonize with their environment while pushing the boundaries of spatial experience.
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
                  Designing structures that <span className="text-foreground font-medium">endure</span>.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-4">
              <ScrollReveal delay={0.2}>
                <p>From large-scale urban master plans to intimate private commissions, every project is executed with the same exacting standards of structural integrity and aesthetic purpose.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>We believe architecture should not merely house activity — it should elevate it. Every line, material, and proportion is considered in service of that ambition.</p>
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
              { value: "50+", label: "Projects Delivered" },
              { value: "12", label: "Countries" },
              { value: "18 mo.", label: "Avg. Duration" },
              { value: "08", label: "Design Awards" },
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
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">End-to-end architectural services from concept to completion.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {[
              { title: "Urban Master Planning", desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm." },
              { title: "Monumental Structures", desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty." },
              { title: "Sustainable Design", desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision." },
              { title: "BIM & Digital Twin", desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination." },
              { title: "Construction Admin", desc: "On-site representation and rigorous documentation to protect design intent through build." },
              { title: "Heritage & Adaptive Reuse", desc: "Sensitive interventions that honor historical fabric while enabling new programming." },
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
