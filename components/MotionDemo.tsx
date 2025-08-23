"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MotionDemo() {
  const [mode, setMode] = useState<"linear" | "sine">("linear");
  const [x, setX] = useState(0);

  // manual loop to illustrate sine math without forcing full rerender
  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const tick = (t: number) => {
      const elapsed = (t - start) / 1000; // seconds
      if (mode === "linear") {
        setX((elapsed * 100) % 400); // keeps sliding
      } else {
        setX(Math.sin(elapsed * 2) * 150 + 200); // sine wave oscillation
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [mode]);

  return (
    <div className="p-6 space-y-4">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as "linear" | "sine")}
        className="border rounded p-1"
      >
        <option value="linear">Linear</option>
        <option value="sine">Sine Wave</option>
      </select>

      <div className="relative h-32 w-full border overflow-hidden">
        <motion.div
          className="absolute top-12 h-8 w-8 bg-blue-500 rounded-full"
          style={{ x }}
        />
      </div>
    </div>
  );
}
