import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Brand Assets",
  description: "Brand guidelines, logos, colors, and typography for Omar & Partners.",
};

export default function BrandsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
