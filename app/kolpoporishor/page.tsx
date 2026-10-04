"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { BentoGallery, type BentoGalleryItem } from "@/components/ui/bento-gallery";
import { SocialChannelsSection } from "@/components/ui/social-channels-section";
import { CompanyProjectsFilter } from "@/components/features/companies/company-projects-filter";
import { getPublicCompanyGalleryAction } from "@/lib/actions/public-projects";
import { kolpoporishorCapabilities as capabilities, coreCapabilitiesIntro } from "@/static-data/divisions";
import { siteConfig } from "@/config/site";

const companyInfo = siteConfig.companies.find((c) => c.name === "Kolpoporishor");

export default function KolpoporishorPage() {
  const [galleryItems, setGalleryItems] = useState<BentoGalleryItem[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadGallery() {
      const items = await getPublicCompanyGalleryAction("kolpoporishor", 20);
      if (mounted) {
        setGalleryItems(items.slice(0, 20));
      }
    }
    loadGallery();
    return () => {
      mounted = false;
    };
  }, []);
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
            src="/images/kp_hero.jpg"
            alt={`${companyInfo?.name || "Kolpoporishor"} — ${companyInfo?.description || "Consultancy"}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-[1]" />

        {/* Text content overlaid on image */}
        <div className="relative z-10 h-full flex items-center pt-20 container mx-auto px-6 md:px-14">
          <div className="flex flex-col w-full max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold leading-none tracking-tight text-white whitespace-nowrap"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              Kolpoporishor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-white/85 text-base md:text-xl lg:text-2xl font-light tracking-wide mt-4"
            >
              {companyInfo?.description || "Consultancy"}
            </motion.p>
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
                <p>{companyInfo?.name || "Kolpoporishor"} is the {companyInfo?.description?.toLowerCase() || "consultancy"} arm of the Omar &amp; Partners ecosystem. We craft solutions that harmonize with their environment while pushing the boundaries of spatial experience.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>From large-scale urban master plans to intimate private commissions, every project is executed with the same exacting standards of structural integrity and aesthetic purpose.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <p>We believe {companyInfo?.description?.toLowerCase() || "consultancy"} should not merely house activity — it should elevate it. Every line, material, and proportion is considered in service of that ambition.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ────────────────────────────────────── */}
      <section id="capabilities" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Core Capabilities" subtitle="End-to-end architectural and engineering disciplines from planning to post-construction." />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="hidden md:block md:col-span-2" />
            <div className="md:col-span-10">
              <ScrollReveal delay={0.1}>
                <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-4xl">
                  {coreCapabilitiesIntro}
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.id} delay={i * 0.08} className="h-full">
                <div className="flex flex-col gap-4 p-6 md:p-8 bg-background border border-border hover:border-primary/40 hover:bg-secondary/20 transition-all duration-300 h-full">
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
          <CompanyProjectsFilter companySlug="kolpoporishor" />
        </div>
      </section>

      {/* ── BENTO GALLERY WITH PAGINATION ────────────────────────── */}
      <BentoGallery
        badge="Architectural Gallery"
        title="Spatial & Structural Archive"
        description="A curated bento archive of structural developments, civic pavilions, and experimental geometries."
        items={galleryItems}
        itemsPerPage={8}
      />

      {/* ── 04. SOCIAL MEDIA SECTION ──────────────────────────────── */}
      <SocialChannelsSection
        companySlug="kolpoporishor"
        index="04"
        title="Social Media"
        subtitle="Follow Kolpoporishor for architectural monographs, structural breakthroughs, and ongoing construction milestones."
      />

    </div>
  );
}
