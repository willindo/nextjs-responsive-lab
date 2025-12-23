"use client";

import React, { ReactNode, useMemo, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

/* ----------------------------- Math Patterns ----------------------------- */

type PatternId =
  | "linearX"
  | "waveY"
  | "circle"
  | "spiral"
  | "pendulum"
  | "breath"
  | "lissajous"
  | "chaos";

interface Params {
  speed: number;
  freq: number;
  amp: number;
  phaseGap: number;
  radius: number;
  growth: number;
  angle: number;
}

const patterns: Record<PatternId, (t: number, i: number, p: Params) => any> = {
  linearX: (t, i, p) => {
    // Uses modulo 400 to keep it within a 400px bounds (-200 to 200)
    const xPos = ((t * p.speed * 50 + i * 30) % 400) - 200;
    return { x: xPos };
  },
  waveY: (t, i, p) => ({ y: Math.sin(t * p.freq + i * p.phaseGap) * p.amp }),
  circle: (t, i, p) => {
    const th = t * p.freq + i * p.phaseGap;
    return { x: Math.cos(th) * p.radius, y: Math.sin(th) * p.radius };
  },
  spiral: (t, i, p) => {
    // We create a 'loop' every 10 seconds (adjust as needed)
    const loopDuration = 10;
    const iteration = (t + i * p.phaseGap) % loopDuration;

    const th = iteration * p.freq;
    const r = p.radius + iteration * p.growth;

    return {
      x: Math.cos(th) * r,
      y: Math.sin(th) * r,
      opacity: 1 - iteration / loopDuration, // Fades out as it expands
    };
  },
  pendulum: (t, i, p) => ({
    rotate: Math.sin(t * p.freq + i * p.phaseGap) * p.angle,
  }),
  breath: (t, i, p) => ({
    scale: 1 + (p.amp / 100) * Math.sin(t * p.freq + i * p.phaseGap),
  }),
  /**
   * Lissajous: Complex interlocking loops.
   * x and y move at different frequencies.
   */
  lissajous: (t, i, p) => {
    const time = t * p.speed;
    const phase = i * p.phaseGap;
    // We use freq for X and a slightly offset multiplier for Y
    return {
      x: Math.sin(time * p.freq + phase) * p.radius,
      y: Math.cos(time * (p.freq * 0.66) + phase) * p.radius,
    };
  },

  /**
   * Chaos: Pseudo-random organic movement.
   * Uses "Interference" (summing sines) to mimic natural jitter.
   */
  chaos: (t, i, p) => {
    const time = t * p.speed + i * p.phaseGap;
    const x =
      (Math.sin(time * 1.1) * 0.5 +
        Math.sin(time * 2.3) * 0.3 +
        Math.sin(time * 3.7) * 0.2) *
      p.amp;

    const y =
      (Math.cos(time * 0.9) * 0.5 +
        Math.cos(time * 1.7) * 0.3 +
        Math.cos(time * 4.1) * 0.2) *
      p.amp;

    return { x, y };
  },
};

/* ----------------------------- Sub-Components ----------------------------- */

function MotionItem({
  index,
  pattern,
  params,
  children,
}: {
  index: number;
  pattern: (t: number, i: number, p: Params) => any;
  params: Params;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  useAnimationFrame((tMs) => {
    const t = tMs / 1000;
    const v = pattern(t, index, params);
    if (v.x !== undefined) x.set(v.x);
    if (v.y !== undefined) y.set(v.y);
    if (v.rotate !== undefined) rotate.set(v.rotate);
    if (v.scale !== undefined) scale.set(v.scale);
  });

  return (
    <motion.div style={{ x, y, rotate, scale }} className="absolute">
      {children}
    </motion.div>
  );
}

/* ----------------------------- Main Component ----------------------------- */

export default function MotionPlayground({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [patternId, setPatternId] = useState<PatternId>("waveY");
  const [count, setCount] = useState(8);
  const [config, setConfig] = useState<Params>({
    speed: 1,
    freq: 3,
    amp: 60,
    phaseGap: 0.4,
    radius: 100,
    growth: 20,
    angle: 45,
  });

  const updateConfig = (key: keyof Params, val: number) => {
    setConfig((prev) => ({ ...prev, [key]: val }));
  };

  const patternFn = patterns[patternId];

  // Create an array of items to render
  const items = Array.from({ length: count });

  return (
    <div
      className={`flex flex-col gap-6 p-6 bg-slate-50 rounded-xl border ${className}`}
    >
      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase text-slate-500">
            Pattern
          </label>
          <select
            value={patternId}
            onChange={(e) => setPatternId(e.target.value as PatternId)}
            className="border rounded p-1 text-sm bg-slate-50"
          >
            {Object.keys(patterns).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <Control
          label="Count"
          val={count}
          step={1}
          min={1}
          max={50}
          onChange={setCount}
        />
        <Control
          label="Speed"
          val={config.speed}
          step={0.1}
          min={0}
          max={5}
          onChange={(v: any) => updateConfig("speed", v)}
        />
        <Control
          label="Freq"
          val={config.freq}
          step={0.1}
          min={0}
          max={10}
          onChange={(v: any) => updateConfig("freq", v)}
        />
        <Control
          label="Amp"
          val={config.amp}
          step={1}
          min={0}
          max={200}
          onChange={(v: any) => updateConfig("amp", v)}
        />
        <Control
          label="Phase"
          val={config.phaseGap}
          step={0.1}
          min={0}
          max={Math.PI}
          onChange={(v: any) => updateConfig("phaseGap", v)}
        />
        <Control
          label="Radius"
          val={config.radius}
          step={1}
          min={0}
          max={200}
          onChange={(v: any) => updateConfig("radius", v)}
        />
        <Control
          label="Growth"
          val={config.growth}
          step={1}
          min={0}
          max={100}
          onChange={(v: any) => updateConfig("growth", v)}
        />
      </div>

      {/* Animation Stage */}
      <div className="relative h-[400px] w-full bg-white border rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        {items.map((_, i) => (
          <MotionItem key={i} index={i} pattern={patternFn} params={config}>
            {children || (
              <div
                className="w-4 h-4 rounded-full bg-blue-500 shadow-lg border border-white"
                style={{ opacity: 1 - i / count }}
              />
            )}
          </MotionItem>
        ))}
      </div>
    </div>
  );
}

// Helper UI Component
function Control({ label, val, onChange, step, min, max }: any) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase text-slate-500">
          {label}
        </label>
        <span className="text-xs font-mono text-blue-600">
          {val.toFixed(1)}
        </span>
      </div>
      <input
        type="range"
        step={step}
        min={min}
        max={max}
        value={val}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
}
