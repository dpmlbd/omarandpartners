"use client";

import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react";

const products: Record<string, any> = {
  "calacatta-gold": {
    name: "Calacatta Gold Marble",
    category: "Natural Stone",
    origin: "Carrara, Italy",
    finish: "Polished",
    thickness: "20mm",
    description: "A striking white marble with dramatic grey veining and subtle gold highlights. Calacatta Gold is reserved for high-end residential and hospitality projects where material drama is the defining feature.",
    specs: ["Polished / Honed", "20mm / 30mm", "SL1 Grade", "Waterjet capability"],
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/architecture.png"],
  },
  "corten-steel": {
    name: "Corten Steel Plate",
    category: "Structural Metals",
    origin: "Ruhr, Germany",
    finish: "Raw / Sealed",
    thickness: "6mm – 20mm",
    description: "Weathering steel that develops a protective rust patina over time. Ideal for cladding, sculpture, and landscape architecture where material honesty and durability are paramount.",
    specs: ["Corten A / B", "6mm – 20mm", "A36 equivalent", "Custom lengths"],
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/materials.png"],
  },
  "oak-veneer": {
    name: "White Oak Veneer",
    category: "Timber & Veneers",
    origin: "Burgundy, France",
    finish: "Oil / Lacquer",
    thickness: "0.6mm",
    description: "Fine-grade French white oak rotary-cut veneer with a consistent grain pattern. Used extensively in luxury joinery, cabinetry, and wall paneling.",
    specs: ["0.6mm / 1.2mm", "FSC Certified", "Book-matched", "Widths up to 2.5m"],
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/architecture.png"],
  },
  "tempered-glass": {
    name: "Tempered Glass System",
    category: "Glass Systems",
    origin: "Shenzhen, China",
    finish: "Clear / Low-Iron",
    thickness: "12mm – 24mm",
    description: "Structural glass system capable of spanning large distances without visible fixings. Low-iron option available for maximum clarity and minimal green tint.",
    specs: ["Tempered / Laminated", "12mm – 24mm", "Low-Iron option", "Structural silicone"],
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/materials.png"],
  },
  "terrazzo": {
    name: "Terrazzo Composite",
    category: "Composites",
    origin: "New York, USA",
    finish: "Ground / Polished",
    thickness: "20mm",
    description: "Custom terrazzo with recycled marble aggregate in a cement or epoxy resin binder. Infinite color combinations and aggregate sizes for floors, walls, and counters.",
    specs: ["Epoxy / Cement", "20mm standard", "Custom colors", "Seamless pours"],
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/architecture.png"],
  },
  "brass-fixtures": {
    name: "Solid Brass Fixtures",
    category: "Bespoke Finishes",
    origin: "Madrid, Spain",
    finish: "Unlacquered / Lacquered",
    thickness: "Solid",
    description: "Hand-finished solid brass hardware and fittings. Available in unlacquered (living finish) or sealed options. Each piece develops a unique patina over time.",
    specs: ["CW617N alloy", "Living finish", "Custom patina", "Sand-cast option"],
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/materials.png"],
  },
};

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = products[params.id];

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-14 pt-8">
        <Link
          href="/inex/products"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <RiArrowLeftLine size={14} /> Back to Products
        </Link>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{product.category}</span>
                  <span className="w-4 h-[1px] bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{product.origin}</span>
                </div>
                <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tighter uppercase leading-[0.9]">
                  {product.name}
                </h1>
              </ScrollReveal>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-2 gap-px border border-border">
                  <div className="p-4 bg-background">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Finish</span>
                    <span className="font-heading text-lg font-medium">{product.finish}</span>
                  </div>
                  <div className="p-4 bg-background border-l border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Thickness</span>
                    <span className="font-heading text-lg font-medium">{product.thickness}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE ────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="relative aspect-[16/9] w-full">
          <Image src={product.image} alt={product.name} fill className="object-cover grayscale" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </section>

      {/* ── DESCRIPTION ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-10">
              <ScrollReveal>
                <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-3xl">
                  {product.description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECIFICATIONS ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Specifications</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border">
            {product.specs.map((spec: string, i: number) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col gap-2 p-6 md:p-8 bg-background">
                  <span className="font-heading text-lg font-medium text-primary">{spec}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">03</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Gallery</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {product.gallery.map((img: string, i: number) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image src={img} alt={`${product.name} gallery ${i + 1}`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
