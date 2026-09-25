"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "@remixicon/react";

export const defaultSocialChannels = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: RiFacebookLine,
    hoverClass: "hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/5",
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: RiInstagramLine,
    hoverClass: "hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/5",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: RiLinkedinLine,
    hoverClass: "hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5",
  },
];

interface SocialChannelsSectionProps {
  index?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SocialChannelsSection({
  index = "05",
  title = "Social Media",
  subtitle,
  className = "py-24 md:py-36 border-t border-border bg-background",
}: SocialChannelsSectionProps) {
  return (
    <section id="social-channels" className={className}>
      <div className="container mx-auto px-6 md:px-14">
        <SectionHeader
          index={index}
          title={title}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-2 hidden md:block" />
          <div className="md:col-span-8">
            <div className="grid grid-cols-3 gap-3 sm:gap-5 md:gap-8 w-full max-w-xl">
              {defaultSocialChannels.map((social, i) => {
                const Icon = social.icon;
                return (
                  <ScrollReveal key={social.name} delay={i * 0.08}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`aspect-square w-full border border-border bg-card/20 flex items-center justify-center text-foreground transition-all duration-500 group ${social.hoverClass}`}
                    >
                      <Icon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform duration-500 group-hover:scale-110" />
                    </a>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
