import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { Project } from "@/types/database";

export interface PublicProjectListItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
}

export interface PublicProjectView {
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  status: string;
  description: string;
  image: string;
  gallery: string[];
}

export async function fetchProjectDetail(
  idOrSlug: string,
  fallbackProjects: Record<string, PublicProjectView>
): Promise<PublicProjectView | null> {
  try {
    const supabase = await createClient();

    // Try finding in database by slug or id
    const { data: project } = await supabase
      .from("projects")
      .select("*, company:companies(*), images:project_images(*)")
      .or(`slug.eq.${idOrSlug},id.eq.${idOrSlug}`)
      .eq("published", true)
      .maybeSingle();

    if (project) {
      const p = project as Project;
      const mainImg = p.images?.find((img) => img.role === "main");
      const galleryImgs =
        p.images
          ?.filter((img) => img.role === "gallery")
          .sort((a, b) => a.display_order - b.display_order)
          .map((img) => getPublicStorageUrl(img.storage_path)) || [];

      return {
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        area: p.area || "N/A",
        status: p.status || "Completed",
        description: p.description || "",
        image: mainImg ? getPublicStorageUrl(mainImg.storage_path) : "/images/architecture.png",
        gallery: galleryImgs.length > 0 ? galleryImgs : [getPublicStorageUrl(mainImg?.storage_path)],
      };
    }
  } catch (err) {
    console.warn("Database project fetch skipped/errored, falling back to static:", err);
  }

  // Fallback to static dictionary if not in DB
  const fallback = fallbackProjects[idOrSlug];
  if (fallback) {
    return fallback as PublicProjectView;
  }

  return null;
}
