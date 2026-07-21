"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  index?: string;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  index,
  className,
  children,
}: SectionHeaderProps) {
  if (index) {
    return (
      <ScrollReveal>
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16",
            className
          )}
        >
          <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3">
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest">{index}</span>
            <span className="w-12 h-[1px] md:w-[1px] md:h-12 bg-border" />
          </div>
          <div className="md:col-span-8">
            <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-muted-foreground text-sm max-w-lg">{subtitle}</p>
            )}
          </div>
          {children && (
            <div className="md:col-span-2 hidden md:flex justify-end">
              {children}
            </div>
          )}
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div
        className={cn(
          "flex flex-col mb-16",
          align === "center" && "items-center text-center",
          align === "right" && "items-end text-right",
          align === "left" && "items-start text-left",
          className
        )}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter uppercase relative">
          {title}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary hidden md:block rounded-full" />
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground text-lg md:text-xl font-light max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </ScrollReveal>
  );
}
