"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";
import { RiArrowRightLine } from "@remixicon/react";

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  tags?: { label: string; href?: string }[];
  className?: string;
  href?: string;
  overlayClassName?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function ImageCard({
  src,
  alt,
  title,
  subtitle,
  tags,
  className,
  href,
  overlayClassName,
  contentClassName,
  children,
}: ImageCardProps) {
  const content = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent",
          overlayClassName
        )}
      />
      <div
        className={cn(
          "absolute bottom-8 left-8",
          contentClassName
        )}
      >
        {tags?.map((tag, i) => (
          <p key={i} className="text-[10px] uppercase tracking-widest text-foreground mb-2 font-semibold">
            {tag.label}
          </p>
        ))}
        <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-white/60 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="absolute top-6 right-6 w-8 h-8 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <RiArrowRightLine size={14} className="text-white -rotate-45" />
      </div>
      {children}
    </>
  );

  if (href) {
    return (
      <ScrollReveal>
        <Link
          href={href}
          className={cn(
            "group relative block aspect-[4/3] overflow-hidden bg-secondary",
            className
          )}
        >
          {content}
        </Link>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div className={cn("group relative overflow-hidden border border-border", className)}>
        {content}
      </div>
    </ScrollReveal>
  );
}
