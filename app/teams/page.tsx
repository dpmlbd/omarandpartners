"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamGroup {
  company: string;
  slug: string;
  accentColor: string;
  description: string;
  members: TeamMember[];
}

const teamGroups: TeamGroup[] = [
  {
    company: "Leadership",
    slug: "leadership",
    accentColor: "#059669",
    description: "The founders and executives shaping the vision of Omar & Partners.",
    members: [
      { name: "Omar Al-Rashid", role: "Founder & CEO", image: "/images/architecture.png" },
      { name: "Layla Mansour", role: "Chief Design Officer", image: "/images/interior.png" },
      { name: "Nasser Hoque", role: "Managing Director, INEX", image: "/images/materials.png" },
      { name: "Sara Chowdhury", role: "Head of Architecture", image: "/images/hero_architecture.png" },
    ],
  },
  {
    company: "Kolpoporisor",
    slug: "kolpoporisor",
    accentColor: "#059669",
    description: "The architects and engineers behind every structure we create.",
    members: [
      { name: "Omar H.", role: "Founding Partner", image: "/images/hero_architecture.png" },
      { name: "Sarah M.", role: "Design Director", image: "/images/architecture.png" },
      { name: "James L.", role: "Technical Director", image: "/images/interior.png" },
      { name: "Aisha K.", role: "Project Lead", image: "/images/materials.png" },
    ],
  },
  {
    company: "Kolpokowsol",
    slug: "kolpokowsol",
    accentColor: "#059669",
    description: "The designers, curators, and material specialists who shape every interior.",
    members: [
      { name: "Lena M.", role: "Creative Director", image: "/images/interior.png" },
      { name: "David R.", role: "Senior Interior Designer", image: "/images/materials.png" },
      { name: "Aiko T.", role: "Materials Specialist", image: "/images/interior.png" },
      { name: "Marco V.", role: "Lighting Designer", image: "/images/materials.png" },
    ],
  },
];

export default function TeamsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const activeGroup = teamGroups[activeTab];

  return (
    <div className="flex flex-col w-full">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Our People</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Meet the Teams
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            The architects, designers, engineers, and specialists who bring our vision to life across every company in the ecosystem.
          </motion.p>
        </div>
      </section>

      {/* ── TAB BAR ──────────────────────────────────────────────────── */}
      <section className="sticky top-24 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="flex items-center gap-0 h-14 overflow-x-auto">
            {teamGroups.map((group, i) => (
              <button
                key={group.slug}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "relative px-5 py-2 text-xs uppercase tracking-widest transition-colors duration-300 whitespace-nowrap",
                  i === activeTab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {group.company}
                {i === activeTab && (
                  <motion.span
                    layoutId="teams-tab-indicator"
                    className="absolute bottom-0 left-5 right-5 h-[2px]"
                    style={{ backgroundColor: group.accentColor }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Group header */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
                <div className="md:col-span-2 flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                    0{activeTab + 1}
                  </span>
                  <span
                    className="w-[1px] h-12"
                    style={{ backgroundColor: activeGroup.accentColor }}
                  />
                </div>
                <div className="md:col-span-8">
                  <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">
                    {activeGroup.company}
                  </h2>
                  <p className="mt-3 text-muted-foreground text-sm max-w-lg">
                    {activeGroup.description}
                  </p>
                </div>
              </div>

              {/* Members grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border border-border">
                {activeGroup.members.map((member, i) => (
                  <ScrollReveal key={`${activeTab}-${i}`} delay={i * 0.1}>
                    <div className="group flex flex-col bg-background hover:bg-secondary/20 transition-colors duration-300">
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        {/* Accent bar on hover */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                          style={{ backgroundColor: activeGroup.accentColor }}
                        />
                      </div>
                      <div className="p-6 border-t border-border">
                        <h3 className="font-heading text-lg font-medium uppercase tracking-tight">
                          {member.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
