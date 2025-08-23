"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BOX_COUNT = 5;

export default function WaveBoxes() {
  const [time, setTime] = useState(0);

  // increment "time" smoothly
  useEffect(() => {
    let frame: number;
    const loop = (t: number) => {
      setTime(t / 1000); // seconds
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex gap-4 p-6">
      {[...Array(BOX_COUNT)].map((_, i) => {
        // offset each box in wave by index
        const phase = (i * Math.PI) / 4; // adjust for spacing
        const y = Math.sin(time * 2 + phase) * 40; // amplitude 40px

        return (
          <motion.div
            key={i}
            animate={{ y }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="w-12 h-12 bg-blue-500 rounded-xl"
          />
        );
      })}
    </div>
  );
}
