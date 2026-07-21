"use client";

import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground border border-transparent hover:border-border"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
    </button>
  );
}
