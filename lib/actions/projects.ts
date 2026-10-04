"use server";

import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { uploadAndOptimizeImage, deleteStorageFolder, deleteStorageFile } from "@/lib/storage/service";
import type { Company, Project, ProjectCategory, ProjectImage } from "@/types/database";

export async function requireStaff() {
  const { user, profile } = await getCurrentUserAndProfile();
  if (!user || !profile || profile.status !== "active") {
    throw new Error("Unauthorized: Active staff authentication required.");
  }
  return { user, profile };
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export async function getActiveProjectCompanies(): Promise<Company[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .in("slug", ["kolpoporishor", "kolpoporisor", "kolpokowsol"])
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching project companies:", error);
    return [];
  }
  return data || [];
}

export async function getProjects(filters?: {
  companySlug?: string;
  category?: string;
  publishedOnly?: boolean;
}): Promise<Project[]> {
  const supabase = await createClient();

  let query = supabase
    .from("projects")
    .select(`
      *,
      company:companies(*),
      images:project_images(*)
    `)
    .order("created_at", { ascending: false });

  if (filters?.publishedOnly) {
    query = query.eq("published", true);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  let projects = (data as unknown as Project[]) || [];

  if (filters?.companySlug) {
    projects = projects.filter((p) => p.company?.slug === filters.companySlug);
  }

  return projects;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      company:companies(*),
      images:project_images(*)
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data as unknown as Project;
}

import { z } from "zod";
import { validateImageFile } from "@/lib/image/process";

const projectSchema = z.object({
  companyId: z.string().trim().min(1, "Please select an assigned company"),
  category: z.enum(["Building Projects", "Interior Projects", "Landscape Projects"] as const, {
    message: "Category must be Building Projects, Interior Projects, or Landscape Projects",
  }),
  title: z
    .string()
    .trim()
    .min(2, "Project title must be at least 2 characters")
    .max(150, "Project title cannot exceed 150 characters"),
  projectType: z
    .string()
    .trim()
    .min(2, "Project type must be at least 2 characters")
    .max(100, "Project type cannot exceed 100 characters"),
  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(150, "Location cannot exceed 150 characters"),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "Project duration/year must be a 4-digit year (e.g. 2026)"),
  status: z.string().trim().max(100, "Status cannot exceed 100 characters").nullable().optional(),
  area: z.string().trim().max(100, "Area cannot exceed 100 characters").nullable().optional(),
  description: z.string().trim().max(10000, "Description cannot exceed 10,000 characters").nullable().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

export async function createProjectAction(
  prevState: unknown,
  formData: FormData
): Promise<{ success?: boolean; error?: string; projectId?: string }> {
  try {
    await requireStaff();

    const rawStatus = formData.get("status") as string | null;
    const rawArea = formData.get("area") as string | null;
    const rawDesc = formData.get("description") as string | null;

    const validation = projectSchema.safeParse({
      companyId: formData.get("company_id"),
      category: formData.get("category"),
      title: formData.get("title"),
      projectType: formData.get("project_type"),
      location: formData.get("location"),
      year: formData.get("year"),
      status: rawStatus && rawStatus.trim().length > 0 ? rawStatus.trim() : null,
      area: rawArea && rawArea.trim().length > 0 ? rawArea.trim() : null,
      description: rawDesc && rawDesc.trim().length > 0 ? rawDesc.trim() : null,
      featured: formData.get("featured") === "true",
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const {
      companyId,
      category,
      title,
      projectType,
      location,
      year,
      status,
      area,
      description,
      featured,
      published,
    } = validation.data;

    // Verify company is active (not Inex)
    const supabase = await createClient();
    const { data: company } = await supabase
      .from("companies")
      .select("slug")
      .eq("id", companyId)
      .single();

    if (!company || !["kolpoporishor", "kolpoporisor", "kolpokowsol"].includes(company.slug)) {
      return { error: "Projects can only be assigned to Kolpoporishor or Kolpokowsol." };
    }

    // Image validations
    const mainImageFile = formData.get("main_image") as File;
    if (!mainImageFile || mainImageFile.size === 0) {
      return { error: "A main project hero image is strictly required." };
    }

    const mainImgValidation = validateImageFile(mainImageFile);
    if (!mainImgValidation.valid) {
      return { error: "Main image error: " + mainImgValidation.error };
    }

    const galleryFiles = formData.getAll("gallery_images") as File[];
    const validGalleryFiles = galleryFiles.filter((f) => f && f.size > 0);

    // Maximum 6 gallery images (total max 7 images: 1 main + 6 gallery)
    if (validGalleryFiles.length > 6) {
      return { error: "Maximum 6 gallery images allowed (up to 7 images total)." };
    }

    for (const gFile of validGalleryFiles) {
      const gValidation = validateImageFile(gFile);
      if (!gValidation.valid) {
        return { error: `Gallery image "${gFile.name}" error: ` + gValidation.error };
      }
    }

    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const admin = createAdminClient();

    // 1. Create project record in database using admin client
    const { data: newProject, error: projectError } = await admin
      .from("projects")
      .insert({
        company_id: companyId,
        category,
        title,
        slug,
        project_type: projectType,
        location,
        year: year.trim(),
        status,
        area,
        description,
        featured,
        published,
      })
      .select()
      .single();

    if (projectError || !newProject) {
      return { error: "Database error: " + projectError?.message };
    }

    const folder = `projects/${slug}`;

    // 2. Process & upload required main image to projects/{slug}/main.avif
    const mainUpload = await uploadAndOptimizeImage({
      file: mainImageFile,
      folder,
      fileName: "main.avif",
    });

    if (mainUpload.error || !mainUpload.storagePath) {
      // Rollback project record if image processing/upload fails
      await admin.from("projects").delete().eq("id", newProject.id);
      return { error: "Main image upload error: " + mainUpload.error };
    }

    const { error: mainImgError } = await admin.from("project_images").insert({
      project_id: newProject.id,
      storage_path: mainUpload.storagePath,
      role: "main",
      display_order: 0,
    });

    if (mainImgError) {
      await deleteStorageFolder(folder);
      await admin.from("projects").delete().eq("id", newProject.id);
      return { error: "Failed to record main project image: " + mainImgError.message };
    }

    // 3. Process & upload optional gallery images in parallel
    if (validGalleryFiles.length > 0) {
      const galleryUploads = await Promise.all(
        validGalleryFiles.map(async (file, i) => {
          const padNum = String(i + 1).padStart(2, "0");
          const upload = await uploadAndOptimizeImage({
            file,
            folder,
            fileName: `${padNum}.avif`,
          });
          return {
            storagePath: upload.storagePath,
            order: i + 1,
            error: upload.error,
          };
        })
      );

      const successfulGallery = galleryUploads.filter((g) => g.storagePath);
      if (successfulGallery.length > 0) {
        const { error: galleryErr } = await admin.from("project_images").insert(
          successfulGallery.map((g) => ({
            project_id: newProject.id,
            storage_path: g.storagePath,
            role: "gallery",
            display_order: g.order,
          }))
        );
        if (galleryErr) {
          console.error("Error inserting gallery images:", galleryErr);
        }
      }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/kolpoporishor");
    revalidatePath("/kolpoporisor");
    revalidatePath("/kolpokowsol");
    return { success: true, projectId: newProject.id };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "An unexpected error occurred while creating project.";
    return { error: msg };
  }
}

export async function updateProjectAction(
  projectId: string,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const admin = createAdminClient();

    // Verify project exists
    const { data: project } = await admin
      .from("projects")
      .select("*, images:project_images(*)")
      .eq("id", projectId)
      .single();

    if (!project) return { error: "Project not found." };

    const rawStatus = formData.get("status") as string | null;
    const rawArea = formData.get("area") as string | null;
    const rawDesc = formData.get("description") as string | null;

    const validation = projectSchema.safeParse({
      companyId: formData.get("company_id"),
      category: formData.get("category"),
      title: formData.get("title"),
      projectType: formData.get("project_type"),
      location: formData.get("location"),
      year: formData.get("year"),
      status: rawStatus && rawStatus.trim().length > 0 ? rawStatus.trim() : null,
      area: rawArea && rawArea.trim().length > 0 ? rawArea.trim() : null,
      description: rawDesc && rawDesc.trim().length > 0 ? rawDesc.trim() : null,
      featured: formData.get("featured") === "true",
      published: formData.get("published") === "true",
    });

    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Validation failed." };
    }

    const {
      companyId,
      category,
      title,
      projectType,
      location,
      year,
      status,
      area,
      description,
      featured,
      published,
    } = validation.data;

    // Verify company is active (not Inex)
    const supabase = await createClient();
    const { data: company } = await supabase
      .from("companies")
      .select("slug")
      .eq("id", companyId)
      .single();

    if (!company || !["kolpoporishor", "kolpoporisor", "kolpokowsol"].includes(company.slug)) {
      return { error: "Projects can only be assigned to Kolpoporishor or Kolpokowsol." };
    }

    // Check if new main image is provided and valid
    const newMainImage = formData.get("main_image") as File;
    if (newMainImage && newMainImage.size > 0) {
      const mainImgValidation = validateImageFile(newMainImage);
      if (!mainImgValidation.valid) {
        return { error: "Main image error: " + mainImgValidation.error };
      }
    }

    // Check if new gallery images are provided and valid
    const newGalleryFiles = formData.getAll("gallery_images") as File[];
    const validNewGalleryFiles = newGalleryFiles.filter((f) => f && f.size > 0);

    if (validNewGalleryFiles.length > 6) {
      return { error: "Maximum 6 gallery images permitted." };
    }

    for (const gFile of validNewGalleryFiles) {
      const gValidation = validateImageFile(gFile);
      if (!gValidation.valid) {
        return { error: `Gallery image "${gFile.name}" error: ` + gValidation.error };
      }
    }

    // Update project attributes
    const { error: updateError } = await admin
      .from("projects")
      .update({
        company_id: companyId,
        category,
        title,
        project_type: projectType,
        location,
        year: year.trim(),
        status,
        area,
        description,
        featured,
        published,
      })
      .eq("id", projectId);

    if (updateError) {
      return { error: updateError.message };
    }

    const folder = `projects/${project.slug}`;

    // Upload new main image if provided
    if (newMainImage && newMainImage.size > 0) {
      const existingMain = project.images?.find((img: ProjectImage) => img.role === "main");
      // Use timestamped filename to bust browser/CDN cache when replacing
      const ts = Date.now();
      const upload = await uploadAndOptimizeImage({
        file: newMainImage,
        folder,
        fileName: `main-${ts}.avif`,
        oldPath: existingMain?.storage_path,
      });

      if (upload.error || !upload.storagePath) {
        return { error: "Main image upload error: " + upload.error };
      }

      if (existingMain) {
        const { error: imgUpdateErr } = await admin
          .from("project_images")
          .update({ storage_path: upload.storagePath })
          .eq("id", existingMain.id);
        if (imgUpdateErr) {
          return { error: "Failed to update main image record: " + imgUpdateErr.message };
        }
      } else {
        const { error: imgInsertErr } = await admin.from("project_images").insert({
          project_id: projectId,
          storage_path: upload.storagePath,
          role: "main",
          display_order: 0,
        });
        if (imgInsertErr) {
          return { error: "Failed to create main image record: " + imgInsertErr.message };
        }
      }
    }

    // Upload new gallery images if provided
    if (validNewGalleryFiles.length > 0) {

      // Remove previous gallery images to replace with new set
      const existingGallery = project.images?.filter((img: ProjectImage) => img.role === "gallery") || [];
      for (const img of existingGallery) {
        await deleteStorageFile(img.storage_path);
        await admin.from("project_images").delete().eq("id", img.id);
      }

      const galleryTs = Date.now();
      const galleryUploads = await Promise.all(
        validNewGalleryFiles.map(async (file, i) => {
          const padNum = String(i + 1).padStart(2, "0");
          const upload = await uploadAndOptimizeImage({
            file,
            folder,
            fileName: `${padNum}-${galleryTs}.avif`,
          });
          return {
            storagePath: upload.storagePath,
            order: i + 1,
            error: upload.error,
          };
        })
      );

      const successfulGallery = galleryUploads.filter((g) => g.storagePath);
      if (successfulGallery.length > 0) {
        const { error: galleryInsertErr } = await admin.from("project_images").insert(
          successfulGallery.map((g) => ({
            project_id: projectId,
            storage_path: g.storagePath,
            role: "gallery",
            display_order: g.order,
          }))
        );
        if (galleryInsertErr) {
          return { error: "Failed to save gallery records: " + galleryInsertErr.message };
        }
      }
    }

    revalidatePath("/admin/projects");
    revalidatePath("/kolpoporishor");
    revalidatePath("/kolpoporisor");
    revalidatePath("/kolpokowsol");
    // Also revalidate the specific project detail pages
    revalidatePath(`/kolpoporishor/projects/${projectId}`);
    revalidatePath(`/kolpoporisor/projects/${projectId}`);
    revalidatePath(`/kolpokowsol/projects/${projectId}`);
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to update project.";
    return { error: msg };
  }
}

export async function deleteProjectAction(
  projectId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    await requireStaff();

    const admin = createAdminClient();

    const { data: project } = await admin
      .from("projects")
      .select("slug")
      .eq("id", projectId)
      .single();

    if (!project) return { error: "Project not found." };

    // 1. Delete associated images from Supabase Storage (no orphaned files)
    await deleteStorageFolder(`projects/${project.slug}`);

    // 2. Delete project from database (cascades to project_images)
    const { error: deleteError } = await admin
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (deleteError) {
      return { error: deleteError.message };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/kolpoporishor");
    revalidatePath("/kolpoporisor");
    revalidatePath("/kolpokowsol");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to delete project.";
    return { error: msg };
  }
}
