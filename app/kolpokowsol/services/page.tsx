"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";

const services = [
  {
    id: "01",
    title: "Residential Interiors",
    desc: "Bespoke homes that reflect the lives of those who inhabit them. From penthouses to countryside estates, we craft spaces of quiet luxury.",
    image: "/images/interior.png",
  },
  {
    id: "02",
    title: "Hospitality Design",
    desc: "Hotels, restaurants, and lounges that tell a story. We design environments that guests remember long after they leave.",
    image: "/images/materials.png",
  },
  {
    id: "03",
    title: "Workplace & Corporate",
    desc: "Offices that inspire productivity and belonging. Our workplace designs balance brand expression with human comfort.",
    image: "/images/interior.png",
  },
  {
    id: "04",
    title: "Material Curation",
    desc: "A dedicated materials library spanning natural stone, rare timber, bespoke textiles, and custom joinery — sourced through INEX.",
    image: "/images/materials.png",
  },
  {
    id: "05",
    title: "Lighting & Atmosphere",
    desc: "Lighting is the most emotional element of interior design. We design layered schemes that shift with the day and the mood.",
    image: "/images/interior.png",
  },
  {
    id: "06",
    title: "FF&E Specification",
    desc: "Furniture, fixtures, and equipment specified down to the last detail. Every object is chosen for its contribution to the whole.",
    image: "/images/materials.png",
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
            Interior Design<br />Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            From concept mood boards to furniture specification and on-site supervision, Kolpokowsol delivers total interior experiences.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES CARDS ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={i * 0.1}>
                <div className="group relative h-[320px] md:h-[380px] overflow-hidden rounded-[24px] border border-border bg-background shadow-sm hover:shadow-xl transition-all duration-500">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
                        {svc.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight text-white mb-3">
                        {svc.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                        {svc.desc}
                      </p>
                    </div>
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
