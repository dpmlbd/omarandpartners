import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { InexComingSoonView } from "./inex-view";

const comp = siteConfig.companies.find((c) => c.name === "INEX");

export const metadata: Metadata = {
  title: `ONP | ${comp?.name || "INEX"} — Coming Soon`,
  description: `${comp?.name || "INEX"} — ${comp?.description || "Building Materials — Coming Soon"}`,
};

export default function InexComingSoonPage() {
  return <InexComingSoonView />;
}
