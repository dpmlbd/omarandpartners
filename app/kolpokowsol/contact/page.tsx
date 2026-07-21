"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiMailLine, RiPhoneLine, RiMapPinLine, RiTimeLine, RiInstagramLine, RiLinkedinLine, RiTwitterXLine } from "@remixicon/react";

export default function KolpokowsolContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Contact</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Get in Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Reach out directly or visit our studio. For general inquiries, use the main contact page.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT DETAILS ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>

            <div className="md:col-span-5 border-l border-border pl-8 md:pl-12">
              <ScrollReveal>
                <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-4">
                     <RiMapPinLine size={20} className="text-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Studio</p>
                      <p className="text-sm text-muted-foreground">45 Studio Way, Suite B, Brooklyn, NY 11201</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <RiMailLine size={20} className="text-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Email</p>
                      <a href="mailto:studio@kolpokowsol.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">studio@kolpokowsol.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <RiPhoneLine size={20} className="text-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Phone</p>
                      <a href="tel:+15551234569" className="text-sm text-muted-foreground hover:text-primary transition-colors">+1 (555) 123-4569</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <RiTimeLine size={20} className="text-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground uppercase tracking-widest text-[10px] mb-1">Hours</p>
                      <p className="text-sm text-muted-foreground">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                      <p className="text-sm text-muted-foreground">Saturday – Sunday: Closed</p>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Follow Us</span>
                    <div className="flex gap-3">
                      <a href="#" className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                        <RiInstagramLine size={16} />
                      </a>
                      <a href="#" className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                        <RiLinkedinLine size={16} />
                      </a>
                      <a href="#" className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
                        <RiTwitterXLine size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5 border-l border-border pl-8 md:pl-12">
              <ScrollReveal delay={0.2}>
                <div className="relative w-full h-[300px] md:h-[400px] border border-border overflow-hidden grayscale contrast-[1.1]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.4284897092305!2d-73.98762742341774!3d40.75122177138767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Kolpokowsol Studio"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── REDIRECT CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-secondary/10">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-4xl font-light leading-snug tracking-tight mb-4">
                  Prefer to use the general inquiry form?
                </h2>
                <p className="text-muted-foreground text-sm max-w-lg">
                  Submit your request through our main contact page and our team will route it to the appropriate division.
                </p>
              </ScrollReveal>
            </div>
            <div className="md:col-span-2 flex justify-start md:justify-end">
              <ScrollReveal delay={0.2}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 border border-foreground text-foreground px-6 py-4 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300 group"
                >
                  Main Contact <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
