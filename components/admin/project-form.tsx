"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createProjectAction, updateProjectAction } from "@/lib/actions/projects";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import { compressImageForUpload } from "@/lib/image/client-compress";
import type { Company, Project, ProjectCategory } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiArrowLeftLine,
  RiAlertLine,
  RiCheckLine,
} from "@remixicon/react";
import { siteConfig } from "@/config/site";

interface ProjectFormProps {
  companies: Company[];
  initialProject?: Project | null;
}

const CATEGORIES: ProjectCategory[] = [
  "Building Projects",
  "Interior Projects",
  "Landscape Projects",
];

export function ProjectForm({ companies, initialProject }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Main Image state
  const existingMain = initialProject?.images?.find((img) => img.role === "main");
  const [mainPreview, setMainPreview] = useState<string | null>(
    existingMain ? getPublicStorageUrl(existingMain.storage_path) : null
  );

  // Gallery Images state (max 6)
  const existingGallery = initialProject?.images?.filter((img) => img.role === "gallery") || [];
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    existingGallery.map((img) => getPublicStorageUrl(img.storage_path))
  );

  const isValidImageFile = (file: File): boolean => {
    const validMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    return (
      validMimes.includes(file.type.toLowerCase()) ||
      /\.(jpe?g|png|webp|avif)$/i.test(file.name)
    );
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidImageFile(file)) {
        setError("Main image must be a valid image file (JPG, PNG, WebP, or AVIF).");
        e.target.value = "";
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        setError("Main image exceeds 25MB upload limit.");
        e.target.value = "";
        return;
      }
      setMainPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 6) {
      setError("Maximum 6 gallery images allowed. Please re-select up to 6 images.");
      e.target.value = "";
      return;
    }

    for (const f of files) {
      if (!isValidImageFile(f)) {
        setError(`File "${f.name}" is not a supported image. Please upload JPG, PNG, WebP, or AVIF.`);
        e.target.value = "";
        return;
      }
      if (f.size > 25 * 1024 * 1024) {
        setError(`File "${f.name}" exceeds 25MB upload limit.`);
        e.target.value = "";
        return;
      }
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreviews(newPreviews);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const companyId = (formData.get("company_id") as string)?.trim();
    const category = (formData.get("category") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const projectType = (formData.get("project_type") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const year = (formData.get("year") as string)?.trim();

    if (!companyId) {
      setError("Please select an operating division / company.");
      return;
    }
    if (!category) {
      setError("Please select a project category.");
      return;
    }
    if (!title || title.length < 2) {
      setError("Project title must be at least 2 characters.");
      return;
    }
    if (!projectType || projectType.length < 2) {
      setError("Project typology / type must be at least 2 characters.");
      return;
    }
    if (!location || location.length < 2) {
      setError("Location must be at least 2 characters.");
      return;
    }
    if (!year || !/^\d{4}$/.test(year)) {
      setError("Project year must be a 4-digit year (e.g. 2026).");
      return;
    }

    const mainImageFile = formData.get("main_image") as File;
    if (!initialProject && (!mainImageFile || mainImageFile.size === 0)) {
      setError("A main project hero image is strictly required.");
      return;
    }

    startTransition(async () => {
      try {
        // Optimize visuals client-side to prevent Vercel 4.5MB payload limit & timeout errors
        const mainImageFile = formData.get("main_image") as File;
        if (mainImageFile && mainImageFile.size > 0) {
          const compressedMain = await compressImageForUpload(mainImageFile);
          formData.set("main_image", compressedMain);
        }

        const galleryFiles = formData.getAll("gallery_images") as File[];
        if (galleryFiles.length > 0) {
          formData.delete("gallery_images");
          for (const gFile of galleryFiles) {
            if (gFile && gFile.size > 0) {
              const compressedG = await compressImageForUpload(gFile);
              formData.append("gallery_images", compressedG);
            }
          }
        }

        let result;
        if (initialProject) {
          result = await updateProjectAction(initialProject.id, formData);
        } else {
          result = await createProjectAction(null, formData);
        }

        if (result?.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success(
            initialProject
              ? "Project updated successfully"
              : "New project created successfully"
          );
          router.push("/admin/projects");
          router.refresh();
        }
      } catch (err: unknown) {
        console.error("Submission error:", err);
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to upload and save project. Please check image files and try again.";
        setError(msg);
        toast.error(msg);
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16)-theme(spacing.20))]">
      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0 mb-3">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <RiArrowLeftLine size={14} /> Back
          </Link>
          <div className="h-3.5 w-px bg-border" />
          <h1 className="font-heading text-lg font-bold uppercase tracking-tight">
            {initialProject ? "Edit Project" : "New Project"}
          </h1>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {initialProject ? "Edit Mode" : "Creation Mode"} · AVIF Auto-Conversion
        </span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-2 p-2.5 border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-center gap-2 shrink-0">
          <RiAlertLine size={14} className="shrink-0" />
          <span className="font-medium truncate">{error}</span>
        </div>
      )}

      {/* ── Form Card ────────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 min-h-0 border border-border bg-card shadow-sm flex flex-col"
      >
        {/* All fields in a dense layout */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-4">
          {/* ── ROW 1: Company | Category | Shared checkbox ──────── */}
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Company *
              </label>
              <select
                name="company_id"
                required
                defaultValue={initialProject?.company_id || companies[0]?.id}
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {companies.map((c) => {
                  const matched = siteConfig.companies.find((sc) => sc.name.toLowerCase() === c.name.toLowerCase() || sc.href.includes(c.slug));
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} ({matched?.description || c.description || c.name})
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Category *
              </label>
              <select
                name="category"
                required
                defaultValue={initialProject?.category || CATEGORIES[0]}
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2.5 px-4 py-2 bg-secondary/20 border border-border cursor-pointer shrink-0 h-[34px]">
              <input
                type="checkbox"
                id="is_shared"
                name="is_shared"
                value="true"
                defaultChecked={initialProject?.is_shared || false}
                className="accent-primary h-3.5 w-3.5 cursor-pointer"
              />
              <span className="text-[10px] font-semibold text-foreground tracking-wide uppercase font-mono whitespace-nowrap">
                Both Kolpoporishor &amp; Kolpokowsol
              </span>
            </label>
          </div>

          {/* ── ROW 2: Title | Project Type ──────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={initialProject?.title || ""}
                placeholder="e.g. The Zenith Tower"
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Project Type *
              </label>
              <input
                type="text"
                name="project_type"
                required
                defaultValue={initialProject?.project_type || ""}
                placeholder="e.g. Commercial High-Rise"
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* ── ROW 3: Location | Year | Status | Area ───────────── */}
          <div className="grid grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                defaultValue={initialProject?.location || ""}
                placeholder="e.g. Dhaka, Bangladesh"
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Year *
              </label>
              <input
                type="text"
                name="year"
                required
                pattern="[0-9]{4}"
                maxLength={4}
                defaultValue={initialProject?.year || new Date().getFullYear().toString()}
                placeholder="2026"
                className="bg-secondary/30 border border-border px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Status
              </label>
              <select
                name="status"
                defaultValue={
                  initialProject?.status
                    ? initialProject.status.toLowerCase() === "completed"
                      ? "Completed"
                      : initialProject.status.toLowerCase().includes("going")
                        ? "On Going"
                        : initialProject.status
                    : ""
                }
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              >
                <option value="">Optional</option>
                <option value="Completed">Completed</option>
                <option value="On Going">On Going</option>
                {initialProject?.status &&
                  !["completed", "on going", "ongoing"].includes(
                    initialProject.status.toLowerCase()
                  ) && (
                    <option value={initialProject.status}>
                      {initialProject.status}
                    </option>
                  )}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                Built Area
              </label>
              <input
                type="text"
                name="area"
                defaultValue={initialProject?.area || ""}
                placeholder="e.g. 85,000 sq.m"
                className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* ── ROW 4: Description ───────────────────────────────── */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
              Description
            </label>
            <textarea
              name="description"
              rows={5}
              defaultValue={initialProject?.description || ""}
              placeholder="Structural geometry, materiality, lighting concepts, and environmental considerations..."
              className="bg-secondary/30 border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* ── ROW 5: Visual Media — Side by Side ───────────────── */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {/* Main Hero Image */}
            <div className="p-3 border border-border bg-secondary/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider">
                  Main Hero Image *
                </label>
                {mainPreview && (
                  <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <RiCheckLine size={11} /> Ready
                  </span>
                )}
              </div>

              <input
                type="file"
                name="main_image"
                accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                required={!initialProject}
                onChange={handleMainImageChange}
                className="text-[11px] file:mr-3 file:py-1 file:px-3 file:border file:border-border file:bg-secondary file:text-[10px] file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
              />

              {mainPreview && (
                <div className="relative w-full flex-1 min-h-[100px] border border-border overflow-hidden bg-background mt-1">
                  <Image
                    src={mainPreview}
                    alt="Main Preview"
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="p-3 border border-border bg-secondary/10 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider">
                  Gallery Images (Up to 6)
                </label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {galleryPreviews.length} / 6
                </span>
              </div>

              <input
                type="file"
                name="gallery_images"
                multiple
                accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                onChange={handleGalleryImagesChange}
                className="text-[11px] file:mr-3 file:py-1 file:px-3 file:border file:border-border file:bg-secondary file:text-[10px] file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
              />

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-1.5 mt-1 flex-1 min-h-0">
                  {galleryPreviews.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video border border-border overflow-hidden bg-background"
                    >
                      <Image
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        sizes="16vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-0.5 right-0.5 bg-black/70 text-white text-[8px] font-mono px-1">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom Action Bar ───────────────────────────────────── */}
        <div className="px-5 py-2.5 border-t border-border bg-card shrink-0 flex items-center justify-between">
          {/* Publishing flags on the left */}
          <div className="flex items-center gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                value="true"
                defaultChecked={initialProject ? initialProject.published : true}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                Published
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={initialProject?.featured || false}
                className="w-3.5 h-3.5 accent-primary"
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground">
                Featured
              </span>
            </label>
          </div>

          {/* Actions on the right */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects"
              className="px-5 py-2 text-[11px] uppercase tracking-widest font-semibold border border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 text-[11px] uppercase tracking-widest font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isPending
                ? "Processing..."
                : initialProject
                  ? "Save Changes"
                  : "Create & Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
