// ==============================================================================
// Omar & Partners (ONP) - Seed Team Data Script
// ==============================================================================
const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const teamMembers = [
  // Team Lead
  { name: "Ar. Abdullah Al Omar MIAB", designation: "Principal Architect & CEO", team_type: "Team Lead", study: "B.Arch (SUST), PM (EDCP)-Japan, MSGED (UIU)" },
  { name: "Engr. Md. Mohiuddin Ovi MIEB", designation: "COO", team_type: "Team Lead", study: "B.Sc-Civil (CUET), PGD-PM (Edu Pro, UK)" },
  { name: "Ar. Avijit Saha MIAB", designation: "Head of Design Studio", team_type: "Team Lead", study: "B.Arch (KU)" },

  // Structural Team
  { name: "Engr. Anurup Chowdhury FIEB", designation: "Structural Advisor", team_type: "Structural Team", study: null },
  { name: "Engr. Anisul Islam MIEB", designation: "Structural Engineer", team_type: "Structural Team", study: null },
  { name: "Engr. Shafiqul Islam MIEB", designation: "Structural Engineer", team_type: "Structural Team", study: "B.Sc-Civil (RUET)" },

  // Electrical Team
  { name: "Mrs. Sabrina Alam", designation: "Electrical Advisor", team_type: "Electrical Team", study: "Associate Professor, EEE, CU (Faculty)" },
  { name: "Engr. Rashedul Alam MIEB", designation: "Electrical Engineer", team_type: "Electrical Team", study: null },

  // Accounts & Admin
  { name: "Mr. Md. Rafi Ullah Rahel", designation: "Deputy Manager", team_type: "Accounts & Admin", study: null },

  // Design Team
  { name: "Ar. Sayed Aziz MIAB", designation: "Project Team Lead", team_type: "Design Team", study: "B.Arch (SUST), M.Urban Design (HKU)" },
  { name: "Ar. Munira Yeasmin AMIAB", designation: "Asst. Architect", team_type: "Design Team", study: "B.Arch (KU)" },
  { name: "Ar. Faisal Hossen MIAB", designation: "Asst. Architect", team_type: "Design Team", study: "B.Arch (AIUB)" },
  { name: "Ar. Tasfia Islam", designation: "Jr. Architect", team_type: "Design Team", study: "B.Arch (SUST)" },
  { name: "Ar. Pranta Dey AMIAB", designation: "Jr. Architect", team_type: "Design Team", study: "B.Arch (CUET)" },
  { name: "Mr. Mahmudul Islam Mamun", designation: "Sr. Executive (3D Visualizer)", team_type: "Design Team", study: "(BSPI)" },
  { name: "Ms. Sangita Barua", designation: "Executive (CAD Operator)", team_type: "Design Team", study: "(CPI)" },

  // Project Management & Site Supervision Team
  { name: "Engr. Abir Hossain", designation: "APM (Interior)", team_type: "Project Management & Site Supervision Team", study: "B.Sc-Civil (CIU)" },
  { name: "Engr. Belal Hosen", designation: "APM (Civil)", team_type: "Project Management & Site Supervision Team", study: "MIEB" },
  { name: "Engr. Md. Jahed Hossain", designation: "Asst. Engineer", team_type: "Project Management & Site Supervision Team", study: "Diploma in Civil Eng." },
  { name: "Engr. Md. Antor Hossain", designation: "Asst. Engineer", team_type: "Project Management & Site Supervision Team", study: "B.Sc-Civil (WIU)" },
  { name: "Engr. Md. Touhiduzzaman Tauhid", designation: "Asst. Engineer", team_type: "Project Management & Site Supervision Team", study: "B.Sc-Civil (WIU)" },

  // Supply Chain Team
  { name: "Mr. Md. Moin Uddin (Mahin)", designation: "Sr. Executive (SCM)", team_type: "Supply Chain Team", study: null },
  { name: "Mr. Md. Borhan Uddin", designation: "Officer (SCM)", team_type: "Supply Chain Team", study: null },
  { name: "Mr. Md. Anzam Mia", designation: "Officer (SCM)", team_type: "Supply Chain Team", study: null },
  { name: "Mr. Aman Uddin Nayeem", designation: "Jr. Officer (SCM)", team_type: "Supply Chain Team", study: null },

  // Office Co-ordination Team
  { name: "Mr. Md. Yasin Arafat", designation: "Office Asst.", team_type: "Office Co-ordination Team", study: null },
];

async function seed() {
  console.log("Seeding", teamMembers.length, "team members into Supabase...");
  
  // Try inserting without company_id first
  const { data, error } = await supabase.from("team").insert(teamMembers).select();
  if (error) {
    console.error("Insert error:", error);
    if (error.message.includes("study") || error.message.includes("company_id")) {
      console.log("\n-> Please execute the SQL migration in Supabase SQL Editor first:");
      console.log("   supabase/migrations/20260927_update_team_table_and_seed.sql\n");
    }
  } else {
    console.log("Successfully seeded", data.length, "team members!");
  }
}

seed();
