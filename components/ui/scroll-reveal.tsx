"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40, x: 0 };
      case "down":
        return { y: -40, x: 0 };
      case "left":
        return { x: 40, y: 0 };
      case "right":
        return { x: -40, y: 0 };
      default:
        return { y: 40, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset, filter: "blur(4px)" }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, ...offset, filter: "blur(4px)" }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cinematic ease out
      }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
