"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "01",
    title: "Urban Master Planning",
    desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm. We shape the framework within which buildings and communities thrive.",
    image: "/images/architecture.png",
  },
  {
    id: "02",
    title: "Monumental Structures",
    desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty. Every proportion is considered.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "03",
    title: "Sustainable Design",
    desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision. Performance and poetry are not opposites.",
    image: "/images/architecture.png",
  },
  {
    id: "04",
    title: "BIM & Digital Twin",
    desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination across disciplines.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "05",
    title: "Construction Administration",
    desc: "On-site representation and rigorous documentation to protect design intent through the build process.",
    image: "/images/architecture.png",
  },
  {
    id: "06",
    title: "Heritage & Adaptive Reuse",
    desc: "Sensitive interventions that honor historical fabric while enabling new programming and extended lifespan.",
    image: "/images/hero_architecture.png",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Services</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Full-Spectrum<br />Architecture
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            From concept to completion, we deliver architectural services with precision and creative ambition. Each discipline is handled by specialists who share the same standard of excellence.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES LIST ────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="flex flex-col">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 0.1}>
                <div className={cn(
                  "group flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 py-10 md:py-14 border-b border-border last:border-b-0 hover:bg-secondary/10 transition-colors duration-500",
                  i % 2 === 0 ? "" : "md:flex-row-reverse"
                )}>
                  {/* Number */}
                  <div className="md:w-16 shrink-0">
                    <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{svc.id}</span>
                  </div>

                  {/* Image */}
                  <div className="w-full md:w-64 shrink-0 relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight uppercase mb-4 group-hover:text-primary transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-2xl">
                      {svc.desc}
                    </p>
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
