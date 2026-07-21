"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  items: StatItem[];
  className?: string;
  itemClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  columns?: 2 | 4;
}

export function StatsGrid({
  items,
  className,
  itemClassName,
  valueClassName,
  labelClassName,
  columns = 4,
}: StatsGridProps) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          "grid gap-px border border-border",
          columns === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4",
          className
        )}
      >
        {items.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "flex flex-col gap-2 p-6 md:p-8 bg-secondary/10 hover:bg-secondary/30 transition-colors duration-300",
              itemClassName
            )}
          >
            <span className={cn("font-heading text-3xl md:text-4xl font-semibold text-primary", valueClassName)}>
              {stat.value}
            </span>
            <span className={cn("text-[10px] uppercase tracking-widest text-muted-foreground", labelClassName)}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
