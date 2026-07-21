"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const DEFAULT_THEME = "#059669";

export function ThemeInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const companyKey = pathParts[0];
    const isCompanyPage = ["kolpoporisor", "kolpokowsol", "inex"].includes(companyKey);

    if (!isCompanyPage) {
      document.documentElement.style.setProperty("--primary", DEFAULT_THEME);
      document.documentElement.style.setProperty("--ring", DEFAULT_THEME);
    }
  }, [pathname]);

  return null;
}
