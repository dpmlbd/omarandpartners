"use server";

import { requireStaff } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { uploadAndOptimizeImage, deleteStorageFile } from "@/lib/storage/service";
import type { Testimonial } from "@/types/database";

import { z } from "zod";
import { validateImageFile } from "@/lib/image/process";

const testimonialSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Client name must be at least 2 characters")
    .max(100, "Client name cannot exceed 100 characters"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(120, "Location cannot exceed 120 characters"),
  work: z
    .string()
    .trim()
    .min(2, "Role/Organization must be at least 2 characters")
    .max(150, "Role cannot exceed 150 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Testimonial quote must be at least 10 characters")
    .max(2000, "Testimonial quote cannot exceed 2000 characters"),
  published: z.boolean(),
});

export async function getTestimonials(publishedOnly?: boolean): Promise<Testimonial[]> {
  const supabase = await createClient();
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
  return data || [];
}

export async function createTestimonialAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const validation = testimonialSchema.safeParse({
      name: formData.get("name"),
      location: formData.get("location"),
      work: formData.get("work"),
      description: formData.get("description"),
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { name, location, work, description, published } = validation.data;
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
      return { error: "A client portrait image is required." };
    }

    const imageValidation = validateImageFile(imageFile);
    if (!imageValidation.valid) {
      return { error: imageValidation.error };
    }

    const fileName = `${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}.avif`;
    const upload = await uploadAndOptimizeImage({
      file: imageFile,
      folder: "testimonials",
      fileName,
    });

    if (upload.error || !upload.storagePath) {
      return { error: "Image processing error: " + upload.error };
    }

    const admin = createAdminClient();
    const { error: insertError } = await admin.from("testimonials").insert({
      name,
      location,
      work,
      image: upload.storagePath,
      description,
      published,
    });

    if (insertError) {
      await deleteStorageFile(upload.storagePath);
      return { error: insertError.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create testimonial.";
    return { error: msg };
  }
}

export async function updateTestimonialAction(
  id: string,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const validation = testimonialSchema.safeParse({
      name: formData.get("name"),
      location: formData.get("location"),
      work: formData.get("work"),
      description: formData.get("description"),
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { name, location, work, description, published } = validation.data;
    const imageFile = formData.get("image") as File;

    if (imageFile && imageFile.size > 0) {
      const imageValidation = validateImageFile(imageFile);
      if (!imageValidation.valid) {
        return { error: imageValidation.error };
      }
    }

    const admin = createAdminClient();
    const { data: existing } = await admin
      .from("testimonials")
      .select("image")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string } | null;
    let imagePath = existingRecord?.image;

    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}.avif`;
      const upload = await uploadAndOptimizeImage({
        file: imageFile,
        folder: "testimonials",
        fileName,
        oldPath: existingRecord?.image,
      });

      if (upload.error || !upload.storagePath) {
        return { error: "Image processing error: " + upload.error };
      }
      imagePath = upload.storagePath;
    }

    const { error: updateError } = await admin
      .from("testimonials")
      .update({
        name,
        location,
        work,
        image: imagePath,
        description,
        published,
      })
      .eq("id", id);

    if (updateError) {
      return { error: updateError.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update testimonial.";
    return { error: msg };
  }
}

export async function toggleTestimonialPublishedAction(
  id: string,
  nextPublished: boolean
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();
    const admin = createAdminClient();
    const { error } = await admin
      .from("testimonials")
      .update({ published: nextPublished })
      .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to toggle status.";
    return { error: msg };
  }
}

export async function deleteTestimonialAction(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();
    const admin = createAdminClient();

    const { data: existing } = await admin
      .from("testimonials")
      .select("image")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string } | null;
    if (existingRecord?.image) {
      await deleteStorageFile(existingRecord.image);
    }

    const { error: deleteError } = await admin
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return { error: deleteError.message };
    }

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete testimonial.";
    return { error: msg };
  }
}
