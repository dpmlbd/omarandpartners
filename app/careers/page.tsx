"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { StatsGrid } from "@/components/ui/stats-grid";
import { CTASection } from "@/components/ui/cta-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine, RiCloseLine, RiMapPinLine, RiTimeLine, RiBriefcaseLine, RiBuildingLine, RiLightbulbLine, RiGroupLine } from "@remixicon/react";
import { jobs, tabs, type Job } from "./data";

const onpStats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "18", label: "Countries Active" },
  { value: "15+", label: "Years of Excellence" },
  { value: "97%", label: "Client Satisfaction" },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const openGmail = (jobTitle: string) => {
    const to = "careers@omarandpartners.com";
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
        <div className="container mx-auto">
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
              {["ONP", "Kolpokowsol", "Kolpoporisor", "INEX"].map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${activeTab === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground/70"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
              <div className="lg:col-span-2 relative h-[300px] md:h-[420px] rounded-2xl overflow-hidden border border-border bg-secondary/20">
                <Image src={tabs[activeTab].image} alt={tabs[activeTab].name} fill className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                   <span className="text-[10px] uppercase tracking-[0.3em] text-foreground font-medium block mb-2">{tabs[activeTab].tag}</span>
                  <h3 className="font-heading text-3xl md:text-4xl font-medium tracking-tight uppercase">{tabs[activeTab].name}</h3>
                </div>
              </div>

              <div className="flex flex-col p-8 md:p-10 rounded-2xl border border-border bg-background">
                <h4 className="font-heading text-lg font-medium uppercase tracking-tight mb-4">Culture</h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tabs[activeTab].culture}</p>
              </div>

              <div className="flex flex-col p-8 md:p-10 rounded-2xl border border-border bg-background">
                <h4 className="font-heading text-lg font-medium uppercase tracking-tight mb-4">Benefits</h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tabs[activeTab].benefits}</p>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-border bg-secondary/20">
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

          <div className="grid grid-cols-1 gap-px border border-border bg-border">
            {jobs.map((job) => (
              <ScrollReveal key={job.id}>
                <div onClick={() => setSelectedJob(job)} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-8 bg-background hover:bg-secondary/20 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] uppercase tracking-widest text-foreground font-medium">{job.division}</span>
                    <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight uppercase group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-light mt-1">
                      <span className="flex items-center gap-1.5"><RiMapPinLine size={14} />{job.location}</span>
                      <span className="flex items-center gap-1.5"><RiTimeLine size={14} />{job.type}</span>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-0 flex items-center gap-2 text-xs uppercase tracking-widest font-semibold group-hover:text-primary transition-colors">
                    View Details <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="bg-background max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-none border border-border shadow-2xl p-6 md:p-10 relative flex flex-col gap-6">
              <button onClick={() => setSelectedJob(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"><RiCloseLine size={20} /></button>

              <div className="flex flex-col gap-2 mt-4 md:mt-0 border-b border-border pb-6">
                <span className="text-xs uppercase tracking-widest text-foreground font-semibold">{selectedJob.division}</span>
                <h2 className="font-heading text-2xl md:text-4xl font-semibold uppercase tracking-tight">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-6 text-xs text-muted-foreground font-light mt-2">
                  <span className="flex items-center gap-1.5"><RiMapPinLine size={14} />{selectedJob.location}</span>
                  <span className="flex items-center gap-1.5"><RiTimeLine size={14} />{selectedJob.type}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground">Role Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{selectedJob.desc}</p>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground">Key Requirements</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground leading-relaxed font-light flex flex-col gap-1.5">
                  {selectedJob.requirements.map((req, index) => (<li key={index}>{req}</li>))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground">Compensation &amp; Benefits</h4>
                <ul className="list-disc pl-5 text-sm text-muted-foreground leading-relaxed font-light flex flex-col gap-1.5">
                  {selectedJob.benefits.map((benefit, index) => (<li key={index}>{benefit}</li>))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-border pt-6 mt-4">
                <button onClick={() => openGmail(selectedJob.title)} className="bg-foreground text-background uppercase tracking-widest text-xs font-semibold px-8 py-4 rounded-none hover:bg-primary transition-colors flex items-center justify-center gap-2 flex-1">Apply via Gmail <RiArrowRightLine size={14} /></button>
                <button onClick={() => setSelectedJob(null)} className="border border-border text-foreground uppercase tracking-widest text-xs font-semibold px-8 py-4 rounded-none hover:bg-secondary transition-colors">Close Window</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
