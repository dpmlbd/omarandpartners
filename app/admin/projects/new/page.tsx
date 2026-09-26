import { getActiveProjectCompanies } from "@/lib/actions/projects";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Create Project",
};

export default async function NewProjectPage() {
  const companies = await getActiveProjectCompanies();
  return <ProjectForm companies={companies} />;
}
