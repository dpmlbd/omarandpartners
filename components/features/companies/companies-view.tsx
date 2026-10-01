"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { CTASection } from "@/components/ui/cta-section";
import { ServicesBentoGrid } from "@/components/ui/services-bento-grid";
import { EcosystemDiagram } from "@/components/features/landing/ecosystem-diagram";
import { RiArrowRightUpLine } from "@remixicon/react";
import {
  companiesServices as services,
  companiesGallery as gallery,
  engagementFramework,
} from "@/static-data/companies";
import { siteConfig } from "@/config/site";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];

export function CompaniesView() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── SIGNATURE ARCHITECTURAL HERO SECTION (CENTERED & SIZED TO 100VH - HEADER) ── */}
      <section className="relative w-full min-h-[calc(100dvh-5rem)] h-[calc(100dvh-5rem)] max-h-[950px] flex items-center justify-center bg-background text-foreground border-b border-border overflow-hidden px-6 md:px-14">

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center py-8 sm:py-12">

          {/* Clear Company Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center">
              <Image
                src="/onp.svg"
                alt="Omar & Partners Logo"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 140px, 176px"
                className="object-contain"
              />
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
              className="font-heading font-semibold leading-[0.92] tracking-tighter uppercase text-foreground text-center"
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
            className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-center px-4"
          >
            Three autonomous yet deeply synchronized operating entities unified under one holding vision — bridging master architecture, bespoke interiors, and material intelligence into a seamless closed-loop execution model.
          </motion.p>

        </div>
      </section>

      <section id="ecosystem" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="01" title="Our Ecosystem" subtitle="Three specialized entities, one unified vision of excellence." />
          <EcosystemDiagram />
        </div>
      </section>

      <section id="services" className="py-24 md:py-36 border-b border-border bg-secondary/10 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Services Overview" subtitle={`A comprehensive range of services across ${comp1?.description?.toLowerCase() || "consultancy"}, ${comp2?.description?.toLowerCase() || "consultancy & construction"}, and materials — all under one roof.`} />
          <ServicesBentoGrid services={services} />
        </div>
      </section>

      <section id="works" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Selected Works" subtitle={`A curated showcase across ${comp1?.description?.toLowerCase() || "consultancy"}, ${comp2?.description?.toLowerCase() || "consultancy & construction"}, and material excellence.`} />
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
                className={`relative group p-6 sm:p-8 md:p-10 border transition-all duration-500 ${model.highlight
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

                    <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 border inline-block w-fit mt-1 ${model.highlight
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
                      className={`group/link inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${model.highlight
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
