// components/dev/DevConfigPanel.tsx
"use client";
import { useLayout } from "@/components/contexts/LayoutContext";
import { useConfig } from "@/components/contexts/ConfigContext";

export function DevConfigPanel({ position = "bottom-right" }: { position?: "top-right" | "bottom-right" }) {
  const { layout, setLayout } = useLayout();
  const { gap, speed, showGrid, setGap, setSpeed, setShowGrid } = useConfig();

  const positionClasses =
    position === "top-right"
      ? "top-4 right-4"
      : "bottom-4 right-4";

  return (
    <div
      className={`fixed ${positionClasses} bg-white shadow-lg rounded-2xl p-4 w-64 space-y-3 text-sm`}
    >
      <h2 className="font-bold">Dev Config Panel</h2>
      {/* Layout Switcher */}
      <div>
        <label className="block mb-1">Layout</label>
        <select
          value={layout}
          onChange={(e) => setLayout(e.target.value as any)}
          className="w-full border rounded p-1"
        >
          <option value="grid">Grid</option>
          <option value="stack">Stack</option>
          <option value="motion">Motion</option>
        </select>
      </div>
      {/* Gap */}
      <div>
        <label className="block mb-1">Gap: {gap}px</label>
        <input
          type="range"
          min={0}
          max={100}
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {/* Speed */}
      <div>
        <label className="block mb-1">Speed: {speed}</label>
        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {/* Grid */}
      <div>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          Show Grid
        </label>
      </div>
    </div>
  );
}
