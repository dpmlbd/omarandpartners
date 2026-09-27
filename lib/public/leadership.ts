import { createClient } from "@/lib/supabase/server";

export interface Leader {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  tag: string;
}

const DEFAULT_LEADER_IMAGES = [
  "/images/architecture.png",
  "/images/interior.png",
  "/images/hero_architecture.png",
  "/images/materials.png",
];

function getRoleRank(designation: string, teamType: string): number {
  const d = (designation || "").toLowerCase();
  const t = (teamType || "").toLowerCase();

  if (d.includes("ceo") || d.includes("principal")) return 1;
  if (d.includes("coo") || d.includes("chief operating")) return 2;
  if (d.includes("head")) return 3;
  if (t === "team lead") return 4;
  if (d.includes("lead")) return 5;
  return 6;
}

/**
 * Fetches leadership personnel dynamically from the Supabase backend.
 * Queries members categorized under Team Lead or holding key leadership designations.
 */
export async function fetchLeadership(): Promise<Leader[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("team")
      .select("*")
      .or(
        "team_type.eq.Team Lead,team_type.ilike.%leadership%,designation.ilike.%CEO%,designation.ilike.%COO%,designation.ilike.%Head of Design Studio%,designation.ilike.%Lead%"
      )
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching leadership members from Supabase:", error);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Sort by executive rank (CEO -> COO -> Head of Design Studio -> Team Leads)
    const sorted = [...data].sort((a, b) => {
      const rankA = getRoleRank(a.designation, a.team_type);
      const rankB = getRoleRank(b.designation, b.team_type);
      return rankA - rankB;
    });

    return sorted.map((member, index) => {
      const bio =
        member.bio ||
        (member.study
          ? `${member.designation} with specialized credentials: ${member.study}.`
          : `${member.designation} at Omar & Partners.`);

      const image =
        member.image ||
        DEFAULT_LEADER_IMAGES[index % DEFAULT_LEADER_IMAGES.length];

      return {
        id: member.id,
        name: member.name,
        role: member.designation,
        bio,
        image,
        tag: String(index + 1).padStart(2, "0"),
      };
    });
  } catch (err) {
    console.error("Database query failed in fetchLeadership:", err);
    return [];
  }
}
