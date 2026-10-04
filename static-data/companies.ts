import { siteConfig } from "@/config/site";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export interface CompanyServiceItem {
  type: "stat" | "image" | "feature" | "list";
  title: string;
  stat?: string;
  statLabel?: string;
  description?: string;
  image?: string;
  items?: { label: string; value: string }[];
  dark?: boolean;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export const companiesServices: CompanyServiceItem[] = [
  { type: "stat", title: "Projects Delivered", stat: "150+", statLabel: "Across all three divisions combined.", colSpan: 1 },
  { type: "image", title: comp1?.description || "Consultancy", image: "/images/architecture.png", colSpan: 1, rowSpan: 2 },
  { type: "stat", title: "Countries Active", stat: "18", statLabel: "Global footprint spanning 5 continents.", dark: true, colSpan: 1 },
  { type: "feature", title: "Integrated Delivery", description: `${comp1?.name} (${comp1?.description}), ${comp2?.name} (${comp2?.description}), and ${comp3?.name} coordinated under one roof — ensuring zero fragmentation across any project lifecycle.`, colSpan: 2 },
  { type: "list", title: "Group Benchmarks", items: [{ label: "Avg. Client Satisfaction", value: "97%" }, { label: "On-Budget Delivery", value: "92%" }, { label: "Awards Won", value: "13+" }], colSpan: 1, rowSpan: 2 },
  { type: "image", title: comp2?.description || "Consultancy & Construction", image: "/images/interior.png", colSpan: 1 },
  { type: "stat", title: "Years of Excellence", stat: "15+", statLabel: "Defining spaces since 2010.", dark: true, colSpan: 1 },
  { type: "feature", title: "Material Intelligence", description: "INEX provides direct material supply to both Kolpoporishor and Kolpokowsol, ensuring specifications are met from factory to site.", colSpan: 1 },
];

export interface CompanyGalleryItem {
  src: string;
  label: string;
  company: string;
  span?: string;
  href?: string;
}

export const companiesGallery: CompanyGalleryItem[] = [
  {
    src: "/images/architecture.png",
    label: "Civic Landmark",
    company: "Kolpoporishor",
    href: "/kolpoporishor",
  },
  {
    src: "/images/interior.png",
    label: "Luxury Penthouse",
    company: "Kolpokowsol",
    href: "/kolpokowsol",
  },
  {
    src: "/images/materials.png",
    label: "Material Selection",
    company: "INEX",
    href: "/inex",
  },
  {
    src: "/images/hero_architecture.png",
    label: "Urban Complex",
    company: "Kolpoporishor",
    href: "/kolpoporishor",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    label: "Hospitality Suite",
    company: "Kolpokowsol",
    href: "/kolpokowsol",
  },
  {
    src: "/images/about_hero.png",
    label: "Atelier Pavilion",
    company: "INEX",
    href: "/inex",
  },
];

export interface EngagementParameter {
  label: string;
  value: string;
}

export interface EngagementModel {
  index: string;
  tag: string;
  scope: string;
  title: string;
  summary: string;
  parameters: EngagementParameter[];
  highlight: boolean;
  cta: string;
}

export const engagementFramework: EngagementModel[] = [
  {
    index: "01",
    tag: "MODE // 01",
    scope: "Independent Division",
    title: "Specialist Commission",
    summary: "Direct appointment of Kolpoporishor, Kolpokowsol, or INEX as autonomous specialists for focused architectural, interior, or material scopes.",
    parameters: [
      { label: "ENGAGEMENT", value: "Single-discipline scope under direct subsidiary principal leadership" },
      { label: "INTERFACE", value: "Integrates directly with client teams, external architects, or general contractors" },
      { label: "DELIVERY", value: "Dedicated division SLA, independent milestone sign-offs, and specialized deliverables" },
    ],
    highlight: false,
    cta: "Commission Specialist",
  },
  {
    index: "02",
    tag: "MODE // 02 · UNIFIED TRIAD [RECOMMENDED]",
    scope: "Full Closed-Loop Triad",
    title: "Turnkey Group Delivery",
    summary: `Complete tripartite execution synchronizing ${comp1?.description?.toLowerCase() || "consultancy"}, ${comp2?.description?.toLowerCase() || "consultancy & construction"}, and material supply under one unified holding agreement.`,
    parameters: [
      { label: "ENGAGEMENT", value: "Synchronized triad execution across Kolpoporishor + Kolpokowsol + INEX" },
      { label: "INTERFACE", value: "Unified project directorship with a single point of executive accountability" },
      { label: "DELIVERY", value: "Single master contract, synchronized BIM modeling, and zero contractor scope gaps" },
    ],
    highlight: true,
    cta: "Initiate Group Delivery",
  },
  {
    index: "03",
    tag: "MODE // 03",
    scope: "Supply Chain Network",
    title: "Material Partnership",
    summary: "Strategic material specification, quarry-direct stone sourcing, custom fabrication, and door-to-site international logistics via INEX.",
    parameters: [
      { label: "ENGAGEMENT", value: "Direct trade supply and custom architectural fabrication for developers and studios" },
      { label: "INTERFACE", value: "Dedicated material engineer and international freight logistics coordination" },
      { label: "DELIVERY", value: "Factory batch certification, pre-assembly dry-lay reviews, and insured transit" },
    ],
    highlight: false,
    cta: "Procurement Inquiry",
  },
];
