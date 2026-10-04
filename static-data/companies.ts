import { siteConfig } from "@/config/site";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];

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
  {
    type: "image",
    title: comp1?.name || "Kolpoporishor",
    image: "/images/kp_hero.jpg",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "feature",
    title: "Planning & Architecture",
    description: "Urban and architectural planning, 3D modeling, sustainable design, and government approval drawings.",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "feature",
    title: "Engineering",
    description: "Comprehensive sub-soil investigation, seismic analysis, structural design, and full MEP and fire safety systems.",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "image",
    title: comp2?.name || "Kolpokowsol",
    image: "/images/kk_hero.jpg",
    colSpan: 1,
    rowSpan: 2,
  },
  {
    type: "feature",
    title: "Interior Design",
    description: "Functional space planning, 3D interior views, custom joinery, site implementation, and supervision.",
    colSpan: 1,
    rowSpan: 1,
    dark: true,
  },
  {
    type: "feature",
    title: "Program Management",
    description: "Cost estimation, project scheduling, contract bidding, government agency coordination, and strict construction inspection.",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    type: "feature",
    title: "Integrated Delivery",
    description: "We bring designers, engineers, and consultants to the same table to deliver end-to-end solutions, eliminating contractor friction and executing project details flawlessly.",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    type: "feature",
    title: "Post-Construction",
    description: "As-built building commissioning, control system validation, warranty reviews, and post-occupancy evaluations.",
    colSpan: 2,
    rowSpan: 1,
    dark: true,
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
    summary: "Direct appointment of Kolpoporishor or Kolpokowsol as autonomous specialists for focused architectural, interior, or engineering scopes.",
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
    tag: "MODE // 02 · UNIFIED DELIVERY [RECOMMENDED]",
    scope: "Full Closed-Loop Delivery",
    title: "Turnkey Group Delivery",
    summary: `Complete multidisciplinary execution synchronizing ${comp1?.description?.toLowerCase() || "consultancy"} and ${comp2?.description?.toLowerCase() || "consultancy & construction"} under one unified holding agreement.`,
    parameters: [
      { label: "ENGAGEMENT", value: "Synchronized dual-division execution across Kolpoporishor + Kolpokowsol" },
      { label: "INTERFACE", value: "Unified project directorship with a single point of executive accountability" },
      { label: "DELIVERY", value: "Single master contract, synchronized BIM modeling, and zero contractor scope gaps" },
    ],
    highlight: true,
    cta: "Initiate Group Delivery",
  },
  {
    index: "03",
    tag: "MODE // 03 · COMING SOON",
    scope: "Material Network",
    title: "Material Partnership",
    summary: "Strategic material specification, quarry sourcing, and door-to-site international logistics currently in development under INEX.",
    parameters: [
      { label: "STATUS", value: "Currently in development — launching soon under INEX" },
      { label: "INTERFACE", value: "Dedicated material logistics coordination upon activation" },
      { label: "DELIVERY", value: "Factory batch certification and insured transit" },
    ],
    highlight: false,
    cta: "Inquire Future Scope",
  },
];
