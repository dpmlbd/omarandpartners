"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import {
  createTestimonialAction,
  updateTestimonialAction,
  toggleTestimonialPublishedAction,
  deleteTestimonialAction,
} from "@/lib/actions/testimonials";
import type { Testimonial } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAlertLine,
  RiChatQuoteLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSearchLine,
  RiFilterLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsClient({
  initialTestimonials,
}: TestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const openCreateModal = () => {
    setEditingItem(null);
    setImagePreview(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setImagePreview(item.image ? getPublicStorageUrl(item.image) : null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const imageInput = form.querySelector('input[name="image"]') as HTMLInputElement;
    const file = imageInput?.files?.[0];
    if (file && file.size > 20 * 1024 * 1024) {
      setError("Image file size must be under 20 MB.");
      return;
    }

    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const location = (formData.get("location") as string)?.trim();
    const work = (formData.get("work") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();

    if (!name || name.length < 2) {
      setError("Client name must be at least 2 characters.");
      return;
    }
    if (!location || location.length < 2) {
      setError("Location must be at least 2 characters.");
      return;
    }
    if (!work || work.length < 2) {
      setError("Role/Organization must be at least 2 characters.");
      return;
    }
    if (!description || description.length < 10) {
      setError("Testimonial quote must be at least 10 characters.");
      return;
    }

    if (!editingItem && (!file || file.size === 0)) {
      setError("Please select a client portrait image.");
      return;
    }

    startTransition(async () => {
      try {
        let result;
        if (editingItem) {
          result = await updateTestimonialAction(editingItem.id, formData);
        } else {
          result = await createTestimonialAction(null, formData);
        }

        if (result?.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success(
            editingItem
              ? "Testimonial updated successfully"
              : "New testimonial created successfully"
          );
          setIsModalOpen(false);
          window.location.reload();
        }
      } catch (err: unknown) {
        console.error("Testimonial submit error:", err);
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to upload and save testimonial. Please check the image and try again.";
        setError(msg);
        toast.error(msg);
      }
    });
  };

  const handleTogglePublish = (item: Testimonial) => {
    startTransition(async () => {
      const nextPublished = !item.published;
      const result = await toggleTestimonialPublishedAction(item.id, nextPublished);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          nextPublished
            ? `Testimonial from "${item.name}" published`
            : `Testimonial from "${item.name}" moved to drafts`
        );
        setTestimonials((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, published: nextPublished } : t))
        );
      }
    });
  };

  const handleDelete = (item: Testimonial) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${item.name}"?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteTestimonialAction(item.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Testimonial from "${item.name}" deleted`);
        setTestimonials((prev) => prev.filter((t) => t.id !== item.id));
      }
    });
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (statusFilter === "published" && !t.published) return false;
    if (statusFilter === "draft" && t.published) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = t.name.toLowerCase().includes(q);
      const matchWork = t.work.toLowerCase().includes(q);
      const matchLoc = t.location.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      if (!matchName && !matchWork && !matchLoc && !matchDesc) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredTestimonials.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, startIndex + pageSize);

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
            Client Voices &amp; Testimonials
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiAddLine size={14} />
          <span>New Testimonial</span>
        </button>
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
            placeholder="Search by client, company, location, or quote..."
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
          <span>Status:</span>
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
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
          {filteredTestimonials.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredTestimonials.length)} of {filteredTestimonials.length}
        </span>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
              <tr className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3 px-5">Client</th>
                <th className="py-3 px-5">Organization / Role</th>
                <th className="py-3 px-5">Location</th>
                <th className="py-3 px-5">Quote Excerpt</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <RiChatQuoteLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No testimonials match your criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Testimonial&quot; to publish client endorsements.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedTestimonials.map((t) => {
                  const avatar = t.image
                    ? getPublicStorageUrl(t.image)
                    : "/images/hero_architecture.png";

                  return (
                    <tr key={t.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={avatar}
                              alt={t.name}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-foreground text-xs">
                            {t.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-5 text-foreground font-medium">
                        {t.work}
                      </td>

                      <td className="py-3 px-5 text-muted-foreground">
                        {t.location}
                      </td>

                      <td className="py-3 px-5 text-muted-foreground font-light max-w-sm">
                        <span className="line-clamp-1 italic">
                          &ldquo;{t.description}&rdquo;
                        </span>
                      </td>

                      <td className="py-3 px-5">
                        <button
                          onClick={() => handleTogglePublish(t)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border transition-colors ${
                            t.published
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                              : "bg-muted text-muted-foreground border-border hover:bg-secondary"
                          }`}
                        >
                          {t.published ? (
                            <>
                              <RiEyeLine size={12} /> Published
                            </>
                          ) : (
                            <>
                              <RiEyeOffLine size={12} /> Draft
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(t)}
                            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
                            title="Edit Testimonial"
                          >
                            <RiEditLine size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(t)}
                            disabled={isPending}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors"
                            title="Delete Testimonial"
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

      {/* ── Modal ──────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
                  Social Proof
                </span>
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                  {editingItem ? "Edit Testimonial" : "New Testimonial"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2">
                <RiAlertLine size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={editingItem?.name || ""}
                    placeholder="e.g. Elena Vasquez"
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
                    defaultValue={editingItem?.location || ""}
                    placeholder="e.g. Dubai, UAE"
                    className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Work / Role &amp; Entity *
                </label>
                <input
                  type="text"
                  name="work"
                  required
                  defaultValue={editingItem?.work || ""}
                  placeholder="e.g. CEO, Horizon Developments"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Quote / Testimonial *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  defaultValue={editingItem?.description || ""}
                  placeholder="Describe the collaboration, execution quality, and aesthetic outcome..."
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-y"
                />
              </div>

              {/* Client Photo */}
              <div className="p-3 border border-border bg-secondary/10 flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider block">
                  Client Portrait Image * (Auto-AVIF)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                  required={!editingItem}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 20 * 1024 * 1024) {
                        setError("Selected image exceeds 20 MB. Please choose a smaller file.");
                        e.target.value = "";
                        setImagePreview(null);
                        return;
                      }
                      setError(null);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="text-xs file:mr-4 file:py-1.5 file:px-3 file:border file:border-border file:bg-secondary file:text-xs file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-full border border-border overflow-hidden mt-1">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer mt-1">
                <input
                  type="checkbox"
                  name="published"
                  value="true"
                  defaultChecked={editingItem ? editingItem.published : true}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  Published on Public Website
                </span>
              </label>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-border hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isPending ? "Processing..." : editingItem ? "Save Changes" : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
