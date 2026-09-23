"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { CTASection } from "@/components/ui/cta-section";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiBuilding4Line,
  RiBrushLine,
  RiStackLine,
} from "@remixicon/react";

const triadEntities = [
  {
    id: "01",
    code: "01_ARCH",
    name: "Kolpoporisor",
    discipline: "Architecture",
    essence: "Structure & Form",
    watermark: "STRUCTURE",
    stat: "50+ Landmarks",
    context: "Urban & Civic",
    image: "/images/architecture.png",
    icon: RiBuilding4Line,
    href: "/kolpoporisor",
  },
  {
    id: "02",
    code: "02_INT",
    name: "Kolpokowsol",
    discipline: "Interior Design",
    essence: "Space & Volume",
    watermark: "SPACE",
    stat: "80+ Interiors",
    context: "Human Scale",
    image: "/images/interior.png",
    icon: RiBrushLine,
    href: "/kolpokowsol",
  },
  {
    id: "03",
    code: "03_MAT",
    name: "INEX",
    discipline: "Building Materials",
    essence: "Matter & Substance",
    watermark: "MATTER",
    stat: "200+ Materials",
    context: "Quarry Direct",
    image: "/images/materials.png",
    icon: RiStackLine,
    href: "/inex",
  },
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

const engagementFramework = [
  {
    index: "01",
    tag: "MODE // 01",
    scope: "Independent Division",
    title: "Specialist Commission",
    summary: "Direct appointment of Kolpoporisor, Kolpokowsol, or INEX as autonomous specialists for focused architectural, interior, or material scopes.",
    parameters: [
      { label: "ENGAGEMENT", value: "Single-discipline scope under direct subsidiary principal leadership" },
      { label: "INTERFACE", value: "Integrates directly with client teams, external architects, or general contractors" },
      { label: "DELIVERY", value: "Dedicated division SLA, independent milestone sign-offs, and specialized deliverables" },
    ],
    highlight: false,
    cta: "Commission Specialist",
  },
  {
    index: "02",
    tag: "MODE // 02 · UNIFIED TRIAD [RECOMMENDED]",
    scope: "Full Closed-Loop Triad",
    title: "Turnkey Group Delivery",
    summary: "Complete tripartite execution synchronizing architecture, interior design, and material supply under one unified holding agreement.",
    parameters: [
      { label: "ENGAGEMENT", value: "Synchronized triad execution across Kolpoporisor + Kolpokowsol + INEX" },
      { label: "INTERFACE", value: "Unified project directorship with a single point of executive accountability" },
      { label: "DELIVERY", value: "Single master contract, synchronized BIM modeling, and zero contractor scope gaps" },
    ],
    highlight: true,
    cta: "Initiate Group Delivery",
  },
  {
    index: "03",
    tag: "MODE // 03",
    scope: "Supply Chain Network",
    title: "Material Partnership",
    summary: "Strategic material specification, quarry-direct stone sourcing, custom fabrication, and door-to-site international logistics via INEX.",
    parameters: [
      { label: "ENGAGEMENT", value: "Direct trade supply and custom architectural fabrication for developers and studios" },
      { label: "INTERFACE", value: "Dedicated material engineer and international freight logistics coordination" },
      { label: "DELIVERY", value: "Factory batch certification, pre-assembly dry-lay reviews, and insured transit" },
    ],
    highlight: false,
    cta: "Procurement Inquiry",
  },
];

function BusinessEcosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeHover, setActiveHover] = useState<string | null>(null);

  return (
    <div ref={ref} className="w-full flex flex-col gap-6">
      {/* ── TOP ARCHITECTURAL HUD ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground font-medium">
            Holding Ecosystem // The Tripartite Axis
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>01 Structure</span>
          <span className="text-primary">&rarr;</span>
          <span>02 Space</span>
          <span className="text-primary">&rarr;</span>
          <span>03 Matter</span>
        </div>
      </div>

      {/* ── INTERACTIVE MONOLITHIC KINETIC TRIPTYCH ── */}
      <div className="w-full h-[640px] md:h-[540px] flex flex-col md:flex-row border border-border bg-foreground overflow-hidden">
        {triadEntities.map((entity) => {
          const isHovered = activeHover === entity.id;
          const isAnyHovered = activeHover !== null;
          const IconComponent = entity.icon;

          return (
            <Link
              key={entity.id}
              href={entity.href}
              onMouseEnter={() => setActiveHover(entity.id)}
              onMouseLeave={() => setActiveHover(null)}
              className={`group relative overflow-hidden flex flex-col justify-between p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/10 last:border-0 transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer ${
                isHovered
                  ? "md:flex-[2] flex-[1.6]"
                  : isAnyHovered
                  ? "md:flex-[0.8] flex-[0.8] opacity-75"
                  : "md:flex-1 flex-1"
              }`}
            >
              {/* Background Imagery */}
              <Image
                src={entity.image}
                alt={entity.name}
                fill
                className={`object-cover transition-all duration-1000 ease-[0.22,1,0.36,1] ${
                  isHovered
                    ? "scale-105 grayscale-0 brightness-90"
                    : "scale-100 grayscale brightness-[0.4] group-hover:brightness-50"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />

              {/* Huge Background Typographic Watermark */}
              <span className="absolute bottom-6 right-4 font-heading font-black text-6xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-white/[0.04] pointer-events-none select-none transition-transform duration-700 group-hover:translate-x-2">
                {entity.watermark}
              </span>

              {/* Top Meta Bar */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 border border-white/15 uppercase tracking-widest">
                    {entity.code}
                  </span>
                  <span className="hidden sm:inline font-mono text-[9px] text-white/50 uppercase tracking-widest">
                    [{entity.context}]
                  </span>
                </div>

                <div className="w-8 h-8 rounded-none bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:border-primary group-hover:text-primary transition-colors duration-300">
                  <IconComponent size={16} />
                </div>
              </div>

              {/* Bottom Content Block */}
              <div className="relative z-10 flex flex-col gap-2 mt-auto">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                  {entity.discipline}
                </span>

                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                  {entity.name}
                </h3>

                <p className="text-xs font-light text-white/70 tracking-wide mt-1">
                  {entity.essence}
                </p>

                {/* Minimal Stat & Link Reveal */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/15">
                  <span className="font-heading text-lg font-semibold text-white">
                    {entity.stat}
                  </span>

                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white group-hover:text-primary transition-colors">
                    <span>Explore</span>
                    <RiArrowRightLine
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── MINIMAL HOLDING FOOTER STRIP ── */}
      <div className="w-full border border-border bg-background p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="font-heading text-xs uppercase tracking-widest text-foreground font-semibold">
            Omar &amp; Partners Holding
          </span>
          <span className="hidden sm:inline text-xs text-muted-foreground font-light">
            — Capital &amp; Architectural Governance
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Est. 2010</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>18 Countries</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-primary font-medium">Closed-Loop Synergy</span>
        </div>
      </div>
    </div>
  );
}

export default function CompaniesPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── SIGNATURE ARCHITECTURAL HERO SECTION (CENTERED & SIZED TO 100VH - HEADER) ── */}
      <section className="relative w-full min-h-[calc(100dvh-5rem)] h-[calc(100dvh-5rem)] max-h-[950px] flex items-center justify-center bg-black dark:bg-white text-white dark:text-black border-b border-border overflow-hidden px-6 md:px-14">

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center py-8 sm:py-12">

          {/* Company Logo / Brand Image Placeholder (Centered in the Middle) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 overflow-hidden border border-white/20 dark:border-black/20 bg-black/60 dark:bg-white/60 group shadow-2xl">
              {/* Precision Corner Accents */}
              <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-primary pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-primary pointer-events-none z-10" />


              {/*
                COMPANY LOGO PLACEHOLDER:
                Currently displaying a random architectural visual.
                When replacing with your company logo:
                  - Update `src` with your logo path (e.g., "/onp.svg" or "/images/logo.png")
                  - If your logo is a transparent SVG/PNG, use `className="object-contain p-4"`
              */}
              <Image
                src="/images/hero_architecture.png"
                alt="Omar & Partners Company Logo / Brand Visual"
                fill
                priority
                sizes="160px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Metadata Eyebrow Badge (Centered) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4 sm:mb-5"
          >
            <span className="w-6 sm:w-8 h-[1px] bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary font-medium">
              Holding Ecosystem // Operating Entities
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-primary" />
          </motion.div>

          {/* Dramatic Centered Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-heading font-semibold leading-[0.92] tracking-tighter uppercase text-white dark:text-black text-center"
              style={{ fontSize: "clamp(2.6rem, 5.8vw, 5.5rem)" }}
            >
              Our <span className="text-primary">Companies</span>
            </h1>
          </motion.div>

          {/* Accent Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-[1px] bg-primary/80 my-4 sm:my-5"
          />

          {/* Centered Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/70 dark:text-black/70 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-center px-4"
          >
            Three autonomous yet deeply synchronized operating entities unified under one holding vision — bridging master architecture, bespoke interiors, and material intelligence into a seamless closed-loop execution model.
          </motion.p>

        </div>
      </section>

      <section id="ecosystem" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader
            index="01"
            title="Business Ecosystem"
            subtitle="A multi-disciplinary holding structure where architecture, interior design, and materials operate independently yet execute in closed-loop synergy."
          />
          <div className="mt-12">
            <BusinessEcosystem />
          </div>
        </div>
      </section>

      <section id="services" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Services Overview" subtitle="A comprehensive range of services across architecture, interiors, and materials — all under one roof." />
          <ServicesBentoGrid services={services} />
        </div>
      </section>

      <section id="works" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Selected Works" subtitle="A curated showcase across architecture, interiors, and material excellence." />
          <GalleryGrid items={gallery} />
        </div>
      </section>

      {/* ── REDESIGNED ENGAGEMENT SPECIFICATION FRAMEWORK ── */}
      <section id="engagement" className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader
            index="04"
            title="Engagement Models"
            subtitle="Three structured delivery frameworks calibrated for independent agility or unified group execution."
          />

          {/* Ledger Technical Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mt-12 border-b border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Specification Ledger // Delivery Protocols</span>
            </div>
            <span>[Framework Tiers 01 - 03 &middot; Active]</span>
          </div>

          {/* Monolithic Horizontal Specification Slabs */}
          <div className="flex flex-col gap-6 mt-6">
            {engagementFramework.map((model) => (
              <div
                key={model.index}
                className={`relative group p-6 sm:p-8 md:p-10 border transition-all duration-500 ${
                  model.highlight
                    ? "bg-foreground text-background border-primary shadow-xl"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                {/* Corner Crosshair Accent */}
                <span className={`absolute top-3 right-3 font-mono text-[10px] ${model.highlight ? "text-primary" : "text-muted-foreground/40 group-hover:text-primary"} transition-colors`}>
                  +
                </span>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Left Column: Index, Mode & Title */}
                  <div className="lg:col-span-4 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xl sm:text-2xl font-bold ${model.highlight ? "text-primary" : "text-foreground"}`}>
                        {model.index}
                      </span>
                      <span className="h-4 w-[1px] bg-border" />
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${model.highlight ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {model.tag}
                      </span>
                    </div>

                    <h3 className={`font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-tight mt-1 ${model.highlight ? "text-background" : "text-foreground"}`}>
                      {model.title}
                    </h3>

                    <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border inline-block w-fit mt-1 ${
                      model.highlight
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-secondary/30 text-muted-foreground"
                    }`}>
                      {model.scope}
                    </span>

                    <p className={`text-xs font-light leading-relaxed mt-2 ${model.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                      {model.summary}
                    </p>
                  </div>

                  {/* Center Column: 3-Parameter Technical Specification Grid */}
                  <div className="lg:col-span-5 flex flex-col gap-3 py-1 border-t lg:border-t-0 lg:border-l border-border/40 lg:pl-8">
                    {model.parameters.map((param, pIdx) => (
                      <div key={pIdx} className="flex flex-col gap-0.5">
                        <span className={`font-mono text-[9px] uppercase tracking-widest ${model.highlight ? "text-primary" : "text-muted-foreground"}`}>
                          [{param.label}]
                        </span>
                        <span className={`text-xs font-light leading-snug ${model.highlight ? "text-background/90" : "text-foreground/90"}`}>
                          {param.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Editorial Inline Action Link */}
                  <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center h-full pt-4 lg:pt-0 border-t lg:border-t-0 border-border/40">
                    <Link
                      href="/contact"
                      className={`group/link inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                        model.highlight
                          ? "text-primary hover:text-white"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      <span className="font-medium">{model.cta}</span>
                      <RiArrowRightUpLine size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Let&apos;s build something together" href="/contact" buttonText="Get in Touch" />

    </div>
  );
}
