import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Image from "next/image";
import Link from "next/link";
import { RiArrowLeftLine } from "@remixicon/react";
import { fetchProjectDetail } from "@/lib/public/projects";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchProjectDetail(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* ── BACK LINK ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-14 pt-8">
        <Link
          href="/kolpokowsol#projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <RiArrowLeftLine size={14} /> Back to Projects
        </Link>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-medium">{project.category}</span>
                  <span className="w-4 h-[1px] bg-border" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{project.status}</span>
                </div>
                <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tighter uppercase leading-[0.9]">
                  {project.title}
                </h1>
              </ScrollReveal>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <ScrollReveal delay={0.2}>
                <div className="grid grid-cols-3 gap-px border border-border">
                  <div className="p-4 bg-background">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Year</span>
                    <span className="font-heading text-lg font-medium">{project.year}</span>
                  </div>
                  <div className="p-4 bg-background border-l border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Area</span>
                    <span className="font-heading text-lg font-medium">{project.area}</span>
                  </div>
                  <div className="p-4 bg-background border-l border-border">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">Location</span>
                    <span className="font-heading text-lg font-medium text-right">{project.location.split(",")[0]}</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE ────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="relative aspect-[16/9] md:aspect-[21/9] max-h-[540px] w-full overflow-hidden border border-border bg-secondary">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-2 flex flex-col gap-3 pt-1">
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest">01</span>
              <span className="w-[1px] h-12 bg-border" />
            </div>
            <div className="md:col-span-10">
              <ScrollReveal>
                <p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-24 md:py-36 border-b border-border bg-secondary/10">
          <div className="container mx-auto px-6 md:px-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-12">
              <div className="md:col-span-2 flex flex-col gap-3">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest">02</span>
                <span className="w-[1px] h-12 bg-border" />
              </div>
              <div className="md:col-span-8">
                <ScrollReveal>
                  <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tighter uppercase">Gallery</h2>
                </ScrollReveal>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px border border-border">
              {project.gallery.map((img: string, i: number) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
