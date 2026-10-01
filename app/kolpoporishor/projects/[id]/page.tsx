import { notFound } from "next/navigation";
import { fetchProjectDetail } from "@/lib/public/projects";
import { ProjectDetailView } from "@/components/features/projects/project-detail-view";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchProjectDetail(id);
  if (!project) return { title: "Project Not Found | Kolpoporishor" };
  return {
    title: `${project.title} | Kolpoporishor Portfolio`,
    description: project.description ? project.description.slice(0, 160) : undefined,
  };
}

export default async function KolpoporishorProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProjectDetail(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} companySlug="kolpoporishor" />;
}
