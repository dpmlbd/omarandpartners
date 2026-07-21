import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Legal",
  description: "Legal information for Omar & Partners.",
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
