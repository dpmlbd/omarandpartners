import React from "react";
import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiYoutubeLine,
} from "@remixicon/react";

/**
 * Strict list of supported social media platforms.
 * Only Facebook, Linkedin, Youtube, and Instagram are allowed.
 */
export type AllowedSocialPlatform = "facebook" | "linkedin" | "youtube" | "instagram";

export interface CompanySocialLinks {
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
}

export interface SocialChannelItem {
  id: AllowedSocialPlatform;
  name: "Facebook" | "LinkedIn" | "YouTube" | "Instagram";
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  hoverClass: string;
}

/**
 * Platform configuration specifying display names, icons, and brand hover styling.
 * Only Facebook, Linkedin, Youtube, and Instagram are allowed.
 */
export const PLATFORM_CONFIG: Record<
  AllowedSocialPlatform,
  {
    name: "Facebook" | "LinkedIn" | "YouTube" | "Instagram";
    icon: React.ComponentType<{ className?: string }>;
    hoverClass: string;
  }
> = {
  facebook: {
    name: "Facebook",
    icon: RiFacebookLine,
    hoverClass: "hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/5",
  },
  linkedin: {
    name: "LinkedIn",
    icon: RiLinkedinLine,
    hoverClass: "hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5",
  },
  youtube: {
    name: "YouTube",
    icon: RiYoutubeLine,
    hoverClass: "hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[#FF0000]/5",
  },
  instagram: {
    name: "Instagram",
    icon: RiInstagramLine,
    hoverClass: "hover:border-[#E4405F] hover:text-[#E4405F] hover:bg-[#E4405F]/5",
  },
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL SOCIAL MEDIA DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Edit your social media links here easily.
 *
 * Rules:
 * 1. Only 'facebook', 'linkedin', 'youtube', and 'instagram' are permitted.
 * 2. Icons render conditionally: if a platform is left empty or omitted,
 *    its icon will not appear on the website.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const socialMediaData: Record<string, CompanySocialLinks> = {
  // KOLPOKOWSOL (Interior Design & Spatial Architecture)
  kolpokowsol: {
    facebook: "https://www.facebook.com/kolpokowsol",
    instagram:
      "https://www.instagram.com/kolpokowsol?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@Kolpokowsol",
    // linkedin is omitted, so LinkedIn icon will not render
  },

  // KOLPOPORISOR / KOLPOPORISHOR (Architecture & Consultancy)
  kolpoporisor: {
    facebook: "https://www.facebook.com/kolpoporishor",
    instagram:
      "https://www.instagram.com/kolpoporishor?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@Kolpoporishor",
    // linkedin is omitted, so LinkedIn icon will not render
  },
  kolpoporishor: {
    facebook: "https://www.facebook.com/kolpoporishor",
    instagram:
      "https://www.instagram.com/kolpoporishor?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@Kolpoporishor",
  },

  // INEX (Building Materials)
  inex: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },

  // OMAR & PARTNERS (Holding Company)
  "omar-and-partners": {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

/**
 * Retrieves the list of active social channels for a company.
 * Only returns platforms with defined, non-empty URLs in the order:
 * Facebook -> LinkedIn -> YouTube -> Instagram.
 */
export function getSocialChannels(
  companySlugOrLinks?: string | CompanySocialLinks
): SocialChannelItem[] {
  const links: CompanySocialLinks =
    typeof companySlugOrLinks === "string"
      ? socialMediaData[companySlugOrLinks] || socialMediaData["omar-and-partners"] || {}
      : companySlugOrLinks || socialMediaData["omar-and-partners"] || {};

  const order: AllowedSocialPlatform[] = ["facebook", "linkedin", "youtube", "instagram"];
  const channels: SocialChannelItem[] = [];

  for (const platform of order) {
    const url = links[platform]?.trim();
    if (url) {
      const config = PLATFORM_CONFIG[platform];
      channels.push({
        id: platform,
        name: config.name,
        url,
        icon: config.icon,
        hoverClass: config.hoverClass,
      });
    }
  }

  return channels;
}
