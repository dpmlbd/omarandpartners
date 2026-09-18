import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Teams",
  description: "Meet the people behind Omar & Partners — architects, designers, and specialists across our ecosystem.",
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
