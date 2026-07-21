import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Careers",
  description: "Explore careers at Omar & Partners and join our team.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
