"use client";
import { useEffect, useState } from "react";

export default function UnitCheatSheet() {
  const [values, setValues] = useState<any>({});

  const updateValues = () => {
    const rootFont = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const bodyFont = parseFloat(getComputedStyle(document.body).fontSize);

    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;

    // Example clamp: clamp(12px, 2vw, 32px)
    const clampExample = Math.min(
      32,
      Math.max(12, 2 * vw)
    );

    setValues({
      vw: vw.toFixed(2) + "px",
      vh: vh.toFixed(2) + "px",
      rem: rootFont.toFixed(2) + "px",
      em: bodyFont.toFixed(2) + "px",
      px: "1px (absolute)",
      clamp: clampExample.toFixed(2) + "px",
      width: window.innerWidth + "px",
      height: window.innerHeight + "px",
    });
  };

  useEffect(() => {
    updateValues();
    window.addEventListener("resize", updateValues);
    return () => window.removeEventListener("resize", updateValues);
  }, []);

  return (
    <div className="p-6 font-mono text-sm space-y-3 bg-gray-100 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold">📐 Unit Cheat Sheet (Live)</h2>
      <p>Viewport: {values.width} × {values.height}</p>
      <ul className="space-y-1">
        <li>1px → {values.px}</li>
        <li>1rem → {values.rem}</li>
        <li>1em → {values.em}</li>
        <li>1vw → {values.vw}</li>
        <li>1vh → {values.vh}</li>
        <li>clamp(12px,2vw,32px) → {values.clamp}</li>
      </ul>

      <div className="mt-4">
        <h3 className="font-semibold">Breakpoint Ranges (Tailwind default)</h3>
        <ul className="space-y-1">
          <li>sm ≥ 640px</li>
          <li>md ≥ 768px</li>
          <li>lg ≥ 1024px</li>
          <li>xl ≥ 1280px</li>
          <li>2xl ≥ 1536px</li>
        </ul>
      </div>
    </div>
  );
}
