"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowLeftLine, RiMapPinLine } from "@remixicon/react";
import type { PublicProjectView } from "@/lib/public/projects";

interface ProjectDetailViewProps {
  project: PublicProjectView;
  companySlug: string;
}

export function ProjectDetailView({ project, companySlug }: ProjectDetailViewProps) {
  // Gallery items for the 2x3 grid
  const galleryItems =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image];

  // Project specification items (Location and Practice Entity excluded)
  const specItems = [
    { label: "Category", value: project.category },
    { label: "Project Type", value: project.projectType || "Architectural Project" },
    { label: "Year / Duration", value: project.year },
    { label: "Spatial Area", value: project.area },
    { label: "Status", value: project.status },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-14 pt-8">
        <Link
          href={`/${companySlug}#projects`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          <RiArrowLeftLine size={14} /> Back to Projects
        </Link>
      </div>

      {/* ── TOP SECTION (LOCATION ONLY, NO TABLE STYLE) ───────────────────── */}
      <section className="relative py-20 md:py-28 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            {/* Left: Metadata & Title */}
            <div className="md:col-span-8">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium font-mono">
                    {project.category}
                  </span>
                  <span className="w-4 h-[1px] bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-mono">
                    {project.status}
                  </span>
                </div>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.92] text-foreground">
                  {project.title}
                </h1>
              </ScrollReveal>
            </div>

            {/* Right: Clean Location (No table box) */}
            <div className="md:col-span-4 flex flex-col justify-end">
              <ScrollReveal delay={0.15}>
                <div className="flex items-start gap-3 pt-2 md:pt-0">
                  <RiMapPinLine size={18} className="text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                      Location
                    </span>
                    <span className="text-foreground text-sm md:text-base font-light tracking-wide mt-1">
                      {project.location}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="group relative aspect-[16/9] md:aspect-[21/9] max-h-[580px] w-full overflow-hidden border border-border bg-secondary">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale-0 group-hover:grayscale scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── 01. ABOUT SECTION ────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                01
              </span>
              <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">
                About
              </span>
            </div>
            <div className="md:col-span-10">
              <ScrollReveal>
                {/* Heading is strictly "ABOUT" with nothing beside it */}
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase mb-8">
                  About
                </h2>
                <div className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-3xl whitespace-pre-line space-y-4">
                  {project.description || "No project narrative provided yet."}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. PROJECT DATA & SPECIFICATIONS ────────────────────────────── */}
      <section id="specifications" className="py-24 md:py-36 border-b border-border bg-secondary/5 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                02
              </span>
              <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">
                Data
              </span>
            </div>
            <div className="md:col-span-10">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">
                  Project Overview
                </h2>
                <p className="mt-2 text-muted-foreground text-xs md:text-sm font-light">
                  Architectural parameters, spatial geometry, and project classification.
                </p>
              </ScrollReveal>
            </div>
          </div>

          {/* 5 specification cards (location and practice entity removed) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px border border-border bg-border">
            {specItems.map((item, idx) => (
              <ScrollReveal key={item.label} delay={idx * 0.05}>
                <div className="flex flex-col justify-between p-6 md:p-8 bg-background hover:bg-secondary/20 transition-colors duration-300 min-h-[140px]">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                    0{idx + 1}. {item.label}
                  </span>
                  <span className="font-heading text-lg md:text-xl font-medium text-foreground tracking-tight mt-3">
                    {item.value || "N/A"}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03. GALLERY SECTION (2 BY 3 GRID) ────────────────────────────── */}
      {galleryItems.length > 0 && (
        <section id="gallery" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
          <div className="container mx-auto px-6 md:px-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
              <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                  03
                </span>
                <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">
                  Gallery
                </span>
              </div>
              <div className="md:col-span-10">
                <ScrollReveal>
                  <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">
                    Gallery
                  </h2>
                  <p className="mt-2 text-muted-foreground text-xs md:text-sm font-light">
                    Visual curation in 2 by 3 grid.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* 2 by 3 Grid: 2 columns on small screens, 3 columns on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-border bg-border">
              {galleryItems.map((img: string, i: number) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="group relative aspect-[4/3] overflow-hidden bg-background">
                    <Image
                      src={img}
                      alt={`${project.title} visual 0${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover grayscale-0 group-hover:grayscale scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />

                    {/* Numbering badge */}
                    <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1">
                      0{i + 1}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
