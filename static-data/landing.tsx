import {
  RiGlobalLine,
  RiLeafLine,
  RiFocus3Line,
} from "@remixicon/react";
import { siteConfig } from "@/config/site";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export interface HeroSlide {
  src: string;
  label: string;
  tag: string;
}

export const heroSlides: HeroSlide[] = [
  { src: "/images/hero_architecture.png", label: comp1?.description || "Consultancy", tag: `01 / ${comp1?.name || "Kolpoporishor"}` },
  { src: "/images/interior.png", label: comp2?.description || "Consultancy & Construction", tag: `02 / ${comp2?.name || "Kolpokowsol"}` },
  { src: "/images/materials.png", label: comp3?.description || "Building Materials — Coming Soon", tag: `03 / ${comp3?.name || "INEX"}` },
];

export interface LandingInsight {
  tag: string;
  title: string;
  date: string;
}

export const landingInsights: LandingInsight[] = [
  { tag: "News", title: "ONP Announces New Headquarters Project", date: "Oct 12, 2026" },
  { tag: "Article", title: "The Future of Minimalist Architecture", date: "Sep 28, 2026" },
  { tag: "Press Release", title: "INEX Partners with Global Stone Suppliers", date: "Sep 15, 2026" },
];

export interface LandingProject {
  src: string;
  category: string;
  title: string;
  href: string;
}

export const landingProjects: LandingProject[] = [
  { src: "/images/architecture.png", category: comp1?.description || "Consultancy", title: "The Zenith Tower", href: "/kolpoporishor#projects" },
  { src: "/images/interior.png", category: comp2?.description || "Consultancy & Construction", title: "Lumina Residences", href: "/kolpokowsol#projects" },
];

export interface WhyItem {
  icon: React.ReactNode;
  title: string;
  shortDesc: string;
  desc: string;
  image: string;
}

export const whyItems: WhyItem[] = [
  {
    icon: <RiGlobalLine size={22} />,
    title: "Global Perspective",
    shortDesc: "International standards executed with local precision.",
    desc: "Drawing inspiration from international standards while executing with local precision and cultural intelligence. Our portfolio spans 18 countries, yet every project retains the specificity of its context. We believe global fluency and local sensitivity are not opposites — they are co-dependencies.",
    image: "/images/architecture.png",
  },
  {
    icon: <RiFocus3Line size={22} />,
    title: "Holistic Control",
    shortDesc: "Uncompromising quality across every project.",
    desc: `Managing ${comp1?.description?.toLowerCase() || "consultancy"}, ${comp2?.description?.toLowerCase() || "consultancy & construction"}, and materials under one roof ensures uncompromising quality across every project. This vertical integration eliminates the handoff gaps that plague multi-vector projects, ensuring design intent survives from schematic to specification.`,
    image: "/images/interior.png",
  },
  {
    icon: <RiLeafLine size={22} />,
    title: "Sustainable Future",
    shortDesc: "Environmentally conscious, built for longevity.",
    desc: "Engineering solutions that are environmentally conscious, resource-efficient, and built for longevity. Sustainability is not an afterthought — it is embedded in our material selection, structural logic, and lifecycle planning from day one.",
    image: "/images/materials.png",
  },
];

export interface FallbackTestimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  location: string;
}

export const fallbackTestimonials: FallbackTestimonial[] = [
  {
    name: "Elena Vasquez",
    role: "CEO, Horizon Developments",
    image: "/images/hero_architecture.png",
    quote: "Omar & Partners delivered a landmark tower that redefined our skyline. Their integrated approach — from concept to material selection — was flawless.",
    location: "Dubai, UAE",
  },
  {
    name: "Marcus Chen",
    role: "Director, Apex Hospitality",
    image: "/images/interior.png",
    quote: "The interior curation by Kolpokowsol transformed our boutique hotel into an immersive experience. Guests consistently praise the spatial narrative.",
    location: "London, UK",
  },
  {
    name: "Sophia Al-Rashid",
    role: "Founder, Verde Living",
    image: "/images/materials.png",
    quote: "INEX sourced rare marble and engineered timber for our residential project with extraordinary precision. Their network is unmatched.",
    location: "New York, USA",
  },
];
