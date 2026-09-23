"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
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
    color: "#059669",
    colorLight: "#ECFDF5",
    typography: "Outfit (Sans-serif)",
    tags: ["Architecture", "Urban", "Structural"],
  },
  {
    name: "Kolpokowsol",
    slug: "kolpokowsol",
    description: "Interior design and spatial aesthetics division.",
    logo: "/images/logo_kolpokowsol.png",
    color: "#059669",
    colorLight: "#ECFDF5",
    typography: "Playfair Display (Serif)",
    tags: ["Interior", "Aesthetic", "Design"],
  },
  {
    name: "INEX",
    slug: "inex",
    description: "Building materials sourcing and supply division.",
    logo: "/images/logo_inex.png",
    color: "#059669",
    colorLight: "#ECFDF5",
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
              Official brand guidelines, logo assets, color palettes, and typography standards for all entities within the Omar &amp; Partners ecosystem.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── 01. Brand Grid ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader
            index="01"
            title="Brand Ecosystem"
            subtitle="Our specialized architectural, interior, and material divisions operating under the Omar & Partners umbrella."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {brands.map((brand, i) => (
              <ScrollReveal key={brand.slug} delay={i * 0.1}>
                <div className="group flex flex-col border border-border overflow-hidden hover:border-primary/40 transition-all duration-500 bg-background">
                  
                  {/* Logo placeholder */}
                  <div className="relative h-40 md:h-52 bg-secondary/20 border-b border-border flex items-center justify-center overflow-hidden">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 border border-border/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
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
                          className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Color swatch */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div
                        className="w-10 h-10 border border-border shrink-0"
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

      {/* ── 02. Typography System Section ─────────────────────────────── */}
      <section className="py-24 md:py-36 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader
            index="02"
            title="Typography System"
            subtitle="The typographic identity of Omar & Partners pairs geometric modernism with editorial serif authority across digital and spatial applications."
          />

          {/* Typeface Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Outfit */}
            <ScrollReveal delay={0.1}>
              <div className="border border-border bg-background p-8 md:p-10 flex flex-col justify-between h-full hover:border-primary/40 transition-colors duration-500">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium block mb-1">
                        Primary Sans-Serif
                      </span>
                      <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-tight">
                        Outfit
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1">
                      --font-sans
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm font-light leading-relaxed my-6">
                    A geometric sans-serif inspired by the architectural grid. Selected for its structural clarity, high legibility across screens, and balanced proportions in technical readouts.
                  </p>

                  {/* Character Specimen */}
                  <div className="bg-secondary/20 border border-border p-6 font-sans">
                    <p className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-4 break-words">
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                    </p>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground">
                      0123456789 &bull; &amp; @ # $ % ! ? / \ ( ) [ ]
                    </p>
                  </div>

                  {/* Weight Samples */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Light 300</span>
                      <p className="font-sans font-light text-base text-foreground">Design</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Regular 400</span>
                      <p className="font-sans font-normal text-base text-foreground">Structure</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Medium 500</span>
                      <p className="font-sans font-medium text-base text-foreground">Proportion</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Bold 700</span>
                      <p className="font-sans font-bold text-base text-foreground">Monument</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Usage: Body, UI, Navigation, Labels</span>
                  <span>Weights: 300, 400, 500, 700</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Playfair Display */}
            <ScrollReveal delay={0.2}>
              <div className="border border-border bg-background p-8 md:p-10 flex flex-col justify-between h-full hover:border-primary/40 transition-colors duration-500">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium block mb-1">
                        Editorial Display Serif
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
                        Playfair Display
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground border border-border px-3 py-1">
                      --font-heading
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm font-light leading-relaxed my-6">
                    A transitional serif typeface with sharp contrast and classical elegance. Deployed for monumental section headlines, editorial narratives, and luxury presentation statements.
                  </p>

                  {/* Character Specimen */}
                  <div className="bg-secondary/20 border border-border p-6 font-serif">
                    <p className="text-xl md:text-2xl font-normal tracking-normal text-foreground mb-4 break-words">
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                    </p>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground">
                      0123456789 &bull; &amp; @ # $ % ! ? / \ ( ) [ ]
                    </p>
                  </div>

                  {/* Weight Samples */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Regular 400</span>
                      <p className="font-serif font-normal text-base text-foreground">Spatial Poetry</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Italic 400</span>
                      <p className="font-serif italic text-base text-foreground">Refined Horizon</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block mb-1">Bold 700</span>
                      <p className="font-serif font-bold text-base text-foreground">Civic Form</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>Usage: Hero Statements, Titles, Covers</span>
                  <span>Weights: 400, 600, 700</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Technical Hierarchy Scale */}
          <ScrollReveal delay={0.3}>
            <div className="border border-border bg-background p-8 md:p-10">
              <div className="flex items-center justify-between pb-6 border-b border-border mb-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-medium block mb-1">
                    Hierarchy System
                  </span>
                  <h4 className="font-heading text-xl md:text-2xl font-semibold uppercase tracking-tight">
                    Type Scale &amp; Application
                  </h4>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:block">
                  Responsive Fluid Ratios
                </span>
              </div>

              <div className="space-y-6 divide-y divide-border">
                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="w-48 shrink-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">Display Hero</span>
                    <span className="font-mono text-[10px] text-muted-foreground/70">clamp(3rem, 7vw, 6.5rem)</span>
                  </div>
                  <div className="flex-1 font-heading text-3xl md:text-5xl font-bold uppercase tracking-tighter">
                    Monumental Architecture
                  </div>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="w-48 shrink-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">Section Header</span>
                    <span className="font-mono text-[10px] text-muted-foreground/70">32px — 48px</span>
                  </div>
                  <div className="flex-1 font-heading text-2xl md:text-3xl font-semibold uppercase tracking-tight">
                    Spatial Curation &amp; Structural Delivery
                  </div>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="w-48 shrink-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">Body &amp; Editorial</span>
                    <span className="font-mono text-[10px] text-muted-foreground/70">15px / 1.6 Line Height</span>
                  </div>
                  <p className="flex-1 font-sans text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-2xl">
                    Every spatial intervention begins with structural honesty, material provenance, and environmental harmony. Our typography reinforces this architectural clarity.
                  </p>
                </div>

                <div className="pt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                  <div className="w-48 shrink-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block">Technical Index</span>
                    <span className="font-mono text-[10px] text-muted-foreground/70">10px — 12px Mono</span>
                  </div>
                  <div className="flex-1 font-mono text-xs tracking-[0.25em] text-foreground uppercase">
                    [01_ARCH] &bull; 40.7128&deg; N, 74.0060&deg; W &bull; EST. 2024
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
