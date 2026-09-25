"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { RiArrowDownLine, RiArrowRightLine } from "@remixicon/react";

interface HeroSlide {
  src: string;
  label: string;
  tag: string;
}

interface HeroCinematicProps {
  slides: HeroSlide[];
}

const SLIDE_DURATION = 5500; // ms per slide

export function HeroCinematic({ slides }: HeroCinematicProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: shift the hero image down as user scrolls
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);

  const next = useCallback(() => {
    setActiveSlide((p) => (p + 1) % slides.length);
    startTimeRef.current = Date.now();
    setProgress(0);
    progressRef.current = 0;
  }, [slides.length]);

  // Autoplay + progress bar
  useEffect(() => {
    if (!isAutoPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / SLIDE_DURATION, 1);
      progressRef.current = pct;
      setProgress(pct);

      if (pct >= 1) {
        next();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAutoPlaying, activeSlide, next]);

  const goToSlide = (i: number) => {
    setIsAutoPlaying(false);
    setActiveSlide(i);
    setProgress(0);
    progressRef.current = 0;
    // Re-enable after a pause
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden -mt-24"
      style={{ height: "100vh", minHeight: "700px" }}
    >
      {/* ── Background Images with Ken Burns ─────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            style={{ y: parallaxY }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "linear" }}
          >
            <Image
              src={slides[activeSlide].src}
              alt={slides[activeSlide].label}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient Overlays ────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-[1]" />
      <motion.div
        className="absolute inset-0 bg-black z-[1]"
        style={{ opacity: overlayOpacity }}
      />

      {/* ── Center Content ───────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start container mx-auto px-6 md:px-14">
        {/* Top tag line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-10 h-[1px] bg-primary" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 font-medium">
            Architecture · Interiors · Materials
          </span>
        </motion.div>

        {/* Main Heading */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-[0.88] tracking-tighter uppercase text-white"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            Omar
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold leading-[0.88] tracking-tighter uppercase text-white flex items-baseline gap-4"
            style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)" }}
          >
            <span className="text-primary">&amp;</span>
            <span>Partners</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-md"
        >
          <div className="w-full h-[1px] bg-gradient-to-r from-primary via-primary/40 to-transparent mb-5" />
          <p className="text-white/55 text-sm md:text-base font-light leading-relaxed">
            Three independent companies. One unified vision.
            <br className="hidden md:block" />{" "}
            Architecture, interiors, and materials in complete synergy.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 flex items-center gap-4"
        >
          <a
            href="#ecosystem"
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all duration-300"
          >
            Explore Ecosystem
            <RiArrowRightLine
              size={13}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
          <a
            href="/about"
            className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          >
            Our Story
          </a>
        </motion.div>
      </div>

      {/* ── Active Slide Label (bottom-left) ─────────────────────────── */}
      <div className="absolute bottom-10 left-6 md:left-14 z-20 flex items-end gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-1"
          >
            <span className="text-[10px] text-primary uppercase tracking-widest font-medium">
              {slides[activeSlide].tag}
            </span>
            <span className="font-heading text-lg text-white font-medium uppercase tracking-tight">
              {slides[activeSlide].label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Progress Timeline (bottom-right) ─────────────────────────── */}
      <div className="absolute bottom-10 right-6 md:right-14 z-20 flex items-center gap-2.5 sm:gap-3">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group flex flex-col items-start gap-1.5"
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
          >
            <span
              className={`text-[9px] uppercase tracking-widest transition-colors duration-300 ${
                i === activeSlide ? "text-white" : "text-white/30 group-hover:text-white/60"
              }`}
            >
              0{i + 1}
            </span>
            <div className="relative w-11 sm:w-14 md:w-16 lg:w-20 h-[2px] bg-white/15 overflow-hidden rounded-full">
              {i === activeSlide && (
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
              {i < activeSlide && (
                <div className="absolute inset-0 bg-primary/50 rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Scroll Indicator (bottom-center) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <RiArrowDownLine size={14} className="text-white/35" />
        </motion.div>
      </motion.div>

      {/* ── Side Decorative Elements ──────────────────────────────────── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: 0 }}
        className="absolute top-0 right-[calc(50%-0.5px)] w-[1px] h-32 bg-gradient-to-b from-primary/60 to-transparent z-20 hidden md:block"
      />

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-14 z-10 text-white/10 text-[10px] font-mono uppercase tracking-[0.4em] hidden lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        Est. 2010 — Dhaka
      </motion.span>
    </section>
  );
}
