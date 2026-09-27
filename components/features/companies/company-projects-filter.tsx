"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";
import { getPublicProjectsAction } from "@/lib/actions/public-projects";
import type { PublicProjectListItem } from "@/lib/public/projects";

const CATEGORIES = [
  "All",
  "Building Projects",
  "Interior Projects",
  "Landscape Projects",
] as const;

interface CompanyProjectsFilterProps {
  companySlug: "kolpokowsol" | "kolpoporishor" | "kolpoporisor";
  initialProjects: PublicProjectListItem[];
}

export function CompanyProjectsFilter({
  companySlug,
  initialProjects,
}: CompanyProjectsFilterProps) {
  const [projects, setProjects] = useState<PublicProjectListItem[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    let mounted = true;
    async function loadDbProjects() {
      const dbProjects = await getPublicProjectsAction(companySlug);
      if (mounted && dbProjects && dbProjects.length > 0) {
        setProjects(dbProjects);
      }
    }
    loadDbProjects();
    return () => {
      mounted = false;
    };
  }, [companySlug]);

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All") return true;
    // Direct match or partial match (e.g. "Interior" matches "Interior Projects")
    return (
      p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      selectedCategory.toLowerCase().includes(p.category.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col gap-8 mt-12">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-mono transition-all duration-300 border ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center border border-border text-muted-foreground text-sm font-mono">
          No projects found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px border border-border">
          {filteredProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <Link
                href={`/${companySlug}/projects/${project.id}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-secondary"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/30 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-[10px] uppercase tracking-widest text-primary mb-2 font-semibold block">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">
                    {project.location}
                  </p>
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <RiArrowRightLine size={14} className="text-white -rotate-45" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
