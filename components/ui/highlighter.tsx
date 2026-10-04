"use client";

import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";
import { cn } from "@/lib/utils";

export interface HighlighterProps {
  children: React.ReactNode;
  action?: RoughAnnotationType;
  color?: string;
  strokeWidth?: number;
  animationDuration?: number;
  iterations?: number;
  padding?: number | [number, number] | [number, number, number, number];
  multiline?: boolean;
  className?: string;
  delay?: number;
}

export function Highlighter({
  children,
  action = "highlight",
  color = "rgba(16, 185, 129, 0.35)",
  strokeWidth = 2,
  animationDuration = 700,
  iterations = 2,
  padding = [2, 6],
  multiline = true,
  className,
  delay = 500,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let timer: NodeJS.Timeout | null = null;

    const annotation = annotate(el, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    });

    annotationRef.current = annotation;

    timer = setTimeout(() => {
      annotation.show();
    }, delay);

    const handleResize = () => {
      if (annotationRef.current) {
        annotationRef.current.hide();
        annotationRef.current.show();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      try {
        annotation.remove();
      } catch {
        // gracefully handle any unmount teardown
      }
    };
  }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline, delay]);

  return (
    <span
      ref={elementRef}
      className={cn("relative inline-block", className)}
    >
      {children}
    </span>
  );
}
