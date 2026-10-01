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
} from "@remixicon/react";

interface ModeratorsClientProps {
  initialModerators: Profile[];
}

export function ModeratorsClient({ initialModerators }: ModeratorsClientProps) {
  const [moderators, setModerators] = useState<Profile[]>(initialModerators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Create Moderator submission
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const formData = new FormData(e.currentTarget);

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

  return (
    <div className="flex flex-col gap-6">
      {/* ── Action Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Moderators
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Create, monitor, and manage moderator accounts with restricted content privileges.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError(null);
            setIsModalOpen(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 self-start"
        >
          <RiUserAddLine size={16} />
          <span>New Moderator</span>
        </button>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/20 text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3.5 px-6">Name</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Created Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {moderators.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <RiShieldUserLine size={32} className="mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">No moderators found</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Moderator&quot; to authorize a content team member.
                    </p>
                  </td>
                </tr>
              ) : (
                moderators.map((mod) => (
                  <tr key={mod.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="py-4 px-6 font-medium text-foreground">
                      {mod.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-muted-foreground">
                      {mod.email}
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 border border-border">
                        {mod.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
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
                    <td className="py-4 px-6 text-muted-foreground font-mono text-[11px]">
                      {new Date(mod.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-right">
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
                          <RiDeleteBinLine size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
