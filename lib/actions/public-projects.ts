"use server";

import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { PublicProjectListItem } from "@/lib/public/projects";

export async function getPublicProjectsAction(
  companySlug: "kolpokowsol" | "kolpoporisor"
): Promise<PublicProjectListItem[]> {
  try {
    const supabase = await createClient();
    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .eq("slug", companySlug)
      .maybeSingle();

    if (!company) return [];

    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, slug, title, category, location, images:project_images(storage_path, role)")
      .eq("company_id", company.id)
      .eq("published", true)
      .order("created_at", { ascending: false });

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
