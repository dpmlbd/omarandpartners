import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ONP | Contact",
  description: "Get in touch with Omar & Partners.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
