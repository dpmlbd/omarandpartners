import { getJobs } from "@/lib/actions/jobs";
import { CareersClient } from "@/components/admin/careers-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Careers & Jobs",
  description: "Manage job openings and career opportunities across Omar & Partners.",
};

export default async function AdminCareersPage() {
  const jobs = await getJobs();
  return <CareersClient initialJobs={jobs} />;
}
