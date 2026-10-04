"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { RiArrowRightUpLine } from "@remixicon/react";

interface ServiceItem {
  type: "stat" | "feature" | "image" | "list";
  title: string;
  stat?: string;
  statLabel?: string;
  description?: string;
  image?: string;
  items?: { label: string; value: string }[];
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  dark?: boolean;
}

interface ServicesBentoGridProps {
  services: ServiceItem[];
}

export function ServicesBentoGrid({ services }: ServicesBentoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-3">
      {services.map((service, i) => {
        const colClass = service.colSpan === 2 ? "sm:col-span-2 col-span-1" : "col-span-1";
        const rowClass = service.rowSpan === 2 ? "row-span-2" : "row-span-1";
        const darkClass = service.dark
          ? "bg-foreground text-background border-foreground"
          : "bg-background text-foreground border-border";

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative overflow-hidden border ${darkClass} ${colClass} ${rowClass} p-6 flex flex-col justify-between hover:border-primary transition-colors duration-300 cursor-default`}
          >
            {/* Arrow badge */}
            <div className={`absolute top-4 right-4 w-7 h-7 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${service.dark ? "border-background/30 text-background" : "border-border text-foreground"}`}>
              <RiArrowRightUpLine size={13} />
            </div>

            {/* FEATURE card */}
            {service.type === "feature" && (
              <>
                <div>
                  <span className={`text-[10px] uppercase font-mono tracking-widest font-semibold ${service.dark ? "text-primary" : "text-primary"}`}>
                    Capability
                  </span>
                  <h3 className={`font-heading text-base md:text-lg font-semibold uppercase tracking-tight mt-1.5 ${service.dark ? "text-background" : "text-foreground"}`}>
                    {service.title}
                  </h3>
                </div>
                <p className={`text-xs font-light leading-relaxed mt-2 ${service.dark ? "text-background/80" : "text-muted-foreground"}`}>
                  {service.description}
                </p>
              </>
            )}

            {/* IMAGE card */}
            {service.type === "image" && (
              <>
                <Image
                  src={service.image!}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <p className="text-[10px] uppercase tracking-widest text-primary font-mono font-medium mb-1">Operating Studio</p>
                  <h3 className="font-heading text-white font-medium tracking-tight text-base md:text-xl uppercase">{service.title}</h3>
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
