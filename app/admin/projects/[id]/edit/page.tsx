import { notFound } from "next/navigation";
import { getProjectById, getActiveProjectCompanies } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Edit Project",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, companies] = await Promise.all([
    getProjectById(id),
    getActiveProjectCompanies(),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectForm companies={companies} initialProject={project} />;
}
