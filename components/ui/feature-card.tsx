"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function FeatureCard({
  icon,
  title,
  description,
  footer,
  className,
  contentClassName,
  children,
}: FeatureCardProps) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          "group flex flex-col gap-5 bg-background hover:bg-secondary/30 transition-colors duration-300 min-h-[200px] p-6 md:p-8",
          className
        )}
      >
        <div className="w-9 h-9 border border-border flex items-center justify-center text-foreground group-hover:border-primary transition-all duration-300 shrink-0">
          {icon}
        </div>
        <div className={cn("flex flex-col gap-2 flex-1", contentClassName)}>
          {children}
          <h4 className="font-heading text-lg font-medium uppercase tracking-tight">{title}</h4>
          {description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          )}
        </div>
        {footer && <div className="mt-auto">{footer}</div>}
      </div>
    </ScrollReveal>
  );
}
