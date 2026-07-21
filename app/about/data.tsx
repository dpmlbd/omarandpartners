import {
  RiShakeHandsLine,
  RiLightbulbLine,
  RiBuilding4Line,
  RiEarthLine,
  RiTeamLine,
  RiAwardLine,
} from "@remixicon/react";

export const stats = [
  { value: "15+", label: "Years of Excellence" },
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
    name: "Omar Al-Rashid",
    role: "Founder & CEO",
    bio: "A visionary leader with over 25 years of experience across architecture, real estate development, and design. Omar's philosophy centers on creating built environments that endure.",
    image: "/images/architecture.png",
    tag: "01",
  },
  {
    name: "Layla Mansour",
    role: "Chief Design Officer",
    bio: "Layla leads the design identity across all three companies, ensuring a coherent aesthetic language that bridges architecture, interiors, and material selection.",
    image: "/images/interior.png",
    tag: "02",
  },
  {
    name: "Nasser Hoque",
    role: "Managing Director, INEX",
    bio: "With a background in structural engineering and global supply chain management, Nasser has positioned INEX as the region's premier materials sourcing network.",
    image: "/images/materials.png",
    tag: "03",
  },
  {
    name: "Sara Chowdhury",
    role: "Head of Architecture, Kolpoporisor",
    bio: "Sara brings a rigorous design methodology to every project. Her work has won international recognition for blending regional identity with modernist principles.",
    image: "/images/hero_architecture.png",
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

export const timeline = [
  { year: "2010", title: "Foundation", desc: "Omar Al-Rashid establishes Omar & Partners as a boutique architecture consultancy." },
  { year: "2013", title: "Kolpoporisor Launch", desc: "Kolpoporisor is incorporated as a dedicated architecture firm, winning its first major urban planning commission." },
  { year: "2016", title: "Interior Division", desc: "Kolpokowsol is established to meet growing demand for integrated interior design services." },
  { year: "2019", title: "INEX Materials", desc: "INEX is launched to provide end-to-end material sourcing, completing the ONP ecosystem." },
  { year: "2022", title: "International Expansion", desc: "ONP expands operations across 12 countries, completing landmark projects on three continents." },
  { year: "2026", title: "New Era", desc: "ONP unveils its new global headquarters and rebrands under a unified design philosophy." },
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
