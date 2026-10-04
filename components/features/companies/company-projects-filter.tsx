"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine, RiArrowLeftLine } from "@remixicon/react";
import { getPublicProjectsAction } from "@/lib/actions/public-projects";
import type { PublicProjectListItem } from "@/lib/public/projects";

const CATEGORIES = [
  "All",
  "Building Projects",
  "Interior Projects",
  "Landscape Projects",
] as const;

const ITEMS_PER_PAGE = 6;

interface CompanyProjectsFilterProps {
  companySlug: "kolpokowsol" | "kolpoporishor" | "kolpoporisor";
  initialProjects?: PublicProjectListItem[];
}

export function CompanyProjectsFilter({
  companySlug,
  initialProjects = [],
}: CompanyProjectsFilterProps) {
  const [projects, setProjects] = useState<PublicProjectListItem[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(initialProjects.length === 0);

  useEffect(() => {
    let mounted = true;
    async function loadDbProjects() {
      setIsLoading(true);
      const dbProjects = await getPublicProjectsAction(companySlug);
      if (mounted) {
        setProjects(dbProjects || []);
        setIsLoading(false);
      }
    }
    loadDbProjects();
    return () => {
      mounted = false;
    };
  }, [companySlug]);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    return (
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(p.category.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const effectiveCompanySlug =
    companySlug === "kolpoporisor" ? "kolpoporishor" : companySlug;

  return (
    <div className="flex flex-col gap-8 mt-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          const count =
            cat === "All"
              ? projects.length
              : projects.filter(
                  (p) =>
                    p.category.toLowerCase().includes(cat.toLowerCase()) ||
                    cat.toLowerCase().includes(p.category.toLowerCase())
                ).length;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all duration-300 border flex items-center gap-2 ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary font-medium"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              <span>{cat}</span>
              {projects.length > 0 && (
                <span
                  className={`text-[10px] opacity-70 ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="aspect-[16/10] bg-secondary/20 border border-border animate-pulse flex items-center justify-center p-6"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
                Loading projects...
              </span>
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-16 text-center border border-border bg-card/30 flex flex-col items-center justify-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground font-mono">
            No projects published yet
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1 font-light">
            Portfolio projects created in the Admin Portal will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {paginatedProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.05}>
                <Link
                  href={`/${effectiveCompanySlug}/projects/${project.id}`}
                  className="group relative block w-full aspect-[16/10] overflow-hidden border border-border bg-secondary cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/90" />

                  {/* Corner arrow pill on hover */}
                  <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <RiArrowRightLine size={14} className="-rotate-45" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-mono font-medium block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-medium tracking-tight text-white line-clamp-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="text-white/60 text-xs font-light tracking-wide mt-1 uppercase">
                        {project.location}
                      </p>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border mt-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProjects.length)} of{" "}
                {filteredProjects.length} Projects
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous Page"
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowLeftLine size={15} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = currentPage === page;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-9 h-9 px-3 font-mono text-xs tracking-wider transition-all duration-200 border ${
                          isActive
                            ? "bg-foreground text-background border-foreground font-semibold"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                        }`}
                      >
                        {String(page).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next Page"
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <RiArrowRightLine size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
