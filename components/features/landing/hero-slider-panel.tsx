"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { RiArrowDownLine } from "@remixicon/react";

interface HeroSliderPanelProps {
  slides: { src: string; label: string; tag: string }[];
  activeSlide: number;
  onDotClick: (i: number) => void;
  activeDot: number;
}

export function HeroSliderPanel({ slides, activeSlide, onDotClick, activeDot }: HeroSliderPanelProps) {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeSlide].src}
            alt={slides[activeSlide].label}
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeSlide}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
            className="font-heading text-3xl font-semibold text-white leading-none"
          >
            0{activeSlide + 1}
          </motion.span>
        </AnimatePresence>
        <span className="text-white/40 text-[10px] uppercase tracking-widest">/ {String(slides.length).padStart(2, "0")}</span>
        <div className="w-[1px] h-8 bg-white/30 mt-1" />
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <AnimatePresence mode="wait">
          <motion.div key={activeSlide}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[10px] text-primary uppercase tracking-widest font-medium">{slides[activeSlide].tag}</span>
            <span className="font-heading text-xl text-white font-medium uppercase tracking-tight">{slides[activeSlide].label}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 right-8 z-20 flex flex-col gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onDotClick(i); }}
            className={`w-[2px] transition-all duration-500 rounded-full ${i === activeDot ? "h-8 bg-primary" : "h-3 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <RiArrowDownLine size={12} />
        </motion.div>
      </motion.div>
    </>
  );
}
