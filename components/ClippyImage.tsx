"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CLIP_SHAPES: Record<string, string> = {
  wave: "path('M0,120 Q200,0 400,120 T800,120 V420 H0 Z')",
  diagonal: "polygon(0 0, 100% 20%, 100% 100%, 0 80%)",
  arch: "ellipse(80% 50% at 50% 100%)",
};

type Props = {
  src: string;
  alt?: string;
  children?: React.ReactNode;
};

export default function ClippyImage({ src, alt = "", children }: Props) {
  const [shape, setShape] = useState<keyof typeof CLIP_SHAPES>("wave");

  return (
    <div className="relative w-full max-w-4xl h-[420px] overflow-visible">
      {/* clipped image */}
      <motion.img
        key={shape}
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-2xl shadow-xl"
        style={{ clipPath: CLIP_SHAPES[shape] }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* overlay slot for buttons / text */}
      <div className="absolute inset-0 grid place-items-end p-6">
        {children}
      </div>

      {/* shape selector */}
      <div className="absolute top-3 right-3 flex gap-2">
        {Object.keys(CLIP_SHAPES).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s as keyof typeof CLIP_SHAPES)}
            className={`px-3 py-1 text-sm rounded-lg shadow-md transition ${
              shape === s
                ? "bg-indigo-600 text-white"
                : "bg-white/80 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
