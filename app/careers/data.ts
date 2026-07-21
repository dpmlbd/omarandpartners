export interface Job {
  id: string;
  title: string;
  division: string;
  companyName: string;
  location: string;
  type: string;
  desc: string;
  requirements: string[];
  benefits: string[];
}

export const jobs: Job[] = [
  {
    id: "snr-arch-kp",
    title: "Senior Architect",
    division: "Kolpoporisor (Architecture)",
    companyName: "Kolpoporisor",
    location: "New York, USA",
    type: "Full-Time",
    desc: "We are seeking a Senior Architect to lead design teams on large-scale monumental and institutional projects. You will be responsible for schematic designs, client relations, and overseeing the execution of architectural vision.",
    requirements: [
      "8+ years of experience in lead design roles within premium architectural firms.",
      "Master's Degree in Architecture (M.Arch) or equivalent.",
      "Proficiency in Revit, Rhino, and rendering suites (V-Ray, Twinmotion).",
      "Proven portfolio of institutional, cultural, or large-scale commercial work.",
      "Licensure in New York State or equivalent regional credentials."
    ],
    benefits: [
      "Competitive executive salary & performance bonuses.",
      "Comprehensive health, dental, and vision insurance.",
      "Annual study trips and professional development budgets.",
      "401(k) retirement match program."
    ]
  },
  {
    id: "int-des-kk",
    title: "Lead Interior Designer",
    division: "Kolpokowsol (Interior Design)",
    companyName: "Kolpokowsol",
    location: "Brooklyn, NY",
    type: "Full-Time",
    desc: "Kolpokowsol is looking for a Lead Interior Designer to curate premium residential and hospitality interiors. You will conceptualize interior architecture, source custom furniture, and direct materials specification.",
    requirements: [
      "5+ years of experience specializing in high-end residential or luxury boutique hospitality.",
      "Bachelor's Degree in Interior Design or Interior Architecture.",
      "Strong material knowledge and global sourcing network contact.",
      "Proficiency in CAD, SketchUp, and Adobe Creative Suite.",
      "Excellent client presentation and communication skills."
    ],
    benefits: [
      "Competitive compensation & project performance bonuses.",
      "Flexible hybrid working models.",
      "Access to premium design databases & global design weeks.",
      "Paid family leave and health credits."
    ]
  },
  {
    id: "mat-spec-inex",
    title: "Materials Sourcing Specialist",
    division: "INEX (Building Materials)",
    companyName: "INEX",
    location: "Logistics City, NJ",
    type: "Full-Time",
    desc: "INEX Sourcing is recruiting a Materials Sourcing Specialist to manage supplier relations and quality control of high-end raw finishes, natural stone, and structural cladding.",
    requirements: [
      "4+ years of experience in architectural materials supply chain or structural procurement.",
      "Degree in Material Science, Civil Engineering, or Supply Chain Management.",
      "Familiarity with global import regulations and logistics networks.",
      "Strong negotiation and technical specifications review capabilities.",
      "Fluency in Italian, Portuguese, or Chinese is a major asset."
    ],
    benefits: [
      "Base salary + procurement commission structures.",
      "Comprehensive health plan and fitness allowances.",
      "International travel for factory audits and supply checks.",
      "Generous training and credentials budget."
    ]
  }
];

export interface TabItem {
  name: string;
  tag: string;
  image: string;
  culture: string;
  benefits: string;
  quote: string;
  quoteAuthor: string;
}

export const tabs: TabItem[] = [
  {
    name: "ONP",
    tag: "Holding Group",
    image: "/images/hero_architecture.png",
    culture: "Omar & Partners is the holding group that orchestrates a unified ecosystem of architecture, interior design, and materials. The culture here is defined by strategic oversight, cross-division collaboration, and a commitment to long-term excellence. Leaders here don't just manage — they connect, inspire, and set the vision that guides every division.",
    benefits: "Executive-level benefits including performance equity, comprehensive health coverage for families, global relocation support, annual strategic retreats, and continuous leadership development through partnerships with top business schools.",
    quote: "We don't build companies. We build ecosystems where talent thrives and design flourishes.",
    quoteAuthor: "Omar Al-Rashid, Founder & Chairman",
  },
  {
    name: "Kolpokowsol",
    tag: "Interior Design",
    image: "/images/interior.png",
    culture: "Kolpokowsol is an aesthetic laboratory where color, materials, and furniture customization converge. The studio environment is collaborative, tactile, and endlessly iterative. Designers here are encouraged to experiment, to fail fast, and to refine until every detail serves the narrative. Weekly material explorations and client charrettes keep the energy fresh.",
    benefits: "Creative stipend for materials and travel, flexible studio hours, wellness programs, professional development budget for courses and exhibitions, and regular team retreats to design capitals worldwide.",
    quote: "We breathe soul into spatial shells — one detail, one fabric, one conversation at a time.",
    quoteAuthor: "Lina Kowalski, Creative Director",
  },
  {
    name: "Kolpoporisor",
    tag: "Architecture",
    image: "/images/architecture.png",
    culture: "Kolpoporisor is a rigorous architectural studio where grand scales meet blueprint precision. The culture is intellectually demanding but deeply collegial. Architects here tackle monumental, public-facing designs that reshape skylines. The studio operates like a think-tank — debates are encouraged, models are critiqued publicly, and the best ideas win regardless of seniority.",
    benefits: "Project ownership from concept to completion, international exposure through global commissions, access to advanced BIM and simulation tools, mentorship from award-winning principals, and a clear path to partnership.",
    quote: "Architecture is not about buildings. It's about the spaces between them, the light within them, and the lives lived inside them.",
    quoteAuthor: "Marcus Webb, Design Principal",
  },
  {
    name: "INEX",
    tag: "Materials & Logistics",
    image: "/images/materials.png",
    culture: "INEX operates at the intersection of design intent and construction reality. The culture is analytical, curious, and globally networked. Team members regularly travel to quarries, factories, and trade shows, bringing back samples, stories, and relationships. Problem-solving is collaborative — a sourcing challenge becomes a company-wide innovation sprint.",
    benefits: "Global travel opportunities, logistics and supply-chain training, industry conference access, health and safety certifications sponsored, and a results-driven bonus structure tied to supplier innovation.",
    quote: "Every great building begins with the right material. We make sure it arrives on time, in perfect condition.",
    quoteAuthor: "Elena Vasquez, Head of Procurement",
  },
];
