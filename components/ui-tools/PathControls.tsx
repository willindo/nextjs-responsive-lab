"use client";
import { useState, useMemo, useContext, createContext, ReactNode } from "react";

// --- Shape generators ---
function generateWave({ width, amplitude }: { width: number; amplitude: number }) {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 10) {
    const y = 200 + amplitude * Math.sin((x / width) * Math.PI * 2);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

function generateCircle({ cx, cy, radius }: { cx: number; cy: number; radius: number }) {
  const points: string[] = [];
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")} Z`;
}

// --- Context ---
type ShapeType = "wave" | "circle";
type PathState = {
  shape: ShapeType;
  amplitude: number;
  radius: number;
  setShape: (s: ShapeType) => void;
  setAmplitude: (a: number) => void;
  setRadius: (r: number) => void;
};
const PathContext = createContext<PathState | null>(null);

export function PathProvider({ children }: { children: ReactNode }) {
  const [shape, setShape] = useState<ShapeType>("wave");
  const [amplitude, setAmplitude] = useState(80);
  const [radius, setRadius] = useState(150);

  return (
    <PathContext.Provider value={{ shape, amplitude, radius, setShape, setAmplitude, setRadius }}>
      {children}
    </PathContext.Provider>
  );
}

// --- Hook ---
export function useShapePath() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("useShapePath must be used inside PathProvider");
  const { shape, amplitude, radius } = ctx;

  const path = useMemo(() => {
    if (shape === "wave") return generateWave({ width: 600, amplitude });
    return generateCircle({ cx: 250, cy: 200, radius });
  }, [shape, amplitude, radius]);

  return { path };
}

// --- Panel ---
export function PathControllerPanel() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("Must be inside PathProvider");
  const { shape, setShape, amplitude, setAmplitude, radius, setRadius } = ctx;

  return (
    <div className="space-y-4 p-4 border rounded">
      <div className="flex items-center gap-3">
        <label>Shape:</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="wave">🌊 Wave</option>
          <option value="circle">⭕ Circle</option>
        </select>
      </div>

      {shape === "wave" && (
        <label>
          Amplitude:
          <input
            type="range"
            min={20}
            max={200}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
          />
          <span className="ml-2">{amplitude}</span>
        </label>
      )}

      {shape === "circle" && (
        <label>
          Radius:
          <input
            type="range"
            min={50}
            max={300}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
          />
          <span className="ml-2">{radius}</span>
        </label>
      )}
    </div>
  );
}
