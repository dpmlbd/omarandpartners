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
            Design that defines how you feel in a space
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Kolpokowsol is the interior design studio of the ONP ecosystem. We specialize in high-end residential, hospitality, and corporate interior projects where atmosphere is everything.
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
                  Creating spaces that <span className="text-foreground font-medium">breathe</span>.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-4">
              <ScrollReveal delay={0.2}>
                <p>Our designers work at the intersection of aesthetics and function, creating interior worlds that feel entirely personal yet architecturally coherent.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>Every material, light source, and furnishing is selected not just for beauty, but for the emotional resonance it creates within a space.</p>
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
              { value: "80+", label: "Interiors Delivered" },
              { value: "5★", label: "Avg. Client Rating" },
              { value: "40%", label: "Bespoke Pieces" },
              { value: "05", label: "Design Awards" },
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
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Core Disciplines</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">Specialized interior design services across every sector.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {[
              { title: "Residential", desc: "Luxury homes, penthouses, and estates designed around the rituals and rhythms of daily life." },
              { title: "Hospitality", desc: "Hotels, restaurants, and lounges where atmosphere is the product and every detail serves the narrative." },
              { title: "Workplace", desc: "Offices that balance productivity with wellbeing, brand expression with human comfort." },
              { title: "Retail", desc: "Spaces that invite exploration and translate brand identity into physical experience." },
              { title: "Wellness", desc: "Spas, clinics, and wellness centers designed to calm, restore, and inspire." },
              { title: "Bespoke Joinery", desc: "Custom furniture and built-in millwork crafted by master artisans to exacting specifications." },
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
