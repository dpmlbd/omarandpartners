"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { RiBuilding4Line, RiBrushLine, RiStackLine, RiArrowRightLine } from "@remixicon/react";

const companies = [
  {
    id: "01",
    name: "Kolpoporisor",
    tagline: "Architecture",
    desc: "Monumental structures, urban master-planning, and sustainable design that reshapes skylines.",
    stats: [{ value: "50+", label: "Projects" }, { value: "12", label: "Countries" }],
    icon: <RiBuilding4Line size={20} />,
    href: "/kolpoporisor",
    image: "/images/architecture.png",
    color: "from-neutral-900 to-neutral-800",
  },
  {
    id: "02",
    name: "Kolpokowsol",
    tagline: "Interior Design",
    desc: "Transforming built shells into extraordinary human environments through material, light, and spatial narrative.",
    stats: [{ value: "80+", label: "Interiors" }, { value: "5★", label: "Rating" }],
    icon: <RiBrushLine size={20} />,
    href: "/kolpokowsol",
    image: "/images/interior.png",
    color: "from-stone-900 to-stone-800",
  },
  {
    id: "03",
    name: "INEX",
    tagline: "Materials",
    desc: "A global sourcing and engineering network delivering the finest building materials for uncompromising quality.",
    stats: [{ value: "200+", label: "Materials" }, { value: "30+", label: "Brands" }],
    icon: <RiStackLine size={20} />,
    href: "/inex",
    image: "/images/materials.png",
    color: "from-zinc-900 to-zinc-800",
  },
];

export function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="w-full mt-16">
      {/* ONP Hub */}
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          <div className="border border-foreground/20 bg-foreground text-background px-12 py-5 flex flex-col items-center gap-1 shadow-2xl">
            <span className="text-[10px] uppercase tracking-[0.35em] text-background/50">Holding</span>
            <span className="font-heading text-2xl font-semibold uppercase tracking-tighter">Omar &amp; Partners</span>
          </div>
          {/* Vertical line down */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="w-[1px] h-12 bg-border mt-0"
          />
        </motion.div>
      </div>

      {/* Horizontal connector */}
      <div className="relative flex justify-center mb-0 px-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9, ease: "easeInOut" }}
          style={{ originX: 0.5 }}
          className="absolute top-0 left-[calc(16.67%+1px)] right-[calc(16.67%+1px)] h-[1px] bg-border"
        />
        {/* Three drop lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.3 + i * 0.1, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="w-[1px] h-10 bg-border flex-1"
          />
        ))}
      </div>

      {/* Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
        {companies.map((co, i) => (
          <motion.div
            key={co.id}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-background border-r border-border last:border-r-0 flex flex-col overflow-hidden"
          >
            {/* Image area */}
            <div className="relative aspect-video overflow-hidden bg-secondary">
              <Image
                src={co.image}
                alt={co.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              {/* Company ID overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="font-mono text-xs text-white/50">{co.id}</span>
              </div>
              {/* Icon */}
              <div className="absolute bottom-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                {co.icon}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-4 border-t border-border">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{co.tagline}</span>
                <h3 className="font-heading text-2xl font-medium tracking-tight mt-1 uppercase">{co.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{co.desc}</p>

              {/* Stats */}
              <div className="flex gap-6 border-t border-border/50 pt-4">
                {co.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-heading text-2xl font-semibold text-foreground">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={co.href}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-foreground hover:text-primary transition-colors mt-2 group/link"
              >
                Explore <RiArrowRightLine size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
