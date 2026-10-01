import { createClient } from "@/lib/supabase/server";
import { jobs as staticJobs, type Job } from "@/static-data/careers";
import type { DbJob } from "@/types/database";

export async function fetchPublicJobs(): Promise<Job[]> {
  try {
    const supabase = await createClient();
    const { data: dbJobs, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && dbJobs && dbJobs.length > 0) {
      return (dbJobs as DbJob[]).map((j) => ({
        id: j.id,
        title: j.title,
        division: j.division,
        companyName: j.company_name,
        location: j.location,
        type: j.job_type,
        experience: j.experience || undefined,
        desc: j.description,
        requirements: Array.isArray(j.requirements) ? j.requirements : [],
        benefits: Array.isArray(j.benefits) ? j.benefits : [],
        applicationEmail: j.application_email || "info@onp-bd.com",
      }));
    }
  } catch (err) {
    console.warn("Database jobs query skipped/errored, using static fallback:", err);
  }

  return staticJobs;
}
