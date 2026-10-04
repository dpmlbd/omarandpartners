export interface DivisionCapability {
  id: string;
  title: string;
  desc: string;
}

export const coreCapabilitiesIntro =
  "We bring designers, engineers, and consultants to the same table to deliver end-to-end solutions by removing the friction of disconnected contractors, our unified team ensures project details are executed flawlessly and brilliant concepts are never lost in translation. We are entirely focused on client satisfaction and value, providing tight budget and timeline controls through dedicated program management and post-construction commissioning. As a premier facilitator, we leverage this unique local strength to champion sustainable, eco-responsive design while driving a steady 10% annual growth into advanced global markets. Project lifecycle at a glance-";

export const sharedCapabilities: DivisionCapability[] = [
  {
    id: "01",
    title: "Planning & Architecture",
    desc: "Urban And Architectural Planning, 3D Modeling, Sustainable Design & Government Approval Drawings.",
  },
  {
    id: "02",
    title: "Engineering",
    desc: "Comprehensive Sub-soil Investigation, Seismic Analysis, Structural Design, And Full MEP (Mechanical, Electrical, Plumbing) And Fire Safety Systems.",
  },
  {
    id: "03",
    title: "Interior Design",
    desc: "Functional Space Planning, 3D Interior Views, Site Implementation & Supervision.",
  },
  {
    id: "04",
    title: "Program Management",
    desc: "Cost Estimation, Project Scheduling, Contract Bidding, Government Agency Coordination, And Strict Construction Inspection.",
  },
  {
    id: "05",
    title: "Post-Construction",
    desc: "As-built Building Commissioning, Control System Validation, Warranty Reviews & Post-occupancy Evaluations.",
  },
];

/* ─────────────────────────────────────────────────────────────
 * Division exports (both share the unified capabilities data)
 * ───────────────────────────────────────────────────────────── */
export const kolpoporishorCapabilities: DivisionCapability[] = sharedCapabilities;
export const kolpokowsolCapabilities: DivisionCapability[] = sharedCapabilities;
