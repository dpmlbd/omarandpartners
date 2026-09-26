import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { fetchPublicTeams } from "@/lib/public/team";
import { TeamsView } from "@/components/features/teams/teams-view";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP | Meet the Team",
  description: "Meet the principal architects, structural engineers, design studio leads, and management team of the ecosystem.",
};

export default async function TeamsPage() {
  const teamGroups = await fetchPublicTeams();

  return (
    <div className="flex flex-col w-full pb-16 md:pb-24">
      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">Our People</span>
            </div>
          </ScrollReveal>

          <h1
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Meet our Team
          </h1>

          <p className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6">
            The principal architects, structural and electrical engineers, project directors, and specialized practitioners driving execution excellence across the entire ecosystem.
          </p>
        </div>
      </section>

      {/* ── TEAMS GRID ───────────────────────────────────────────────── */}
      <TeamsView teamGroups={teamGroups} />
    </div>
  );
}
