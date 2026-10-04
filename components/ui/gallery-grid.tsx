"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { RiArrowRightUpLine } from "@remixicon/react";

interface GalleryItem {
  src: string;
  alt?: string;
  label: string;
  company: string;
  span?: string;
  href?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  className?: string;
}

export function GalleryGrid({ items, className }: GalleryGridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6", className)}>
      {items.map((item, i) => {
        const CardBody = (
          <div className="group relative w-full aspect-[16/10] overflow-hidden border border-border bg-secondary cursor-pointer">
            <Image
              src={item.src}
              alt={item.alt || item.label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/90" />

            {/* Corner arrow pill on hover */}
            <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
              <RiArrowRightUpLine size={14} />
            </div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70 font-mono font-medium block mb-1">
                {item.company}
              </span>
              <h4 className="font-heading text-white text-sm sm:text-base font-medium uppercase tracking-tight">
                {item.label}
              </h4>
            </div>
          </div>
        );

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.href ? (
              <Link href={item.href} className="block w-full">
                {CardBody}
              </Link>
            ) : (
              CardBody
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
