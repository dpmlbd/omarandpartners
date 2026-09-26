import {
  RiShakeHandsLine,
  RiLightbulbLine,
  RiBuilding4Line,
  RiEarthLine,
  RiTeamLine,
  RiAwardLine,
} from "@remixicon/react";

export const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "120+", label: "Projects Delivered" },
  { value: "3", label: "Specialized Companies" },
  { value: "18", label: "Countries Reached" },
];

export interface Leader {
  name: string;
  role: string;
  bio: string;
  image: string;
  tag: string;
}

export const leadership: Leader[] = [
  {
    name: "Ar. Abdullah Al Omar MIAB",
    role: "Principal Architect & CEO",
    bio: "Principal Architect and visionary CEO steering design innovation and sustainable development across the entire ONP ecosystem. B.Arch (SUST), PM (EDCP)-Japan, MSGED (UIU).",
    image: "/images/architecture.png",
    tag: "01",
  },
  {
    name: "Engr. Md. Mohiuddin Ovi MIEB",
    role: "Chief Operating Officer (COO)",
    bio: "Driving rigorous engineering standards, operational excellence, and seamless project execution across multi-disciplinary ventures. B.Sc-Civil (CUET), PGD-PM (Edu Pro, UK).",
    image: "/images/interior.png",
    tag: "02",
  },
  {
    name: "Ar. Avijit Saha MIAB",
    role: "Head of Design Studio",
    bio: "Guiding the creative concept development and design methodology across architecture and interior projects. B.Arch (KU).",
    image: "/images/hero_architecture.png",
    tag: "03",
  },
  {
    name: "Ar. Sayed Aziz MIAB",
    role: "Project Team Lead",
    bio: "Spearheading complex spatial planning and sustainable urban initiatives with specialized international expertise. B.Arch (SUST), M.Urban Design (HKU).",
    image: "/images/materials.png",
    tag: "04",
  },
];

export const coreValues = [
  { icon: <RiLightbulbLine size={20} />, title: "Innovation", desc: "We challenge conventional thinking to create environments that redefine possibilities." },
  { icon: <RiBuilding4Line size={20} />, title: "Integrity", desc: "Every decision is made with transparency, honesty, and a commitment to delivering what we promise." },
  { icon: <RiEarthLine size={20} />, title: "Sustainability", desc: "We design for the future, integrating ecological responsibility into every phase of our process." },
  { icon: <RiTeamLine size={20} />, title: "Collaboration", desc: "Great spaces emerge from the synergy of diverse minds, disciplines, and perspectives." },
  { icon: <RiShakeHandsLine size={20} />, title: "Excellence", desc: "We hold ourselves to the highest standards of craft, service, and professional accountability." },
  { icon: <RiAwardLine size={20} />, title: "Legacy", desc: "We build not just for today, but to leave enduring marks on the communities we serve." },
];

import { siteConfig } from "@/config/site";

const compHolding = siteConfig.companies[0];
const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export const timeline = [
  { year: "2015", title: "Foundation", desc: `${compHolding?.name || "Omar & Partners"} is established with an ambitious goal to become one of Bangladesh's most trusted partners in architectural and engineering solutions.` },
  { year: "2017", title: `${comp1?.name || "Kolpoporisor"} Expansion`, desc: `${comp1?.name || "Kolpoporisor"} establishes itself as a premier ${comp1?.description?.toLowerCase() || "consultancy"} studio.` },
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
  "Henkel AG", "Saint-Gobain", "Lafarge Holcim", "Zaha Hadid Architects",
  "Arup Group", "Foster + Partners", "Gensler", "HOK",
];

export const awardStats = [
  { value: "12", label: "International Awards" },
  { value: "8", label: "Design Honors" },
  { value: "3", label: "LEED Certifications" },
  { value: "5", label: "Forbes Recognitions" },
];
