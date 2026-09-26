"use server";

import { requireStaff } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uploadAndOptimizeImage, deleteStorageFile } from "@/lib/storage/service";
import type { Testimonial } from "@/types/database";

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

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const work = formData.get("work") as string;
    const description = formData.get("description") as string;
    const published = formData.get("published") === "true";
    const imageFile = formData.get("image") as File;

    if (!name || !location || !work || !description) {
      return { error: "Please fill in all required testimonial fields." };
    }

    if (!imageFile || imageFile.size === 0) {
      return { error: "A client portrait image is required." };
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

    const supabase = await createClient();
    const { error: insertError } = await supabase.from("testimonials").insert({
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

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;
    const work = formData.get("work") as string;
    const description = formData.get("description") as string;
    const published = formData.get("published") === "true";
    const imageFile = formData.get("image") as File;

    if (!name || !location || !work || !description) {
      return { error: "Please fill in all required testimonial fields." };
    }

    const supabase = await createClient();
    const { data: existing } = await supabase
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

    const { error: updateError } = await supabase
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
    const supabase = await createClient();
    const { error } = await supabase
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
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("testimonials")
      .select("image")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string } | null;
    if (existingRecord?.image) {
      await deleteStorageFile(existingRecord.image);
    }

    const { error: deleteError } = await supabase
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
