"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoGallery } from "@/components/ui/bento-gallery";
import { SocialChannelsSection } from "@/components/ui/social-channels-section";
import { kolpokowsolGalleryItems } from "@/lib/gallery-data";
import { RiArrowRightLine } from "@remixicon/react";

const stats = [
  { value: "80+", label: "Interiors Delivered" },
  { value: "5★", label: "Avg. Client Rating" },
  { value: "40%", label: "Bespoke Pieces" },
  { value: "05", label: "Design Awards" },
];

const capabilities = [
  { id: "01", title: "Residential", desc: "Luxury homes, penthouses, and estates designed around the rituals and rhythms of daily life." },
  { id: "02", title: "Hospitality", desc: "Hotels, restaurants, and lounges where atmosphere is the product and every detail serves the narrative." },
  { id: "03", title: "Workplace", desc: "Offices that balance productivity with wellbeing, brand expression with human comfort." },
  { id: "04", title: "Retail", desc: "Spaces that invite exploration and translate brand identity into physical experience." },
  { id: "05", title: "Wellness", desc: "Spas, clinics, and wellness centers designed to calm, restore, and inspire." },
  { id: "06", title: "Bespoke Joinery", desc: "Custom furniture and built-in millwork crafted by master artisans to exacting specifications." },
];

const projects = [
  { id: "lumina-residences", title: "Lumina Residences", category: "Residential", location: "New York, USA", image: "/images/interior.png" },
  { id: "serene-hotel", title: "Serene Hotel", category: "Hospitality", location: "London, UK", image: "/images/materials.png" },
  { id: "apex-tower", title: "Apex Tower Lobby", category: "Corporate", location: "Dubai, UAE", image: "/images/interior.png" },
  { id: "verde-spa", title: "Verde Spa", category: "Wellness", location: "Singapore", image: "/images/materials.png" },
  { id: "noir-restaurant", title: "Noir Restaurant", category: "Hospitality", location: "Paris, FR", image: "/images/interior.png" },
  { id: "canvas-office", title: "Canvas Office", category: "Workplace", location: "Dhaka, BD", image: "/images/materials.png" },
];

const services = [
  {
    id: "01",
    title: "Residential Interiors",
    desc: "Bespoke homes that reflect the lives of those who inhabit them. From penthouses to countryside estates, we craft spaces of quiet luxury.",
    image: "/images/interior.png",
  },
  {
    id: "02",
    title: "Hospitality Design",
    desc: "Hotels, restaurants, and lounges that tell a story. We design environments that guests remember long after they leave.",
    image: "/images/materials.png",
  },
  {
    id: "03",
    title: "Workplace & Corporate",
    desc: "Offices that inspire productivity and belonging. Our workplace designs balance brand expression with human comfort.",
    image: "/images/interior.png",
  },
  {
    id: "04",
    title: "Material Curation",
    desc: "A dedicated materials library spanning natural stone, rare timber, bespoke textiles, and custom joinery — sourced through INEX.",
    image: "/images/materials.png",
  },
  {
    id: "05",
    title: "Lighting & Atmosphere",
    desc: "Lighting is the most emotional element of interior design. We design layered schemes that shift with the day and the mood.",
    image: "/images/interior.png",
  },
  {
    id: "06",
    title: "FF&E Specification",
    desc: "Furniture, fixtures, and equipment specified down to the last detail. Every object is chosen for its contribution to the whole.",
    image: "/images/materials.png",
  },
];





export default function KolpokowsolPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── HERO SECTION ──────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "700px" }}>

        {/* Full-bleed background image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/interior.png"
            alt="Kolpokowsol — Interior Architecture & Spatial Design"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-[1]" />

        {/* Text content overlaid on image — same grid alignment */}
        <div className="relative z-10 h-full flex items-center pt-20 container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end w-full">

            {/* Left: heading */}
            <div className="flex flex-col">
              {/* Metadata label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-[1px] bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary font-medium">
                  Interior Design Division
                </span>
              </motion.div>

              {/* Giant stacked heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-heading font-bold leading-[0.92] tracking-tighter uppercase text-white"
                  style={{ fontSize: "clamp(2.8rem, 6.5vw, 6rem)" }}
                >
                  Kolpo<br />
                  <span className="text-primary">kowsol</span>
                </h1>
              </motion.div>
            </div>

            {/* Right: description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="lg:pb-2"
            >
              <p className="text-white/60 text-sm md:text-[15px] font-light leading-relaxed max-w-md">
                Kolpokowsol is the interior architecture and spatial design practice of Omar &amp; Partners — transforming built shells into extraordinary human environments through material intelligence, calibrated light, and bespoke craftsmanship.
              </p>
            </motion.div>

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
                  Design that <span className="text-foreground font-medium">defines</span> how you feel in a space.
                </h2>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5 border-l border-border pl-8 text-muted-foreground text-sm font-light leading-relaxed flex flex-col gap-5">
              <ScrollReveal delay={0.2}>
                <p>Kolpokowsol is the interior design studio of the Omar &amp; Partners ecosystem. We specialize in high-end residential, hospitality, and corporate interior projects where atmosphere is everything.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>Our designers work at the intersection of aesthetics and function, creating interior worlds that feel entirely personal yet architecturally coherent.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p>Every material, light source, and furnishing is selected not just for beauty, but for the emotional resonance it creates within a space.</p>
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

      {/* ── CORE DISCIPLINES ─────────────────────────────────────── */}
      <section id="disciplines" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Core Disciplines" subtitle="Specialized interior design practices delivered across diverse sectors." />

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
          <SectionHeader index="03" title="Selected Works" subtitle="A curated selection of interior projects spanning residential, hospitality, corporate, and wellness." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border mt-12">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1}>
                <Link
                  href={`/kolpokowsol/projects/${project.id}`}
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
          <SectionHeader index="04" title="Interior Services" subtitle="From concept mood boards to custom joinery, material sourcing, and complete on-site supervision." />

          {/* Service Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 0.08}>
                <div className="group relative h-[320px] overflow-hidden border border-border bg-background hover:border-primary transition-all duration-500">
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
        </div>
      </section>

      {/* ── BENTO GALLERY WITH PAGINATION ────────────────────────── */}
      <BentoGallery
        badge="Interiors Gallery"
        title="Spatial & Material Archive"
        description="A curated bento archive of bespoke residences, hospitality atmospheres, and artisanal joinery."
        items={kolpokowsolGalleryItems}
        itemsPerPage={8}
      />

      {/* ── 05. SOCIAL MEDIA SECTION ──────────────────────────────── */}
      <SocialChannelsSection
        index="05"
        title="Social Media"
        subtitle="Follow Kolpokowsol for behind-the-scenes glimpses, material studies, and newly completed spatial works."
      />

    </div>
  );
}
