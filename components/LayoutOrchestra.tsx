"use client";
import React, { ReactNode, useMemo,useEffect,useState } from "react";
import { motion } from "framer-motion";

/**
 * LayoutOrchestra
 *
 * Place children in a straight line (row/column) or any math-driven layout (circle/arc/spiral/bezier/custom).
 * Also supports grouped offsets so you can nudge or transform subsets of items together.
 *
 * Core ideas:
 *  - Built-in engines: row, column, grid, circle, arc, spiral, bezier.
 *  - Custom engine: pass a function (i, count) => { x, y, rotate? }.
 *  - Presets registry: save & reuse named math layouts across components.
 *  - Groups: provide index groups with shared offset/rotation/scale.
 *  - Absolute-position container using CSS transforms for sub-pixel precision.
 *
 * Minimal usage:
 *  <LayoutOrchestra layout="row" spacing={32}>{items}</LayoutOrchestra>
 *
 *  Custom math:
 *  <LayoutOrchestra layout="custom" custom={(i, n) => ({ x: i*40, y: Math.sin(i/2)*20 })}>...</LayoutOrchestra>
 */

// ---------- Types ---------- //
export type Point = { x: number; y: number; rotate?: number };

export type GroupTransform = {
  /** indices (0-based) that belong to this group */
  indices: number[];
  /** extra translation applied to members of this group */
  offset?: { x?: number; y?: number };
  /** rotate in degrees around each member's own origin */
  rotate?: number;
  /** scale applied to each member */
  scale?: number;
};

export type Bezier = [Point, Point, Point, Point]; // P0..P3

export type LayoutKind =
  | "row"
  | "column"
  | "grid"
  | "circle"
  | "arc"
  | "spiral"
  | "bezier"
  | "custom";

