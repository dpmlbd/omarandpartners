"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import { CookieBanner } from "@/components/ui/cookie-banner";

export function SiteLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen flex flex-col flex-1">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 pt-24">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
