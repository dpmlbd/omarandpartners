"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Catalog</span>
            </div>
          </ScrollReveal>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Full Material Catalog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6"
          >
            Our complete catalog contains over 200 material specifications, technical data sheets, and sample ordering information.
          </motion.p>
        </div>
      </section>

      {/* ── CATALOG OPTIONS ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-6 p-8 md:p-10 bg-background border border-border rounded-2xl hover:shadow-xl transition-all duration-500 min-h-[280px]">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">Digital</span>
                <h3 className="font-heading text-2xl font-medium tracking-tight uppercase">Browse Online</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Explore our full product range with searchable filters, high-resolution images, and downloadable specification sheets.
                </p>
                <div className="mt-auto">
                  <Link href="/inex/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium group">
                    View Products <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col gap-6 p-8 md:p-10 bg-background border border-border rounded-2xl hover:shadow-xl transition-all duration-500 min-h-[280px]">
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">Physical</span>
                <h3 className="font-heading text-2xl font-medium tracking-tight uppercase">Request Hard Copy</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Request a printed catalog and physical sample kit for your project. Our team will prepare a tailored selection.
                </p>
                <div className="mt-auto">
                  <Link href="/inex/request-quotation" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium group">
                    Request Catalog <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
