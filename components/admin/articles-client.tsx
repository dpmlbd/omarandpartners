"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import {
  createArticleAction,
  updateArticleAction,
  toggleArticlePublishedAction,
  deleteArticleAction,
} from "@/lib/actions/articles";
import type { Article, TeamMember } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAlertLine,
  RiArticleLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSearchLine,
  RiFilterLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface ArticlesClientProps {
  initialArticles: Article[];
  teamMembers: TeamMember[];
}

export function ArticlesClient({
  initialArticles,
  teamMembers,
}: ArticlesClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);
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

  const openEditModal = (item: Article) => {
    setEditingItem(item);
    setImagePreview(item.image ? getPublicStorageUrl(item.image) : null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();

    if (!title || title.length < 3) {
      setError("Article title must be at least 3 characters.");
      return;
    }

    if (!description || description.length < 10) {
      setError("Article content/synopsis must be at least 10 characters.");
      return;
    }

    const imageFile = formData.get("image") as File;
    if (!editingItem && (!imageFile || imageFile.size === 0)) {
      setError("Please select a cover image for the article.");
      return;
    }

    if (imageFile && imageFile.size > 25 * 1024 * 1024) {
      setError("Cover image exceeds 25MB limit.");
      return;
    }

    startTransition(async () => {
      try {
        let result;
        if (editingItem) {
          result = await updateArticleAction(editingItem.id, formData);
        } else {
          result = await createArticleAction(null, formData);
        }

        if (result?.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success(
            editingItem
              ? "Article updated successfully"
              : "New article published successfully"
          );
          setIsModalOpen(false);
          window.location.reload();
        }
      } catch (err: unknown) {
        console.error("Article submit error:", err);
        const msg =
          err instanceof Error
            ? err.message
            : "Failed to upload and save article. Please check the image and try again.";
        setError(msg);
        toast.error(msg);
      }
    });
  };

  const handleTogglePublish = (item: Article) => {
    startTransition(async () => {
      const nextPublished = !item.published;
      const result = await toggleArticlePublishedAction(item.id, nextPublished);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          nextPublished
            ? `Article "${item.title}" published`
            : `Article "${item.title}" moved to drafts`
        );
        setArticles((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, published: nextPublished } : a))
        );
      }
    });
  };

  const handleDelete = (item: Article) => {
    if (!confirm(`Are you sure you want to delete article "${item.title}"?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteArticleAction(item.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Article "${item.title}" deleted`);
        setArticles((prev) => prev.filter((a) => a.id !== item.id));
      }
    });
  };

  const filteredArticles = articles.filter((a) => {
    if (statusFilter === "published" && !a.published) return false;
    if (statusFilter === "draft" && a.published) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchDesc = a.description?.toLowerCase().includes(q);
      const matchAuthor = (a.author?.name || a.author_name || "").toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAuthor) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + pageSize);

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
            Articles &amp; Editorial
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiAddLine size={14} />
          <span>New Article</span>
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
            placeholder="Search by title, synopsis, or author..."
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
          {filteredArticles.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredArticles.length)} of {filteredArticles.length}
        </span>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
              <tr className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3 px-5">Article</th>
                <th className="py-3 px-5">Author (Team)</th>
                <th className="py-3 px-5">Publication Date</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-muted-foreground">
                    <RiArticleLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No articles match your criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Article&quot; to publish spatial design and architectural insights.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((art) => {
                  const cover = art.image
                    ? getPublicStorageUrl(art.image)
                    : "/images/architecture.png";
                  const authorDisplay =
                    art.author?.name || art.author_name || "Editorial Staff";
                  const designationDisplay =
                    art.author?.designation || art.author_designation || "ONP";

                  return (
                    <tr key={art.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-8 border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={cover}
                              alt={art.title}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground text-xs block">
                              {art.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-md font-light">
                              {art.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-5">
                        <span className="font-medium text-foreground block">
                          {authorDisplay}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-light">
                          {designationDisplay}
                        </span>
                      </td>

                      <td className="py-3 px-5 text-muted-foreground font-mono text-[11px]">
                        {new Date(art.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      <td className="py-3 px-5">
                        <button
                          onClick={() => handleTogglePublish(art)}
                          disabled={isPending}
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 border transition-colors ${
                            art.published
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20"
                              : "bg-muted text-muted-foreground border-border hover:bg-secondary"
                          }`}
                        >
                          {art.published ? (
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
                            onClick={() => openEditModal(art)}
                            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
                            title="Edit Article"
                          >
                            <RiEditLine size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(art)}
                            disabled={isPending}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors"
                            title="Delete Article"
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
          <div className="bg-card border border-border w-full max-w-xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
                  Editorial Publication
                </span>
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                  {editingItem ? "Edit Article" : "New Article"}
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
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Article Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingItem?.title || ""}
                  placeholder="e.g. The Architecture of Silence: Monolithic Spaces in 2026"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Article Author (Linked to Team Record)
                </label>
                <select
                  name="author_id"
                  defaultValue={editingItem?.author_id || "none"}
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="none">Editorial Staff (General)</option>
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — {m.designation}
                    </option>
                  ))}
                </select>
                <span className="text-[9px] text-muted-foreground/60">
                  Selecting a team member automatically binds their public title &amp; profile.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Article Content / Synopsis *
                </label>
                <textarea
                  name="description"
                  rows={5}
                  required
                  defaultValue={editingItem?.description || ""}
                  placeholder="Draft the article synopsis, key architectural takeaways, and spatial analysis..."
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary resize-y"
                />
              </div>

              {/* Cover Photo */}
              <div className="p-3 border border-border bg-secondary/10 flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider block">
                  Cover Visual * (Auto-AVIF)
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                  required={!editingItem}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 25 * 1024 * 1024) {
                        setError("Image exceeds 25MB limit. Please choose a smaller file.");
                        e.target.value = "";
                        return;
                      }
                      setImagePreview(URL.createObjectURL(file));
                      setError(null);
                    }
                  }}
                  className="text-xs file:mr-4 file:py-1.5 file:px-3 file:border file:border-border file:bg-secondary file:text-xs file:uppercase file:font-semibold hover:file:bg-primary hover:file:text-primary-foreground cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative w-40 h-24 border border-border overflow-hidden mt-1">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      sizes="160px"
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
                  Published (Visible in Articles)
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
                  {isPending ? "Processing..." : editingItem ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
