"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";

const team = [
  { name: "Lena M.", role: "Creative Director", image: "/images/interior.png" },
  { name: "David R.", role: "Senior Interior Designer", image: "/images/materials.png" },
  { name: "Aiko T.", role: "Materials Specialist", image: "/images/interior.png" },
  { name: "Marco V.", role: "Lighting Designer", image: "/images/materials.png" },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Team</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            The Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            The designers, curators, and material specialists behind every interior we deliver.
          </motion.p>
        </div>
      </section>

      {/* ── TEAM GRID ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Our People</h2>
                <p className="mt-3 text-muted-foreground text-sm max-w-lg">A multidisciplinary studio united by a passion for atmosphere and detail.</p>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border">
            {team.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group flex flex-col bg-background hover:bg-secondary/20 transition-colors duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 border-t border-border">
                    <h3 className="font-heading text-lg font-medium uppercase tracking-tight">{member.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
