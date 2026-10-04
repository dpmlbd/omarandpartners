"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProjectAction } from "@/lib/actions/projects";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { Company, Project } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiBuilding4Line,
  RiEyeLine,
  RiEyeOffLine,
  RiFilterLine,
} from "@remixicon/react";
import { siteConfig } from "@/config/site";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];

interface ProjectsClientProps {
  initialProjects: Project[];
  companies: Company[];
}

export function ProjectsClient({
  initialProjects,
  companies,
}: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  const filteredProjects = projects.filter((p) => {
    if (selectedCompany !== "all") {
      if (selectedCompany === "shared") {
        if (!p.is_shared) return false;
      } else {
        if (p.company?.slug !== selectedCompany && !p.is_shared) {
          return false;
        }
      }
    }
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const handleDelete = (project: Project) => {
    if (
      !confirm(
        `Are you sure you want to delete "${project.title}"? All associated storage images will be removed permanently.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteProjectAction(project.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Project "${project.title}" deleted successfully`);
        setProjects((prev) => prev.filter((p) => p.id !== project.id));
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Projects Portfolio
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Manage {comp2?.name || "Kolpokowsol"} ({comp2?.description || "Consultancy & Construction"}) and {comp1?.name || "Kolpoporishor"} ({comp1?.description || "Consultancy"}) developments.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 self-start"
        >
          <RiAddLine size={16} />
          <span>New Project</span>
        </Link>
      </div>

      {/* ── Filters Bar ────────────────────────────────────────────── */}
      <div className="p-4 border border-border bg-card flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground font-mono uppercase text-[10px]">
          <RiFilterLine size={14} />
          <span>Filters:</span>
        </div>

        {/* Company filter */}
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Companies</option>
          {companies.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
          <option value="shared">Shared (Both Companies)</option>
        </select>

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="Building Projects">Building Projects</option>
          <option value="Interior Projects">Interior Projects</option>
          <option value="Landscape Projects">Landscape Projects</option>
        </select>

        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} works
        </span>
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div className="border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/20 text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3.5 px-6">Project</th>
                <th className="py-3.5 px-6">Company</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Year</th>
                <th className="py-3.5 px-6">Images</th>
                <th className="py-3.5 px-6">Visibility</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-muted-foreground">
                    <RiBuilding4Line size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No projects match the selected criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Create a project or adjust your company and category filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const mainImage = p.images?.find((img) => img.role === "main");
                  const galleryCount =
                    p.images?.filter((img) => img.role === "gallery").length || 0;
                  const thumb = mainImage
                    ? getPublicStorageUrl(mainImage.storage_path)
                    : "/images/architecture.png";

                  return (
                    <tr key={p.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={thumb}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground block text-xs">
                              {p.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-light">
                              {p.project_type}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-medium">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 border border-border">
                            {p.company?.name || "ONP"}
                          </span>
                          {p.is_shared && (
                            <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-primary/10 text-primary border border-primary/20">
                              Both Companies
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-muted-foreground font-medium">
                        {p.category}
                      </td>

                      <td className="py-4 px-6 text-muted-foreground">
                        {p.location}
                      </td>

                      <td className="py-4 px-6 font-mono text-muted-foreground">
                        {p.year}
                      </td>

                      <td className="py-4 px-6 font-mono text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {p.images?.length || 0}
                        </span>{" "}
                        <span className="text-[10px] text-muted-foreground/70">
                          (1 + {galleryCount})
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {p.published ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
                            <RiEyeLine size={13} /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                            <RiEyeOffLine size={13} /> Draft
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/projects/${p.id}/edit`}
                            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
                            title="Edit Project"
                          >
                            <RiEditLine size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(p)}
                            disabled={isPending}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors"
                            title="Delete Project"
                          >
                            <RiDeleteBinLine size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
