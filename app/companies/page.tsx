import type { Metadata } from "next";
import { CompaniesView } from "@/components/features/companies/companies-view";

export const metadata: Metadata = {
  title: "ONP | Companies",
  description: "Our group of companies under Omar & Partners.",
};

export default function CompaniesPage() {
  return <CompaniesView />;
}
