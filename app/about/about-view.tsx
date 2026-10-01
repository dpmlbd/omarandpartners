"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AwardsShowcase } from "@/components/ui/awards-showcase";
import { timeline, awards, partners, awardStats } from "@/static-data/about";
import type { Leader } from "@/lib/public/leadership";
import { getLeadershipAction } from "@/lib/actions/leadership";
import { siteConfig } from "@/config/site";

const compHolding = siteConfig.companies[0];
const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export function AboutView() {
  const [leadership, setLeadership] = useState<Leader[]>([]);
  const [isLoadingLeadership, setIsLoadingLeadership] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadLeadership() {
      try {
        const data = await getLeadershipAction();
        if (mounted && data) {
          setLeadership(data);
        }
      } catch (err) {
        console.error("Failed to load leadership from backend:", err);
      } finally {
        if (mounted) setIsLoadingLeadership(false);
      }
    }
    loadLeadership();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── ABOUT HERO — Fade-into-background image ──────────────── */}
      <section className="relative w-full h-[calc(100dvh-5rem)] max-h-[1000px] bg-background overflow-hidden">

        {/* Full-bleed hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/architecture.png"
            alt="ONP Studio — Architecture & Design"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Dark overlay for text contrast — same approach as landing page */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-[1]" />

        {/* Bottom fade — dissolves into page background for seamless section blend */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 40%, var(--background) 100%)" }}
        />

        {/* Centered text content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">
              Est. 2015
            </span>
            <span className="w-8 h-[1px] bg-primary" />
          </motion.div>

          {/* Main heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-bold leading-[1.05] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Shaping Spaces,<br />
              Inspiring Lives
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-black dark:text-white text-sm md:text-[15px] font-light leading-relaxed max-w-lg mt-5"
          >
            Over a decade of crafting built environments with vision, precision, and an uncompromising commitment to excellence.
          </motion.p>
        </div>

      </section>

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
                  {compHolding?.name || "Omar & Partners"} (ONP) is a multi-disciplinary {compHolding?.description?.toLowerCase() || "holding company"}. Founded in 2015, we have grown into a powerhouse ecosystem of specialized subsidiaries.
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-6 border-l border-border pl-8 md:pl-12 flex flex-col gap-8">
              <ScrollReveal delay={0.2}>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our model is unique: by keeping {comp1?.name} ({comp1?.description}), {comp2?.name} ({comp2?.description}), and {comp3?.name} ({comp3?.description}) under a single parent, we offer clients an integrated service that eliminates fragmentation and maintains absolute quality control from concept to completion.
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

          {isLoadingLeadership ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 bg-background/50 animate-pulse border-r border-border last:border-r-0" />
              ))}
            </div>
          ) : leadership.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
              {leadership.map((person, i) => (
                <ScrollReveal key={person.id || person.name || i} delay={i * 0.1}>
                  <div className="group flex flex-col md:flex-row bg-background border-r border-border last:border-r-0 overflow-hidden hover:bg-secondary/20 transition-colors duration-300">
                    <div className="relative w-full md:w-48 shrink-0 aspect-square md:aspect-auto overflow-hidden bg-secondary">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 192px"
                        className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                      />
                      <div className="absolute top-3 left-3 font-mono text-[10px] text-white/60">{person.tag}</div>
                    </div>
                    <div className="flex flex-col justify-center p-6 md:p-8 flex-1 border-t md:border-t-0 md:border-l border-border">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-foreground font-medium block mb-2">{person.role}</span>
                        <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mb-4">{person.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{person.bio}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── VOICES FROM CEO ─────────────────────────────────────────── */}
      <section id="ceo-voices" className="relative py-24 md:py-36 border-b border-border scroll-mt-24 overflow-hidden bg-foreground text-background">
        {/* Decorative oversized quote mark */}
        <div className="absolute top-8 left-6 md:left-14 pointer-events-none select-none z-0">
          <span
            className="font-heading font-bold text-background/[0.03] leading-none block"
            style={{ fontSize: "clamp(12rem, 25vw, 32rem)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

            {/* Left — CEO Message Letter */}
            <div className="md:col-span-7 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-accent" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-background/40 font-medium">
                    Message from our CEO
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light leading-[1.25] tracking-tight text-background mb-8">
                  Building with purpose, integrity, and responsibility.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex flex-col gap-5 text-background/70 text-sm md:text-[15px] font-light leading-relaxed">
                  <p>
                    Since we started our journey back in 2015, we have been driven by a single, powerful goal: to become one of Bangladesh&apos;s most trusted partners in architectural and engineering solutions. What started as an ambitious venture with a handful of young architects and engineers has grown into a dynamo multi-disciplinary firm recognized for its dedication to excellence.
                  </p>
                  <p>
                    For us, design is about more than just aesthetics and functional perfection; it is about responsibility. We believe architecture must actively respond to the environment and add meaningful value to society. This belief shapes everything we do, from our daily design choices to major initiatives like sustainable city promenade planning.
                  </p>
                  <p>
                    As we look ahead and target a steady 10% organizational growth, our strategy is clear: we want to nurture our local creative talent, embrace advanced technologies, and eventually expand our unique services into the global market while staying true to our roots.
                  </p>
                  <p className="pt-2 text-background/90 font-normal">
                    To our clients, partners, and amazing team: thank you for trusting us and building this future together.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <div className="mt-10 pt-8 border-t border-background/10 flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-background/50 font-mono">
                      Warmly,
                    </span>
                    <span className="font-heading text-2xl md:text-3xl font-medium text-background tracking-tight mt-1">
                      Ar. Abdullah Al Omar
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-accent mt-0.5">
                      Principal Architect &amp; CEO — Omar &amp; Partners
                    </span>
                  </div>
                  <span className="hidden md:block w-20 h-[1px] bg-accent/40" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right — CEO Portrait */}
            <div className="md:col-span-5 md:col-start-8 md:sticky md:top-28">
              <ScrollReveal delay={0.2} direction="right">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/leadership/ceo.jpeg"
                    alt="Ar. Abdullah Al Omar — Principal Architect & CEO"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 500px"
                    className="object-cover"
                  />
                  {/* Warm tinted overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/80 via-[#0C0A09]/20 to-transparent mix-blend-multiply" />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/30" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/30" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORDS FROM COO ─────────────────────────────────────────── */}
      <section id="coo-words" className="relative py-24 md:py-36 border-b border-border scroll-mt-24 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

            {/* Left — COO Portrait (Clean like CEO, no text, buttons or chips) */}
            <div className="md:col-span-5 md:sticky md:top-28">
              <ScrollReveal delay={0.2} direction="left">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/leadership/coo.jpeg"
                    alt="Engr. Mohammad Mohiuddin (Ovi) — Chief Operating Officer"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 500px"
                    className="object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/30" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/30" />
                </div>
              </ScrollReveal>
            </div>

            {/* Right — COO Letter Content */}
            <div className="md:col-span-7 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-bold">
                    Words from our COO
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.25] tracking-tight uppercase text-foreground mb-8">
                  Operational Excellence &amp; Full-Lifecycle Delivery
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="flex flex-col gap-6 text-foreground/80 text-sm md:text-[15px] font-light leading-relaxed">
                  <p>
                    While strategic vision defines our organization&apos;s direction, rigorous operational excellence determines our success. At KOLPOPORISHOR &amp; KOLPOKOWSOL, we have established a highly integrated ecosystem across the core departments—Architecture, Engineering, Construction, Management Consultancy and Supply Chain—to ensure that every project is executed with meticulous precision and compliance.
                  </p>
                  <p>
                    We pride ourselves on providing a comprehensive, full-lifecycle solution for our clients. From the initial stages of complex seismic analysis and structural budgeting to advanced 3D modeling and final post-occupancy evaluations, our focus remains unyielding on reliability, safety, and technical accuracy.
                  </p>
                  <p>
                    Managing complex architectural and engineering challenges drives us to continuously sharpen our technological edge and optimize our project delivery frameworks. Ultimately, our mandate is clear: to maintain environmental stewardship and safety at the forefront of our operations while consistently exceeding client expectations. We look forward to partnering with you to bring your next landmark development to fruition.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <div className="mt-10 pt-8 border-t border-border flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
                      Best regards,
                    </span>
                    <span className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight mt-1">
                      Engr. Mohammad Mohiuddin (Ovi)
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold mt-0.5">
                      Chief Operating Officer (COO) — KOLPOPORISHOR &amp; KOLPOKOWSOL
                    </span>
                  </div>
                  <span className="hidden md:block w-20 h-[1px] bg-primary/40" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      <section id="mission" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Mission &amp; Vision" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            <ScrollReveal>
              <div className="flex flex-col gap-6 p-10 md:p-14 bg-foreground text-background h-full">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Mission</span>
                </div>
                <p className="font-heading text-xl sm:text-2xl md:text-3xl font-light leading-snug tracking-tight text-background">
                  To be Bangladesh&apos;s premier catalyst in architecture and engineering—maximizing value for clients, society, and the environment through innovative, sustainable design.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-6 p-10 md:p-14 bg-background border-l border-border h-full">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-primary" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Vision</span>
                </div>
                <p className="font-heading text-xl sm:text-2xl md:text-3xl font-light leading-snug tracking-tight text-foreground">
                  To lead the industry by fostering a highly trained, multi-disciplinary team driven by excellence. We commit to delivering superior quality, exceptional client care, and synchronized execution while keeping environmental safety at the core of everything we build.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="values" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Core Values & Strategy" subtitle="The principles and strategic direction that guide every decision." />

          <div className="flex flex-col gap-0">

            {/* ── Core Values Banner ── */}
            <ScrollReveal>
              <div className="relative bg-foreground text-background p-10 md:p-16 overflow-hidden">
                {/* Oversized decorative number */}
                <span
                  className="absolute -top-6 -right-4 md:right-6 font-heading font-bold text-background/[0.04] leading-none select-none pointer-events-none"
                  style={{ fontSize: "clamp(10rem, 20vw, 22rem)" }}
                  aria-hidden="true"
                >
                  01
                </span>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[1px] bg-primary" />
                      <span className="text-[10px] uppercase tracking-[0.35em] text-background/40 font-medium">Core Values</span>
                    </div>
                  </div>
                  <div className="md:col-span-8 flex items-center">
                    <p className="text-background/70 text-sm md:text-[15px] font-light leading-[1.9] border-l border-background/10 pl-8">
                      Our core values center on nurturing creativity and talent to deliver visionary, fresh architectural designs while maintaining absolute, client-centric excellence and reliability. By championing synergy and collaboration, we break down disciplinary walls to ensure seamless, flawless project execution. Above all, sustainability guides our practice, ensuring we design with deep environmental responsibility to thoughtfully develop our cities and country.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ── Strategy Banner ── */}
            <ScrollReveal delay={0.15}>
              <div className="relative bg-background border border-border border-t-0 p-10 md:p-16 overflow-hidden">
                {/* Oversized decorative number */}
                <span
                  className="absolute -top-6 -right-4 md:right-6 font-heading font-bold text-foreground/[0.03] leading-none select-none pointer-events-none"
                  style={{ fontSize: "clamp(10rem, 20vw, 22rem)" }}
                  aria-hidden="true"
                >
                  02
                </span>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                  <div className="md:col-span-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-[1px] bg-primary" />
                      <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-medium">Strategy</span>
                    </div>
                  </div>
                  <div className="md:col-span-8 flex items-center">
                    <p className="text-muted-foreground text-sm md:text-[15px] font-light leading-[1.9] border-l border-border pl-8">
                      Our strategy centers on driving steady organizational growth at a targeted rate of 10% annually. We achieve this by nurturing creative exercises and generating innovative ideas that expand our services into advanced global markets, while simultaneously upholding our unique identity and competitive edge in the local market to actively shape future developments.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <section id="timeline" className="py-24 md:py-36 border-b border-border scroll-mt-24">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="05" title="Timeline" subtitle="A journey spanning over a decade of building, growing, and transforming." />

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
