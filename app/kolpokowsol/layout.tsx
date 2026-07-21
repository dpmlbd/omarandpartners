import type { Metadata } from "next";
import { CompanyTopNav } from "@/components/layout/company-top-nav";
import { CompanyThemeProvider } from "@/components/layout/company-theme-provider";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/kolpokowsol/overview" },
  { label: "Services", href: "/kolpokowsol/services" },
  { label: "Projects", href: "/kolpokowsol/projects" },
  { label: "Team", href: "/kolpokowsol/team" },
  { label: "Insights", href: "/kolpokowsol/insights" },
  { label: "Consultation", href: "/kolpokowsol/request-consultation" },
  { label: "Contact", href: "/kolpokowsol/contact" },
];

export const metadata: Metadata = {
  title: "ONP | Kolpokowsol",
  description: "Interior design and spatial aesthetics by Kolpokowsol.",
};

export default function KolpokowsolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyThemeProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <CompanyTopNav
            companyName="Kolpokowsol"
            companySlug="kolpokowsol"
            navItems={navItems}
            accentColor="#7B5EA7"
          />
          {children}

          {/* ── CTA SECTION ───────────────────────────────────────────────── */}
          <section className="py-24 md:py-32 bg-foreground text-background border-t border-border">
            <div className="container mx-auto px-6 md:px-14 flex flex-col md:flex-row justify-between items-center gap-10">
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase max-w-2xl">
                  Begin your interior journey
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <Link
                  href="/kolpokowsol/request-consultation"
                  className="inline-flex items-center gap-3 border border-background/20 text-background px-6 py-4 text-xs uppercase tracking-widest hover:bg-primary hover:border-primary transition-all duration-300 group shrink-0"
                >
                  Request Consultation <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </section>
        </main>
      </div>
    </CompanyThemeProvider>
  );
}