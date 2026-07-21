"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { StatsGrid } from "@/components/ui/stats-grid";
import { RiAwardLine } from "@remixicon/react";

interface AwardItem {
  year: string;
  name: string;
  body: string;
}

interface AwardsShowcaseProps {
  featuredAward: {
    year: string;
    name: string;
    body: string;
    desc: string;
  };
  awards: AwardItem[];
  awardStats: { value: string; label: string }[];
}

export function AwardsShowcase({ featuredAward, awards, awardStats }: AwardsShowcaseProps) {
  return (
    <>
      <ScrollReveal>
        <div className="group relative overflow-hidden rounded-2xl border border-border bg-foreground text-background p-10 md:p-16 mb-5 hover:border-primary/50 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
               <div className="w-12 h-12 border border-border flex items-center justify-center text-foreground shrink-0 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                <RiAwardLine size={24} />
              </div>
              <div>
                 <span className="text-[10px] uppercase tracking-[0.3em] text-foreground font-medium block mb-2">2024 — International</span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-2">{featuredAward.name}</h3>
                <p className="text-background/50 text-sm font-light leading-relaxed max-w-xl">{featuredAward.desc}</p>
              </div>
            </div>
             <span className="font-mono text-6xl md:text-7xl font-bold text-background/10 group-hover:text-foreground/10 transition-colors duration-500 shrink-0">01</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {awards.map((award, i) => {
          const isLarge = i === 0;
          return (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className={`group relative flex flex-col gap-5 p-8 bg-background border border-border rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-500 min-h-[240px] ${isLarge ? "md:col-span-2" : ""}`}>
                <div className="flex items-start justify-between">
                   <div className="w-10 h-10 border border-border flex items-center justify-center text-foreground group-hover:border-primary group-hover:text-primary transition-all duration-300 shrink-0">
                    <RiAwardLine size={18} />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{award.year}</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <h4 className="font-heading text-lg font-medium tracking-tight group-hover:text-primary transition-colors">{award.name}</h4>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-widest">{award.body}</span>
                </div>
                <span className="font-mono text-[10px] text-border mt-auto">0{i + 2}</span>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <StatsGrid items={awardStats} className="mt-5" />
    </>
  );
}
