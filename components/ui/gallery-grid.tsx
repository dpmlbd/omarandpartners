"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface GalleryItem {
  src: string;
  alt?: string;
  label: string;
  company: string;
  span?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  className?: string;
}

export function GalleryGrid({ items, className }: GalleryGridProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 auto-rows-[260px] gap-3", className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={cn("group relative overflow-hidden border border-border", item.span)}
        >
          <Image
            src={item.src}
            alt={item.alt || item.label}
            fill
            className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
             <span className="text-[9px] uppercase tracking-[0.3em] text-foreground font-semibold block mb-1">
              {item.company}
            </span>
            <h4 className="font-heading text-white text-base md:text-lg font-medium uppercase tracking-tight">
              {item.label}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
