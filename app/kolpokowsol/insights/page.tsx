"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const insights = [
  { tag: "Article", title: "The Poetry of Interior Light", date: "Oct 12, 2026", image: "/images/interior.png" },
  { tag: "News", title: "Kolpokowsol Wins Hospitality Design Award", date: "Sep 28, 2026", image: "/images/materials.png" },
  { tag: "Press Release", title: "New York Penthouse Project Unveiled", date: "Sep 15, 2026", image: "/images/interior.png" },
  { tag: "Article", title: "Material Honesty: Why Less is More", date: "Aug 30, 2026", image: "/images/materials.png" },
];

export default function InsightsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Insights</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Latest Thinking
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Perspectives on interior design, material culture, and the art of spatial storytelling.
          </motion.p>
        </div>
      </section>

      {/* ── INSIGHTS LIST ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
            <div className="md:col-span-2 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-8">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Articles &amp; News</h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
            {insights.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <Link
                  href="/insights/articles"
                  className="group flex flex-col gap-4 p-6 md:p-8 bg-background border-r border-border last:border-r-0 hover:bg-secondary/40 transition-colors duration-300 min-h-[200px]"
                >
                  <div className="relative aspect-video overflow-hidden bg-secondary mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">{item.tag}</span>
                  <h3 className="font-heading text-lg md:text-xl font-medium leading-tight group-hover:text-primary transition-colors flex-1">{item.title}</h3>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <RiArrowRightLine size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
