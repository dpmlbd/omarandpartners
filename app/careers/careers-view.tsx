"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { StatsGrid } from "@/components/ui/stats-grid";
import { CTASection } from "@/components/ui/cta-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiArrowRightLine,
  RiMapPinLine,
  RiTimeLine,
  RiBriefcaseLine,
  RiArrowDownSLine,
  RiCheckLine,
  RiMailLine,
} from "@remixicon/react";
import { jobs as defaultJobs, tabs, onpStats, type Job } from "@/static-data/careers";

interface CareersViewProps {
  initialJobs?: Job[];
}

export function CareersView({ initialJobs = defaultJobs }: CareersViewProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const toggleJob = (id: string) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  const openGmail = (jobTitle: string, email?: string) => {
    const to = email || "info@onp-bd.com";
    const subject = encodeURIComponent(`Application for ${jobTitle} - [Your Name]`);
    const body = encodeURIComponent(
      `Dear Recruiting Team,\n\nI am writing to express my interest in the ${jobTitle} position at Omar & Partners.\n\nPlease find attached my Resume and Portfolio for your review.\n\nBest regards,\n[Your Name]\n[Your Contact Number]\n[Portfolio Link / LinkedIn Link]`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* Hero */}
      <section className="bg-foreground text-background px-8 md:px-14 pt-32 pb-16 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Careers</span>
          </div>
          <h1 className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Build the<br />Future
          </h1>
          <p className="mt-6 text-background/50 text-sm font-light max-w-md">We are constantly seeking visionary designers, rigorous planners, and logistics experts to fuel the growth of our interdisciplinary holding group.</p>
        </div>
      </section>

      <section id="life" className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="01" title="Life at ONP" subtitle="Explore the culture, benefits, and daily experiences across our divisions." />

          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-1 mb-12 md:mb-16 overflow-x-auto pb-2">
              {["ONP", "Kolpokowsol", "Kolpoporishor", "INEX"].map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${activeTab === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/70"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
              <div className="lg:col-span-2 relative h-[300px] md:h-[420px] overflow-hidden border border-border bg-secondary/20">
                <Image
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-foreground font-medium block mb-2">{tabs[activeTab].tag}</span>
                  <h3 className="font-heading text-3xl md:text-4xl font-medium tracking-tight uppercase">{tabs[activeTab].name}</h3>
                </div>
              </div>

              <div className="flex flex-col p-8 md:p-10 border border-border bg-background">
                <h4 className="font-heading text-lg font-medium uppercase tracking-tight mb-4">Culture</h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tabs[activeTab].culture}</p>
              </div>

              <div className="flex flex-col p-8 md:p-10 border border-border bg-background">
                <h4 className="font-heading text-lg font-medium uppercase tracking-tight mb-4">Benefits</h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tabs[activeTab].benefits}</p>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-between p-8 md:p-10 border border-border bg-secondary/20">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium block mb-4">Philosophy</span>
                  <p className="font-heading text-xl md:text-2xl font-medium tracking-tight leading-snug">"{tabs[activeTab].quote}"</p>
                </div>
                <p className="text-muted-foreground text-xs mt-6">— {tabs[activeTab].quoteAuthor}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section id="positions" className="py-24 md:py-36 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="Open Positions" subtitle="Find your fit within our multi-disciplinary holding ecosystem." />

          {initialJobs.length === 0 ? (
            <div className="border border-border p-16 md:p-24 bg-background text-center flex flex-col items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-semibold mb-3">
                Current Opportunities
              </span>
              <h3 className="font-heading text-3xl md:text-5xl font-semibold uppercase tracking-tight text-foreground">
                Stay Tuned
              </h3>
              <p className="text-muted-foreground text-sm max-w-lg mt-4 font-light leading-relaxed">
                There are currently no open positions listed. We are continually growing our architectural, interior, and procurement teams. Please check back soon or send your speculative CV and portfolio to{" "}
                <a
                  href="mailto:info@onp-bd.com"
                  className="text-foreground hover:text-primary transition-colors underline underline-offset-4 font-normal"
                >
                  info@onp-bd.com
                </a>.
              </p>
            </div>
          ) : (
            <div className="border border-border bg-background divide-y divide-border shadow-sm">
              {initialJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <ScrollReveal key={job.id}>
                    <div className="transition-colors">
                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => toggleJob(job.id)}
                        aria-expanded={isExpanded}
                        className="w-full text-left p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-secondary/20 transition-all duration-300 group focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">
                              {job.division}
                            </span>
                            {job.experience && (
                              <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 font-medium bg-secondary text-secondary-foreground border border-border">
                                {job.experience}
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight uppercase group-hover:text-primary transition-colors">
                            {job.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-light">
                            <span className="flex items-center gap-1.5">
                              <RiMapPinLine size={14} className="text-primary/70" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <RiTimeLine size={14} className="text-primary/70" />
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                            {isExpanded ? "Hide Details" : "View Details"}
                          </span>
                          <div
                            className={`w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300 ${
                              isExpanded
                                ? "rotate-180 bg-foreground text-background border-foreground"
                                : "group-hover:border-primary group-hover:text-primary"
                            }`}
                          >
                            <RiArrowDownSLine size={18} />
                          </div>
                        </div>
                      </button>

                      {/* Accordion Expandable Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            key={`accordion-${job.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-10 pt-2 border-t border-border/60 bg-secondary/[0.04] flex flex-col gap-8">
                              {/* Role Description */}
                              <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">
                                  Role Overview
                                </span>
                                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                                  {job.desc}
                                </p>
                              </div>

                              {/* Two Columns: Requirements & Benefits */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Requirements */}
                                <div className="flex flex-col gap-3 p-6 border border-border bg-background">
                                  <span className="text-[11px] uppercase font-mono tracking-widest text-foreground font-semibold flex items-center gap-2">
                                    <RiBriefcaseLine size={14} className="text-primary" /> Key Requirements
                                  </span>
                                  <ul className="text-xs text-muted-foreground leading-relaxed font-light flex flex-col gap-2.5">
                                    {job.requirements.map((req, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Benefits */}
                                <div className="flex flex-col gap-3 p-6 border border-border bg-background">
                                  <span className="text-[11px] uppercase font-mono tracking-widest text-foreground font-semibold flex items-center gap-2">
                                    <RiCheckLine size={14} className="text-primary" /> Compensation &amp; Benefits
                                  </span>
                                  <ul className="text-xs text-muted-foreground leading-relaxed font-light flex flex-col gap-2.5">
                                    {job.benefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="text-primary mt-0.5">•</span>
                                        <span>{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* Application Action Bar */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border pt-6 mt-2">
                                <div className="text-xs text-muted-foreground font-light">
                                  Questions or speculative portfolios:{" "}
                                  <a
                                    href={`mailto:${job.applicationEmail || "info@onp-bd.com"}`}
                                    className="text-foreground hover:text-primary transition-colors font-medium underline underline-offset-4"
                                  >
                                    {job.applicationEmail || "info@onp-bd.com"}
                                  </a>
                                </div>

                                <div className="flex items-center">
                                  <button
                                    type="button"
                                    onClick={() => openGmail(job.title, job.applicationEmail)}
                                    className="bg-foreground text-background uppercase tracking-widest text-xs font-semibold px-6 py-3 hover:bg-primary transition-colors flex items-center justify-center gap-2"
                                  >
                                    Apply via Gmail <RiArrowRightLine size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
