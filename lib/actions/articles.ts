"use server";

import { requireStaff } from "@/lib/actions/projects";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uploadAndOptimizeImage, deleteStorageFile } from "@/lib/storage/service";
import type { Article } from "@/types/database";

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

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorId = (formData.get("author_id") as string) || null;
    const published = formData.get("published") === "true";
    const imageFile = formData.get("image") as File;

    if (!title || !description) {
      return { error: "Title and description/content are required." };
    }

    if (!imageFile || imageFile.size === 0) {
      return { error: "A cover article image is required." };
    }

    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const supabase = await createClient();

    // Look up author from team table for snapshot fallback
    let authorName: string | null = null;
    let authorDesignation: string | null = null;

    if (authorId && authorId !== "none") {
      const { data: teamMember } = (await supabase
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

    const { error: insertError } = await supabase.from("articles").insert({
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

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const authorId = (formData.get("author_id") as string) || null;
    const published = formData.get("published") === "true";
    const imageFile = formData.get("image") as File;

    if (!title || !description) {
      return { error: "Title and description/content are required." };
    }

    const supabase = await createClient();

    const { data: existing } = await supabase
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
      const { data: teamMember } = (await supabase
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

    const { error: updateError } = await supabase
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
    const supabase = await createClient();
    const { error } = await supabase
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
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from("articles")
      .select("image")
      .eq("id", id)
      .single();

    const existingRecord = existing as unknown as { image?: string } | null;
    if (existingRecord?.image) {
      await deleteStorageFile(existingRecord.image);
    }

    const { error: deleteError } = await supabase
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
