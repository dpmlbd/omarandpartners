"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiBuilding4Line,
  RiBrushLine,
  RiStackLine,
  RiBriefcaseLine,
} from "@remixicon/react";

const services = [
  {
    id: "01",
    type: "stat",
    value: "50+",
    label: "Projects Delivered",
    span: "md:col-span-1",
  },
  {
    id: "02",
    type: "image",
    image: "/images/architecture.png",
    label: "Architecture",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "03",
    type: "service",
    icon: <RiBrushLine size={22} />,
    title: "Interior Design",
    company: "Kolpokowsol",
    desc: "Transforming built shells into extraordinary human environments through material, light, and spatial narrative.",
    span: "md:col-span-1",
  },
  {
    id: "04",
    type: "stat",
    value: "200+",
    label: "Materials Sourced",
    span: "md:col-span-1",
  },
  {
    id: "05",
    type: "service",
    icon: <RiStackLine size={22} />,
    title: "Materials",
    company: "INEX",
    desc: "A global sourcing and engineering network delivering the finest building materials for uncompromising quality.",
    span: "md:col-span-1",
  },
  {
    id: "06",
    type: "image",
    image: "/images/interior.png",
    label: "Interiors",
    span: "md:col-span-1",
  },
  {
    id: "07",
    type: "service",
    icon: <RiBriefcaseLine size={22} />,
    title: "Consultation",
    company: "ONP Holding",
    desc: "Strategic advisory for complex developments spanning feasibility, design governance, and procurement strategy.",
    span: "md:col-span-1",
  },
  {
    id: "08",
    type: "image",
    image: "/images/materials.png",
    label: "Materials",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    id: "09",
    type: "stat",
    value: "18",
    label: "Countries",
    span: "md:col-span-1",
  },
] as const;

type ServiceItem = (typeof services)[number];

export function ServicesOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="w-full relative">
      {/* Background text behind middle column */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
        <span className="font-heading text-[8rem] font-bold text-border/30 uppercase tracking-tighter whitespace-nowrap">
          Services
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px] relative z-10">
        {services.map((svc, i) => (
          <ScrollReveal key={svc.id} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`group relative overflow-hidden rounded-[24px] border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-500 ${svc.span}`}
            >
              {svc.type === "image" && svc.image && (
                <div className="absolute inset-0">
                  <Image
                    src={svc.image}
                    alt={svc.label}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-medium">
                      {svc.label}
                    </span>
                  </div>
                </div>
              )}

              {svc.type === "stat" && (
                <div className="h-full flex flex-col justify-center p-6 md:p-8">
                  <span className="font-heading text-5xl md:text-6xl font-semibold text-foreground leading-none">
                    {svc.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-3">
                    {svc.label}
                  </span>
                </div>
              )}

              {svc.type === "service" && (
                <div className="h-full flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                      {svc.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium block">
                        {svc.company}
                      </span>
                      <h3 className="font-heading text-lg font-medium uppercase tracking-tight">
                        {svc.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {svc.desc}
                  </p>
                </div>
              )}
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
