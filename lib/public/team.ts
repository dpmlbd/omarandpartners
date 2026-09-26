import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/types/database";

export interface PublicTeamMemberItem {
  id?: string;
  name: string;
  designation: string;
  study?: string | null;
}

export interface PublicTeamGroup {
  teamName: string;
  teamSlug: string;
  members: PublicTeamMemberItem[];
}

export const PREFERRED_TEAM_ORDER = [
  "Team Lead",
  "Design Team",
  "Structural Team",
  "Project Management & Site Supervision Team",
  "Electrical Team",
  "Supply Chain Team",
  "Accounts & Admin",
  "Office Co-ordination Team",
];

export function groupMembersIntoTeams(
  members: { name: string; designation: string; team_type: string; study?: string | null; id?: string }[]
): PublicTeamGroup[] {
  const groupsMap = new Map<string, PublicTeamGroup>();

  // Initialize in preferred order
  PREFERRED_TEAM_ORDER.forEach((teamName) => {
    const teamSlug = teamName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    groupsMap.set(teamName, {
      teamName,
      teamSlug,
      members: [],
    });
  });

  members.forEach((m) => {
    const teamName = m.team_type?.trim() || "General";
    const teamSlug = teamName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (!groupsMap.has(teamName)) {
      groupsMap.set(teamName, {
        teamName,
        teamSlug,
        members: [],
      });
    }

    groupsMap.get(teamName)!.members.push({
      id: m.id,
      name: m.name,
      designation: m.designation,
      study: m.study,
    });
  });

  // Filter out empty groups
  return Array.from(groupsMap.values()).filter((g) => g.members.length > 0);
}

export async function fetchPublicTeams(): Promise<PublicTeamGroup[]> {
  try {
    const supabase = await createClient();
    const { data: teamMembers, error } = await supabase
      .from("team")
      .select("id, name, designation, team_type, study, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching team members from database:", error);
      return [];
    }

    if (teamMembers && teamMembers.length > 0) {
      return groupMembersIntoTeams(teamMembers as unknown as TeamMember[]);
    }
  } catch (err) {
    console.error("Database query failed:", err);
  }

  return [];
}
