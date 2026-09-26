"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { PublicTeamGroup } from "@/lib/public/team";

interface TeamsViewProps {
  teamGroups: PublicTeamGroup[];
}

export function TeamsView({ teamGroups }: TeamsViewProps) {
  if (!teamGroups || teamGroups.length === 0) return null;

  return (
    <div className="flex flex-col">
      {teamGroups.map((group) => {
        if (group.members.length === 0) return null;

        return (
          <section key={group.teamSlug} className="py-10 md:py-14">
            <div className="container mx-auto px-6 md:px-14">
              {/* ── Team Header (No top border, no member count) ───── */}
              <ScrollReveal>
                <div className="mb-6 md:mb-8">
                  <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-bold tracking-tight uppercase text-foreground">
                    {group.teamName}
                  </h2>
                </div>
              </ScrollReveal>

              {/* ── Grid (No top border, only bottom/right/left cell borders) ─── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border bg-background">
                {group.members.map((member, i) => {
                  const cleaned = member.name.replace(/^(Ar\.|Engr\.|Mrs\.|Mr\.|Ms\.)\s*/i, "");
                  const initials =
                    cleaned
                      .split(" ")
                      .filter(Boolean)
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase() || "OP";

                  return (
                    <div
                      key={member.name + i}
                      className="flex items-start gap-4 py-6 px-5 sm:py-7 sm:px-6 border-b border-r border-border hover:bg-secondary/40 transition-colors duration-150"
                    >
                      {/* Avatar with initials */}
                      <div className="w-11 h-11 rounded-full border border-border bg-secondary flex items-center justify-center font-mono text-xs font-bold text-foreground shrink-0 mt-0.5">
                        {initials}
                      </div>

                      {/* Name, Designation, and Study */}
                      <div className="flex flex-col min-w-0">
                        <h3 className="font-heading text-sm md:text-base font-semibold tracking-tight text-foreground">
                          {member.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
                          {member.designation}
                        </p>
                        {member.study && (
                          <p className="text-[11px] text-muted-foreground/80 font-mono leading-relaxed mt-1.5">
                            {member.study}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