export type LayoutConfig = {
  kind: LayoutKind;
  // common
  spacing?: number; // px between items (row/column)
  origin?: { x?: number; y?: number }; // container origin (default center of container)
  itemSize?: number; // hint for grid auto fill
  // grid
  columns?: number; // grid columns
  rows?: number; // grid rows
  gap?: number; // grid gap
  // circular/arc
  radius?: number; // circle/arc radius
  angleStart?: number; // deg
  angleStep?: number; // deg between items
  sweep?: number; // total deg for arc
  rotateWithTangent?: boolean; // rotate each along tangent
  // spiral (Archimedean)
  spiralA?: number; // base radius
  spiralB?: number; // angle growth factor (px per rad)
  spiralStepDeg?: number; // angle step degrees between items
  // bezier curve
  bezier?: Bezier; // P0..P3
  // custom
  custom?: (i: number, count: number) => Point;
};
function useWindowWidth() {
  const [w, setW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

export type LayoutOrchestraProps = {
  children: ReactNode[] | ReactNode;
  layout?: LayoutKind;
  config?: Partial<LayoutConfig>;
  /** Save & reuse named presets: registry[name] -> partial config */
  preset?: string;
  /** Define/extend the local registry */
  registry?: Record<string, Partial<LayoutConfig>>;
  /** Width/height of the absolute layout stage */
  width?: number | string;
  height?: number | string;
  /** Align stage content around its visual center (default true) */
  center?: boolean;
  /** Optional group-level transforms */
  groups?: GroupTransform[];
  /** Animate into place */
  animate?: boolean;
  /** Per-item className */
  itemClassName?: string;
  /** Wrap className */
  className?: string;
};

// ---------- Presets Registry (in-memory) ---------- //
const defaultRegistry: Record<string, Partial<LayoutConfig>> = {
  row32: { kind: "row", spacing: 32 },
  column24: { kind: "column", spacing: 24 },
  circleTight: { kind: "circle", radius: 120, angleStart: -90, angleStep: 360 / 8, rotateWithTangent: true },
  arcBanner: { kind: "arc", radius: 220, angleStart: -20, sweep: 40, rotateWithTangent: true },
  spiralSoft: { kind: "spiral", spiralA: 6, spiralB: 8, spiralStepDeg: 20 },
};

export function usePositions(
  count: number,
  layout: LayoutKind,
  cfg: Partial<LayoutConfig> = {}
): Point[] {
  return useMemo(() => {
    const c: LayoutConfig = {
      kind: layout,
      spacing: 24,
      origin: { x: 0, y: 0 },
      itemSize: 40,
      columns: undefined,
      rows: undefined,
      gap: 12,
      radius: 160,
      angleStart: 0,
      angleStep: 0,
      sweep: 0,
      rotateWithTangent: false,
      spiralA: 4,
      spiralB: 10,
      spiralStepDeg: 18,
      bezier: undefined,
      custom: undefined,
      ...cfg,
    };

    const list: Point[] = [];

    const push = (x: number, y: number, rotate?: number) => {
      list.push({ x: x + (c.origin?.x ?? 0), y: y + (c.origin?.y ?? 0), rotate });
    };

    if (layout === "row") {
      const s = c.spacing ?? 24;
      const start = -((count - 1) * s) / 2; // center around 0,0
      for (let i = 0; i < count; i++) push(start + i * s, 0);
      return list;
    }

    if (layout === "column") {
      const s = c.spacing ?? 24;
      const start = -((count - 1) * s) / 2;
      for (let i = 0; i < count; i++) push(0, start + i * s);
      return list;
    }

    if (layout === "grid") {
      const cols = c.columns ?? Math.ceil(Math.sqrt(count));
      const gap = c.gap ?? 12;
      const startCol = -((cols - 1) * (c.itemSize! + gap)) / 2;
      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startCol + col * (c.itemSize! + gap);
        const y = row * (c.itemSize! + gap) - ((Math.ceil(count / cols) - 1) * (c.itemSize! + gap)) / 2;
        push(x, y);
      }
      return list;
    }

    if (layout === "circle") {
      const start = (c.angleStart ?? 0) * (Math.PI / 180);
      const step = c.angleStep && c.angleStep !== 0 ? (c.angleStep * Math.PI) / 180 : (2 * Math.PI) / count;
      for (let i = 0; i < count; i++) {
        const t = start + i * step;
        const x = (c.radius ?? 160) * Math.cos(t);
        const y = (c.radius ?? 160) * Math.sin(t);
        const rot = c.rotateWithTangent ? (t * 180) / Math.PI + 90 : undefined;
        push(x, y, rot);
      }
      return list;
    }

    if (layout === "arc") {
      const start = (c.angleStart ?? 0) * (Math.PI / 180);
      const sweep = (c.sweep ?? 180) * (Math.PI / 180);
      const step = count > 1 ? sweep / (count - 1) : 0;
      for (let i = 0; i < count; i++) {
        const t = start + i * step;
        const x = (c.radius ?? 160) * Math.cos(t);
        const y = (c.radius ?? 160) * Math.sin(t);
        const rot = c.rotateWithTangent ? (t * 180) / Math.PI + 90 : undefined;
        push(x, y, rot);
      }
      return list;
    }

    if (layout === "spiral") {
      const step = ((c.spiralStepDeg ?? 18) * Math.PI) / 180;
      for (let i = 0; i < count; i++) {
        const t = i * step; // radians
        const r = (c.spiralA ?? 4) + (c.spiralB ?? 10) * t;
        const x = r * Math.cos(t);
        const y = r * Math.sin(t);
        push(x, y);
      }
      return list;
    }

    if (layout === "bezier" && c.bezier) {
      const [P0, P1, P2, P3] = c.bezier;
      const B = (t: number) => {
        const x =
          Math.pow(1 - t, 3) * P0.x +
          3 * Math.pow(1 - t, 2) * t * P1.x +
          3 * (1 - t) * Math.pow(t, 2) * P2.x +
          Math.pow(t, 3) * P3.x;
        const y =
          Math.pow(1 - t, 3) * P0.y +
          3 * Math.pow(1 - t, 2) * t * P1.y +
          3 * (1 - t) * Math.pow(t, 2) * P2.y +
          Math.pow(t, 3) * P3.y;
        return { x, y };
      };
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1);
        const { x, y } = B(t);
        push(x, y);
      }
      return list;
    }

    if (layout === "custom" && c.custom) {
      for (let i = 0; i < count; i++) {
        const p = c.custom(i, count);
        push(p.x, p.y, p.rotate);
      }
      return list;
    }

    // Fallback to row
    const s = cfg.spacing ?? 24;
    const start = -((count - 1) * s) / 2;
    for (let i = 0; i < count; i++) push(start + i * s, 0);
    return list;
  }, [count, layout, JSON.stringify(cfg)]);
}


