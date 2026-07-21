import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | About",
  description: "Learn about Omar & Partners, our mission, vision, and leadership.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
