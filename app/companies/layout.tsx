import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Companies",
  description: "Our group of companies under Omar & Partners.",
};

export default function CompaniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
