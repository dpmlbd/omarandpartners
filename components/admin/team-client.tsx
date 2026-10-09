"use client";

import { useState, useTransition, useMemo } from "react";
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
  RiSearchLine,
  RiFilterLine,
  RiArrowLeftLine,
  RiArrowRightLine,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const groups = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.team_type) set.add(m.team_type);
    });
    return Array.from(set).sort();
  }, [members]);

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

  const filteredMembers = members.filter((m) => {
    if (selectedGroup !== "all" && m.team_type !== selectedGroup) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = m.name.toLowerCase().includes(q);
      const matchDesig = m.designation.toLowerCase().includes(q);
      const matchStudy = m.study?.toLowerCase().includes(q);
      if (!matchName && !matchDesig && !matchStudy) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * pageSize;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + pageSize);

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
            Team Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-wider font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <RiUserAddLine size={14} />
          <span>New Team Member</span>
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
            placeholder="Search by name, designation, or study..."
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
          <span>Group:</span>
        </div>

        <select
          value={selectedGroup}
          onChange={(e) => {
            setSelectedGroup(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-secondary/30 border border-border px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary"
        >
          <option value="all">All Groups</option>
          {groups.map((grp) => (
            <option key={grp} value={grp}>
              {grp}
            </option>
          ))}
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
          {filteredMembers.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + pageSize, filteredMembers.length)} of {filteredMembers.length}
        </span>
      </div>

      {/* ── Table Card ─────────────────────────────────────────────── */}
      <div className="border border-border bg-card flex-1 min-h-0 flex flex-col overflow-hidden shadow-sm">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10 bg-secondary/95 backdrop-blur-sm border-b border-border shadow-xs">
              <tr className="text-muted-foreground font-mono uppercase tracking-widest text-[10px]">
                <th className="py-3 px-5">Member Name</th>
                <th className="py-3 px-5">Designation</th>
                <th className="py-3 px-5">Team Group / Type</th>
                <th className="py-3 px-5">Study / Qualifications</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-light">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-muted-foreground">
                    <RiTeamLine size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No team members match your criteria</p>
                    <p className="text-xs text-muted-foreground mt-1 font-light">
                      Click &quot;New Team Member&quot; to add staff profiles.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((m) => {
                  const initials = m.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr key={m.id} className="hover:bg-secondary/10 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 border border-border bg-secondary flex items-center justify-center font-mono text-[11px] font-bold text-foreground shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="font-semibold text-foreground block text-xs">
                              {m.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-5 text-foreground font-medium">
                        {m.designation}
                      </td>

                      <td className="py-3 px-5">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-border bg-secondary/30">
                          {m.team_type}
                        </span>
                      </td>

                      <td className="py-3 px-5 text-muted-foreground font-mono text-[11px]">
                        {m.study || "—"}
                      </td>

                      <td className="py-3 px-5 text-right">
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
