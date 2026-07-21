import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { ReactNode } from "react";

interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  backgroundImage?: string;
  className?: string;
  delay?: number;
}

export function BentoCard({
  title,
  description,
  icon,
  backgroundImage,
  className,
  delay = 0,
}: BentoCardProps) {
  return (
    <ScrollReveal delay={delay} className={cn("h-full", className)}>
      <div className="group relative w-full h-full rounded-md overflow-hidden bg-background/5 border border-border/50 hover:border-primary/50 transition-colors duration-500 min-h-[300px] flex flex-col justify-end p-8 shadow-sm hover:shadow-md">
        
        {/* Abstract Glowing Background Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-700 z-0" />
        
        {/* Background Image (Optional) */}
        {backgroundImage && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay grayscale group-hover:grayscale-0"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}

        <div className="relative z-10">
          {icon && (
            <div className="mb-6 w-12 h-12 rounded-md bg-background/10 backdrop-blur-sm border border-border/50 flex items-center justify-center text-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
              {icon}
            </div>
          )}
          <h3 className="font-heading text-2xl font-medium tracking-tight mb-2 uppercase group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            {description}
          </p>
        </div>
        
        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </ScrollReveal>
  );
}
