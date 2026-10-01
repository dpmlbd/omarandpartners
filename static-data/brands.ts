import { siteConfig } from "@/config/site";

const compHolding = siteConfig.companies[0];
const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export interface BrandItem {
  name: string;
  slug: string;
  description: string;
  logo: string;
  color: string;
  colorName: string;
  colorLight: string;
  typography: string;
  tags: string[];
}

export const brandsList: BrandItem[] = [
  {
    name: compHolding?.name || "Omar & Partners",
    slug: "",
    description: compHolding?.description || "Architecture & Engineering Holding Group",
    logo: "/onp.svg",
    color: "#49735D",
    colorName: "Holding Deep Sage",
    colorLight: "#F0F5F2",
    typography: "Outfit (Sans-serif)",
    tags: ["Holding Group", "Corporate Ecosystem", "Governance"],
  },
  {
    name: comp1?.name || "Kolpoporishor",
    slug: "kolpoporishor",
    description: comp1?.description || "Consultancy",
    logo: "/logos/kolpoporishor-logo.svg",
    color: "#407CBE",
    colorName: "Architectural Blue",
    colorLight: "#EFF6FF",
    typography: "Outfit (Sans-serif)",
    tags: [comp1?.description || "Consultancy", "Structural", "Urban Planning"],
  },
  {
    name: comp2?.name || "Kolpokowsol",
    slug: "kolpokowsol",
    description: comp2?.description || "Consultancy & Construction",
    logo: "/logos/kolpokowsol-logo.svg",
    color: "#E07633",
    colorName: "Terracotta Amber",
    colorLight: "#FFF7ED",
    typography: "Playfair Display (Serif)",
    tags: [comp2?.description || "Consultancy & Construction", "Turnkey", "Execution"],
  },
  {
    name: comp3?.name || "INEX",
    slug: "inex",
    description: comp3?.description || "Interior Design & Management Consultancy",
    logo: "/logos/inex-logo.svg",
    color: "#1E0363",
    colorName: "Deep Royal Indigo",
    colorLight: "#F5F3FF",
    typography: "Outfit (Sans-serif)",
    tags: ["Interior Design", "Management Consultancy", "Supply Chain"],
  },
];

export const brands = brandsList;
