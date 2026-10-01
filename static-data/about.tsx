import {
  RiShakeHandsLine,
  RiLightbulbLine,
  RiBuilding4Line,
  RiEarthLine,
  RiTeamLine,
  RiAwardLine,
} from "@remixicon/react";
import { siteConfig } from "@/config/site";

const compHolding = siteConfig.companies[0];
const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export interface AboutStatItem {
  value: string;
  label: string;
}

export const aboutStats: AboutStatItem[] = [
  { value: "10+", label: "Years of Excellence" },
  { value: "120+", label: "Projects Delivered" },
  { value: "3", label: "Specialized Companies" },
  { value: "18", label: "Countries Reached" },
];

export const stats = aboutStats;

export interface CoreValueItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const coreValues: CoreValueItem[] = [
  { icon: <RiLightbulbLine size={20} />, title: "Innovation", desc: "We challenge conventional thinking to create environments that redefine possibilities." },
  { icon: <RiBuilding4Line size={20} />, title: "Integrity", desc: "Every decision is made with transparency, honesty, and a commitment to delivering what we promise." },
  { icon: <RiEarthLine size={20} />, title: "Sustainability", desc: "We design for the future, integrating ecological responsibility into every phase of our process." },
  { icon: <RiTeamLine size={20} />, title: "Collaboration", desc: "Great spaces emerge from the synergy of diverse minds, disciplines, and perspectives." },
  { icon: <RiShakeHandsLine size={20} />, title: "Excellence", desc: "We hold ourselves to the highest standards of craft, service, and professional accountability." },
  { icon: <RiAwardLine size={20} />, title: "Legacy", desc: "We build not just for today, but to leave enduring marks on the communities we serve." },
];

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export const timeline: TimelineItem[] = [
  { year: "2015", title: "Foundation", desc: `${compHolding?.name || "Omar & Partners"} is established with an ambitious goal to become one of Bangladesh's most trusted partners in architectural and engineering solutions.` },
  { year: "2017", title: `${comp1?.name || "Kolpoporishor"} Expansion`, desc: `${comp1?.name || "Kolpoporishor"} establishes itself as a premier ${comp1?.description?.toLowerCase() || "consultancy"} studio.` },
  { year: "2019", title: `${comp2?.name || "Kolpokowsol"} Launch`, desc: `${comp2?.name || "Kolpokowsol"} is incorporated to deliver integrated ${comp2?.description?.toLowerCase() || "consultancy & construction"} services.` },
  { year: "2021", title: `${comp3?.name || "INEX"} Operations`, desc: `${comp3?.name || "INEX"} begins operations for specialized interior management and supply chain sourcing.` },
  { year: "2024", title: "Ecosystem Integration", desc: "Consolidation under a unified collaborative leadership team delivering cohesive turnkey solutions." },
  { year: "2026", title: "New Era", desc: "Nurturing local creative talent, embracing advanced technologies, and expanding unique services into global markets." },
];

export interface AwardItem {
  year: string;
  name: string;
  body: string;
}

export const awards: AwardItem[] = [
  { year: "2024", name: "Aga Khan Award for Architecture", body: "International — Architecture" },
  { year: "2023", name: "World Architecture Festival", body: "Berlin, Germany — Best Office" },
  { year: "2023", name: "Interior Design Excellence Award", body: "Regional — Residential" },
  { year: "2022", name: "Green Building Council Certification", body: "LEED Platinum — INEX" },
  { year: "2021", name: "A+Awards — Architecture", body: "Architizer — Residential" },
  { year: "2020", name: "Forbes Middle East Top 50 Design Firms", body: "Forbes — Business" },
];

export const partners = [
  "Henkel AG",
  "Saint-Gobain",
  "Lafarge Holcim",
  "Zaha Hadid Architects",
  "Arup Group",
  "Foster + Partners",
  "Gensler",
  "HOK",
];

export interface AwardStatItem {
  value: string;
  label: string;
}

export const awardStats: AwardStatItem[] = [
  { value: "12", label: "International Awards" },
  { value: "8", label: "Design Honors" },
  { value: "3", label: "LEED Certifications" },
  { value: "5", label: "Forbes Recognitions" },
];
