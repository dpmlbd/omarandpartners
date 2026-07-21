"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";

export default function RequestConsultationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Consultation</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Start a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Tell us about your space. Our design team will respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground hidden md:block">Form</span>
            </div>

            <div className="md:col-span-6">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Name</label>
                      <input
                        type="text"
                        required
                        className="bg-transparent border-b border-border pb-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</label>
                      <input
                        type="email"
                        required
                        className="bg-transparent border-b border-border pb-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Project Type</label>
                    <select className="bg-transparent border-b border-border pb-3 text-sm focus:outline-none focus:border-primary transition-colors">
                      <option value="">Select a project type</option>
                      <option>Residential</option>
                      <option>Hospitality</option>
                      <option>Corporate</option>
                      <option>Retail</option>
                      <option>Wellness</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Message</label>
                    <textarea
                      rows={5}
                      required
                      className="bg-transparent border-b border-border pb-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Briefly describe your space and vision..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-xs uppercase tracking-widest hover:bg-primary transition-colors duration-300 w-full sm:w-auto justify-center"
                  >
                    {submitted ? "Request Sent" : "Submit Request"}
                    {!submitted && <RiArrowRightLine size={14} />}
                  </button>
                </form>
              </ScrollReveal>
            </div>

            <div className="md:col-span-4 border-l border-border pl-8 md:pl-12">
              <ScrollReveal delay={0.2}>
                <h3 className="font-heading text-xl font-medium uppercase tracking-tight mb-4">What Happens Next</h3>
                <div className="flex flex-col gap-6 text-sm font-light text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <span className="text-primary font-mono text-xs">01</span>
                    <p>We review your brief and match you with the right lead designer.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-primary font-mono text-xs">02</span>
                    <p>A discovery call is scheduled to discuss space, atmosphere, and budget.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-primary font-mono text-xs">03</span>
                    <p>We prepare a tailored proposal with design direction and fee structure.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
