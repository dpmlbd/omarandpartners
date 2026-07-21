"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/ui/hero-section";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { CTASection } from "@/components/ui/cta-section";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine, RiArrowDownLine, RiBuilding4Line, RiBrushLine, RiStackLine } from "@remixicon/react";

const companies = [
  { id: "01", name: "Kolpoporisor", tagline: "Architecture", icon: <RiBuilding4Line size={20} />, href: "/kolpoporisor", desc: "Monumental architecture, urban planning, and structural design from concept to construction." },
  { id: "02", name: "Kolpokowsol", tagline: "Interior Design", icon: <RiBrushLine size={20} />, href: "/kolpokowsol", desc: "Curated interiors that define how people feel within a space — from residential to hospitality." },
  { id: "03", name: "INEX", tagline: "Building Materials", icon: <RiStackLine size={20} />, href: "/inex", desc: "Global sourcing of premium stone, steel, timber, and composites for uncompromising construction." },
];

const services = [
  { type: "stat" as const, title: "Projects Delivered", stat: "150+", statLabel: "Across all three divisions combined.", colSpan: 1 as const },
  { type: "image" as const, title: "Architecture", image: "/images/architecture.png", colSpan: 1 as const, rowSpan: 2 as const },
  { type: "stat" as const, title: "Countries Active", stat: "18", statLabel: "Global footprint spanning 5 continents.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Integrated Delivery", description: "Architecture, interior design, and materials supply coordinated under one roof — ensuring zero fragmentation across any project lifecycle.", colSpan: 2 as const },
  { type: "list" as const, title: "Group Benchmarks", items: [{ label: "Avg. Client Satisfaction", value: "97%" }, { label: "On-Budget Delivery", value: "92%" }, { label: "Awards Won", value: "13+" }], colSpan: 1 as const, rowSpan: 2 as const },
  { type: "image" as const, title: "Interior Design", image: "/images/interior.png", colSpan: 1 as const },
  { type: "stat" as const, title: "Years of Excellence", stat: "15+", statLabel: "Defining spaces since 2010.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Material Intelligence", description: "INEX provides direct material supply to both Kolpoporisor and Kolpokowsol, ensuring specifications are met from factory to site.", colSpan: 1 as const },
];

const gallery = [
  { src: "/images/architecture.png", label: "Civic Landmark", company: "Kolpoporisor", span: "col-span-2 row-span-2" },
  { src: "/images/interior.png", label: "Luxury Penthouse", company: "Kolpokowsol", span: "col-span-1 row-span-1" },
  { src: "/images/materials.png", label: "Material Selection", company: "INEX", span: "col-span-1 row-span-1" },
  { src: "/images/hero_architecture.png", label: "Urban Complex", company: "Kolpoporisor", span: "col-span-2 row-span-1" },
];

function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-col items-center gap-0">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="border border-primary bg-foreground text-background px-8 py-5 flex flex-col items-center gap-1 min-w-[200px]">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-background/40">Holding Group</span>
          <span className="font-heading text-xl font-semibold uppercase tracking-tight">Omar &amp; Partners</span>
        </motion.div>

        <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 0.4, delay: 0.7 }} style={{ originY: 0 }} className="w-[1px] h-12 bg-primary" />

        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.5, delay: 0.9 }} style={{ originX: 0.5 }} className="w-full max-w-2xl h-[1px] bg-border" />

        <div className="w-full max-w-2xl grid grid-cols-3">
          {companies.map((_, i) => (
            <motion.div key={i} initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 0.3, delay: 1.1 + i * 0.1 }} style={{ originY: 0 }} className="flex justify-center">
              <div className="w-[1px] h-8 bg-border" />
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-3 gap-px border border-border bg-border">
          {companies.map((co, i) => (
            <motion.div key={co.id} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 1.3 + i * 0.15 }} onMouseEnter={() => setHovered(co.id)} onMouseLeave={() => setHovered(null)} className={`bg-background flex flex-col gap-4 p-6 md:p-8 transition-colors duration-300 ${hovered === co.id ? "bg-secondary/30" : ""}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-muted-foreground tracking-widest">{co.id}</span>
                <div className={`w-8 h-8 border border-border flex items-center justify-center transition-all duration-300 ${hovered === co.id ? "border-primary text-primary" : "text-muted-foreground"}`}>{co.icon}</div>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-foreground font-medium block mb-1">{co.tagline}</span>
                <h3 className="font-heading text-lg font-medium uppercase tracking-tight mb-2">{co.name}</h3>
                <p className="text-muted-foreground text-xs font-light leading-relaxed">{co.desc}</p>
              </div>
              <Link href={co.href} className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Explore <RiArrowRightLine size={11} /></Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      <HeroSection
        tagline="Our Ecosystem"
        title={["Omar", "&", "Partners"]}
        subtitle="Three independent companies. One unified vision. Architecture, interiors, and materials working in complete synergy."
        ctaHref="#ecosystem"
        ctaText="Explore Ecosystem"
        estText="Est. 2010"
        rightPanelImage={{ src: "/images/hero_architecture.png", alt: "ONP Architecture", priority: true, overlay: true, scrollCue: true }}
      />

      <section id="ecosystem" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="01" title="Business Ecosystem" subtitle="A holding structure where every company is independent yet connected under one shared vision." />
          <ScrollReveal delay={0.2}><EcosystemDiagram /></ScrollReveal>
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Services Overview" subtitle="A comprehensive range of services across architecture, interiors, and materials — all under one roof." />
          <ServicesBentoGrid services={services} />
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Selected Works" subtitle="A curated showcase across architecture, interiors, and material excellence." />
          <GalleryGrid items={gallery} />
        </div>
      </section>

      <CTASection title="Let&apos;s build something together" href="/contact" buttonText="Get in Touch" />

    </div>
  );
}
