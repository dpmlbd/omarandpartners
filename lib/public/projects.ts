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

export interface PublicLandingProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  image: string;
  href: string;
}

export interface PublicCompanyGalleryItem {
  src: string;
  alt?: string;
  label: string;
  company: string;
  href?: string;
}

export interface PublicProjectView {
  title: string;
  category: string;
  location: string;
  year: string;
  area: string;
  status: string;
  projectType?: string;
  companyName?: string;
  companySlug?: string;
  description: string;
  image: string;
  gallery: string[];
}

export async function fetchLandingProjects(limit = 4): Promise<PublicLandingProject[]> {
  try {
    const supabase = await createClient();
    const { data: dbProjects, error } = await supabase
      .from("projects")
      .select("id, slug, title, category, location, company:companies(slug, name), images:project_images(storage_path, role, display_order)")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("Database landing projects query error:", error);
      return [];
    }

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects
        .map((p) => {
          const imagesList = (p.images || []) as { storage_path: string; role: string; display_order?: number }[];
          const mainImg = imagesList.find((img) => img.role === "main");
          const sortedGallery = [...imagesList]
            .filter((img) => img.role === "gallery")
            .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
          const storagePath = mainImg?.storage_path || sortedGallery[0]?.storage_path || imagesList[0]?.storage_path;

          if (!storagePath) return null;

          const company = p.company as { slug?: string; name?: string } | null;
          const compSlug = company?.slug === "kolpokowsol" ? "kolpokowsol" : "kolpoporishor";
          const projectId = p.slug || p.id;
          const href = `/${compSlug}/projects/${projectId}`;
          const categoryLabel = company?.name ? `${company.name} — ${p.category}` : p.category;

          return {
            id: p.id,
            slug: p.slug,
            title: p.title,
            category: categoryLabel,
            location: p.location,
            image: getPublicStorageUrl(storagePath),
            href,
          };
        })
        .filter((p): p is PublicLandingProject => p !== null);
    }
  } catch (err) {
    console.warn("Database landing projects query skipped/errored:", err);
  }

  return [];
}

export async function fetchProjectDetail(
  idOrSlug: string
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
        : galleryImgs[0] || "";

      return {
        title: p.title,
        category: p.category,
        location: p.location,
        year: p.year,
        area: p.area || "N/A",
        status: p.status || "Completed",
        projectType: p.project_type || "Architectural Project",
        companyName: p.company?.name || "",
        companySlug: p.company?.slug || "",
        description: p.description || "",
        image: heroImage,
        gallery: galleryImgs.length > 0 ? galleryImgs : (heroImage ? [heroImage] : []),
      };
    }
  } catch (err) {
    console.error("Database project fetch error:", err);
  }

  return null;
}

export async function fetchRandomCompanyProjects(
  limit = 6
): Promise<PublicCompanyGalleryItem[]> {
  try {
    const supabase = await createClient();
    const { data: dbProjects, error } = await supabase
      .from("projects")
      .select("id, slug, title, category, company:companies(slug, name), images:project_images(storage_path, role, display_order)")
      .eq("published", true);

    if (error || !dbProjects || dbProjects.length === 0) {
      return [];
    }

    const valid: PublicCompanyGalleryItem[] = [];
    for (const p of dbProjects) {
      const imagesList = (p.images || []) as { storage_path: string; role: string; display_order?: number }[];
      const mainImg = imagesList.find((img) => img.role === "main");
      const sortedGallery = [...imagesList]
        .filter((img) => img.role === "gallery")
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
      const storagePath = mainImg?.storage_path || sortedGallery[0]?.storage_path || imagesList[0]?.storage_path;

      if (!storagePath) continue;

      const company = p.company as { slug?: string; name?: string } | null;
      const compSlug = company?.slug === "kolpokowsol" ? "kolpokowsol" : "kolpoporishor";
      const projectId = p.slug || p.id;
      const href = `/${compSlug}/projects/${projectId}`;
      const companyName = company?.name || p.category || "ONP";

      valid.push({
        src: getPublicStorageUrl(storagePath),
        alt: p.title,
        label: p.title,
        company: companyName,
        href,
      });
    }

    // Fisher-Yates shuffle
    for (let i = valid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [valid[i], valid[j]] = [valid[j], valid[i]];
    }

    return valid.slice(0, limit);
  } catch (err) {
    console.warn("fetchRandomCompanyProjects error:", err);
    return [];
  }
}
