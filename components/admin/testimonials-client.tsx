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

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Client Voices &amp; Testimonials
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Curate verified client perspectives featured on the public homepage.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 self-start"
        >
          <RiAddLine size={16} />
          <span>New Testimonial</span>
        </button>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/20 text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3.5 px-6">Client</th>
                <th className="py-3.5 px-6">Organization / Role</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Quote Excerpt</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <RiChatQuoteLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No testimonials found</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Testimonial&quot; to publish client endorsements.
                    </p>
                  </td>
                </tr>
              ) : (
                testimonials.map((t) => {
                  const avatar = t.image
                    ? getPublicStorageUrl(t.image)
                    : "/images/hero_architecture.png";

                  return (
                    <tr key={t.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full border border-border bg-secondary shrink-0 overflow-hidden">
                            <Image
                              src={avatar}
                              alt={t.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-foreground text-xs">
                            {t.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-foreground font-medium">
                        {t.work}
                      </td>

                      <td className="py-4 px-6 text-muted-foreground">
                        {t.location}
                      </td>

                      <td className="py-4 px-6 text-muted-foreground font-light max-w-xs">
                        <span className="line-clamp-2 italic">
                          &ldquo;{t.description}&rdquo;
                        </span>
                      </td>

                      <td className="py-4 px-6">
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

                      <td className="py-4 px-6 text-right">
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
