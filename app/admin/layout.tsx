import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { DashboardShell } from "@/components/admin/dashboard-shell";

export const metadata = {
  title: "ONP | Content Management Portal",
  description: "Omar & Partners CMS Dashboard",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getCurrentUserAndProfile();

  return (
    <DashboardShell profile={profile} userEmail={user?.email}>
      {children}
    </DashboardShell>
  );
}
