"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { RiArrowRightLine, RiArrowDownLine } from "@remixicon/react";

interface HeroSectionProps {
  tagline?: string;
  title: string | string[];
  subtitle?: string;
  backgroundClassName?: string;
  textClassName?: string;
  ctaHref?: string;
  ctaText?: string;
  estText?: string;
  rightPanelImage?: {
    src: string;
    alt: string;
    priority?: boolean;
    overlay?: boolean;
    scrollCue?: boolean;
    counter?: { current: number; total: string };
  };
  rightPanel?: ReactNode;
  rightPanelOverlay?: ReactNode;
  onRightPanelClick?: () => void;
  className?: string;
  children?: ReactNode;
}

export function HeroSection({
  tagline,
  title,
  subtitle,
  backgroundClassName = "bg-foreground text-background",
  textClassName,
  ctaHref,
  ctaText,
  estText,
  rightPanelImage,
  rightPanel,
  rightPanelOverlay,
  onRightPanelClick,
  className,
  children,
}: HeroSectionProps) {
  const titleLines = Array.isArray(title) ? title : [title];
  const hasRightPanel = !!rightPanel || !!rightPanelImage;

  return (
    <section
      className={cn(
        "relative flex flex-col md:flex-row overflow-hidden",
        hasRightPanel
          ? "h-[85vh] min-h-[650px] max-h-[850px]"
          : "min-h-[50vh] flex-col justify-center px-8 md:px-14 pt-28 pb-12 shrink-0 border-b border-border",
        backgroundClassName,
        className
      )}
    >
      <div className={cn("flex flex-col justify-between z-10 shrink-0", hasRightPanel ? "w-full md:w-1/2 px-8 md:px-14 pt-28 pb-8 md:pb-10" : "w-full", textClassName)}>
        {tagline && (
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">{tagline}</span>
            </div>
          </ScrollReveal>
        )}

        <div className="flex flex-col my-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background text-left"
            style={{ fontSize: "clamp(3rem,7vw,6.5rem)" }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="h-[1px] bg-primary my-6 w-full"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-background/50 text-sm font-light leading-relaxed max-w-xs"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {(ctaHref || estText || children) && (
          <div className={cn(ctaHref && estText && !children ? "flex items-end justify-between" : "")}>
            {ctaHref && ctaText && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-3 border border-background/20 text-background px-5 py-3 text-[11px] uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  {ctaText} <RiArrowRightLine size={12} />
                </Link>
              </motion.div>
            )}
            {estText && !children && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-background/30 text-[10px] uppercase tracking-widest"
              >
                {estText}
              </motion.span>
            )}
            {children && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
                {children}
              </div>
            )}
          </div>
        )}
      </div>

      {hasRightPanel && (
        <>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/40 z-20"
          />
          <div
            className={cn("relative flex-1 overflow-hidden cursor-pointer", hasRightPanel ? "w-full md:w-1/2" : "hidden")}
            onClick={onRightPanelClick}
          >
            {rightPanelImage && !rightPanel && (
              <>
                <Image
                  src={rightPanelImage.src}
                  alt={rightPanelImage.alt}
                  fill
                  className="object-cover grayscale"
                  priority={rightPanelImage.priority}
                />
                {rightPanelImage.overlay !== false && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                )}
                {rightPanelImage.scrollCue && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40"
                  >
                    <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
                      <RiArrowDownLine size={12} />
                    </motion.div>
                  </motion.div>
                )}
                {rightPanelImage.counter && (
                  <div className="absolute top-8 right-8 z-10 flex flex-col items-center gap-1 text-white/40">
                    <span className="font-heading text-3xl font-semibold text-white leading-none">
                      {String(rightPanelImage.counter.current + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">/ {rightPanelImage.counter.total}</span>
                    <div className="w-[1px] h-8 bg-white/30 mt-1" />
                  </div>
                )}
              </>
             )}
             {rightPanelOverlay}
             {rightPanel}
          </div>
        </>
      )}
    </section>
  );
}
