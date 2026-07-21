"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { RiMapPinLine } from "@remixicon/react";

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  location: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  index?: string;
  title?: string;
  subtitle?: string;
}

export function TestimonialsSection({
  testimonials,
  index = "05B",
  title = "Client Voices",
  subtitle = "Trusted by industry leaders across the globe.",
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
      <div className="container mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3">
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{index}</span>
            <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
          </div>
          <div className="md:col-span-8">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">{title}</h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-lg">{subtitle}</p>
          </div>
        </div>

        <TestimonialContent testimonials={testimonials} />
      </div>
    </section>
  );
}

function TestimonialContent({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
      <div className="bg-background p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="font-heading text-xl md:text-2xl font-light leading-snug tracking-tight">
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div className="border-t border-border pt-6">
              <p className="font-heading text-lg font-medium uppercase tracking-tight">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground mt-1">{testimonials[current].role}</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                <RiMapPinLine size={14} className="text-primary" />
                {testimonials[current].location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-500 rounded-full ${i === current ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
      </div>

      <div className="relative min-h-[320px] md:min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
