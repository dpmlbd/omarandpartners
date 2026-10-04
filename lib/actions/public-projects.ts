"use server";

import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { PublicProjectListItem } from "@/lib/public/projects";

export async function getPublicProjectsAction(
  companySlug: "kolpokowsol" | "kolpoporishor" | "kolpoporisor"
): Promise<PublicProjectListItem[]> {
  try {
    const supabase = await createClient();
    const effectiveSlug = companySlug === "kolpoporisor" ? "kolpoporishor" : companySlug;
    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .in("slug", [effectiveSlug, companySlug])
      .maybeSingle();

    if (!company) return [];

    let { data: projects, error } = await supabase
      .from("projects")
      .select("id, slug, title, category, location, images:project_images(storage_path, role)")
      .or(`company_id.eq.${company.id},is_shared.eq.true`)
      .eq("published", true)
      .order("created_at", { ascending: false });

    // Fallback if is_shared column hasn't been migrated yet in Supabase
    if (error && error.message?.includes("is_shared")) {
      const fallbackResult = await supabase
        .from("projects")
        .select("id, slug, title, category, location, images:project_images(storage_path, role)")
        .eq("company_id", company.id)
        .eq("published", true)
        .order("created_at", { ascending: false });
      projects = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error || !projects) return [];

    return projects.map((p) => {
      const imagesList = p.images as unknown as { storage_path: string; role: string }[];
      const mainImg = imagesList?.find((img) => img.role === "main");
      return {
        id: p.slug || p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        image: mainImg ? getPublicStorageUrl(mainImg.storage_path) : "/images/architecture.png",
      };
    });
  } catch (err) {
    console.warn("getPublicProjectsAction error:", err);
    return [];
  }
}
