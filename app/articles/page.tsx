import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/actions/articles";
import { getPublicStorageUrl } from "@/lib/supabase/storage";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArticleLine, RiArrowRightLine, RiUser3Line } from "@remixicon/react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ONP | Articles & Editorial",
  description: "Spatial monographs, architectural analyses, and material essays by Omar & Partners.",
};

export default async function ArticlesPage() {
  const articles = await getArticles(true);

  return (
    <div className="flex flex-col w-full">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-foreground text-background border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-background/40">
                Editorial &amp; Research
              </span>
            </div>
          </ScrollReveal>

          <h1
            className="font-heading font-semibold leading-[0.88] tracking-tighter uppercase text-background max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Spatial Articles
          </h1>

          <p className="text-background/50 text-sm md:text-base font-light leading-relaxed max-w-2xl mt-6">
            In-depth perspectives on monumental structures, tactile interiors, sustainable engineering, and material intelligence.
          </p>
        </div>
      </section>

      {/* ── ARTICLES GRID ──────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6 md:px-14">
          {articles.length === 0 ? (
            <div className="py-20 border border-border bg-card/40 flex flex-col items-center justify-center text-center p-8">
              <RiArticleLine size={48} className="text-muted-foreground/30 mb-4" />
              <h2 className="font-heading text-xl uppercase font-semibold tracking-tight">
                Editorial Series in Progress
              </h2>
              <p className="text-muted-foreground text-xs md:text-sm font-light max-w-md mt-2 leading-relaxed">
                Our architectural fellows and design directors are currently drafting the next volume of spatial analyses. Check back soon or visit our social channels.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art, idx) => {
                const cover = art.image
                  ? getPublicStorageUrl(art.image)
                  : "/images/architecture.png";
                const authorName = art.author?.name || art.author_name || "Editorial Fellow";
                const authorRole = art.author?.designation || art.author_designation || "ONP";
                const targetSlug = art.slug || art.id;

                return (
                  <ScrollReveal key={art.id} delay={idx * 0.1}>
                    <Link
                      href={`/articles/${targetSlug}`}
                      className="group flex flex-col border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors duration-500 h-full"
                    >
                      {/* Cover Photo */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                        <Image
                          src={cover}
                          alt={art.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 flex flex-col flex-1 justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">
                              {new Date(art.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}
                            </span>
                          </div>

                          <h2 className="font-heading text-xl font-bold uppercase tracking-tight leading-snug group-hover:text-primary transition-colors">
                            {art.title}
                          </h2>

                          <p className="text-muted-foreground text-xs font-light leading-relaxed mt-3 line-clamp-3">
                            {art.description}
                          </p>
                        </div>

                        {/* Author Footer */}
                        <div className="pt-4 border-t border-border flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground">
                              <RiUser3Line size={13} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-foreground leading-tight">
                                {authorName}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-light">
                                {authorRole}
                              </span>
                            </div>
                          </div>

                          <RiArrowRightLine
                            size={16}
                            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
