import type { Metadata } from "next";
import { CompaniesView } from "@/components/features/companies/companies-view";
import { fetchRandomCompanyProjects } from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "ONP | Companies",
  description: "Our group of companies under Omar & Partners.",
};

export const dynamic = "force-dynamic";

export default async function CompaniesPage() {
  const randomProjects = await fetchRandomCompanyProjects(6);
  return <CompaniesView initialGallery={randomProjects} />;
}
