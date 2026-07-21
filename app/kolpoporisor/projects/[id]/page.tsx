"use client";

import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react";

const projects: Record<string, any> = {
  "zenith-tower": {
    title: "The Zenith Tower",
    category: "Commercial High-Rise",
    location: "New York, USA",
    year: "2024",
    area: "85,000 sq.m",
    status: "Completed",
    description: "A 62-story commercial tower that redefines the Manhattan skyline. The Zenith Tower combines high-performance curtain-wall glazing with a diagrid exoskeleton, reducing structural steel by 30% while creating a distinctive vertical rhythm.",
    image: "/images/hero_architecture.png",
    gallery: ["/images/architecture.png", "/images/hero_architecture.png"],
  },
  "meridian-hub": {
    title: "Meridian Hub",
    category: "Mixed Use Development",
    location: "London, UK",
    year: "2023",
    area: "42,000 sq.m",
    status: "Completed",
    description: "A vertical campus integrating workspace, retail, and public realm. Meridian Hub features a transparent ground plane that invites pedestrian flow through the building's heart.",
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/hero_architecture.png"],
  },
  "crescent-pavilion": {
    title: "Crescent Pavilion",
    category: "Cultural Center",
    location: "Dubai, UAE",
    year: "2024",
    area: "12,000 sq.m",
    status: "Under Construction",
    description: "A sweeping cultural pavilion whose crystalline form captures and refracts desert light. The project serves as a public forum, gallery, and performance space.",
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/hero_architecture.png"],
  },
  "summit-residences": {
    title: "Summit Residences",
    category: "Luxury Residential",
    location: "Singapore",
    year: "2023",
    area: "28,000 sq.m",
    status: "Completed",
    description: "Twin residential towers connected by a sky bridge, offering panoramic views of the Marina Bay. Materiality shifts from polished granite at the base to bronzed glass at the crown.",
    image: "/images/hero_architecture.png",
    gallery: ["/images/hero_architecture.png", "/images/architecture.png"],
  },
  "horizon-plaza": {
    title: "Horizon Plaza",
    category: "Commercial Complex",
    location: "Dhaka, Bangladesh",
    year: "2024",
    area: "55,000 sq.m",
    status: "Under Construction",
    description: "A transit-oriented commercial complex that reimagines urban density in South Asia. The design prioritizes passive cooling and communal terraces.",
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/hero_architecture.png"],
  },
  "echo-pavilion": {
    title: "Echo Pavilion",
    category: "Public Space",
    location: "Tokyo, Japan",
    year: "2022",
    area: "3,500 sq.m",
    status: "Completed",
    description: "A timber-and-steel pavilion exploring the limits of tensile structures. The undulating roof creates an acoustic environment that amplifies and softens urban noise.",
    image: "/images/architecture.png",
    gallery: ["/images/architecture.png", "/images/hero_architecture.png"],
  },
};

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = projects[params.id];

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-14 pt-8">
        <Link
          href="/kolpoporisor/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <RiArrowLeftLine size={14} /> Back to Projects
        </Link>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{project.category}</span>
                  <span className="w-4 h-[1px] bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{project.status}</span>
                </div>
                <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </ScrollReveal>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-3 gap-px border border-border">
                  <div className="p-4 bg-background">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Year</span>
                    <span className="font-heading text-lg font-medium">{project.year}</span>
                  </div>
                  <div className="p-4 bg-background border-l border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Area</span>
                    <span className="font-heading text-lg font-medium">{project.area}</span>
                  </div>
                  <div className="p-4 bg-background border-l border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Location</span>
                    <span className="font-heading text-lg font-medium text-right">{project.location.split(",")[0]}</span>
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
          <Image src={project.image} alt={project.title} fill className="object-cover grayscale" priority />
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
                  {project.description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Gallery</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {project.gallery.map((img: string, i: number) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-10">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase max-w-2xl">
              Interested in a similar project?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              href="/kolpoporisor/request-consultation"
              className="inline-flex items-center gap-3 border border-background/20 text-background px-6 py-4 text-xs uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300 group shrink-0"
            >
              Request Consultation <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
