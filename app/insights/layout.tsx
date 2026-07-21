import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Insights",
  description: "Articles, news, and press releases from Omar & Partners.",
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
