"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiFocus3Line,
  RiDraftLine,
  RiBuilding4Line,
  RiBrushLine,
  RiStackLine,
  RiCheckLine,
} from "@remixicon/react";

const steps = [
  {
    icon: <RiFocus3Line size={24} />,
    title: "Discovery",
    desc: "We begin by understanding your vision, site context, and project goals through immersive workshops and analysis.",
  },
  {
    icon: <RiDraftLine size={24} />,
    title: "Concept Design",
    desc: "Our architects translate insights into bold spatial concepts, exploring form, materiality, and light.",
  },
  {
    icon: <RiBuilding4Line size={24} />,
    title: "Development",
    desc: "Detailed technical drawings, structural coordination, and regulatory compliance are meticulously resolved.",
  },
  {
    icon: <RiBrushLine size={24} />,
    title: "Interior Curation",
    desc: "Kolpokowsol refines every interior layer — from custom furniture to material palettes and lighting schemes.",
  },
  {
    icon: <RiStackLine size={24} />,
    title: "Material Sourcing",
    desc: "INEX procures and quality-assures every finish, fixture, and fitting from our global supplier network.",
  },
  {
    icon: <RiCheckLine size={24} />,
    title: "Delivery",
    desc: "Final coordination, site supervision, and handover ensure the built result matches the original vision.",
  },
];

export function OurProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="w-full">
      <div className="relative">
        {/* Vertical connecting line — desktop only */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

        <div className="flex flex-col gap-16 md:gap-24">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content card */}
                <div className="flex-1 w-full">
                  <ScrollReveal>
                    <div
                      className={`group relative p-8 md:p-10 rounded-[24px] border border-border bg-background shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${isLeft ? "md:text-left" : "md:text-right"}`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 border border-border flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                          {step.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                            STEP {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight uppercase">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto md:mx-0">
                        {step.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex relative z-10">
                  <div className="w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300" />
                </div>

                {/* Empty space for opposite side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
