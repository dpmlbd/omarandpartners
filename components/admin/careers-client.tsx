"use client";

import { useState, useTransition } from "react";
import {
  createJobAction,
  updateJobAction,
  toggleJobPublishedAction,
  deleteJobAction,
} from "@/lib/actions/jobs";
import type { DbJob } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiBriefcaseLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAlertLine,
  RiEyeLine,
  RiEyeOffLine,
  RiMapPinLine,
  RiTimeLine,
  RiSearchLine,
  RiCheckLine,
  RiBuildingLine,
  RiFilterLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface CareersClientProps {
  initialJobs: DbJob[];
}

const COMMON_DIVISIONS = [
  { division: "Kolpoporishor (Consultancy)", company: "Kolpoporishor" },
  { division: "Kolpokowsol (Consultancy & Construction)", company: "Kolpokowsol" },
  { division: "INEX (Building Materials)", company: "INEX" },
  { division: "Omar & Partners (Holding)", company: "Omar & Partners" },
];

export function CareersClient({ initialJobs }: CareersClientProps) {
  const [jobs, setJobs] = useState<DbJob[]>(initialJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<DbJob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  // Form states for quick division auto-fill
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const openCreateModal = () => {
    setEditingJob(null);
    setSelectedDivision(COMMON_DIVISIONS[0].division);
    setSelectedCompany(COMMON_DIVISIONS[0].company);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (job: DbJob) => {
    setEditingJob(job);
    setSelectedDivision(job.division);
    setSelectedCompany(job.company_name);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get("title") as string)?.trim();
    const division = (formData.get("division") as string)?.trim();
    const company = (formData.get("company_name") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const email = (formData.get("application_email") as string)?.trim();

    if (!title || title.length < 2) {
      setError("Job title must be at least 2 characters.");
      return;
    }
    if (!division || division.length < 2) {
      setError("Division label must be at least 2 characters.");
      return;
    }
    if (!company || company.length < 2) {
      setError("Company name must be at least 2 characters.");
      return;
    }
    if (!location || location.length < 2) {
      setError("Location must be at least 2 characters.");
      return;
    }
    if (!description || description.length < 10) {
      setError("Role description must be at least 10 characters.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid application email address.");
      return;
    }

    startTransition(async () => {
      try {
        let result;
        if (editingJob) {
          result = await updateJobAction(editingJob.id, formData);
        } else {
          result = await createJobAction(null, formData);
        }

        if (result.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success(
            editingJob
              ? "Job opening updated successfully!"
              : "New job opening published to careers page!"
          );
          setIsModalOpen(false);
          if (result.job) {
            if (editingJob) {
              setJobs((prev) =>
                prev.map((j) => (j.id === result.job!.id ? result.job! : j))
              );
            } else {
              setJobs((prev) => [result.job!, ...prev]);
            }
          } else {
            window.location.reload();
          }
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to process job opening.";
        setError(msg);
        toast.error(msg);
      }
    });
  };

  const handleTogglePublish = (job: DbJob) => {
    startTransition(async () => {
      const nextPublished = !job.published;
      const result = await toggleJobPublishedAction(job.id, nextPublished);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          nextPublished
            ? `Published "${job.title}" to careers page`
            : `Unpublished "${job.title}" (moved to draft)`
        );
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, published: nextPublished } : j))
        );
      }
    });
  };

  const handleDelete = (job: DbJob) => {
    if (!confirm(`Are you sure you want to delete the job opening "${job.title}"?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteJobAction(job.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Position "${job.title}" has been removed.`);
        setJobs((prev) => prev.filter((j) => j.id !== job.id));
      }
    });
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision =
      filterDivision === "all" || j.company_name.toLowerCase() === filterDivision.toLowerCase();
    return matchesSearch && matchesDivision;
  });

  const publishedCount = jobs.filter((j) => j.published).length;
  const draftCount = jobs.length - publishedCount;

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

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

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0 mb-3">
        <div>
          <h1 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight">
            Careers &amp; Jobs Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiAddLine size={14} />
          <span>Post New Opening</span>
        </button>
      </div>

      {/* ── Metric Bar (Compact) ────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 shrink-0">
        <div className="border border-border px-3 py-2 bg-card flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Total
          </span>
          <span className="font-heading text-base font-bold">{jobs.length}</span>
        </div>
        <div className="border border-border px-3 py-2 bg-card flex items-center justify-between">
          <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-wider">
            Active
          </span>
          <span className="font-heading text-base font-bold text-emerald-500">
            {publishedCount}
          </span>
        </div>
        <div className="border border-border px-3 py-2 bg-card flex items-center justify-between">
          <span className="font-mono text-[10px] text-amber-500 uppercase tracking-wider">
            Drafts
          </span>
          <span className="font-heading text-base font-bold text-amber-500">
            {draftCount}
          </span>
        </div>
        <div className="border border-border px-3 py-2 bg-card flex items-center justify-between">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Divisions
          </span>
          <span className="font-heading text-base font-bold">4</span>
        </div>
      </div>

      {/* ── Filters Bar ────────────────────────────────────────────── */}
      <div className="p-3 border border-border bg-card flex flex-wrap items-center gap-3 text-xs shrink-0 mb-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <RiSearchLine
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search roles by title, division, or location..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-secondary/30 border border-border pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 text-muted-foreground font-mono uppercase text-[10px]">
          <RiFilterLine size={14} />
          <span>Division:</span>
        </div>

        <select
          value={filterDivision}
          onChange={(e) => {
            setFilterDivision(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Divisions</option>
          <option value="Kolpoporishor">Kolpoporishor</option>
          <option value="Kolpokowsol">Kolpokowsol</option>
          <option value="INEX">INEX</option>
          <option value="Omar & Partners">Omar &amp; Partners</option>
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
          {filteredJobs.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredJobs.length)} of {filteredJobs.length}
        </span>
      </div>

      {/* ── Jobs List Card ──────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto p-3 flex flex-col gap-2.5">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center my-auto">
              <RiBriefcaseLine size={36} className="text-muted-foreground/30 mb-2" />
              <h3 className="font-heading text-base uppercase font-semibold">No Job Openings Found</h3>
              <p className="text-muted-foreground text-xs max-w-sm mt-1 font-light">
                {jobs.length === 0
                  ? "No job openings have been created yet. Click 'Post New Opening' to publish the first role."
                  : "No jobs match your search criteria. Try a different search query or division filter."}
              </p>
            </div>
          ) : (
            paginatedJobs.map((job) => (
              <div
                key={job.id}
                className={`border transition-all p-3.5 bg-card/60 hover:bg-secondary/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ${
                  job.published ? "border-border" : "border-amber-500/30 bg-amber-500/[0.02]"
                }`}
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-semibold">
                      {job.division}
                    </span>
                    {!job.published && (
                      <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] uppercase tracking-widest px-1.5 py-0.5 font-medium">
                        Draft
                      </span>
                    )}
                    {job.experience && (
                      <span className="bg-secondary text-secondary-foreground text-[9px] uppercase tracking-widest px-1.5 py-0.5 font-medium border border-border">
                        {job.experience}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-sm md:text-base font-bold uppercase tracking-tight text-foreground truncate">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <RiMapPinLine size={12} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiTimeLine size={12} />
                      {job.job_type}
                    </span>
                    <span className="flex items-center gap-1">
                      <RiBuildingLine size={12} />
                      {job.company_name}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground/80 line-clamp-1 mt-0.5 font-light">
                    {job.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 w-full md:w-auto justify-end border-border">
                  <button
                    onClick={() => handleTogglePublish(job)}
                    disabled={isPending}
                    title={job.published ? "Click to unpublish" : "Click to publish"}
                    className={`border text-[10px] transition-colors flex items-center gap-1 px-2.5 py-1 uppercase tracking-wider font-semibold ${
                      job.published
                        ? "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
                        : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {job.published ? <RiEyeLine size={12} /> : <RiEyeOffLine size={12} />}
                    <span>{job.published ? "Published" : "Draft"}</span>
                  </button>

                  <button
                    onClick={() => openEditModal(job)}
                    disabled={isPending}
                    className="p-1.5 border border-border hover:bg-secondary text-foreground transition-colors"
                    title="Edit Opening"
                  >
                    <RiEditLine size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(job)}
                    disabled={isPending}
                    className="p-1.5 border border-border hover:border-destructive/30 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    title="Delete Opening"
                  >
                    <RiDeleteBinLine size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── Pagination Controls ────────────────────────────────────── */}
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
      </div>

      {/* ── Create / Edit Modal ────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-muted-foreground hover:text-foreground"
            >
              <RiCloseLine size={20} />
            </button>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {editingJob ? "Update Record" : "New Position"}
              </span>
              <h2 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight mt-1">
                {editingJob ? `Edit: ${editingJob.title}` : "Post Job Opening"}
              </h2>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <RiAlertLine size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Quick Division Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                  Quick Division Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_DIVISIONS.map((preset) => (
                    <button
                      type="button"
                      key={preset.division}
                      onClick={() => {
                        setSelectedDivision(preset.division);
                        setSelectedCompany(preset.company);
                      }}
                      className={`text-left p-2.5 border text-xs transition-colors flex items-center justify-between ${
                        selectedDivision === preset.division
                          ? "border-primary bg-primary/5 text-foreground font-medium"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{preset.division}</span>
                      {selectedDivision === preset.division && (
                        <RiCheckLine size={14} className="text-primary shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Division */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Job Title <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingJob?.title || ""}
                    placeholder="e.g. Senior Architect / Consultant"
                    required
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Division Display Label <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="division"
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value)}
                    placeholder="e.g. Kolpoporishor (Consultancy)"
                    required
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Company & Location */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Company Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    placeholder="e.g. Kolpoporishor"
                    required
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Location <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={editingJob?.location || "Chattogram, Bangladesh"}
                    placeholder="e.g. Chattogram, Bangladesh"
                    required
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Job Type <span className="text-primary">*</span>
                  </label>
                  <select
                    name="job_type"
                    defaultValue={editingJob?.job_type || "Full-Time"}
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Hybrid / Remote">Hybrid / Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              {/* Experience & Application Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    name="experience"
                    defaultValue={editingJob?.experience || ""}
                    placeholder="e.g. 5+ Years, Mid-Senior"
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                    Application Email
                  </label>
                  <input
                    type="email"
                    name="application_email"
                    defaultValue={editingJob?.application_email || "info@onp-bd.com"}
                    placeholder="info@onp-bd.com"
                    className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Role Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                  Role Description <span className="text-primary">*</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingJob?.description || ""}
                  placeholder="Comprehensive description of the responsibilities, studio environment, and objectives for this role..."
                  required
                  className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-none font-light leading-relaxed"
                />
              </div>

              {/* Requirements */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                  Key Requirements (One item per line)
                </label>
                <textarea
                  name="requirements"
                  rows={4}
                  defaultValue={
                    editingJob?.requirements ? editingJob.requirements.join("\n") : ""
                  }
                  placeholder="• 5+ years of experience in architectural consulting&#10;• Degree in Architecture (B.Arch / M.Arch)&#10;• Proficiency in AutoCAD, Revit, and Rhino"
                  className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-none font-mono text-[11px] leading-relaxed"
                />
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-foreground">
                  Compensation &amp; Benefits (One item per line)
                </label>
                <textarea
                  name="benefits"
                  rows={4}
                  defaultValue={
                    editingJob?.benefits ? editingJob.benefits.join("\n") : ""
                  }
                  placeholder="• Competitive salary & project milestone incentives&#10;• Health and medical coverage&#10;• Annual studio retreat and research travel"
                  className="bg-background border border-border p-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-none font-mono text-[11px] leading-relaxed"
                />
              </div>

              {/* Published & Order */}
              <div className="flex flex-wrap items-center justify-between border-t border-border pt-4 gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-medium text-foreground">
                  <input
                    type="checkbox"
                    name="published"
                    value="true"
                    defaultChecked={editingJob ? editingJob.published : true}
                    className="accent-primary w-4 h-4"
                  />
                  Publish position immediately to public careers page
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-border text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2 bg-primary text-primary-foreground text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors"
                  >
                    {isPending
                      ? "Saving..."
                      : editingJob
                      ? "Update Opening"
                      : "Publish Opening"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
