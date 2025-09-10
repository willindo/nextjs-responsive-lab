"use client";
import React, { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";
import { useResponsiveScale } from "@/configs/useResponsiveScale";

export type LayoutType =
  | "row"
  | "column"
  | "grid"
  | "circle"
  | "arc"
  | "spiral"
  | "bezier";

export interface LayoutConfig {
  spacing?: number;
  radius?: number;
  sweep?: number;
  angleStep?: number;
  spiralA?: number;
  spiralB?: number;
  spiralStepDeg?: number; // ✅ added for correct spiral stepping
  controlPoints?: [number, number][];
  cols?: number;
}

export interface LayoutOrchestraProps {
  layout: LayoutType;
  children: ReactNode[] ;
  config?: LayoutConfig;
  groupOffsets?: { group: number[]; dx?: number; dy?: number; rotate?: number }[];
  className?: string;
}

const LayoutOrchestra: React.FC<LayoutOrchestraProps> = ({
  layout,
  children,
  config,
  groupOffsets = [],
}) => {
  const scale = useResponsiveScale();

  // scale-sensitive config
  const cfg: LayoutConfig = {
    ...config,
    spacing: (config?.spacing ?? 24) * scale,
    radius: (config?.radius ?? 120) * scale,
    spiralA: (config?.spiralA ?? 4) * scale,
    spiralB: (config?.spiralB ?? 10) * scale,
  };

  const positions = useMemo(() => {
    const pos: { x: number; y: number; rotate?: number }[] = [];
    const count = children.length;
    const spacing = cfg.spacing ?? 24;

    switch (layout) {
      case "row":
        for (let i = 0; i < count; i++) pos.push({ x: i * spacing, y: 0 });
        break;
      case "column":
        for (let i = 0; i < count; i++) pos.push({ x: 0, y: i * spacing });
        break;
      case "grid": {
        const cols = cfg.cols ?? Math.ceil(Math.sqrt(count));
        for (let i = 0; i < count; i++) {
          pos.push({ x: (i % cols) * spacing, y: Math.floor(i / cols) * spacing });
        }
        break;
      }
      case "circle": {
        const radius = cfg.radius ?? 120;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * 2 * Math.PI;
          pos.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
        }
        break;
      }
      case "arc": {
        const radius = cfg.radius ?? 120;
        const sweep = (cfg.sweep ?? 180) * (Math.PI / 180);
        for (let i = 0; i < count; i++) {
          const angle = -sweep / 2 + (i / (count - 1)) * sweep;
          pos.push({ x: radius * Math.cos(angle), y: radius * Math.sin(angle) });
        }
        break;
      }
      case "spiral": {
        const a = cfg.spiralA ?? 4;
        const b = cfg.spiralB ?? 10;
        const step = ((cfg.spiralStepDeg ?? 18) * Math.PI) / 180; // ✅ radian step
        for (let i = 0; i < count; i++) {
          const t = i * step; // angle in radians
          const r = a + b * t; // Archimedean spiral: r = a + bθ
          pos.push({ x: r * Math.cos(t), y: r * Math.sin(t) });
        }
        break;
      }
      case "bezier": {
        const cps = cfg.controlPoints ?? [
          [0, 0],
          [100, -100],
          [200, 100],
          [300, 0],
        ];
        const cubic = (
          t: number,
          p0: [number, number],
          p1: [number, number],
          p2: [number, number],
          p3: [number, number]
        ) => {
          const x =
            Math.pow(1 - t, 3) * p0[0] +
            3 * Math.pow(1 - t, 2) * t * p1[0] +
            3 * (1 - t) * Math.pow(t, 2) * p2[0] +
            Math.pow(t, 3) * p3[0];
          const y =
            Math.pow(1 - t, 3) * p0[1] +
            3 * Math.pow(1 - t, 2) * t * p1[1] +
            3 * (1 - t) * Math.pow(t, 2) * p2[1] +
            Math.pow(t, 3) * p3[1];
          return { x, y };
        };
        for (let i = 0; i < count; i++) {
          const t = i / (count - 1);
          pos.push(cubic(t, cps[0], cps[1], cps[2], cps[3]));
        }
        break;
      }
    }

    // apply group offsets
    groupOffsets.forEach(({ group, dx = 0, dy = 0, rotate = 0 }) => {
      group.forEach((i) => {
        if (pos[i]) {
          pos[i].x += dx;
          pos[i].y += dy;
          pos[i].rotate = (pos[i].rotate ?? 0) + rotate;
        }
      });
    });

    return pos;
  }, [layout, cfg, children.length, groupOffsets]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {children.map((child, i) => {
        const { x, y, rotate } = positions[i];
        return (
          <motion.div
            key={i}
            className="absolute"
            animate={{ x, y, rotate: rotate ?? 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default LayoutOrchestra;
