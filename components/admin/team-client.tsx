"use client";

import { useState, useTransition } from "react";
import {
  createTeamMemberAction,
  updateTeamMemberAction,
  deleteTeamMemberAction,
} from "@/lib/actions/team";
import type { TeamMember, Company } from "@/types/database";
import { toast } from "@/components/ui/toast";
import {
  RiUserAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiCloseLine,
  RiAlertLine,
  RiTeamLine,
} from "@remixicon/react";

interface TeamClientProps {
  initialMembers: TeamMember[];
  companies?: Company[];
}

export function TeamClient({ initialMembers }: TeamClientProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const openCreateModal = () => {
    setEditingMember(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const designation = (formData.get("designation") as string)?.trim();
    const teamType = (formData.get("team_type") as string)?.trim();

    if (!name || name.length < 2) {
      setError("Full name must be at least 2 characters.");
      return;
    }

    if (!designation || designation.length < 2) {
      setError("Designation must be at least 2 characters.");
      return;
    }

    if (!teamType) {
      setError("Please select a team group.");
      return;
    }

    startTransition(async () => {
      let result;
      if (editingMember) {
        result = await updateTeamMemberAction(editingMember.id, formData);
      } else {
        result = await createTeamMemberAction(null, formData);
      }

      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      } else {
        toast.success(
          editingMember
            ? `Updated team member "${editingMember.name}"`
            : "New team member added successfully"
        );
        setIsModalOpen(false);
        window.location.reload();
      }
    });
  };

  const handleDelete = (member: TeamMember) => {
    if (
      !confirm(
        `Are you sure you want to remove "${member.name}" (${member.designation}) from the team?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteTeamMemberAction(member.id);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`Removed "${member.name}" from the team`);
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight">
            Team Management
          </h1>
          <p className="text-muted-foreground text-xs font-light mt-1">
            Maintain leadership, partner, architectural, and interior personnel records.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 self-start"
        >
          <RiUserAddLine size={16} />
          <span>New Team Member</span>
        </button>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/20 text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3.5 px-6">Member Name</th>
                <th className="py-3.5 px-6">Designation</th>
                <th className="py-3.5 px-6">Team Group / Type</th>
                <th className="py-3.5 px-6">Study / Qualifications</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-muted-foreground">
                    <RiTeamLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No team members registered</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Team Member&quot; to add staff profiles.
                    </p>
                  </td>
                </tr>
              ) : (
                members.map((m) => {
                  const initials = m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr key={m.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm border border-border bg-secondary flex items-center justify-center font-mono text-[11px] font-bold text-foreground shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground block text-xs">
                              {m.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-foreground font-medium">
                        {m.designation}
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-border bg-secondary/30">
                          {m.team_type}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-muted-foreground font-mono text-[11px]">
                        {m.study || "—"}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(m)}
                            className="p-1.5 text-muted-foreground hover:text-foreground border border-border hover:bg-secondary transition-colors"
                            title="Edit Member"
                          >
                            <RiEditLine size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(m)}
                            disabled={isPending}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent hover:border-destructive/30 transition-colors"
                            title="Delete Member"
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

      {/* ── Modal Dialog ───────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block mb-1">
                  Personnel Record
                </span>
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight">
                  {editingMember ? "Edit Team Member" : "New Team Member"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <RiCloseLine size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/30 text-destructive text-xs flex items-center gap-2">
                <RiAlertLine size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={editingMember?.name || ""}
                  placeholder="e.g. Sarah Chowdhury"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Professional Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  required
                  defaultValue={editingMember?.designation || ""}
                  placeholder="e.g. Senior Principal Architect"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Team Group / Department *
                </label>
                <input
                  type="text"
                  name="team_type"
                  required
                  defaultValue={editingMember?.team_type || "Design Team"}
                  placeholder="e.g. Team Lead, Design Team, Structural Team"
                  className="bg-secondary/30 border border-border px-3.5 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                  Study / Qualifications (Optional)
                </label>
                <input
                  type="text"
                  name="study"
                  defaultValue={editingMember?.study || ""}
                  placeholder="e.g. B.Arch (SUST), PM (EDCP)-Japan"
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
                  {isPending ? "Saving..." : editingMember ? "Save Changes" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
