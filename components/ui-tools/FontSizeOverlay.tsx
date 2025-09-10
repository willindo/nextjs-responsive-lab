"use client";
import { useEffect, useState } from "react";

type FontSizeMap = Record<string, string>;

export default function FontSizeOverlay() {
  const [sizes, setSizes] = useState<FontSizeMap>({});

  const updateSizes = () => {
    const tags = ["h1", "h2", "h3", "h4", "h5", "p"];
    const newSizes: FontSizeMap = {};
    tags.forEach(tag => {
      const el = document.querySelector(tag);
      if (el) {
        newSizes[tag] = window.getComputedStyle(el).fontSize;
      }
    });
    setSizes(newSizes);
  };

  useEffect(() => {
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const colors: Record<string, string> = {
    h1: "bg-red-500",
    h2: "bg-orange-500",
    h3: "bg-yellow-500",
    h4: "bg-green-500",
    h5: "bg-blue-500",
    p: "bg-purple-500",
  };

  return (
    <div className="fixed flex top-14 right-4 z-[9999] space-y-2 p-4 bg-black/80 text-white rounded-xl shadow-lg text-sm font-mono">
      <h3 className="text-xs text-gray-300 mb-1">Font Sizes</h3>
      {Object.entries(sizes).map(([tag, size]) => (
        <div
          key={tag}
          className={`flex items-center justify-between px-2 py-1 rounded ${colors[tag]}`}
        >
          <span className="uppercase font-bold">{tag}</span>
          <span>{size}</span>
        </div>
      ))}
    </div>
  );
}
