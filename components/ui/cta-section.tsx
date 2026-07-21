"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";

interface CTASectionProps {
  title: string;
  subtitle?: string;
  href: string;
  buttonText: string;
  index?: string;
  className?: string;
  dark?: boolean;
  children?: ReactNode;
}

export function CTASection({
  title,
  subtitle,
  href,
  buttonText,
  index,
  className,
  dark = false,
  children,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-24 md:py-36",
        dark ? "bg-foreground text-background" : "bg-secondary/20",
        className
      )}
    >
      <div className="container mx-auto px-6 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {index && (
            <div className="md:col-span-2 flex flex-row md:flex-col items-center md:items-start gap-3">
              <span className={cn("font-mono text-[10px] tracking-widest", dark ? "text-background/30" : "text-muted-foreground")}>
                {index}
              </span>
              <span className={cn("w-12 h-[1px] md:w-[1px] md:h-12", dark ? "bg-background/10" : "bg-border")} />
            </div>
          )}
          <div className={cn(index ? "md:col-span-7" : "md:col-span-8")}>
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter uppercase mb-4">
                {title}
              </h2>
              {subtitle && (
                <p className={cn("text-sm md:text-base font-light leading-relaxed max-w-xl", dark ? "text-background/50" : "text-muted-foreground")}>
                  {subtitle}
                </p>
              )}
            </ScrollReveal>
          </div>
          <div className={cn(index ? "md:col-span-3" : "md:col-span-4 flex justify-start md:justify-end")}>
            <ScrollReveal delay={0.2}>
              <Link
                href={href}
                className={cn(
                  "inline-flex items-center gap-3 px-6 py-4 text-xs uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300 group",
                  dark
                    ? "border border-background/20 text-background hover:bg-primary hover:border-primary"
                    : "bg-foreground text-background hover:bg-primary"
                )}
              >
                {buttonText} <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
