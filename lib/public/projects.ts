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
  fallbackProjects?: Record<string, PublicProjectView>
): Promise<PublicProjectView | null> {
  if (!idOrSlug) return null;

  try {
    const supabase = await createClient();

    // Check if idOrSlug is a valid UUID
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrSlug
      );

    let query = supabase
      .from("projects")
      .select("*, company:companies(*), images:project_images(*)")
      .eq("published", true);

    if (isUuid) {
      query = query.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    } else {
      query = query.eq("slug", idOrSlug);
    }

    const { data: project, error } = await query.maybeSingle();

    if (error) {
      console.error("Error fetching project detail from DB:", error);
    }

    if (project) {
      const p = project as Project;
      const imagesList = p.images || [];
      const mainImg = imagesList.find((img) => img.role === "main");
      const galleryImgs = imagesList
        .filter((img) => img.role === "gallery")
        .sort((a, b) => a.display_order - b.display_order)
        .map((img) => getPublicStorageUrl(img.storage_path));

      const heroImage = mainImg
        ? getPublicStorageUrl(mainImg.storage_path)
        : galleryImgs[0] || "/images/hero_architecture.png";

      return {
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        area: p.area || "N/A",
        status: p.status || "Completed",
        description: p.description || "",
        image: heroImage,
        gallery: galleryImgs.length > 0 ? galleryImgs : [heroImage],
      };
    }
  } catch (err) {
    console.error("Database project fetch error:", err);
  }

  // Fallback to static dictionary only if provided
  if (fallbackProjects && fallbackProjects[idOrSlug]) {
    return fallbackProjects[idOrSlug] as PublicProjectView;
  }

  return null;
}
