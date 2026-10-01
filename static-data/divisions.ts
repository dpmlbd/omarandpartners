export interface DivisionStat {
  value: string;
  label: string;
}

export interface DivisionCapability {
  id: string;
  title: string;
  desc: string;
}

export interface DivisionService {
  id: string;
  title: string;
  desc: string;
  image: string;
}

/* ─────────────────────────────────────────────────────────────
 * KOLPOPORISHOR (Consultancy Division)
 * ───────────────────────────────────────────────────────────── */
export const kolpoporishorStats: DivisionStat[] = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12", label: "Countries Active" },
  { value: "18 mo.", label: "Avg. Build Duration" },
  { value: "08", label: "Design Awards" },
];

export const kolpoporishorCapabilities: DivisionCapability[] = [
  { id: "01", title: "Urban Master Planning", desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm." },
  { id: "02", title: "Monumental Structures", desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty." },
  { id: "03", title: "Sustainable Design", desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision." },
  { id: "04", title: "BIM & Digital Twin", desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination." },
  { id: "05", title: "Construction Administration", desc: "On-site representation and rigorous documentation to protect design intent through build." },
  { id: "06", title: "Heritage & Adaptive Reuse", desc: "Sensitive interventions that honor historical fabric while enabling new programming." },
];

export const kolpoporishorServices: DivisionService[] = [
  {
    id: "01",
    title: "Urban Master Planning",
    desc: "Comprehensive city-scale strategies that balance density, circulation, and public realm. We shape the framework within which buildings and communities thrive.",
    image: "/images/architecture.png",
  },
  {
    id: "02",
    title: "Monumental Structures",
    desc: "Iconic buildings designed to become landmarks through structural clarity and material honesty. Every proportion is considered.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "03",
    title: "Sustainable Design",
    desc: "Net-zero strategies, passive systems, and lifecycle analysis woven into every schematic decision. Performance and poetry are not opposites.",
    image: "/images/architecture.png",
  },
  {
    id: "04",
    title: "BIM & Digital Twin",
    desc: "Advanced modeling and simulation tools that reduce risk and accelerate coordination across disciplines.",
    image: "/images/hero_architecture.png",
  },
  {
    id: "05",
    title: "Construction Administration",
    desc: "On-site representation and rigorous documentation to protect design intent through the build process.",
    image: "/images/architecture.png",
  },
  {
    id: "06",
    title: "Heritage & Adaptive Reuse",
    desc: "Sensitive interventions that honor historical fabric while enabling new programming and extended lifespan.",
    image: "/images/hero_architecture.png",
  },
];

/* ─────────────────────────────────────────────────────────────
 * KOLPOKOWSOL (Consultancy & Construction Division)
 * ───────────────────────────────────────────────────────────── */
export const kolpokowsolStats: DivisionStat[] = [
  { value: "80+", label: "Interiors Delivered" },
  { value: "5★", label: "Avg. Client Rating" },
  { value: "40%", label: "Bespoke Pieces" },
  { value: "05", label: "Design Awards" },
];

export const kolpokowsolCapabilities: DivisionCapability[] = [
  { id: "01", title: "Residential", desc: "Luxury homes, penthouses, and estates designed around the rituals and rhythms of daily life." },
  { id: "02", title: "Hospitality", desc: "Hotels, restaurants, and lounges where atmosphere is the product and every detail serves the narrative." },
  { id: "03", title: "Workplace", desc: "Offices that balance productivity with wellbeing, brand expression with human comfort." },
  { id: "04", title: "Retail", desc: "Spaces that invite exploration and translate brand identity into physical experience." },
  { id: "05", title: "Wellness", desc: "Spas, clinics, and wellness centers designed to calm, restore, and inspire." },
  { id: "06", title: "Bespoke Joinery", desc: "Custom furniture and built-in millwork crafted by master artisans to exacting specifications." },
];

export const kolpokowsolServices: DivisionService[] = [
  {
    id: "01",
    title: "Residential Interiors",
    desc: "Bespoke homes that reflect the lives of those who inhabit them. From penthouses to countryside estates, we craft spaces of quiet luxury.",
    image: "/images/interior.png",
  },
  {
    id: "02",
    title: "Hospitality Design",
    desc: "Hotels, restaurants, and lounges that tell a story. We design environments that guests remember long after they leave.",
    image: "/images/materials.png",
  },
  {
    id: "03",
    title: "Workplace & Corporate",
    desc: "Offices that inspire productivity and belonging. Our workplace designs balance brand expression with human comfort.",
    image: "/images/interior.png",
  },
  {
    id: "04",
    title: "Material Curation",
    desc: "A dedicated materials library spanning natural stone, rare timber, bespoke textiles, and custom joinery — sourced through INEX.",
    image: "/images/materials.png",
  },
  {
    id: "05",
    title: "Lighting & Atmosphere",
    desc: "Lighting is the most emotional element of interior design. We design layered schemes that shift with the day and the mood.",
    image: "/images/interior.png",
  },
  {
    id: "06",
    title: "FF&E Specification",
    desc: "Furniture, fixtures, and equipment specified down to the last detail. Every object is chosen for its contribution to the whole.",
    image: "/images/materials.png",
  },
];
