import { getProjects, getActiveProjectCompanies } from "@/lib/actions/projects";
import { ProjectsClient } from "@/components/admin/projects-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Projects Management",
};

export default async function AdminProjectsPage() {
  const [projects, companies] = await Promise.all([
    getProjects(),
    getActiveProjectCompanies(),
  ]);

  return <ProjectsClient initialProjects={projects} companies={companies} />;
}
