"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Staircase from "./Staircase";

export default function ClippyImage({ src, alt }: { src: string; alt: string }) {
  const [shape, setShape] = useState<"wave" | "triangle" | "circle">("wave");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SVG clipPaths (all normalized 0–1 for perfect scaling) */}
      <svg className="absolute inset-0 w-0 h-0">
        <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
          <path d="M0,0.3 Q0.25,0 0.5,0.3 T1,0.3 V1 H0 Z" />
        </clipPath>
        <clipPath id="triangle-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0 L1,1 H0 Z" />
        </clipPath>
        <clipPath id="circle-clip" clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.5" r="0.5" />
        </clipPath>
      </svg>

      {/* Image wrapper with responsive scaling */}
      <div className="relative w-[70vw] max-w-4xl aspect-[16/9] overflow-visible">
        <motion.img
          key={shape}
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-2xl shadow-xl"
          style={{ clipPath: `url(#${shape}-clip)` }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
      {/* Buttons to switch shapes */}

      <div className="flex absolute top-0 right-30 gap-3">
      <Staircase mode="one-side" direction="up" stepY={40} stepX={50} >
        <button
          onClick={() => setShape("wave")}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
        >
          Wave
        </button>
        <button
          onClick={() => setShape("triangle")}
          className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
          >
          Triangle
        </button>
        <button
          onClick={() => setShape("circle")}
          className="px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600"
          >
          Circle
        </button>
          </Staircase>
      </div>
      </div>

    </div>
  );
}
