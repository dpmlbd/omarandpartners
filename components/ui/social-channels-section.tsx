"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  getSocialChannels,
  SocialChannelItem,
  CompanySocialLinks,
} from "@/static-data/social-media";

export { getSocialChannels } from "@/static-data/social-media";
export type { SocialChannelItem } from "@/static-data/social-media";

export const defaultSocialChannels: SocialChannelItem[] = getSocialChannels("omar-and-partners");

interface SocialChannelsSectionProps {
  companySlug?: string;
  customLinks?: CompanySocialLinks;
  channels?: SocialChannelItem[];
  index?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SocialChannelsSection({
  companySlug,
  customLinks,
  channels: passedChannels,
  index = "05",
  title = "Social Media",
  subtitle,
  className = "py-24 md:py-36 border-t border-border bg-background",
}: SocialChannelsSectionProps) {
  const channels =
    passedChannels ||
    (customLinks
      ? getSocialChannels(customLinks)
      : companySlug
      ? getSocialChannels(companySlug)
      : defaultSocialChannels);

  // If no channels exist for this entity, do not render the section
  if (!channels || channels.length === 0) {
    return null;
  }

  const gridColsClass =
    channels.length === 4
      ? "grid-cols-2 sm:grid-cols-4 max-w-2xl"
      : channels.length === 3
      ? "grid-cols-3 max-w-xl"
      : channels.length === 2
      ? "grid-cols-2 max-w-md"
      : "grid-cols-1 max-w-xs";

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
            <div className={`grid ${gridColsClass} gap-3 sm:gap-5 md:gap-8 w-full`}>
              {channels.map((social, i) => {
                const Icon = social.icon;
                return (
                  <ScrollReveal key={social.id || social.name} delay={i * 0.08}>
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

