import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/actions/articles";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import { RiArrowLeftLine, RiUser3Line, RiCalendarLine } from "@remixicon/react";

export const dynamic = "force-dynamic";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: "Article Not Found | Omar & Partners",
    };
  }

  return {
    title: `${article.title} | Omar & Partners Articles`,
    description: article.description?.slice(0, 160),
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.published) {
    notFound();
  }

  const cover = article.image
    ? getPublicStorageUrl(article.image)
    : "/images/architecture.png";
  const authorName = article.author?.name || article.author_name || "Editorial Fellow";
  const authorRole = article.author?.designation || article.author_designation || "ONP";
  const formattedDate = new Date(article.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="flex flex-col w-full min-h-screen">
      {/* ── Top Header / Breadcrumb ────────────────────────────────────── */}
      <section className="pt-28 pb-12 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14 max-w-4xl">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <RiArrowLeftLine size={16} />
            <span>Back to Articles</span>
          </Link>

          <h1
            className="font-heading font-bold uppercase tracking-tight text-foreground leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                <RiUser3Line size={15} />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-foreground text-xs leading-tight">
                  {authorName}
                </span>
                <span className="text-[10px] text-muted-foreground">{authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <RiCalendarLine size={14} className="text-muted-foreground" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Image ────────────────────────────────────────────────── */}
      <section className="py-10 bg-secondary/10 border-b border-border">
        <div className="container mx-auto px-6 md:px-14 max-w-4xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-card">
            <Image
              src={cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Article Content ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 md:px-14 max-w-3xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-base font-light space-y-6">
            {article.description.split("\n\n").map((paragraph, pIdx) => (
              <p key={pIdx} className="leading-relaxed whitespace-pre-line text-foreground/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-primary hover:underline"
            >
              <RiArrowLeftLine size={16} />
              <span>Explore More Articles</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
