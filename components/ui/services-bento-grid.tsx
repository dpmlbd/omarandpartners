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
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
      {services.map((service, i) => {
        const colClass = service.colSpan === 2 ? "col-span-2" : "col-span-1";
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

            {/* STAT card */}
            {service.type === "stat" && (
              <>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${service.dark ? "text-background/50" : "text-foreground"}`}>
                  {service.title}
                </span>
                <div>
                  <p className={`font-heading font-bold leading-none tracking-tighter ${service.dark ? "text-background" : "text-foreground"}`}
                    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                    {service.stat}
                  </p>
                  <p className={`text-xs font-light mt-2 leading-relaxed ${service.dark ? "text-background/50" : "text-muted-foreground"}`}>
                    {service.statLabel}
                  </p>
                </div>
              </>
            )}

            {/* FEATURE card */}
            {service.type === "feature" && (
              <>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${service.dark ? "text-background/50" : "text-foreground"}`}>
                  {service.title}
                </span>
                <p className={`text-xs font-light leading-relaxed ${service.dark ? "text-background/60" : "text-muted-foreground"}`}>
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
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                   <p className="text-[10px] uppercase tracking-widest text-foreground font-medium mb-1">Service</p>
                  <h3 className="font-heading text-white font-medium tracking-tight text-base md:text-lg uppercase">{service.title}</h3>
                </div>
              </>
            )}

            {/* LIST card */}
            {service.type === "list" && (
              <>
                <span className={`text-[10px] uppercase tracking-widest font-medium ${service.dark ? "text-background/50" : "text-foreground"}`}>
                  {service.title}
                </span>
                <div className="flex flex-col gap-2 mt-2">
                  {service.items?.map((item, j) => (
                    <div key={j} className={`flex justify-between items-center pb-2 border-b ${service.dark ? "border-background/10" : "border-border/50"}`}>
                      <span className={`text-[10px] uppercase tracking-wider ${service.dark ? "text-background/50" : "text-muted-foreground"}`}>{item.label}</span>
                      <span className={`font-heading text-sm font-semibold ${service.dark ? "text-background" : "text-foreground"}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
