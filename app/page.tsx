import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ImageCard } from "@/components/ui/image-card";
import { CTASection } from "@/components/ui/cta-section";
import { EcosystemDiagram } from "@/components/features/landing/ecosystem-diagram";
import { HeroCinematic } from "@/components/features/landing/hero-cinematic";
import { TestimonialsSection } from "@/components/features/landing/testimonials-section";
import { fetchPublicTestimonials } from "@/lib/public/testimonials";
import { fetchPublicInsights } from "@/lib/public/articles";
import { fetchLandingProjects } from "@/lib/public/projects";
import { RiArrowRightLine, RiTimeLine } from "@remixicon/react";
import { siteConfig } from "@/config/site";
import {
  heroSlides,
  whyItems,
  fallbackTestimonials,
} from "@/static-data/landing";

export const dynamic = "force-dynamic";

const comp1 = siteConfig.companies[1];
const comp2 = siteConfig.companies[2];
const comp3 = siteConfig.companies[3];

export default async function HomePage() {
  const [testimonials, insights, projects] = await Promise.all([
    fetchPublicTestimonials(fallbackTestimonials),
    fetchPublicInsights(3),
    fetchLandingProjects(4),
  ]);
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <HeroCinematic slides={heroSlides} />

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="02" title="About ONP" subtitle="We don&apos;t just design buildings; we engineer experiences that stand the test of time." />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mt-8 md:mt-12">
            <div className="md:col-span-4 flex flex-col gap-5 text-muted-foreground text-sm font-light leading-relaxed">
              <ScrollReveal delay={0.2}>
                <p>Founded on the principles of structural integrity and aesthetic perfection, Omar &amp; Partners has grown into a multi-disciplinary powerhouse.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>By integrating {comp1?.description?.toLowerCase() || "consultancy"} with {comp2?.description?.toLowerCase() || "consultancy & construction"} and {comp3?.description?.toLowerCase() || "building materials"}, we maintain absolute control over quality.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                   <Link href="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-2 group">
                Learn More <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              </ScrollReveal>
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col gap-5 text-muted-foreground text-sm font-light leading-relaxed">
              <ScrollReveal delay={0.5}>
                <p>
                  Our model is unique: by keeping {comp1?.name} ({comp1?.description}), {comp2?.name} ({comp2?.description}), and {comp3?.name} ({comp3?.description}) under a single parent, we offer clients an integrated service that eliminates fragmentation and maintains absolute quality control from concept to completion.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <p>Today, we operate across 18 countries, with a portfolio spanning monumental civic buildings, luxury residences, corporate headquarters, hospitality projects, and premium material supply chains.</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="03" title="Our Ecosystem" subtitle="Three specialized entities, one unified vision of excellence." />
          <EcosystemDiagram />
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="04" title="Selected Works">
            <ScrollReveal delay={0.2}>
              <Link href="/kolpoporishor#projects" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium hover:text-primary transition-colors group">
                All Projects <RiArrowRightLine size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </ScrollReveal>
          </SectionHeader>

          {projects.length === 0 ? (
            <ScrollReveal>
              <div className="border border-border bg-card/20 p-12 md:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground mb-4">
                  <RiTimeLine size={20} className="text-primary" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary mb-2">
                  Portfolio Archive
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-2">
                  Selected Works Coming Soon
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm font-light max-w-md leading-relaxed">
                  Our portfolio of architectural and construction commissions is currently being updated. Visit our individual division portfolios for full project archives.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className={`grid grid-cols-1 ${projects.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"} gap-px border border-border`}>
              {projects.map((p, i) => (
                <ImageCard
                  key={p.id || i}
                  src={p.image}
                  alt={p.title}
                  title={p.title}
                  subtitle={p.category}
                  href={p.href}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 md:py-36 border-b border-border bg-secondary/20">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="05" title="The ONP Advantage" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
            {whyItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15} className="h-full">
                <div className="group flex flex-col gap-6 p-8 md:p-10 bg-background border-r border-border last:border-r-0 hover:bg-secondary/20 transition-colors duration-300 h-full">
                  <div className="w-10 h-10 border border-border flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-medium uppercase tracking-tight mb-3">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {item.image && (
                    <div className="relative h-44 overflow-hidden border border-border mt-auto">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <span className="font-mono text-[10px] text-border pt-2">0{i + 1}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="py-24 md:py-36 border-b border-border">
        <div className="container mx-auto px-6 md:px-14">
          <SectionHeader index="06" title="Latest Articles" subtitle="Spatial monographs, architectural analyses, and material essays." />

          {insights.length === 0 ? (
            <ScrollReveal>
              <div className="border border-border bg-card/20 p-12 md:p-16 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border border-border bg-secondary/50 flex items-center justify-center text-muted-foreground mb-4">
                  <RiTimeLine size={20} className="text-primary" />
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary mb-2">
                  Editorial &amp; Research
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-2">
                  Stay Tuned
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm font-light max-w-md leading-relaxed">
                  Our latest architectural essays and research monographs will be published here soon.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px border border-border">
              {insights.map((item, i) => (
                <ScrollReveal key={item.id || i} delay={i * 0.15}>
                  <Link href={`/articles/${item.slug || item.id}`} className="group flex flex-col gap-6 p-8 md:p-10 bg-background border-r border-border last:border-r-0 hover:bg-secondary/40 transition-colors duration-300 min-h-[240px]">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">{item.tag}</span>
                    <h3 className="font-heading text-xl md:text-2xl font-medium leading-tight group-hover:text-primary transition-colors flex-1">{item.title}</h3>
                    <div className="flex items-center justify-between border-t border-border pt-5">
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                      <RiArrowRightLine size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        index="07"
        title="Build The Future With Us"
        subtitle="We are always looking for visionary architects, meticulous designers, and driven professionals to join our ecosystem."
        href="/careers"
        buttonText="Open Positions"
        dark
      />

      <CTASection
        index="08"
        title="Ready to discuss your next project?"
        href="/contact"
        buttonText="Get in Touch"
      />

    </div>
  );
}