function applyGroups(base: Point[], groups?: GroupTransform[]): Point[] {
  if (!groups?.length) return base;
  const map = new Map<number, Point>();
  base.forEach((p, i) => map.set(i, { ...p }));
  for (const g of groups) {
    const dx = g.offset?.x ?? 0;
    const dy = g.offset?.y ?? 0;
    const rot = g.rotate ?? 0;
    const scale = g.scale ?? 1;
    for (const idx of g.indices) {
      const p = map.get(idx);
      if (!p) continue;
      p.x += dx;
      p.y += dy;
      p.rotate = (p.rotate ?? 0) + rot;
      // scale is expressed via style transform (we'll attach per-item data)
      (p as any)._scale = scale;
    }
  }
  return Array.from(map.values());
}

function LayoutOrchestra({
  children,
  layout = "row",
  config,
  preset,
  registry,
  width = 800,
  height = 300,
  center = true,
  groups,
  animate = true,
  itemClassName = "",
  className = "",
}: LayoutOrchestraProps) {
  const items = React.Children.toArray(children);
  const windowW = useWindowWidth();

  // --- Responsive defaults ---
  let responsiveKind = layout;
  let responsiveConfig: Partial<LayoutConfig> = { ...(config ?? {}) };

  if (windowW <= 425) {
    responsiveKind = "grid"; // force grid on tiny screens
  }
  if (windowW <= 768) {
    responsiveConfig.spacing = responsiveConfig.spacing ?? 40;
  }

  // merge preset + responsive
  const mergedConfig: Partial<LayoutConfig> = useMemo(() => {
    const presetCfg =
      (preset &&
        { ...(defaultRegistry[preset] ?? {}), ...((registry ?? {})[preset] ?? {}) }) ||
      {};
    return { kind: responsiveKind, ...presetCfg, ...responsiveConfig } as Partial<LayoutConfig>;
  }, [responsiveKind, preset, registry, responsiveConfig]);

  const positionsBase = usePositions(items.length, mergedConfig.kind as LayoutKind, mergedConfig);
  const positions = applyGroups(positionsBase, groups);

  const stageStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    position: "relative",
    overflow: "visible",
  };

  const originClass = center ? "flex items-center justify-center" : "relative";

  return (
    <div className={`w-full  ${originClass} ${className}`} style={stageStyle}>
      <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -50%)" }}>
        {items.map((child, i) => {
          const p = positions[i];
          const scale = (p as any)._scale ?? 1;
          const baseStyle: React.CSSProperties = {
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(${Math.round(p.x)}px, ${Math.round(p.y)}px) rotate(${p.rotate ?? 0}deg) scale(${scale})`,
            transformOrigin: "center center",
            willChange: "transform",
          };

          if (!animate) {
            return (
              <div key={i} style={baseStyle} className={" " + itemClassName}>
                {child}
              </div>
            );
          }

          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0.9, opacity: 0 }}
              animate={{ x: p.x, y: p.y, rotate: p.rotate ?? 0, scale, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.5 }}
              className={"absolute left-0 top-0 select-none " + itemClassName}
              style={{ transformOrigin: "center center" }}
            >
              {child}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Helpers to register presets globally (optional) ---------- //
export const LayoutPresets = {
  add(name: string, cfg: Partial<LayoutConfig>) {
    (defaultRegistry as any)[name] = cfg;
  },
  get(name: string) {
    return defaultRegistry[name];
  },
  all() {
    return { ...defaultRegistry };
  },
};
export { LayoutOrchestra };
// ---------- Tiny Demo (remove in prod) ---------- //
// Example usage (paste in a page/component):
//
// const pills = Array.from({ length: 12 }, (_, i) => (
//   <div key={i} className="px-3 py-1 rounded-2xl shadow bg-white border text-sm">#{i + 1}</div>
// ));
//
// <div className="space-y-8">
//   <LayoutOrchestra layout="row" config={{ spacing: 56 }} width={900} height={160}>
//     {pills}
//   </LayoutOrchestra>
//
//   <LayoutOrchestra layout="circle" config={{ radius: 160, angleStart: -90, rotateWithTangent: true }} width={480} height={420}>
//     {pills}
//   </LayoutOrchestra>
//
//   <LayoutOrchestra layout="arc" preset="arcBanner" width={600} height={280}
//     groups={[{ indices: [0,1,2], offset: { x: -20 }, rotate: -5 }, { indices: [9,10,11], offset: { x: 20 }, rotate: 5 }]}>
//     {pills}
//   </LayoutOrchestra>
//
//   <LayoutOrchestra layout="custom" config={{ custom: (i, n) => ({ x: i*48, y: Math.sin(i/2) * 36, rotate: 0 }) }} width={900} height={240}>
//     {pills}
//   </LayoutOrchestra>
// </div>