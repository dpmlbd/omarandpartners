"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

export interface BentoGalleryItem {
  id: string;
  title?: string;
  category?: string;
  location?: string;
  year?: string;
  image: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

interface BentoGalleryProps {
  badge?: string;
  title: string;
  description?: string;
  items: BentoGalleryItem[];
  itemsPerPage?: number;
}

export function BentoGallery({
  badge = "Visual Archive",
  title = "Curated Gallery",
  description,
  items,
  itemsPerPage = 8,
}: BentoGalleryProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="relative w-full py-20 bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-14">
        {/* Section Header */}
        <div className="pb-10 border-b border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-medium">
              {badge}
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[280px] gap-4 pt-10"
          >
            {currentItems.map((item, idx) => {
              const colSpanClass =
                item.colSpan === 2 ? "sm:col-span-2" : "col-span-1";
              const rowSpanClass =
                item.rowSpan === 2 ? "row-span-2" : "row-span-1";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`group relative overflow-hidden border border-border bg-card/40 ${colSpanClass} ${rowSpanClass} hover:border-primary/80 transition-colors duration-500`}
                >
                  {/* Clean Image with Smooth Hover Zoom - Absolutely No Text */}
                  <Image
                    src={item.image}
                    alt={item.title || "Gallery work"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Corner Accent on Hover */}
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-14 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border/40 mt-12">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Page {String(currentPage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <RiArrowLeftLine size={16} />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`min-w-10 h-10 px-3 font-mono text-xs tracking-wider transition-all duration-200 border ${
                        isActive
                          ? "bg-foreground text-background border-foreground font-semibold"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                      }`}
                    >
                      {String(page).padStart(2, "0")}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <RiArrowRightLine size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
