"use server";

import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { PublicProjectListItem, PublicCompanyGalleryItem } from "@/lib/public/projects";
import { fetchRandomCompanyProjects } from "@/lib/public/projects";
import type { BentoGalleryItem } from "@/components/ui/bento-gallery";

export async function getRandomCompanyProjectsAction(
  limit = 6
): Promise<PublicCompanyGalleryItem[]> {
  return fetchRandomCompanyProjects(limit);
}

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
      const fallbackImg = imagesList?.[0];
      const storagePath = mainImg?.storage_path || fallbackImg?.storage_path;
      return {
        id: p.slug || p.id,
        title: p.title,
        category: p.category,
        location: p.location,
        image: storagePath ? getPublicStorageUrl(storagePath) : "",
      };
    });
  } catch (err) {
    console.warn("getPublicProjectsAction error:", err);
    return [];
  }
}

export async function getPublicCompanyGalleryAction(
  companySlug: "kolpokowsol" | "kolpoporishor" | "kolpoporisor",
  limit = 20
): Promise<BentoGalleryItem[]> {
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
      .select("id, title, category, location, year, images:project_images(storage_path, role, display_order)")
      .or(`company_id.eq.${company.id},is_shared.eq.true`)
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error && error.message?.includes("is_shared")) {
      const fallbackResult = await supabase
        .from("projects")
        .select("id, title, category, location, year, images:project_images(storage_path, role, display_order)")
        .eq("company_id", company.id)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(limit);
      projects = fallbackResult.data;
      error = fallbackResult.error;
    }

    if (error || !projects) return [];

    const items: BentoGalleryItem[] = [];
    let count = 0;

    for (const p of projects) {
      if (items.length >= limit) break;

      const imagesList = (p.images || []) as { storage_path: string; role: string; display_order?: number }[];
      const sorted = [...imagesList].sort((a, b) => {
        if (a.role === "main") return -1;
        if (b.role === "main") return 1;
        return (a.display_order ?? 0) - (b.display_order ?? 0);
      });

      for (const img of sorted) {
        if (items.length >= limit) break;
        if (!img.storage_path) continue;
        const colSpan = (count % 5 === 0 || count % 5 === 4) ? 2 : 1;
        const rowSpan = (count % 3 === 0) ? 2 : 1;
        items.push({
          id: `${p.id}-${count}`,
          title: p.title,
          category: p.category,
          location: p.location,
          year: p.year,
          image: getPublicStorageUrl(img.storage_path),
          colSpan,
          rowSpan,
        });
        count++;
      }
    }

    return items.slice(0, limit);
  } catch (err) {
    console.warn("getPublicCompanyGalleryAction error:", err);
    return [];
  }
}
