"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  RiBuilding4Line,
  RiBrushLine,
  RiStackLine,
} from "@remixicon/react";

const companies = [
  {
    id: "01",
    name: "Kolpoporisor",
    tagline: "Architecture",
    icon: <RiBuilding4Line size={24} />,
    color: "#5A6B31",
  },
  {
    id: "02",
    name: "Kolpokowsol",
    tagline: "Interior Design",
    icon: <RiBrushLine size={24} />,
    color: "#788C45",
  },
  {
    id: "03",
    name: "INEX",
    tagline: "Materials",
    icon: <RiStackLine size={24} />,
    color: "#A8A39D",
  },
];

export function EcosystemDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div ref={ref} className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-3xl aspect-square">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Circle 1 - Architecture */}
          <motion.circle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: hoveredId && hoveredId !== "01" ? 0.3 : 0.85, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            cx="160"
            cy="170"
            r="120"
            fill={companies[0].color}
            fillOpacity="0.15"
            stroke={companies[0].color}
            strokeWidth="1.5"
            onMouseEnter={() => setHoveredId("01")}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-500"
          />

          {/* Circle 2 - Interior Design */}
          <motion.circle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: hoveredId && hoveredId !== "02" ? 0.3 : 0.85, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            cx="240"
            cy="170"
            r="120"
            fill={companies[1].color}
            fillOpacity="0.15"
            stroke={companies[1].color}
            strokeWidth="1.5"
            onMouseEnter={() => setHoveredId("02")}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-500"
          />

          {/* Circle 3 - Materials */}
          <motion.circle
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: hoveredId && hoveredId !== "03" ? 0.3 : 0.85, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            cx="200"
            cy="260"
            r="120"
            fill={companies[2].color}
            fillOpacity="0.15"
            stroke={companies[2].color}
            strokeWidth="1.5"
            onMouseEnter={() => setHoveredId("03")}
            onMouseLeave={() => setHoveredId(null)}
            className="cursor-pointer transition-all duration-500"
          />

          {/* Labels */}
          {companies.map((co, i) => {
            const positions = [
              { x: 110, y: 130 },
              { x: 270, y: 130 },
              { x: 200, y: 310 },
            ];
            return (
              <motion.g
                key={co.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.15 }}
              >
                <foreignObject x={positions[i].x - 30} y={positions[i].y - 30} width="60" height="60">
                  <div
                    className="w-full h-full flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                    style={{ borderColor: co.color }}
                  >
                    <div style={{ color: co.color }}>{co.icon}</div>
                  </div>
                </foreignObject>
                <text
                  x={positions[i].x}
                  y={positions[i].y + 50}
                  textAnchor="middle"
                  className="font-heading text-xs uppercase tracking-widest fill-foreground"
                >
                  {co.name}
                </text>
                <text
                  x={positions[i].x}
                  y={positions[i].y + 65}
                  textAnchor="middle"
                  className="text-[10px] uppercase tracking-[0.2em] fill-muted-foreground"
                >
                  {co.tagline}
                </text>
              </motion.g>
            );
          })}

          {/* Center intersection label */}
          <motion.text
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.5 }}
            x="200"
            y="210"
            textAnchor="middle"
            className="font-heading text-sm uppercase tracking-widest fill-foreground"
          >
            ONP
          </motion.text>
          <motion.text
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.6 }}
            x="200"
            y="225"
            textAnchor="middle"
            className="text-[10px] uppercase tracking-[0.2em] fill-muted-foreground"
          >
            Holding Group
          </motion.text>
        </svg>
      </div>
    </div>
  );
}
