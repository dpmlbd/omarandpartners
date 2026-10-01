import type { Metadata } from "next";
import { CareersView } from "./careers-view";
import { fetchPublicJobs } from "@/lib/public/careers";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "ONP | Careers",
  description: "Explore careers at Omar & Partners and join our multi-disciplinary team.",
};

export default async function CareersPage() {
  const jobs = await fetchPublicJobs();
  return <CareersView initialJobs={jobs} />;
}
