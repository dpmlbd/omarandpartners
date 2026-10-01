import Link from "next/link";
import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import {
  RiBuilding4Line,
  RiTeamLine,
  RiChatQuoteLine,
  RiArticleLine,
  RiShieldUserLine,
  RiBriefcaseLine,
  RiArrowRightLine,
  RiAddLine,
} from "@remixicon/react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { user, profile } = await getCurrentUserAndProfile();
  const supabase = await createClient();

  let projectCount = 0;
  let teamCount = 0;
  let testimonialCount = 0;
  let articleCount = 0;
  let moderatorCount = 0;
  let jobCount = 0;

  try {
    const [
      { count: pCount },
      { count: tCount },
      { count: testCount },
      { count: aCount },
      { count: mCount },
      { count: jCount },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("team").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "moderator"),
      supabase.from("jobs").select("*", { count: "exact", head: true }),
    ]);

    projectCount = pCount || 0;
    teamCount = tCount || 0;
    testimonialCount = testCount || 0;
    articleCount = aCount || 0;
    moderatorCount = mCount || 0;
    jobCount = jCount || 0;
  } catch (err) {
    console.warn("Could not query entity counts:", err);
  }

  const role = profile?.role || "moderator";
  const displayName = profile?.name || user?.email?.split("@")[0] || "Staff";

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">

      {/* ── Welcome Strip ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">
              Control Overview
            </span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground">
            Welcome, {displayName}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-border bg-card hover:border-primary hover:text-primary text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          >
            <RiAddLine size={14} />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/projects"
            className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-2.5 uppercase tracking-wider hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
          >
            <span>All Projects</span>
            <RiArrowRightLine size={14} />
          </Link>
        </div>
      </div>

      {/* ── Bento Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-6 lg:grid-cols-12 auto-rows-fr gap-3 md:gap-4">

        {/* PROJECTS — Large Featured Card (spans 6 cols, 2 rows) */}
        <Link
          href="/admin/projects"
          className="group col-span-6 row-span-2 relative border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/40 to-transparent" />

          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-primary tracking-widest font-semibold">01</span>
                <span className="w-6 h-[1px] bg-primary/30" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active Works</span>
              </div>
              <div className="w-10 h-10 border border-border bg-background/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-300">
                <RiBuilding4Line size={20} />
              </div>
            </div>

            <div className="mt-auto">
              <span className="font-heading text-7xl md:text-8xl font-bold tracking-tighter block leading-none text-foreground/10 group-hover:text-primary/20 transition-colors duration-500">
                {String(projectCount).padStart(2, "0")}
              </span>
              <div className="mt-2">
                <span className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground block">
                  Projects
                </span>
                <p className="text-xs text-muted-foreground font-light mt-1">
                  Kolpokowsol &amp; Kolpoporishor portfolio
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 md:px-8 py-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">
            <span>Manage Projects</span>
            <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* TEAM — 3 cols */}
        <BentoCard
          index="02"
          title="Team"
          count={teamCount}
          description="Leadership & architects"
          tag="Ecosystem Staff"
          href="/admin/team"
          icon={RiTeamLine}
          className="col-span-3"
        />

        {/* TESTIMONIALS — 3 cols */}
        <BentoCard
          index="03"
          title="Client Voices"
          count={testimonialCount}
          description="Testimonials on home"
          tag="Social Proof"
          href="/admin/testimonials"
          icon={RiChatQuoteLine}
          className="col-span-3"
        />

        {/* ARTICLES — 3 cols */}
        <BentoCard
          index="04"
          title="Articles"
          count={articleCount}
          description="Spatial publications"
          tag="Publications"
          href="/admin/articles"
          icon={RiArticleLine}
          className="col-span-3"
        />

        {/* CAREERS — 3 cols */}
        <BentoCard
          index="05"
          title="Careers"
          count={jobCount}
          description="Open positions"
          tag="Talent Acquisition"
          href="/admin/careers"
          icon={RiBriefcaseLine}
          className="col-span-3"
        />

        {/* MODERATORS — Admin only, full bottom row */}
        {role === "admin" && (
          <BentoCard
            index="06"
            title="Moderators"
            count={moderatorCount}
            description="Authorized content managers"
            tag="Access Control"
            href="/admin/moderators"
            icon={RiShieldUserLine}
            className="col-span-6 lg:col-span-12"
          />
        )}
      </div>
    </div>
  );
}

/* ── Reusable Bento Card ──────────────────────────────────────────── */
function BentoCard({
  index,
  title,
  count,
  description,
  tag,
  href,
  icon: Icon,
  className = "",
}: {
  index: string;
  title: string;
  count: number;
  description: string;
  tag: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col ${className}`}
    >
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest group-hover:text-primary transition-colors">{index}</span>
            <span className="w-4 h-[1px] bg-border" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground hidden sm:inline">{tag}</span>
          </div>
          <div className="w-8 h-8 border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 transition-all duration-300">
            <Icon size={16} />
          </div>
        </div>

        {/* Count + Info */}
        <div className="mt-auto">
          <span className="font-heading text-3xl md:text-4xl font-bold tracking-tighter block leading-none text-foreground">
            {count}
          </span>
          <span className="text-sm font-semibold uppercase tracking-wider text-foreground block mt-1">
            {title}
          </span>
          <p className="text-[11px] text-muted-foreground font-light mt-0.5">{description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 md:px-6 py-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground group-hover:text-primary transition-colors font-medium">
        <span>View All</span>
        <RiArrowRightLine size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
