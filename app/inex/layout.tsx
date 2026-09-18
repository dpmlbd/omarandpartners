import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | INEX — Coming Soon",
  description: "INEX — Premium building materials and sourcing. Coming Soon.",
};

export default function InexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}