"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const products = [
  { id: "calacatta-gold", name: "Calacatta Gold Marble", category: "Natural Stone", origin: "Italy", image: "/images/materials.png" },
  { id: "corten-steel", name: "Corten Steel Plate", category: "Structural Metals", origin: "Germany", image: "/images/architecture.png" },
  { id: "oak-veneer", name: "White Oak Veneer", category: "Timber & Veneers", origin: "France", image: "/images/materials.png" },
  { id: "tempered-glass", name: "Tempered Glass System", category: "Glass Systems", origin: "China", image: "/images/architecture.png" },
  { id: "terrazzo", name: "Terrazzo Composite", category: "Composites", origin: "USA", image: "/images/materials.png" },
  { id: "brass-fixtures", name: "Solid Brass Fixtures", category: "Bespoke Finishes", origin: "Spain", image: "/images/architecture.png" },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Products</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Material Catalog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            A curated selection of premium materials available for specification. Each product is backed by technical data sheets and sample availability.
          </motion.p>
        </div>
      </section>

      {/* ── PRODUCTS GRID ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.1}>
                <Link
                  href={`/inex/products/${product.id}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-secondary"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-[10px] uppercase tracking-widest text-primary mb-2 font-semibold">{product.category}</span>
                    <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-white">{product.name}</h3>
                    <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">Origin: {product.origin}</p>
                  </div>
                  <div className="absolute top-6 right-6 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <RiArrowRightLine size={14} className="text-white -rotate-45" />
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
