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

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Articles &amp; Editorial
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Publish spatial essays, architectural monographs, and industry research.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 self-start"
        >
          <RiAddLine size={16} />
          <span>New Article</span>
        </button>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/20 text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3.5 px-6">Article</th>
                <th className="py-3.5 px-6">Author (Team)</th>
                <th className="py-3.5 px-6">Publication Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-muted-foreground">
                    <RiArticleLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No articles published yet</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Article&quot; to publish spatial design and architectural insights.
                    </p>
                  </td>
                </tr>
              ) : (
                articles.map((art) => {
                  const cover = art.image
                    ? getPublicStorageUrl(art.image)
                    : "/images/architecture.png";
                  const authorDisplay =
                    art.author?.name || art.author_name || "Editorial Staff";
                  const designationDisplay =
                    art.author?.designation || art.author_designation || "ONP";

                  return (
                    <tr key={art.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={cover}
                              alt={art.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-semibold text-foreground text-xs block">
                              {art.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-sm font-light">
                              {art.description}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-medium text-foreground block">
                          {authorDisplay}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-light">
                          {designationDisplay}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-muted-foreground font-mono text-[11px]">
                        {new Date(art.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      <td className="py-4 px-6">
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

                      <td className="py-4 px-6 text-right">
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
