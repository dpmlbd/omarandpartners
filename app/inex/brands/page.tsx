"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const brands = [
  { name: "Carrara Marble Co.", origin: "Italy", category: "Natural Stone", image: "/images/materials.png" },
  { name: "ThyssenKrupp Metals", origin: "Germany", category: "Structural Metals", image: "/images/architecture.png" },
  { name: "Saint-Gobain Glass", origin: "France", category: "Glass Systems", image: "/images/materials.png" },
  { name: "Oberflex Veneers", origin: "France", category: "Timber & Veneers", image: "/images/architecture.png" },
  { name: "Corian Dupont", origin: "USA", category: "Composites", image: "/images/materials.png" },
  { name: "Dornbracht Hardware", origin: "Germany", category: "Bespoke Finishes", image: "/images/architecture.png" },
];

export default function BrandsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Brands</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Partner Brands
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Exclusive partnerships with the world's most respected material manufacturers and artisans.
          </motion.p>
        </div>
      </section>

      {/* ── BRANDS GRID ──────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Our Partners</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">Trusted brands that meet our exacting standards for quality and sustainability.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px border border-border">
            {brands.map((brand, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col p-6 md:p-8 bg-background border-r border-border last:border-r-0 hover:bg-secondary/20 transition-colors duration-300 min-h-[200px]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{brand.category}</span>
                      <h3 className="font-heading text-xl font-medium tracking-tight uppercase mt-1">{brand.name}</h3>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{brand.origin}</span>
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">View materials →</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
