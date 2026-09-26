import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { getModerators } from "@/lib/actions/moderators";
import { redirect } from "next/navigation";
import { ModeratorsClient } from "@/components/admin/moderators-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Moderators Management",
};

export default async function ModeratorsPage() {
  const { profile } = await getCurrentUserAndProfile();

  // Strict server-side authorization check: only Admin can access
  if (!profile || profile.role !== "admin") {
    redirect("/admin");
  }

  const moderators = await getModerators();

  return <ModeratorsClient initialModerators={moderators} />;
}
