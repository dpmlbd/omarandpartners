"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const brands = [
  {
    name: "ONP Holding Group",
    slug: "onp",
    description: "The holding group and parent brand for Omar & Partners.",
    logo: "/images/logo_onp.png",
    color: "#000000",
    colorLight: "#ffffff",
    typography: "Outfit (Sans-serif)",
    tags: ["Corporate", "Holding", "Parent"],
  },
  {
    name: "Kolpoporisor",
    slug: "kolpoporisor",
    description: "Architecture and urban design division.",
    logo: "/images/logo_kolpoporisor.png",
    color: "#4A6FA5",
    colorLight: "#E8F0FE",
    typography: "Outfit (Sans-serif)",
    tags: ["Architecture", "Urban", "Structural"],
  },
  {
    name: "Kolpokowsol",
    slug: "kolpokowsol",
    description: "Interior design and spatial aesthetics division.",
    logo: "/images/logo_kolpokowsol.png",
    color: "#8B5E3C",
    colorLight: "#FAF5F0",
    typography: "Playfair Display (Serif)",
    tags: ["Interior", "Aesthetic", "Design"],
  },
  {
    name: "INEX",
    slug: "inex",
    description: "Building materials sourcing and supply division.",
    logo: "/images/logo_inex.png",
    color: "#C27A2C",
    colorLight: "#FDF5E9",
    typography: "Outfit (Sans-serif)",
    tags: ["Materials", "Logistics", "Supply"],
  },
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex flex-col justify-center bg-foreground text-background px-8 md:px-14 pt-28 pb-12 z-10 shrink-0 border-b border-border">
        <div className="container mx-auto">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Brand Guidelines</span>
            </div>
          </ScrollReveal>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              Brand<br />Assets
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-sm"
            >
              Official brand guidelines, logo assets, color palettes, and typography standards for all entities within the Omar & Partners ecosystem.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Brand Grid ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {brands.map((brand, i) => (
              <ScrollReveal key={brand.slug} delay={i * 0.1}>
                <div className="group flex flex-col border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 bg-background">
                  
                  {/* Logo placeholder */}
                  <div className="relative h-40 md:h-52 bg-secondary/20 border-b border-border flex items-center justify-center overflow-hidden">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                      style={{ backgroundColor: brand.colorLight, color: brand.color }}
                    >
                      <span className="font-heading text-2xl md:text-3xl font-bold tracking-tighter uppercase">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 p-6 md:p-8">
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight uppercase mb-2">{brand.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{brand.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {brand.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Color swatch */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div
                        className="w-10 h-10 rounded-lg border border-border shrink-0"
                        style={{ backgroundColor: brand.color }}
                      />
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider block">Primary</span>
                        <span className="text-[10px] text-muted-foreground font-mono">{brand.color}</span>
                      </div>
                    </div>

                    {/* Typography */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider block">Typeface</span>
                        <span className="text-[10px] text-muted-foreground">{brand.typography}</span>
                      </div>
                      <Link
                        href={`/${brand.slug}`}
                        className="text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        Visit <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
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
