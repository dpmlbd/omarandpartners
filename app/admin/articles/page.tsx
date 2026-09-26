import { getArticles } from "@/lib/actions/articles";
import { getTeamMembers } from "@/lib/actions/team";
import { ArticlesClient } from "@/components/admin/articles-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP Admin | Articles Management",
};

export default async function AdminArticlesPage() {
  const [articles, teamMembers] = await Promise.all([
    getArticles(),
    getTeamMembers(),
  ]);

  return <ArticlesClient initialArticles={articles} teamMembers={teamMembers} />;
}
