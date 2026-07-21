"use client";

import { notFound } from "next/navigation";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react";

const projects: Record<string, any> = {
  "lumina-residences": {
    title: "Lumina Residences",
    category: "Luxury Residential",
    location: "New York, USA",
    year: "2024",
    area: "4,200 sq.m",
    status: "Completed",
    description: "A pair of sky-high residences where light is the primary material. Floor-to-ceiling glazing, calibrated artificial lighting, and a palette of limestone, walnut, and brushed brass create an atmosphere of calm luxury.",
    image: "/images/interior.png",
    gallery: ["/images/interior.png", "/images/materials.png"],
  },
  "serene-hotel": {
    title: "Serene Hotel",
    category: "Boutique Hospitality",
    location: "London, UK",
    year: "2023",
    area: "8,500 sq.m",
    status: "Completed",
    description: "A 40-key boutique hotel where every room tells a different material story. From raw concrete lobbies to velvet-draped suites, the journey is intentional and immersive.",
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/interior.png"],
  },
  "apex-tower": {
    title: "Apex Tower Lobby",
    category: "Corporate Interior",
    location: "Dubai, UAE",
    year: "2024",
    area: "2,800 sq.m",
    status: "Completed",
    description: "A double-height lobby that balances corporate gravitas with human warmth. Custom terrazzo, back-lit onyx, and a sculptural reception desk define the arrival experience.",
    image: "/images/interior.png",
    gallery: ["/images/interior.png", "/images/materials.png"],
  },
  "verde-spa": {
    title: "Verde Spa",
    category: "Wellness",
    location: "Singapore",
    year: "2023",
    area: "1,200 sq.m",
    status: "Completed",
    description: "A wellness spa designed around the principles of biophilic design. Living walls, water features, and a muted palette of green and stone create instant calm.",
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/interior.png"],
  },
  "noir-restaurant": {
    title: "Noir Restaurant",
    category: "Fine Dining",
    location: "Paris, France",
    year: "2024",
    area: "650 sq.m",
    status: "Under Construction",
    description: "An intimate fine-dining restaurant wrapped in dark timber, blackened steel, and pin-spot lighting. The interior is a study in contrast and intimacy.",
    image: "/images/interior.png",
    gallery: ["/images/interior.png", "/images/materials.png"],
  },
  "canvas-office": {
    title: "Canvas Office",
    category: "Creative Workplace",
    location: "Dhaka, Bangladesh",
    year: "2023",
    area: "3,400 sq.m",
    status: "Completed",
    description: "A creative agency headquarters designed as a blank canvas. Flexible layouts, acoustic pods, and a vibrant material palette support both focus and collaboration.",
    image: "/images/materials.png",
    gallery: ["/images/materials.png", "/images/interior.png"],
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
          href="/kolpokowsol/projects"
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
    </div>
  );
}
