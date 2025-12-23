"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CircleCarousel
 * - React + Tailwind component (single-file)
 * - Arranges items around a circle
 * - Shows a "window" where only a semicircle / half-portion is prominent
 * - Dots let users select items; if none selected for a while it auto-rotates
 * - Hover pauses auto-rotation
 *
 * Usage: <CircleCarousel items={[...strings or JSX...]} size={420} autoMs={3000} />
 */

type Props = {
  items?: (string | React.ReactNode)[];
  size?: number; // diameter in px
  autoMs?: number; // auto-rotate interval
  visibleArcDeg?: number; // how wide the visible window is (in degrees) e.g. 180 for half
};

export default function CircleCarousel({
  items = undefined,
  size = 420,
  autoMs = 3000,
  visibleArcDeg = 180,
}: Props) {
  const defaultItems = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
  ];
  const list = items ?? defaultItems;
  const n = list.length;

  // index of currently focused item
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const lastInteractionRef = useRef<number>(Date.now());

  // angle per item (degrees)
  const angleStep = 360 / n;

  // rotation offset so selected item moves to the center of visible arc
  const rotation = useMemo(() => {
    // center of visible arc (we'll call it 0deg), rotate so item is centered at midArc
    const midArc = 0; // we keep center at top by default, but we can change
    return -index * angleStep + midArc;
  }, [index, angleStep]);

  // Auto-rotate if user hasn't interacted recently and not hovering
  useEffect(() => {
    if (autoMs <= 0) return;
    const id = setInterval(() => {
      const now = Date.now();
      const idle = now - lastInteractionRef.current;
      // if hovering, don't auto-rotate
      if (isHovering) return;
      // if user interacted recently (clicked/dot), wait 4*autoMs before auto resumes
      if (idle < autoMs * 4) return;
      // otherwise move one step
      setIndex((s) => (s + 1) % n);
    }, autoMs);
    return () => clearInterval(id);
  }, [autoMs, isHovering, n]);

  // helper to pick nearest index when user clicks outside
  const pickIndex = (i: number) => {
    lastInteractionRef.current = Date.now();
    setIndex(i);
  };

  const radius = size / 2 - 52; // leave some padding for scale
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className=" flex flex-col items-center gap-6">
      <div
        className="relative"
        style={{ width: size, height: size }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* circular mask / frame */}
        <div
          className="absolute inset-0 rounded-full shadow-xl bg-white/5 backdrop-blur-sm flex items-center justify-center"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Visible window overlay to show only half/arc as emphasized */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              // create a semicircle mask by overlaying a radial-gradient that fades
              background: `conic-gradient(from ${
                -visibleArcDeg / 2
              }deg at 50% 50%, rgba(255,255,255,0.06) 0 ${visibleArcDeg}deg, transparent ${visibleArcDeg}deg 360deg)`,
            }}
          />

          {/* rotating group */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative w-full h-full"
            style={{ transformOrigin: "50% 50%" }}
          >
            {list.map((it, i) => {
              const ang = i * angleStep; // degrees
              // position each item at angle 'ang'
              const x = cx + radius * Math.cos((ang * Math.PI) / 180) - 48; // item size offset
              const y = cy + radius * Math.sin((ang * Math.PI) / 180) - 48;
              // compute how "visible" it is relative to the visibleArc center (0deg after rotation)
              // Normalize angle to [-180,180]
              const rel = ((ang + rotation + 540) % 360) - 180; // relative position
              const distanceFromCenter = Math.abs(rel); // 0 = center of visible arc
              // map distance to scale/opacity
              const scale = Math.max(0.7, 1.1 - distanceFromCenter / 180);
              const opacity = Math.max(0.35, 1 - distanceFromCenter / 160);

              return (
                <motion.button
                  key={i}
                  onClick={() => pickIndex(i)}
                  className="absolute flex items-center justify-center rounded-2xl bg-white/6 backdrop-blur-md cursor-pointer border border-white/6"
                  style={{
                    left: x,
                    top: y,
                    width: 96,
                    height: 96,
                    transformOrigin: "48px 48px",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  initial={false}
                  animate={{
                    scale: i === index ? 1.16 : scale,
                    opacity: i === index ? 1 : opacity,
                  }}
                  whileHover={{ scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                >
                  <div className="flex flex-col items-center gap-1 px-2 text-center">
                    <div className="text-sm font-semibold leading-tight ">
                      {typeof it === "string" ? it : it}
                    </div>
                    <div className="text-[11px] opacity-70">#{i + 1}</div>
                  </div>
                </motion.button>
              );
            })}

            {/* center content (could be preview of selected) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] rounded-full flex items-center justify-center z-10">
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="w-full h-full rounded-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue/6 to-red/3 border border-green/6"
              >
                <div className="text-xs opacity-80">Selected</div>
                <div className="text-lg font-bold mt-1 text-center">
                  {typeof list[index] === "string" ? list[index] : list[index]}
                </div>
                <div className="text-[12px] opacity-60 mt-1">
                  Item {index + 1} of {n}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* subtle ring */}
        <div className="absolute inset-0 rounded-full pointer-events-none ring-1 ring-white/3" />
      </div>
      {/* Wireframe orbit ring */}
      <motion.div
        className="-z-0 absolute inset-0 rounded-full border border-white/20 pointer-events-none"
        style={{ borderStyle: "dashed" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />

      {/* Inner pulsating wire circle */}
      <motion.div
        className="-z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
        style={{ width: "50%", height: "60%" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      {/* controls: dots + next/prev */}
      <div className="flex items-center gap-4">
        <button
          className="px-3 py-2 rounded-md bg-white/6 text-sm hover:bg-white/8"
          onClick={() => {
            lastInteractionRef.current = Date.now();
            setIndex((s) => (s - 1 + n) % n);
          }}
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => pickIndex(i)}
              aria-label={`Select ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "scale-125 w-3.5 h-3.5 bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          className="px-3 py-2 rounded-md bg-white/6 text-sm hover:bg-white/8"
          onClick={() => {
            lastInteractionRef.current = Date.now();
            setIndex((s) => (s + 1) % n);
          }}
        >
          Next
        </button>
      </div>

      <div className="text-xs opacity-60">
        Hover to pause • Click dots to select • Auto-rotates when idle
      </div>
    </div>
  );
}
