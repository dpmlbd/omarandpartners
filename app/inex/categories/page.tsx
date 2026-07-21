"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const categories = [
  { title: "Natural Stone", count: "40+", description: "Marble, granite, limestone, and travertine from quarries across Europe, Asia, and the Americas.", image: "/images/materials.png" },
  { title: "Structural Metals", count: "35+", description: "Steel, aluminum, Corten, and titanium systems for structural and cladding applications.", image: "/images/architecture.png" },
  { title: "Glass Systems", count: "25+", description: "Tempered, laminated, low-iron, and structural glass for facades, interiors, and skylights.", image: "/images/materials.png" },
  { title: "Timber & Veneers", count: "50+", description: "Hardwoods, softwoods, plywoods, and decorative veneers from certified sustainable sources.", image: "/images/architecture.png" },
  { title: "Composites", count: "30+", description: "Engineered stone, terrazzo, solid surface, and polymer composites for durable finishes.", image: "/images/materials.png" },
  { title: "Bespoke Finishes", count: "60+", description: "Custom hardware, lighting fixtures, door furniture, and ornamental metalwork.", image: "/images/architecture.png" },
];

export default function CategoriesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Categories</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Material Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Explore our curated collections organized by material type. Each category contains dozens of options for specification.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORIES LIST ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Browse by Type</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">Six core categories covering every material need.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link href="/inex/products" className="group block">
                  <div className="relative h-[320px] overflow-hidden rounded-2xl border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{cat.count} Products</span>
                      </div>
                      <div>
                        <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight text-white mb-2">
                          {cat.title}
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
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
