"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet } from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
}

interface CompanyTopNavProps {
  companyName: string;
  companySlug: string;
  navItems: NavItem[];
  accentColor?: string;
}

export function CompanyTopNav({ companyName, companySlug, navItems, accentColor }: CompanyTopNavProps) {
  const pathname = usePathname();
  const baseSlug = `/${companySlug}`;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="sticky top-24 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between h-14">
            {/* Company name on the left */}
            <Link href={baseSlug} className="flex items-center gap-3 group">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-primary transition-colors">
                {companyName}
              </span>
              <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Menu</span>
            </Link>

            {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== baseSlug && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-xs uppercase tracking-widest transition-colors duration-300",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[1px]" style={{ backgroundColor: accentColor }} />
                  )}
                </Link>
              );
            })}
          </nav>

            {/* Mobile Sheet trigger */}
            <button
              className="md:hidden p-2 -mr-2 text-foreground"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet — rendered outside sticky container */}
      <Sheet open={isMobileOpen} onClose={() => setIsMobileOpen(false)} side="right" topOffset="6rem">
        <nav className="flex flex-col gap-6 text-left">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== baseSlug && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn("text-2xl font-heading font-medium tracking-tight uppercase", isActive ? "text-primary" : "text-foreground")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Sheet>
    </>
  );
}
