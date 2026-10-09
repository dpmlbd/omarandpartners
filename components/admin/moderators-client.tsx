"use client";

import { useState, useTransition } from "react";
import type { Profile } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  createModeratorAction,
  updateModeratorStatusAction,
  deleteModeratorAction,
} from "@/lib/actions/moderators";
import {
  RiShieldUserLine,
  RiUserAddLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAlertLine,
  RiSearchLine,
  RiFilterLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "@remixicon/react";

interface ModeratorsClientProps {
  initialModerators: Profile[];
}

export function ModeratorsClient({ initialModerators }: ModeratorsClientProps) {
  const [moderators, setModerators] = useState<Profile[]>(initialModerators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  // Create Moderator submission
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    if (!name || name.length < 2) {
      setFormError("Full name must be at least 2 characters.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters.");
      return;
    }

    startTransition(async () => {
      const result = await createModeratorAction(null, formData);
      if (result.error) {
        setFormError(result.error);
        toast.error(result.error);
      } else {
        toast.success("Moderator invited successfully");
        setIsModalOpen(false);
        window.location.reload();
      }
    });
  };

  // Status toggle
  const handleToggleStatus = (mod: Profile) => {
    const nextStatus = mod.status === "active" ? "inactive" : "active";
    if (
      !confirm(
        `Are you sure you want to ${
          nextStatus === "inactive" ? "deactivate" : "activate"
        } moderator "${mod.name}"?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await updateModeratorStatusAction(mod.id, nextStatus);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          `Moderator "${mod.name}" is now ${nextStatus}`
        );
        setModerators((prev) =>
          prev.map((m) => (m.id === mod.id ? { ...m, status: nextStatus } : m))
        );
      }
    });
  };

  // Delete moderator
  const handleDelete = (mod: Profile) => {
    if (
      !confirm(
        `Are you sure you want to PERMANENTLY DELETE moderator "${mod.name}" (${mod.email})? This action cannot be undone.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteModeratorAction(mod.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Moderator "${mod.name}" deleted`);
        setModerators((prev) => prev.filter((m) => m.id !== mod.id));
      }
    });
  };

  const filteredModerators = moderators.filter((mod) => {
    if (statusFilter === "active" && mod.status !== "active") return false;
    if (statusFilter === "inactive" && mod.status !== "inactive") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = mod.name.toLowerCase().includes(q);
      const matchEmail = mod.email.toLowerCase().includes(q);
      if (!matchName && !matchEmail) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredModerators.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedModerators = filteredModerators.slice(startIndex, startIndex + pageSize);

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
      {/* ── Action Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between shrink-0 mb-3">
        <div>
          <h1 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight">
            Moderators
          </h1>
        </div>

        <button
          onClick={() => {
            setFormError(null);
            setIsModalOpen(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiUserAddLine size={14} />
          <span>New Moderator</span>
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
            placeholder="Search by name or email..."
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
          <option value="all">All Accounts</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
          {filteredModerators.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredModerators.length)} of {filteredModerators.length}
        </span>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
              <tr className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Email Address</th>
                <th className="py-3 px-5">Role</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Created Date</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredModerators.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-muted-foreground">
                    <RiShieldUserLine size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">No moderators match your criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Moderator&quot; to authorize a content team member.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedModerators.map((mod) => (
                  <tr key={mod.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="py-3 px-5 font-semibold text-foreground">
                      {mod.name}
                    </td>
                    <td className="py-3 px-5 font-mono text-muted-foreground">
                      {mod.email}
                    </td>
                    <td className="py-3 px-5">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-border">
                        {mod.role}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full ${
                          mod.status === "active"
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-destructive/10 text-destructive border border-destructive/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            mod.status === "active" ? "bg-emerald-500" : "bg-destructive"
                          }`}
                        />
                        {mod.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-muted-foreground font-mono text-[11px]">
                      {new Date(mod.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(mod)}
                          disabled={isPending}
                          className="px-2.5 py-1 text-[11px] border border-border hover:bg-secondary transition-colors"
                          title={mod.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {mod.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(mod)}
                          disabled={isPending}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors"
                          title="Delete Moderator"
                        >
                          <RiDeleteBinLine size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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

      {/* ── Create Moderator Modal ─────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-md p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
                  Access Control
                </span>
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                  New Moderator
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 border border-destructive/30 bg-destructive/10 text-destructive text-xs flex items-start gap-2">
                <RiAlertLine size={16} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="moderator@onp-bd.com"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Temporary Password * (min. 6 characters)
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••••••"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

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
                  {isPending ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
