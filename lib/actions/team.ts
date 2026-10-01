"use server";

import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { TeamMember, Company } from "@/types/database";

export async function getTeamCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
  return (data as Company[]) || [];
}

export async function requireStaff() {
  const { user, profile } = await getCurrentUserAndProfile();
  if (!user || !profile || profile.status !== "active") {
    throw new Error("Unauthorized: Active staff authentication required.");
  }
  return { user, profile };
}

export async function getTeamMembers(teamType?: string): Promise<TeamMember[]> {
  const supabase = await createClient();

  let query = supabase
    .from("team")
    .select("*")
    .order("created_at", { ascending: true });

  if (teamType) {
    query = query.eq("team_type", teamType);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
  return (data as unknown as TeamMember[]) || [];
}

import { z } from "zod";

const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  designation: z
    .string()
    .trim()
    .min(2, "Designation / role must be at least 2 characters")
    .max(150, "Designation cannot exceed 150 characters"),
  teamType: z
    .string()
    .trim()
    .min(1, "Please select a valid team division / group")
    .max(50, "Team division cannot exceed 50 characters"),
  study: z
    .string()
    .trim()
    .max(250, "Education / Study background cannot exceed 250 characters")
    .nullable()
    .optional(),
});

export async function createTeamMemberAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const rawStudy = formData.get("study") as string | null;
    const validation = teamMemberSchema.safeParse({
      name: formData.get("name"),
      designation: formData.get("designation"),
      teamType: formData.get("team_type"),
      study: rawStudy && rawStudy.trim().length > 0 ? rawStudy.trim() : null,
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { name, designation, teamType, study } = validation.data;

    const supabase = await createClient();
    const insertData: Record<string, unknown> = {
      name,
      designation,
      team_type: teamType,
      study: study || null,
    };

    const { error: insertError } = await supabase.from("team").insert(insertData);

    if (insertError) {
      return { error: insertError.message };
    }

    revalidatePath("/admin/team");
    revalidatePath("/teams");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create team member.";
    return { error: msg };
  }
}

export async function updateTeamMemberAction(
  memberId: string,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const rawStudy = formData.get("study") as string | null;
    const validation = teamMemberSchema.safeParse({
      name: formData.get("name"),
      designation: formData.get("designation"),
      teamType: formData.get("team_type"),
      study: rawStudy && rawStudy.trim().length > 0 ? rawStudy.trim() : null,
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { name, designation, teamType, study } = validation.data;

    const supabase = await createClient();
    const updateData: Record<string, unknown> = {
      name,
      designation,
      team_type: teamType,
      study: study || null,
    };

    const { error: updateError } = await supabase
      .from("team")
      .update(updateData)
      .eq("id", memberId);

    if (updateError) {
      return { error: updateError.message };
    }

    revalidatePath("/admin/team");
    revalidatePath("/teams");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update team member.";
    return { error: msg };
  }
}

export async function deleteTeamMemberAction(
  memberId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const supabase = await createClient();
    const { error: deleteError } = await supabase
      .from("team")
      .delete()
      .eq("id", memberId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    revalidatePath("/admin/team");
    revalidatePath("/teams");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete team member.";
    return { error: msg };
  }
}
