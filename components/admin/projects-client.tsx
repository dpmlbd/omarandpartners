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
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface ProjectsClientProps {
  initialProjects: Project[];
  companies: Company[];
}

function getCompanyBadgeText(company?: { name?: string; slug?: string } | null): string {
  if (!company) return "ONP";
  const slug = (company.slug || "").toLowerCase();
  const name = (company.name || "").toLowerCase();
  if (slug.includes("kolpokowsol") || name.includes("kolpokowsol")) return "KK";
  if (slug.includes("kolpoporishor") || slug.includes("kolpoporisor") || name.includes("kolpoporishor")) return "KP";
  return company.name || "ONP";
}

export function ProjectsClient({
  initialProjects,
  companies,
}: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (activePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (activePage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", activePage - 1, activePage, activePage + 1, "...", totalPages];
  };

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
    <div className="flex-1 min-h-0 flex flex-col w-full">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0 mb-3">
        <h1 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight">
          Projects Portfolio
        </h1>

        <Link
          href="/admin/projects/new"
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiAddLine size={14} />
          <span>New Project</span>
        </Link>
      </div>

      {/* ── Filters Bar ────────────────────────────────────────────── */}
      <div className="p-3 border border-border bg-card flex flex-wrap items-center gap-3 text-xs shrink-0 mb-3">
        <div className="flex items-center gap-2 text-muted-foreground font-mono uppercase text-[10px]">
          <RiFilterLine size={14} />
          <span>Filters:</span>
        </div>

        <select
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Companies</option>
          {companies.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
          <option value="shared">Kolpoporishor &amp; Kolpokowsol</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Categories</option>
          <option value="Building Projects">Building Projects</option>
          <option value="Interior Projects">Interior Projects</option>
          <option value="Landscape Projects">Landscape Projects</option>
        </select>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-mono uppercase text-[10px]">Per Page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-secondary/30 border border-border px-2.5 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <span className="ml-auto text-[11px] font-mono text-muted-foreground">
          {filteredProjects.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredProjects.length)} of {filteredProjects.length}
        </span>
      </div>

      {/* ── Table ──────────────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
              <tr className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3 px-5">Project</th>
                <th className="py-3 px-5">Company</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Year</th>
                <th className="py-3 px-5">Visibility</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-muted-foreground">
                    <RiBuilding4Line size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No projects match the selected criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Create a project or adjust your company and category filters.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((p) => {
                  const mainImage = p.images?.find((img) => img.role === "main");
                  const thumb = mainImage
                    ? getPublicStorageUrl(mainImage.storage_path)
                    : "/images/architecture.png";

                  return (
                    <tr key={p.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-8 border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={thumb}
                              alt={p.title}
                              fill
                              sizes="40px"
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

                      <td className="py-3 px-5 font-medium">
                        {p.is_shared ? (
                          <div className="flex items-center gap-1.5">
                            <span
                              title="Kolpoporishor"
                              className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 border border-border bg-secondary/30"
                            >
                              KP
                            </span>
                            <span
                              title="Kolpokowsol"
                              className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 border border-border bg-secondary/30"
                            >
                              KK
                            </span>
                          </div>
                        ) : (
                          <span
                            title={p.company?.name || undefined}
                            className="text-[10px] uppercase font-mono font-semibold tracking-wider px-2 py-0.5 border border-border bg-secondary/30"
                          >
                            {getCompanyBadgeText(p.company)}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-5 text-muted-foreground font-medium">
                        {p.category}
                      </td>

                      <td className="py-3 px-5 text-muted-foreground">
                        {p.location}
                      </td>

                      <td className="py-3 px-5 font-mono text-muted-foreground">
                        {p.year}
                      </td>

                      <td className="py-3 px-5">
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

                      <td className="py-3 px-5 text-right">
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

        {/* ── Pagination Controls ────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="border-t border-border px-5 py-2.5 bg-secondary/10 flex items-center justify-between shrink-0">
            <span className="font-mono text-[11px] text-muted-foreground">
              Page {activePage} of {totalPages}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={activePage <= 1}
                aria-label="Previous Page"
                className="px-2.5 py-1 border border-border flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-mono"
              >
                <RiArrowLeftLine size={12} /> Prev
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="min-w-7 py-1 px-1.5 text-center font-mono text-[11px] text-muted-foreground"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(Number(page))}
                    className={`min-w-7 py-1 px-2 font-mono text-[11px] tracking-wider transition-colors border ${
                      activePage === page
                        ? "bg-primary text-primary-foreground border-primary font-semibold"
                        : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={activePage >= totalPages}
                aria-label="Next Page"
                className="px-2.5 py-1 border border-border flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-[11px] font-mono"
              >
                Next <RiArrowRightLine size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
