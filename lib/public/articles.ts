import { createClient } from "@/lib/supabase/server";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import type { Article } from "@/types/database";

export interface PublicInsightItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  tag: string;
  date: string;
  image?: string;
  authorName?: string;
}

export async function fetchPublicInsights(limit = 3): Promise<PublicInsightItem[]> {
  try {
    const supabase = await createClient();
    const { data: dbArticles, error } = await supabase
      .from("articles")
      .select("*, author:team(*)")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("Database articles query error:", error);
      return [];
    }

    if (dbArticles && dbArticles.length > 0) {
      return (dbArticles as Article[]).map((art) => ({
        id: art.id,
        slug: art.slug,
        title: art.title,
        description: art.description,
        tag: "Article",
        date: new Date(art.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        image: art.image ? getPublicStorageUrl(art.image) : undefined,
        authorName: art.author?.name || art.author_name || undefined,
      }));
    }
  } catch (err) {
    console.warn("Database insights query skipped/errored:", err);
  }

  return [];
}
