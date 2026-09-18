"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { RiArrowRightLine, RiArrowDownLine } from "@remixicon/react";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12", label: "Countries Active" },
  { value: "18 mo.", label: "Avg. Build Duration" },
  { value: "08", label: "Design Awards" },
];

const capabilities = [
  { id: "01", title: "Urban Master Planning", desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm." },
  { id: "02", title: "Monumental Structures", desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty." },
  { id: "03", title: "Sustainable Design", desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision." },
  { id: "04", title: "BIM & Digital Twin", desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination." },
  { id: "05", title: "Construction Administration", desc: "On-site representation and rigorous documentation to protect design intent through build." },
  { id: "06", title: "Heritage & Adaptive Reuse", desc: "Sensitive interventions that honor historical fabric while enabling new programming." },
];

const projects = [
  { id: "zenith-tower", title: "The Zenith Tower", category: "Commercial", location: "New York, USA", image: "/images/hero_architecture.png" },
  { id: "meridian-hub", title: "Meridian Hub", category: "Mixed Use", location: "London, UK", image: "/images/architecture.png" },
  { id: "crescent-pavilion", title: "Crescent Pavilion", category: "Cultural", location: "Dubai, UAE", image: "/images/architecture.png" },
  { id: "summit-residences", title: "Summit Residences", category: "Residential", location: "Singapore", image: "/images/hero_architecture.png" },
  { id: "horizon-plaza", title: "Horizon Plaza", category: "Commercial", location: "Dhaka, BD", image: "/images/architecture.png" },
  { id: "echo-pavilion", title: "Echo Pavilion", category: "Public", location: "Tokyo, JP", image: "/images/architecture.png" },
];

const services = [
  {
    id: "01",
    title: "Urban Master Planning",
    desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm. We shape the framework within which buildings and communities thrive.",
    image: "/images/architecture.png",
  },
  {
    id: "02",
    title: "Monumental Structures",
    desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty. Every proportion is considered.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "03",
    title: "Sustainable Design",
    desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision. Performance and poetry are not opposites.",
    image: "/images/architecture.png",
  },
  {
    id: "04",
    title: "BIM & Digital Twin",
    desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination across disciplines.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "05",
    title: "Construction Administration",
    desc: "On-site representation and rigorous documentation to protect design intent through the build process.",
    image: "/images/architecture.png",
  },
  {
    id: "06",
    title: "Heritage & Adaptive Reuse",
    desc: "Sensitive interventions that honor historical fabric while enabling new programming and extended lifespan.",
    image: "/images/hero_architecture.png",
  },
];

const bentoServices = [
  { type: "stat" as const, title: "Projects Delivered", stat: "50+", statLabel: "Across residential, civic, and commercial sectors.", colSpan: 1 as const },
  { type: "image" as const, title: "Urban Master Planning", image: "/images/architecture.png", colSpan: 1 as const, rowSpan: 2 as const },
  { type: "stat" as const, title: "Countries Reached", stat: "12", statLabel: "Global project footprint.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Structural Design", description: "We integrate advanced structural engineering methodologies into each project, ensuring both safety and aesthetic ambition.", colSpan: 2 as const },
  { type: "list" as const, title: "Delivery Metrics", items: [{ label: "Avg. Project Duration", value: "18 mo." }, { label: "Client Satisfaction", value: "97%" }, { label: "On-Budget Rate", value: "92%" }], colSpan: 1 as const, rowSpan: 2 as const },
  { type: "image" as const, title: "Sustainable Architecture", image: "/images/hero_architecture.png", colSpan: 1 as const },
  { type: "stat" as const, title: "Design Awards", stat: "08", statLabel: "Regional and international recognition.", dark: true, colSpan: 1 as const },
  { type: "feature" as const, title: "Concept to Completion", description: "From early schematic design through construction administration, Kolpoporisor manages the full architectural lifecycle.", colSpan: 1 as const },
];

const pageSections = [
  { label: "Overview", href: "#overview" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Selected Works", href: "#projects" },
  { label: "Services", href: "#services" },
];

export default function KolpoporisorPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── REDESIGNED HERO SECTION ──────────────────────────────── */}
      <section className="relative w-full bg-foreground text-background border-b border-border overflow-hidden">
        {/* Subtle architectural atmosphere */}
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

        <div className="relative container mx-auto px-6 md:px-14 pt-32 md:pt-36 pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">

            {/* Left: Monumental Architectural Story */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Metadata badge */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary">
                    Architecture Division
                  </span>
                </div>
                <span className="w-1 h-1 rounded-full bg-background/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-background/40">
                  01 / ONP Group
                </span>
              </motion.div>

              {/* Dramatic Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
                  style={{ fontSize: "clamp(2.8rem, 6.2vw, 5.75rem)" }}
                >
                  Kolpo<br />
                  <span className="inline-flex items-baseline gap-3">
                    <span className="text-primary">porisor</span>
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle with accent bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-xl"
              >
                <div className="w-20 h-[1px] bg-primary/80 mb-5" />
                <p className="text-background/70 text-sm md:text-base font-light leading-relaxed">
                  Visionary architecture for monumental structures, sustainable urban design, and enduring spatial experiences that elevate civic life.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 bg-background text-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-background/90 transition-all duration-300"
                >
                  Selected Works
                  <RiArrowDownLine size={13} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-3 border border-background/20 text-background px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-background/60 hover:bg-background/5 transition-all duration-300"
                >
                  Full Capabilities
                  <RiArrowRightLine size={13} />
                </a>
              </motion.div>

              {/* Architectural Metrics Ribbon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-background/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
              >
                {stats.map((s, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                      0{i + 1}
                    </span>
                    <span className="font-heading text-2xl md:text-3xl font-semibold text-background tracking-tight">
                      {s.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-background/50">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Architectural Monumental Visual Showcase */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] overflow-hidden border border-background/15 bg-black">
                  <Image
                    src="/images/architecture.png"
                    alt="Kolpoporisor Monumental Architecture"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Corner styling */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/60 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/60 pointer-events-none" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">
                        Architecture Studio · Structural Lab
                      </span>
                    </div>
                  </div>

                  {/* Bottom Specimen Card */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/65 backdrop-blur-md border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                        Structural Thesis
                      </span>
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                        Monumental
                      </span>
                    </div>
                    <p className="text-white/80 text-xs font-light leading-relaxed">
                      &ldquo;Architecture is not merely housing activity — it is an act of cultural endurance that anchors human ambition to the earth.&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Anchor Strip */}
        <div className="border-t border-background/10 bg-black/25 backdrop-blur-sm">
          <div className="container mx-auto px-6 md:px-14 py-3.5 flex items-center justify-between gap-6 overflow-x-auto">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary shrink-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Kolpoporisor Index
            </span>
            <nav className="flex items-center gap-6 md:gap-8 shrink-0">
              {pageSections.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.2em] text-background/60 hover:text-primary transition-colors duration-200 whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ── 01. OVERVIEW SECTION ─────────────────────────────────── */}
      <section id="overview" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">Overview</span>
            </div>
            <div className="md:col-span-5">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-4xl font-light leading-snug tracking-tight">
                  Architecture as an act of <span className="text-foreground font-medium">cultural endurance</span>.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-5">
              <ScrollReveal delay={0.2}>
                <p>Kolpoporisor is the architectural arm of the Omar &amp; Partners ecosystem. We design structures that harmonize with their environment while pushing the boundaries of spatial experience.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>From large-scale urban master plans to intimate private commissions, every project is executed with the same exacting standards of structural integrity and aesthetic purpose.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p>We believe architecture should not merely house activity — it should elevate it. Every line, material, and proportion is considered in service of that ambition.</p>
              </ScrollReveal>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border mt-16 md:mt-20">
            {stats.map((stat, i) => (
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

      {/* ── CORE CAPABILITIES ────────────────────────────────────── */}
      <section id="capabilities" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Core Capabilities" subtitle="End-to-end architectural disciplines from master planning to construction administration." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border mt-12">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.id} delay={i * 0.08}>
                <div className="flex flex-col gap-4 p-6 md:p-8 bg-background hover:bg-secondary/20 transition-colors duration-300 min-h-[190px]">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">{cap.id}</span>
                  <h3 className="font-heading text-lg font-medium uppercase tracking-tight">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cap.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02. SELECTED WORKS (PROJECTS) ────────────────────────── */}
      <section id="projects" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Selected Works" subtitle="A curated selection of projects spanning commercial, cultural, residential, and public sectors across 12 countries." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border mt-12">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link
                  href={`/kolpoporisor/projects/${project.id}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-secondary"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="text-[10px] uppercase tracking-widest text-primary mb-2 font-semibold block">{project.category}</span>
                    <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-white">{project.title}</h3>
                    <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">{project.location}</p>
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

      {/* ── 03. SERVICES SECTION ─────────────────────────────────── */}
      <section id="services" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Architectural Services" subtitle="Full-spectrum architectural delivery handled by specialized teams adhering to highest international codes." />

          {/* Service Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 0.08}>
                <div className="group relative h-[320px] overflow-hidden rounded-[20px] border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-500">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="relative h-full flex flex-col justify-between p-8">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium block mb-2">
                        {svc.id}
                      </span>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold tracking-tight text-white">
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-xs font-light leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bento Grid Metrics */}
          <div className="mt-20 pt-16 border-t border-border">
            <div className="mb-10">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-2">Delivery Benchmark</span>
              <h3 className="font-heading text-2xl md:text-3xl font-semibold uppercase tracking-tight">Full Architectural Lifecycle</h3>
            </div>
            <ServicesBentoGrid services={bentoServices} />
          </div>
        </div>
      </section>

    </div>
  );
}
