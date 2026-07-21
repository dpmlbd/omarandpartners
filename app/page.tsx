"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ImageCard } from "@/components/ui/image-card";
import { CTASection } from "@/components/ui/cta-section";
import { EcosystemDiagram } from "@/components/features/landing/ecosystem-diagram";
import { HeroSliderPanel } from "@/components/features/landing/hero-slider-panel";
import { TestimonialsSection } from "@/components/features/landing/testimonials-section";
import {
  RiGlobalLine,
  RiLeafLine,
  RiFocus3Line,
  RiMapPinLine,
  RiArrowRightLine,
} from "@remixicon/react";

const heroSlides = [
  { src: "/images/hero_architecture.png", label: "Architecture", tag: "01 / Kolpoporisor" },
  { src: "/images/interior.png", label: "Interior Design", tag: "02 / Kolpokowsol" },
  { src: "/images/materials.png", label: "Materials", tag: "03 / INEX" },
];

const insights = [
  { tag: "News", title: "ONP Announces New Headquarters Project", date: "Oct 12, 2026" },
  { tag: "Article", title: "The Future of Minimalist Architecture", date: "Sep 28, 2026" },
  { tag: "Press Release", title: "INEX Partners with Global Stone Suppliers", date: "Sep 15, 2026" },
];

const projects = [
  { src: "/images/architecture.png", category: "Architecture", title: "The Zenith Tower", href: "/kolpoporisor/projects" },
  { src: "/images/interior.png", category: "Interior Design", title: "Lumina Residences", href: "/kolpokowsol/projects" },
];

const whyItems = [
  { icon: <RiGlobalLine size={22} />, title: "Global Perspective", shortDesc: "International standards executed with local precision.", desc: "Drawing inspiration from international standards while executing with local precision and cultural intelligence. Our portfolio spans 18 countries, yet every project retains the specificity of its context. We believe global fluency and local sensitivity are not opposites — they are co-dependencies.", image: "/images/architecture.png" },
  { icon: <RiFocus3Line size={22} />, title: "Holistic Control", shortDesc: "Uncompromising quality across every project.", desc: "Managing architecture, interiors, and materials under one roof ensures uncompromising quality across every project. This vertical integration eliminates the handoff gaps that plague multi-vector projects, ensuring design intent survives from schematic to specification.", image: "/images/interior.png" },
  { icon: <RiLeafLine size={22} />, title: "Sustainable Future", shortDesc: "Environmentally conscious, built for longevity.", desc: "Engineering solutions that are environmentally conscious, resource-efficient, and built for longevity. Sustainability is not an afterthought — it is embedded in our material selection, structural logic, and lifecycle planning from day one.", image: "/images/materials.png" },
];

