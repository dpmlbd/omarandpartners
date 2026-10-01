"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createProjectAction, updateProjectAction } from "@/lib/actions/projects";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
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

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setError("Main image exceeds 25MB upload limit.");
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

    startTransition(async () => {
      try {
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
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      {/* Top Navigation Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <RiArrowLeftLine size={14} /> Back to Projects
        </Link>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {initialProject ? "Edit Mode" : "Creation Mode"}
        </span>
      </div>

      <div className="border border-border bg-card p-6 md:p-10 shadow-sm">
        <div className="pb-6 border-b border-border mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            {initialProject ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Fill in the spatial attributes and supply up to 7 optimized architectural visuals (1 main hero + max 6 gallery).
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-3">
            <RiAlertLine size={16} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* ── 1. Company & Classification ─────────────────────────── */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
              01. Entity &amp; Categorization
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Company *
                </label>
                <select
                  name="company_id"
                  required
                  defaultValue={initialProject?.company_id || companies[0]?.id}
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
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
                <span className="text-[10px] text-muted-foreground/60">
                  Projects belong strictly to Kolpoporishor or Kolpokowsol.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  defaultValue={initialProject?.category || CATEGORIES[0]}
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-muted-foreground/60">
                  Fixed project classification standard.
                </span>
              </div>
            </div>
          </div>

          {/* ── 2. Project Specifications ────────────────────────────── */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
              02. Spatial Specifications
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={initialProject?.title || ""}
                  placeholder="e.g. The Zenith Tower"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Project Type *
                </label>
                <input
                  type="text"
                  name="project_type"
                  required
                  defaultValue={initialProject?.project_type || ""}
                  placeholder="e.g. Commercial High-Rise, Luxury Residential"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  defaultValue={initialProject?.location || ""}
                  placeholder="e.g. New York, USA or Dhaka, Bangladesh"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Year * (Single 4-digit Year)
                </label>
                <input
                  type="text"
                  name="year"
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                  defaultValue={initialProject?.year || new Date().getFullYear().toString()}
                  placeholder="2026"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Status (Optional)
                </label>
                <input
                  type="text"
                  name="status"
                  defaultValue={initialProject?.status || ""}
                  placeholder="e.g. Completed, Under Construction"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Built Area (Optional)
                </label>
                <input
                  type="text"
                  name="area"
                  defaultValue={initialProject?.area || ""}
                  placeholder="e.g. 85,000 sq.m / 12,500 sq. ft."
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Detailed Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={initialProject?.description || ""}
                  placeholder="Elaborate on structural geometry, materiality, lighting concepts, and environmental considerations..."
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-y"
                />
              </div>
            </div>
          </div>

          {/* ── 3. Visual Media (Strict 7 Images Total) ─────────────── */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-bold">
                03. Visual Media (Max 7 Total)
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                Auto-converted to Sharp AVIF (Max 2400px)
              </span>
            </div>

            {/* Main Image */}
            <div className="p-4 border border-border bg-secondary/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block">
                    Main Hero Image *
                  </label>
                  <span className="text-[10px] text-muted-foreground font-light">
                    The primary cover visual displayed across grids and project cards.
                  </span>
                </div>
                {mainPreview && (
                  <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <RiCheckLine size={12} /> Ready
                  </span>
                )}
              </div>

              <input
                type="file"
                name="main_image"
                accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                required={!initialProject}
                onChange={handleMainImageChange}
                className="text-xs file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-secondary file:text-xs file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
              />

              {mainPreview && (
                <div className="relative w-48 h-32 border border-border mt-2 overflow-hidden bg-background">
                  <Image
                    src={mainPreview}
                    alt="Main Preview"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Gallery Images */}
            <div className="p-4 border border-border bg-secondary/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block">
                    Gallery Images (Optional, Up to 6 Images)
                  </label>
                  <span className="text-[10px] text-muted-foreground font-light">
                    Select up to 6 additional visual angles. Total project images will not exceed 7.
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {galleryPreviews.length} / 6 selected
                </span>
              </div>

              <input
                type="file"
                name="gallery_images"
                multiple
                accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                onChange={handleGalleryImagesChange}
                className="text-xs file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-secondary file:text-xs file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
              />

              {galleryPreviews.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                  {galleryPreviews.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-video border border-border overflow-hidden bg-background group"
                    >
                      <Image
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 33vw, 16vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-mono px-1">
                        0{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── 4. Publishing Flags ─────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                value="true"
                defaultChecked={initialProject ? initialProject.published : true}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Published (Visible on Public Site)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={initialProject?.featured || false}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Featured Work (Landing Highlights)
              </span>
            </label>
          </div>

          {/* ── Submit Action ───────────────────────────────────────── */}
          <div className="pt-6 border-t border-border flex items-center justify-end gap-4">
            <Link
              href="/admin/projects"
              className="px-6 py-3 text-xs uppercase tracking-widest font-semibold border border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="px-8 py-3 text-xs uppercase tracking-widest font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isPending
                ? "Processing Visuals..."
                : initialProject
                ? "Save Project Changes"
                : "Create & Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
