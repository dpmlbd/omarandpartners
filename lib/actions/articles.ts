"use server";

import { requireStaff } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { uploadAndOptimizeImage, deleteStorageFile } from "@/lib/storage/service";
import type { Article } from "@/types/database";

import { z } from "zod";
import { validateImageFile } from "@/lib/image/process";

const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Article title must be at least 3 characters")
    .max(200, "Article title cannot exceed 200 characters"),
  description: z
    .string()
    .trim()
    .min(10, "Article description / content must be at least 10 characters")
    .max(20000, "Article content cannot exceed 20,000 characters"),
  authorId: z.string().trim().nullable().optional(),
  published: z.boolean(),
});

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function getArticles(publishedOnly?: boolean): Promise<Article[]> {
  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select("*, author:team(*)")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
  return (data as unknown as Article[]) || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*, author:team(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Article;
}

export async function createArticleAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const validation = articleSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      authorId: formData.get("author_id"),
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { title, description, authorId, published } = validation.data;
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
      return { error: "A cover article image is required." };
    }

    const imageValidation = validateImageFile(imageFile);
    if (!imageValidation.valid) {
      return { error: imageValidation.error };
    }

    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const admin = createAdminClient();

    // Look up author from team table for snapshot fallback
    let authorName: string | null = null;
    let authorDesignation: string | null = null;

    if (authorId && authorId !== "none") {
      const { data: teamMember } = (await admin
        .from("team")
        .select("name, designation")
        .eq("id", authorId)
        .single()) as { data: { name: string; designation: string } | null };

      if (teamMember) {
        authorName = teamMember.name;
        authorDesignation = teamMember.designation;
      }
    }

    // Process & upload cover image to articles/{slug}.avif
    const upload = await uploadAndOptimizeImage({
      file: imageFile,
      folder: "articles",
      fileName: `${slug}.avif`,
    });

    if (upload.error || !upload.storagePath) {
      return { error: "Image processing failed: " + upload.error };
    }

    const { error: insertError } = await admin.from("articles").insert({
      title,
      slug,
      description,
      image: upload.storagePath,
      author_id: authorId === "none" ? null : authorId,
      author_name: authorName,
      author_designation: authorDesignation,
      published,
    });

    if (insertError) {
      await deleteStorageFile(upload.storagePath);
      return { error: insertError.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/insights/articles");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create article.";
    return { error: msg };
  }
}

export async function updateArticleAction(
  id: string,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const validation = articleSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      authorId: formData.get("author_id"),
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const { title, description, authorId, published } = validation.data;
    const imageFile = formData.get("image") as File;

    if (imageFile && imageFile.size > 0) {
      const imageValidation = validateImageFile(imageFile);
      if (!imageValidation.valid) {
        return { error: imageValidation.error };
      }
    }

    const admin = createAdminClient();

    const { data: existing } = await admin
      .from("articles")
      .select("image, slug")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string; slug?: string } | null;
    let imagePath = existingRecord?.image;

    // Look up author from team table for snapshot fallback
    let authorName: string | null = null;
    let authorDesignation: string | null = null;

    if (authorId && authorId !== "none") {
      const { data: teamMember } = (await admin
        .from("team")
        .select("name, designation")
        .eq("id", authorId)
        .single()) as { data: { name: string; designation: string } | null };

      if (teamMember) {
        authorName = teamMember.name;
        authorDesignation = teamMember.designation;
      }
    }

    if (imageFile && imageFile.size > 0) {
      const upload = await uploadAndOptimizeImage({
        file: imageFile,
        folder: "articles",
        fileName: `${existingRecord?.slug || id}.avif`,
        oldPath: existingRecord?.image,
      });

      if (upload.error || !upload.storagePath) {
        return { error: "Image processing failed: " + upload.error };
      }
      imagePath = upload.storagePath;
    }

    const { error: updateError } = await admin
      .from("articles")
      .update({
        title,
        description,
        image: imagePath,
        author_id: authorId === "none" ? null : authorId,
        author_name: authorName,
        author_designation: authorDesignation,
        published,
      })
      .eq("id", id);

    if (updateError) {
      return { error: updateError.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/insights/articles");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update article.";
    return { error: msg };
  }
}

export async function toggleArticlePublishedAction(
  id: string,
  nextPublished: boolean
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();
    const admin = createAdminClient();
    const { error } = await admin
      .from("articles")
      .update({ published: nextPublished })
      .eq("id", id);

    if (error) return { error: error.message };

    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/insights/articles");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to toggle published status.";
    return { error: msg };
  }
}

export async function deleteArticleAction(
  id: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();
    const admin = createAdminClient();

    const { data: existing } = await admin
      .from("articles")
      .select("image")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string } | null;
    if (existingRecord?.image) {
      await deleteStorageFile(existingRecord.image);
    }

    const { error: deleteError } = await admin
      .from("articles")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return { error: deleteError.message };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/insights");
    revalidatePath("/insights/articles");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete article.";
    return { error: msg };
  }
}
