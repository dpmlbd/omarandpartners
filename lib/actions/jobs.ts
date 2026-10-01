"use server";

import { requireStaff } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { DbJob } from "@/types/database";

export async function getJobs(publishedOnly?: boolean): Promise<DbJob[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("jobs")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching jobs:", error);
      return [];
    }
    return (data as DbJob[]) || [];
  } catch (err) {
    console.error("Error in getJobs:", err);
    return [];
  }
}

function parseList(input: unknown): string[] {
  if (Array.isArray(input)) return input.map((s) => String(s).trim()).filter(Boolean);
  if (typeof input !== "string") return [];
  return input
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-•*]\s*/, ""))
    .filter((line) => line.length > 0);
}

export async function createJobAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string; job?: DbJob }> {
  try {
    await requireStaff();

    const title = (formData.get("title") as string)?.trim();
    const division = (formData.get("division") as string)?.trim();
    const company_name = (formData.get("company_name") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const job_type = ((formData.get("job_type") as string) || "Full-Time").trim();
    const experience = (formData.get("experience") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim();
    const requirements = parseList(formData.get("requirements"));
    const benefits = parseList(formData.get("benefits"));
    const application_email =
      (formData.get("application_email") as string)?.trim() || "info@onp-bd.com";
    const published = formData.get("published") === "true";
    const display_order = parseInt((formData.get("display_order") as string) || "0", 10) || 0;

    if (!title || !division || !company_name || !location || !description) {
      return { error: "Please fill in all mandatory job fields: Title, Division, Company, Location, and Description." };
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("jobs")
      .insert({
        title,
        division,
        company_name,
        location,
        job_type,
        experience,
        description,
        requirements,
        benefits,
        application_email,
        published,
        display_order,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating job:", error);
      return { error: error.message };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, job: data as DbJob };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create job opening.";
    return { error: msg };
  }
}

export async function updateJobAction(
  id: string,
  formData: FormData
): Promise<{ success?: boolean; error?: string; job?: DbJob }> {
  try {
    await requireStaff();

    const title = (formData.get("title") as string)?.trim();
    const division = (formData.get("division") as string)?.trim();
    const company_name = (formData.get("company_name") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const job_type = ((formData.get("job_type") as string) || "Full-Time").trim();
    const experience = (formData.get("experience") as string)?.trim() || null;
    const description = (formData.get("description") as string)?.trim();
    const requirements = parseList(formData.get("requirements"));
    const benefits = parseList(formData.get("benefits"));
    const application_email =
      (formData.get("application_email") as string)?.trim() || "info@onp-bd.com";
    const published = formData.get("published") === "true";
    const display_order = parseInt((formData.get("display_order") as string) || "0", 10) || 0;

    if (!title || !division || !company_name || !location || !description) {
      return { error: "Please fill in all mandatory job fields: Title, Division, Company, Location, and Description." };
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("jobs")
      .update({
        title,
        division,
        company_name,
        location,
        job_type,
        experience,
        description,
        requirements,
        benefits,
        application_email,
        published,
        display_order,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating job:", error);
      return { error: error.message };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, job: data as DbJob };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update job opening.";
    return { error: msg };
  }
}

export async function toggleJobPublishedAction(
  id: string,
  published: boolean
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const admin = createAdminClient();
    const { error } = await admin
      .from("jobs")
      .update({ published, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to toggle job visibility.";
    return { error: msg };
  }
}

export async function deleteJobAction(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const admin = createAdminClient();
    const { error } = await admin.from("jobs").delete().eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete job.";
    return { error: msg };
  }
}
