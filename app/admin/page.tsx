import Link from "next/link";
import { getCurrentUserAndProfile } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/server";
import {
  RiBuilding4Line,
  RiTeamLine,
  RiChatQuoteLine,
  RiArticleLine,
  RiShieldUserLine,
  RiArrowRightLine,
  RiCheckLine,
  RiTimeLine,
} from "@remixicon/react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { user, profile } = await getCurrentUserAndProfile();
  const supabase = await createClient();

  // Fetch counts safely (fallback to 0 if database not populated yet)
  let projectCount = 0;
  let teamCount = 0;
  let testimonialCount = 0;
  let articleCount = 0;
  let moderatorCount = 0;

  try {
    const [
      { count: pCount },
      { count: tCount },
      { count: testCount },
      { count: aCount },
      { count: mCount },
    ] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("team").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("articles").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "moderator"),
    ]);

    projectCount = pCount || 0;
    teamCount = tCount || 0;
    testimonialCount = testCount || 0;
    articleCount = aCount || 0;
    moderatorCount = mCount || 0;
  } catch (err) {
    console.warn("Could not query entity counts (Supabase may not be initialized yet):", err);
  }

  const role = profile?.role || "moderator";

  const stats = [
    {
      title: "Projects",
      count: projectCount,
      href: "/admin/projects",
      icon: RiBuilding4Line,
      description: "Kolpokowsol & Kolpoporisor portfolio",
      tag: "Active Works",
    },
    {
      title: "Team Members",
      count: teamCount,
      href: "/admin/team",
      icon: RiTeamLine,
      description: "Leadership, architects & designers",
      tag: "Ecosystem Staff",
    },
    {
      title: "Client Voices",
      count: testimonialCount,
      href: "/admin/testimonials",
      icon: RiChatQuoteLine,
      description: "Testimonials featured on home",
      tag: "Social Proof",
    },
    {
      title: "Articles & Insights",
      count: articleCount,
      href: "/admin/articles",
      icon: RiArticleLine,
      description: "Editorial spatial publications",
      tag: "Publications",
    },
    ...(role === "admin"
      ? [
          {
            title: "Moderators",
            count: moderatorCount,
            href: "/admin/moderators",
            icon: RiShieldUserLine,
            description: "Authorized content managers",
            tag: "Access Control",
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      {/* ── Welcome Banner ─────────────────────────────────────────── */}
      <div className="p-8 border border-border bg-card/60 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-primary font-semibold">
                Control Overview
              </span>
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground">
              Welcome, {profile?.name || user?.email?.split("@")[0] || "Staff"}
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm font-light mt-2 max-w-xl">
              You are authenticated as an <strong className="text-foreground uppercase font-semibold">{role}</strong>. Use this portal to manage projects, staff records, client feedback, and publications across Omar &amp; Partners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects"
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-3 uppercase tracking-wider hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <span>Manage Projects</span>
              <RiArrowRightLine size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.title}
              href={s.href}
              className="group p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {s.tag}
                </span>
                <div className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors">
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <span className="font-heading text-3xl md:text-4xl font-bold tracking-tight block">
                  {s.count}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground block mt-1">
                  {s.title}
                </span>
                <p className="text-xs text-muted-foreground font-light mt-1">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors font-medium">
                <span>View All</span>
                <RiArrowRightLine size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── System Status & Guidelines ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 p-6 border border-border bg-card flex flex-col gap-4">
          <h2 className="font-heading text-lg font-bold uppercase tracking-tight">
            Content Rules &amp; Publishing Guidelines
          </h2>
          <ul className="flex flex-col gap-3 text-xs text-muted-foreground font-light leading-relaxed">
            <li className="flex items-start gap-2">
              <RiCheckLine size={16} className="text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Image Limits:</strong> Projects strictly support up to 7 images (1 required main hero image + up to 6 gallery images).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <RiCheckLine size={16} className="text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Free-Tier Optimization:</strong> All uploaded images are converted server-side to AVIF via Sharp (max 2400px longest dimension) before upload to Supabase Storage.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <RiCheckLine size={16} className="text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Active Companies:</strong> Projects are restricted to <em>Kolpokowsol</em> and <em>Kolpoporisor</em> across 3 official categories (Building, Interior, Landscape).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <RiCheckLine size={16} className="text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Session Security:</strong> Authenticated sessions are strictly prevented from browsing the public website until you log out.
              </span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 p-6 border border-border bg-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">
              System Context
            </span>
            <h3 className="font-heading text-base font-semibold uppercase tracking-tight text-foreground">
              Storage &amp; Database
            </h3>
            <div className="mt-4 flex flex-col gap-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Storage Bucket:</span>
                <span className="font-mono text-primary">onp-media</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">Output Format:</span>
                <span className="font-mono text-foreground">image/avif</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border">
                <span className="text-muted-foreground">User Role:</span>
                <span className="font-mono uppercase font-bold text-primary">{role}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-muted-foreground/60 font-mono">
            <RiTimeLine size={14} />
            <span>Active Session Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
