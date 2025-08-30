"use client";
import React, { ReactNode, useMemo, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

/* ----------------------------- math patterns ----------------------------- */

type PatternId = "linearX" | "waveY" | "circle" | "spiral" | "pendulum" | "breath";
type Params = {
  speed?: number;      // time multiplier
  freq?: number;       // oscillations per second-ish
  amp?: number;        // amplitude (px or % depending on pattern)
  phaseGap?: number;   // phase delta between items (radians)
  radius?: number;     // circle/spiral radius
  growth?: number;     // spiral radial growth per second
  angle?: number;      // pendulum max angle in degrees
};

const defaults: Required<Params> = {
  speed: 1,
  freq: 1.5,
  amp: 40,
  phaseGap: Math.PI / 8,
  radius: 80,
  growth: 16,
  angle: 20,
};

type PatternFn = (t: number, i: number, p: Required<Params>) => {
  x?: number;
  y?: number;
  rotate?: number;
  scale?: number;
};

const patterns: Record<PatternId, PatternFn> = {
  linearX: (t, i, p) => ({ x: ((t * p.speed * 120) + i * 8) % 360 - 180 }),
  waveY:   (t, i, p) => ({ y: Math.sin(t * p.freq + i * p.phaseGap) * p.amp }),
  circle:  (t, i, p) => {
    const th = t * p.freq + i * p.phaseGap;
    return { x: Math.cos(th) * p.radius, y: Math.sin(th) * p.radius };
  },
  spiral:  (t, i, p) => {
    const th = t * p.freq + i * p.phaseGap;
    const r  = p.radius + t * p.growth;
    return { x: Math.cos(th) * r, y: Math.sin(th) * r };
  },
  pendulum: (t, i, p) => ({ rotate: Math.sin(t * p.freq + i * p.phaseGap) * p.angle }),
  breath:   (t, i, p) => ({ scale: 1 + (p.amp / 100) * Math.sin(t * p.freq + i * p.phaseGap) }),
};

/* --------------------------- motion scope (core) -------------------------- */

function MotionItem({
  index,
  pattern,
  params,
  children,
}: {
  index: number;
  pattern: PatternFn;
  params: Required<Params>;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  useAnimationFrame((tMs) => {
    const t = (tMs / 1000) * params.speed;
    const v = pattern(t, index, params);
    if (v.x !== undefined) x.set(v.x);
    if (v.y !== undefined) y.set(v.y);
    if (v.rotate !== undefined) rotate.set(v.rotate);
    if (v.scale !== undefined) scale.set(v.scale);
  });

  // inline-block so we don't impose layout; parent flex/grid still rules
  return (
    <motion.div style={{ x, y, rotate, scale }} className="inline-block">
      {children}
    </motion.div>
  );
}

/**
 * MotionScopeMath: wrap ANY children; applies math-driven transforms per child.
 * - No layout opinions (each child wrapped in an inline-block motion div).
 * - Works for single or multiple elements (maps over children).
 */
export function MotionScopeMath({
  children,
  pattern = "waveY",
  params,
}: {
  children: ReactNode;
  pattern?: PatternId;
  params?: Params;
}) {
  const p = { ...defaults, ...(params || {}) };
  const fn = patterns[pattern];

  const items = React.Children.toArray(children);
  return (
    <>
      {items.map((child, i) => (
        <MotionItem key={i} index={i} pattern={fn} params={p}>
          {child}
        </MotionItem>
      ))}
    </>
  );
}

/* ------------------------------- playground ------------------------------- */

export default function MotionPlayground({ children }: { children?: ReactNode }) {
  const [pattern, setPattern] = useState<PatternId>("waveY");
  const [count, setCount] = useState(5);
  const [freq, setFreq] = useState(1.5);
  const [amp, setAmp] = useState(40);
  const [radius, setRadius] = useState(80);
  const [phaseGap, setPhaseGap] = useState(Math.PI / 8);
  const [speed, setSpeed] = useState(1);
  const [angle, setAngle] = useState(20);
  const [growth, setGrowth] = useState(16);

  const params = useMemo<Params>(
    () => ({ freq, amp, radius, phaseGap, speed, angle, growth }),
    [freq, amp, radius, phaseGap, speed, angle, growth]
  );

  return (
    <div className="p-4 space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={pattern}
          onChange={(e) => setPattern(e.target.value as PatternId)}
          className="border rounded px-2 py-1"
        >
          <option value="linearX">linearX</option>
          <option value="waveY">waveY</option>
          <option value="circle">circle</option>
          <option value="spiral">spiral</option>
          <option value="pendulum">pendulum</option>
          <option value="breath">breath</option>
        </select>

        <label className="text-sm">count</label>
        <input type="number" min={1} max={24} value={count}
               onChange={(e) => setCount(parseInt(e.target.value || "1"))}
               className="w-20 border rounded px-2 py-1" />

        <label className="text-sm">freq</label>
        <input type="number" step="0.1" value={freq}
               onChange={(e) => setFreq(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">amp</label>
        <input type="number" step="1" value={amp}
               onChange={(e) => setAmp(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">radius</label>
        <input type="number" step="1" value={radius}
               onChange={(e) => setRadius(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">phase</label>
        <input type="number" step="0.1" value={phaseGap}
               onChange={(e) => setPhaseGap(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">speed</label>
        <input type="number" step="0.1" value={speed}
               onChange={(e) => setSpeed(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">angle</label>
        <input type="number" step="1" value={angle}
               onChange={(e) => setAngle(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />

        <label className="text-sm">growth</label>
        <input type="number" step="1" value={growth}
               onChange={(e) => setGrowth(parseFloat(e.target.value || "0"))}
               className="w-24 border rounded px-2 py-1" />
      </div>

      {/* Stage */}
      <div className="relative h-40 border rounded-lg overflow-hidden p-4">
        <div className="flex items-center gap-3 h-full">
          <MotionScopeMath pattern={pattern} params={params}>
            {/* {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-xl bg-blue-500/90"
              />
            ))} */}
            {children}
          </MotionScopeMath>
        </div>
      </div>
    </div>
  );
}
