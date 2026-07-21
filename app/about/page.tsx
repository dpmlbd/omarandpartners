"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { HeroSection } from "@/components/ui/hero-section";
import { SectionHeader } from "@/components/ui/section-header";
import { StatsGrid } from "@/components/ui/stats-grid";
import { FeatureCard } from "@/components/ui/feature-card";
import { CTASection } from "@/components/ui/cta-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AwardsShowcase } from "@/components/ui/awards-showcase";
import {
  RiArrowRightLine,
  RiArrowDownLine,
} from "@remixicon/react";
import { stats, leadership, coreValues, timeline, awards, partners, awardStats } from "./data";

export default function AboutPage() {
  const heroStatsOverlay = (
    <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4 z-10">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 p-4"
        >
          <span className="font-heading text-2xl md:text-3xl font-semibold text-white block leading-none">{s.value}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/50 mt-1 block">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );

  const scrollCue = (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
      className="absolute top-8 right-8 z-10 flex flex-col items-center gap-1 text-white/40"
    >
      <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <RiArrowDownLine size={12} />
      </motion.div>
    </motion.div>
  );

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Leadership", href: "#leadership" },
    { label: "Mission & Vision", href: "#mission" },
    { label: "Values", href: "#values" },
    { label: "Timeline", href: "#timeline" },
    { label: "Awards", href: "#awards" },
    { label: "Partners", href: "#partners" },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">

      <HeroSection
        tagline="Company Profile"
        title={["About", "ONP"]}
        subtitle="Fifteen years of shaping built environments with vision, craft, and an uncompromising commitment to excellence."
        rightPanelImage={{ src: "/images/about_hero.png", alt: "ONP Studio", priority: true, overlay: true }}
        rightPanelOverlay={
          <>
            {heroStatsOverlay}
            {scrollCue}
          </>
        }
      />

      <section id="overview" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">Overview</span>
            </div>
            <div className="md:col-span-4">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tighter uppercase mb-6">
                  Company<br />Overview
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Omar &amp; Partners (ONP) is a multi-disciplinary architecture and design holding group. Founded in 2010, we have grown from a boutique consultancy into a powerhouse ecosystem of three specialized companies.
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-6 border-l border-border pl-8 md:pl-12 flex flex-col gap-8">
              <ScrollReveal delay={0.2}>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our model is unique: by keeping architecture (Kolpoporisor), interior design (Kolpokowsol), and material sourcing (INEX) under a single parent, we offer clients an integrated service that eliminates fragmentation and maintains absolute quality control from concept to completion.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Today, we operate across 18 countries, with a portfolio spanning monumental civic buildings, luxury residences, corporate headquarters, hospitality projects, and premium material supply chains.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="py-24 md:py-36 border-b border-border scroll-mt-24 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Leadership" subtitle="The minds and hands that shape the future of Omar &amp; Partners." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {leadership.map((person, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col md:flex-row bg-background border-r border-border last:border-r-0 overflow-hidden hover:bg-secondary/20 transition-colors duration-300">
                  <div className="relative w-full md:w-48 shrink-0 aspect-square md:aspect-auto overflow-hidden bg-secondary">
                    <Image src={person.image} alt={person.name} fill className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" />
                    <div className="absolute top-3 left-3 font-mono text-[10px] text-white/60">{person.tag}</div>
                  </div>
                  <div className="flex flex-col justify-between p-6 md:p-8 flex-1 border-t md:border-t-0 md:border-l border-border">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-foreground font-medium block mb-2">{person.role}</span>
                      <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mb-4">{person.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{person.bio}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      <RiArrowRightLine size={13} /> Profile
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="mission" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Mission &amp; Vision" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            <ScrollReveal>
              <div className="flex flex-col gap-8 p-10 md:p-16 bg-foreground text-background">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Mission</span>
                </div>
                <p className="font-heading text-2xl md:text-3xl font-light leading-snug tracking-tight">
                   To deliver world-class architectural and design solutions that <span className="text-foreground font-medium">elevate human experience</span> while honoring context, culture, and the planet.
                </p>
                <div className="border-t border-background/10 pt-8 text-background/50 text-sm font-light leading-relaxed">
                  We accomplish this by uniting three specialized disciplines under a shared philosophy — ensuring that every project we touch reflects integrity, beauty, and purpose from the ground up.
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-8 p-10 md:p-16 bg-background border-l border-border">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Vision</span>
                </div>
                <p className="font-heading text-2xl md:text-3xl font-light leading-snug tracking-tight">
                   To be the most trusted name in <span className="text-foreground font-medium">integrated spatial design</span> — recognized globally for transforming visions into enduring realities.
                </p>
                <div className="border-t border-border pt-8 text-muted-foreground text-sm font-light leading-relaxed">
                  We envision a future where every built environment is a testament to the harmony between human creativity and natural systems — designed to last generations.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="values" className="py-24 md:py-36 border-b border-border scroll-mt-24 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Core Values" subtitle="The principles that guide every decision, every design, every relationship." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {coreValues.map((v, i) => (
              <FeatureCard
                key={i}
                icon={v.icon}
                title={v.title}
                description={v.desc}
                className="border border-border"
                footer={<span className="font-mono text-[10px] text-border mt-auto">0{i + 1}</span>}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="timeline" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="05" title="Timeline" subtitle="A journey spanning fifteen years of building, growing, and transforming." />

          <div className="relative ml-2 md:ml-[calc(16.66%+2rem)]">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border" />
            <div className="flex flex-col">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative flex gap-8 md:gap-16 pb-12 group">
                    <div className="absolute -left-[5px] top-1 w-[10px] h-[10px] border-2 border-border bg-background group-hover:border-primary group-hover:bg-primary transition-all duration-300 z-10" />
                    <div className="w-20 md:w-28 pl-6 shrink-0">
                       <span className="font-mono text-xs text-foreground font-medium">{item.year}</span>
                    </div>
                    <div className="flex-1 pb-12 border-b border-border/30 last:border-0">
                      <h4 className="font-heading text-xl font-medium tracking-tight uppercase mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="06" title="Awards &amp;<br />Certifications" subtitle="Recognition from the industry's most respected institutions." />

          <AwardsShowcase
            featuredAward={{
              year: "2024",
              name: "Aga Khan Award for Architecture",
              body: "International — Architecture",
              desc: "Recognized for outstanding architectural innovation and cultural sensitivity in our social housing project in Dhaka.",
            }}
            awards={awards.slice(1)}
            awardStats={awardStats}
          />
        </div>
      </section>

      <section id="partners" className="py-24 md:py-36 scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="07" title="Partners" subtitle="Global collaborators and strategic partners who share our commitment to excellence." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border">
            {partners.map((partner, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="group flex items-center justify-center p-10 bg-background border-r border-border hover:bg-secondary/30 transition-colors duration-300 min-h-[120px]">
                  <span className="font-heading text-base md:text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors tracking-tight text-center">{partner}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <CTASection
            title="Become a Partner"
            subtitle="We are always open to forming new strategic alliances with organizations that share our values of excellence and innovation."
            href="/contact"
            buttonText="Get in Touch"
          />
        </div>
      </section>

    </div>
  );
}