const testimonials = [
  {
    name: "Elena Vasquez",
    role: "CEO, Horizon Developments",
    image: "/images/hero_architecture.png",
    quote: "Omar & Partners delivered a landmark tower that redefined our skyline. Their integrated approach — from concept to material selection — was flawless.",
    location: "Dubai, UAE",
  },
  {
    name: "Marcus Chen",
    role: "Director, Apex Hospitality",
    image: "/images/interior.png",
    quote: "The interior curation by Kolpokowsol transformed our boutique hotel into an immersive experience. Guests consistently praise the spatial narrative.",
    location: "London, UK",
  },
  {
    name: "Sophia Al-Rashid",
    role: "Founder, Verde Living",
    image: "/images/materials.png",
    quote: "INEX sourced rare marble and engineered timber for our residential project with extraordinary precision. Their network is unmatched.",
    location: "New York, USA",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setActiveSlide((p) => (p + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 4500);
    return () => clearInterval(interval);
  }, [next, isAutoPlaying]);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[85vh] min-h-[650px] max-h-[850px] flex flex-col md:flex-row overflow-hidden">
        {/* Left panel */}
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-foreground text-background px-8 md:px-14 pt-28 pb-8 md:pb-10 z-10 shrink-0">
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Our Ecosystem</span>
            </div>
          </ScrollReveal>

          <div className="flex flex-col my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              Omar<br />&amp;<br />Partners
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-[1px] bg-primary my-6 w-full"
            />
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-background/50 text-sm font-light leading-relaxed max-w-xs"
            >
              Three independent companies. One unified vision. Architecture, interiors, and materials working in complete synergy.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex items-end justify-between">
            <a href="#ecosystem"
              className="inline-flex items-center gap-3 border border-background/20 text-background px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300">
              Explore Ecosystem <RiArrowRightLine size={12} />
            </a>
            <span className="text-background/30 text-[10px] uppercase tracking-widest">Est. 2010</span>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/40 z-20"
        />

        {/* Right panel */}
        <div className="w-full md:w-1/2 relative flex-1 overflow-hidden">
          <HeroSliderPanel
            slides={heroSlides}
            activeSlide={activeSlide}
            onDotClick={(i) => { setIsAutoPlaying(false); setActiveSlide(i); }}
            activeDot={activeSlide}
          />
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="About ONP" subtitle="We don&apos;t just design buildings; we engineer experiences that stand the test of time." />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mt-8 md:mt-12">
            <div className="md:col-span-4 flex flex-col gap-5 text-muted-foreground text-sm font-light leading-relaxed">
              <ScrollReveal delay={0.2}>
                <p>Founded on the principles of structural integrity and aesthetic perfection, Omar &amp; Partners has grown into a multi-disciplinary powerhouse.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>By integrating architectural vision with material science and interior refinement, we maintain absolute control over quality.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                   <Link href="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-2 group">
                Learn More <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              </ScrollReveal>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col gap-5 text-muted-foreground text-sm font-light leading-relaxed">
              <ScrollReveal delay={0.5}>
                <p>Our model is unique: by keeping architecture (Kolpoporisor), interior design (Kolpokowsol), and material sourcing (INEX) under a single parent, we offer clients an integrated service that eliminates fragmentation and maintains absolute quality control from concept to completion.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <p>Today, we operate across 18 countries, with a portfolio spanning monumental civic buildings, luxury residences, corporate headquarters, hospitality projects, and premium material supply chains.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Our Ecosystem" subtitle="Three specialized entities, one unified vision of excellence." />
          <EcosystemDiagram />
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Selected Works">
            <ScrollReveal delay={0.2}>
              <Link href="/kolpoporisor/projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium hover:text-primary transition-colors group">
                All Projects <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {projects.map((p, i) => (
              <ImageCard key={i} src={p.src} alt={p.title} title={p.title} subtitle={p.category} href={p.href} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border bg-secondary/20">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="05" title="The ONP Advantage" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {whyItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="group flex flex-col gap-6 p-8 md:p-10 bg-background border-r border-border last:border-r-0 hover:bg-secondary/40 transition-all duration-500">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-medium uppercase tracking-tight mb-3">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      <span className="group-hover:max-h-0 group-hover:opacity-0 max-h-24 overflow-hidden transition-all duration-500 inline-block align-top">{item.shortDesc}</span>
                      <span className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 delay-75 inline-block align-top">{item.desc}</span>
                    </p>
                  </div>
                  {item.image && (
                    <div className="relative h-40 overflow-hidden rounded-lg border border-border mt-2">
                      <Image src={item.image} alt={item.title} fill className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" />
                    </div>
                  )}
                  <span className="font-mono text-[10px] text-border mt-auto">0{i + 1}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="06" title="Latest Insights" subtitle="News, articles &amp; press releases from across the ecosystem." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {insights.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <Link href="/insights/articles" className="group flex flex-col gap-6 p-8 md:p-10 bg-background border-r border-border last:border-r-0 hover:bg-secondary/40 transition-colors duration-300 min-h-[240px]">
                   <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground">{item.tag}</span>
                  <h3 className="font-heading text-xl md:text-2xl font-medium leading-tight group-hover:text-primary transition-colors flex-1">{item.title}</h3>
                  <div className="flex items-center justify-between border-t border-border pt-5">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <RiArrowRightLine size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        index="07"
        title="Build The Future With Us"
        subtitle="We are always looking for visionary architects, meticulous designers, and driven professionals to join our ecosystem."
        href="/careers"
        buttonText="Open Positions"
        dark
      />

      <CTASection
        index="08"
        title="Ready to discuss your next project?"
        href="/contact"
        buttonText="Get in Touch"
      />

    </div>
  );
}
