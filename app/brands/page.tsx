import type { Metadata } from "next";
import { BrandsView } from "./brands-view";

export const metadata: Metadata = {
  title: "ONP | Brand Assets",
  description: "Brand guidelines, logos, colors, and typography for Omar & Partners.",
};

export default function BrandsPage() {
  return <BrandsView />;
}
