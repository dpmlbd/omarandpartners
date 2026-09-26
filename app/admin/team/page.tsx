import { getTeamMembers } from "@/lib/actions/team";
import { TeamClient } from "@/components/admin/team-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Team Management",
};

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return <TeamClient initialMembers={members} />;
}
