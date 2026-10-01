"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { logoutAction } from "@/lib/actions/auth";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Profile } from "@/types/database";
import {
  RiDashboardLine,
  RiBuilding4Line,
  RiTeamLine,
  RiChatQuoteLine,
  RiArticleLine,
  RiShieldUserLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
  RiUser3Line,
  RiLayoutLeftLine,
  RiBriefcaseLine,
} from "@remixicon/react";

interface DashboardShellProps {
  children: React.ReactNode;
  profile: Profile | null;
  userEmail?: string;
}

export function DashboardShell({
  children,
  profile,
  userEmail,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If on /admin/login, don't wrap with dashboard shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const role = profile?.role || "moderator";

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: RiDashboardLine },
    { name: "Projects", href: "/admin/projects", icon: RiBuilding4Line },
    { name: "Team", href: "/admin/team", icon: RiTeamLine },
    { name: "Testimonials", href: "/admin/testimonials", icon: RiChatQuoteLine },
    { name: "Articles", href: "/admin/articles", icon: RiArticleLine },
    { name: "Careers", href: "/admin/careers", icon: RiBriefcaseLine },
    // Only Admin can see Moderators navigation
    ...(role === "admin"
      ? [{ name: "Moderators", href: "/admin/moderators", icon: RiShieldUserLine }]
      : []),
  ];

  const currentTab = navigation.find(
    (i) => i.href !== "/admin" && pathname.startsWith(i.href)
  );
  const isRootDashboard = pathname === "/admin";
  const isSubPage = pathname.endsWith("/new") || pathname.includes("/edit");
  const subPageLabel = pathname.endsWith("/new")
    ? "New"
    : pathname.includes("/edit")
    ? "Edit"
    : null;

  return (
    <div className="h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden">
      {/* ── Mobile Backdrop ────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile Top Bar ─────────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-border bg-card shrink-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/onp.svg" alt="ONP" width={24} height={24} />
          <span className="font-heading font-bold text-sm tracking-tight uppercase">
            ONP Admin
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <RiCloseLine size={20} /> : <RiMenuLine size={20} />}
          </button>
        </div>
      </div>

      {/* ── Sidebar ─────────────────────────────────────────────────── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border flex flex-col justify-between transition-all duration-300 md:static md:h-screen overflow-hidden overflow-y-hidden",
          // Mobile visibility
          mobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
          // Desktop toggle
          sidebarCollapsed
            ? "md:w-0 md:opacity-0 md:border-r-0 pointer-events-none"
            : "md:w-64 md:opacity-100"
        )}
      >
        {/* Brand & Context */}
        <div className="flex flex-col min-w-[16rem]">
          {/* Logo Section - exactly matching the main header height (h-16) */}
          <div className="h-16 px-6 border-b border-border flex items-center justify-between shrink-0">
            <Link href="/admin" className="flex items-center gap-3">
              <Image src="/onp.svg" alt="ONP" width={28} height={28} />
              <div className="flex flex-col">
                <span className="font-heading text-sm font-bold tracking-tighter uppercase leading-tight">
                  Omar &amp; Partners
                </span>
                <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase">
                  CMS Control Panel
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden p-1 text-muted-foreground hover:text-foreground"
            >
              <RiCloseLine size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1 overflow-y-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/70 px-3 py-2">
              Management
            </span>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  )}
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-border flex flex-col gap-4 bg-secondary/10 min-w-[16rem] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-xs border border-border">
              <RiUser3Line size={14} />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold truncate text-foreground">
                {profile?.name || userEmail || "Authorized Staff"}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={cn(
                    "text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 font-bold",
                    role === "admin"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {role}
                </span>
                <span className="text-[10px] text-muted-foreground/60 truncate">
                  {userEmail}
                </span>
              </div>
            </div>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs uppercase tracking-widest font-semibold border border-border bg-background hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors duration-200"
            >
              <RiLogoutBoxRLine size={14} />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main Area ──────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header with Sidebar Toggle & Breadcrumbs - exactly h-16 */}
        <header className="hidden md:flex items-center justify-between px-6 md:px-8 h-16 border-b border-border bg-card/40 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4">
            {/* Sidebar Hide/Show Toggle */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60 transition-colors"
              title={sidebarCollapsed ? "Show Sidebar" : "Hide Sidebar"}
              aria-label="Toggle Sidebar"
            >
              <RiLayoutLeftLine size={18} />
            </button>

            <div className="h-4 w-[1px] bg-border" />

            {/* shadcn Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  {isRootDashboard ? (
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                  )}
                </BreadcrumbItem>

                {currentTab && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isSubPage ? (
                        <BreadcrumbLink href={currentTab.href}>
                          {currentTab.name}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{currentTab.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </>
                )}

                {subPageLabel && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{subPageLabel}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-muted-foreground font-mono">
              Signed in as <strong className="text-foreground">{role}</strong>
            </span>
            <div className="h-4 w-[1px] bg-border" />
            <ThemeToggle />
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
