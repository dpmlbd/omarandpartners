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

import { z } from "zod";

const jobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Job title must be at least 2 characters")
    .max(150, "Job title cannot exceed 150 characters"),
  division: z
    .string()
    .trim()
    .min(2, "Division label must be at least 2 characters")
    .max(100, "Division cannot exceed 100 characters"),
  company_name: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(150, "Location cannot exceed 150 characters"),
  job_type: z
    .string()
    .trim()
    .min(2, "Job type must be at least 2 characters")
    .max(50, "Job type cannot exceed 50 characters"),
  experience: z
    .string()
    .trim()
    .max(100, "Experience level cannot exceed 100 characters")
    .nullable()
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "Job description must be at least 10 characters")
    .max(10000, "Job description cannot exceed 10,000 characters"),
  application_email: z
    .string()
    .trim()
    .email("Please provide a valid application email address")
    .max(255, "Email address cannot exceed 255 characters"),
  display_order: z
    .number()
    .int("Display order must be an integer")
    .min(0, "Display order must be 0 or greater")
    .max(9999, "Display order is too large"),
  published: z.boolean(),
});

export async function createJobAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string; job?: DbJob }> {
  try {
    await requireStaff();

    const rawExp = formData.get("experience") as string | null;
    const rawOrder = parseInt((formData.get("display_order") as string) || "0", 10);

    const validation = jobSchema.safeParse({
      title: formData.get("title"),
      division: formData.get("division"),
      company_name: formData.get("company_name"),
      location: formData.get("location"),
      job_type: formData.get("job_type") || "Full-Time",
      experience: rawExp && rawExp.trim().length > 0 ? rawExp.trim() : null,
      description: formData.get("description"),
      application_email: formData.get("application_email") || "info@onp-bd.com",
      display_order: isNaN(rawOrder) ? 0 : rawOrder,
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const {
      title,
      division,
      company_name,
      location,
      job_type,
      experience,
      description,
      application_email,
      display_order,
      published,
    } = validation.data;

    const requirements = parseList(formData.get("requirements"));
    const benefits = parseList(formData.get("benefits"));

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("jobs")
      .insert({
        title,
        division,
        company_name,
        location,
        job_type,
        experience: experience || null,
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

    const rawExp = formData.get("experience") as string | null;
    const rawOrder = parseInt((formData.get("display_order") as string) || "0", 10);

    const validation = jobSchema.safeParse({
      title: formData.get("title"),
      division: formData.get("division"),
      company_name: formData.get("company_name"),
      location: formData.get("location"),
      job_type: formData.get("job_type") || "Full-Time",
      experience: rawExp && rawExp.trim().length > 0 ? rawExp.trim() : null,
      description: formData.get("description"),
      application_email: formData.get("application_email") || "info@onp-bd.com",
      display_order: isNaN(rawOrder) ? 0 : rawOrder,
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const {
      title,
      division,
      company_name,
      location,
      job_type,
      experience,
      description,
      application_email,
      display_order,
      published,
    } = validation.data;

    const requirements = parseList(formData.get("requirements"));
    const benefits = parseList(formData.get("benefits"));

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("jobs")
      .update({
        title,
        division,
        company_name,
        location,
        job_type,
        experience: experience || null,
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
