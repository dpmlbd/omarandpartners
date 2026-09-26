"use server";

import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Profile } from "@/types/database";
import type { User } from "@supabase/supabase-js";

const createModeratorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

async function requireAdmin(): Promise<{ user: User; profile: Profile }> {
  const { user, profile } = await getCurrentUserAndProfile();

  if (!user || !profile) {
    throw new Error("Unauthorized: Authentication required");
  }

  if (profile.role !== "admin" || profile.status !== "active") {
    throw new Error("Unauthorized: Administrator privileges required");
  }

  return { user, profile };
}

export async function getModerators(): Promise<Profile[]> {
  await requireAdmin();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "moderator")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching moderators:", error);
    return [];
  }

  return data || [];
}

export async function createModeratorAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = createModeratorSchema.safeParse({ name, email, password });
    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Invalid input data" };
    }

    const adminClient = createAdminClient();

    // 1. Create authentication identity in Supabase Auth Admin API
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role: "moderator" },
    });

    if (authError || !authData.user) {
      return { error: authError?.message || "Failed to create authentication user." };
    }

    // 2. Insert application profile record
    const { error: profileError } = await adminClient.from("profiles").insert({
      user_id: authData.user.id,
      name,
      email,
      role: "moderator",
      status: "active",
    });

    if (profileError) {
      // Rollback auth user if profile creation fails
      await adminClient.auth.admin.deleteUser(authData.user.id);
      return { error: "Failed to create moderator profile: " + profileError.message };
    }

    revalidatePath("/admin/moderators");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: msg };
  }
}

export async function updateModeratorStatusAction(
  profileId: string,
  newStatus: "active" | "inactive"
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireAdmin();

    const adminClient = createAdminClient();

    // Get the target profile
    const { data: targetProfile, error: fetchError } = await adminClient
      .from("profiles")
      .select("user_id, role")
      .eq("id", profileId)
      .single();

    if (fetchError || !targetProfile) {
      return { error: "Moderator profile not found." };
    }

    // Security check: cannot deactivate admin accounts through moderator management
    if (targetProfile.role === "admin") {
      return { error: "Cannot modify an administrator account via this interface." };
    }

    // Update status in profiles
    const { error: updateError } = await adminClient
      .from("profiles")
      .update({ status: newStatus })
      .eq("id", profileId);

    if (updateError) {
      return { error: updateError.message };
    }

    // Also update auth user status in Supabase Auth (ban if inactive to prevent token refresh)
    if (newStatus === "inactive") {
      await adminClient.auth.admin.updateUserById(targetProfile.user_id, {
        ban_duration: "876000h", // effectively permanent until unbanned
      });
    } else {
      await adminClient.auth.admin.updateUserById(targetProfile.user_id, {
        ban_duration: "none",
      });
    }

    revalidatePath("/admin/moderators");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: msg };
  }
}

export async function deleteModeratorAction(
  profileId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireAdmin();

    const adminClient = createAdminClient();

    // Fetch user_id first
    const { data: targetProfile, error: fetchError } = await adminClient
      .from("profiles")
      .select("user_id, role")
      .eq("id", profileId)
      .single();

    if (fetchError || !targetProfile) {
      return { error: "Moderator profile not found." };
    }

    if (targetProfile.role === "admin") {
      return { error: "Cannot delete an administrator account." };
    }

    // 1. Delete from auth.users (cascades to profile if foreign key set, or we delete explicitly)
    await adminClient.auth.admin.deleteUser(targetProfile.user_id);

    // 2. Ensure profile is removed
    await adminClient.from("profiles").delete().eq("id", profileId);

    revalidatePath("/admin/moderators");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: msg };
  }
}
