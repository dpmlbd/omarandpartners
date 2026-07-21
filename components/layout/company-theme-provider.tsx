"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const COMPANY_THEMES: Record<string, string> = {
  kolpoporisor: "#4A6FA5",
  kolpokowsol: "#7B5EA7",
  inex: "#C27A2C",
};

const DEFAULT_THEME = "#059669";

export function CompanyThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const companyKey = pathParts[0];
    const color = COMPANY_THEMES[companyKey] || DEFAULT_THEME;

    document.documentElement.style.setProperty("--primary", color);
    document.documentElement.style.setProperty("--ring", color);
  }, [pathname]);

  return <>{children}</>;
}
