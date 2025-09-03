"use client";
import { useState, useMemo, useContext, createContext, ReactNode } from "react";

/* ---------------------- Generators ---------------------- */
function normalizePath(path: string): string {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const temp = document.createElementNS(svgNS, "path");
  temp.setAttribute("d", path);
  svg.appendChild(temp);

  const bbox = temp.getBBox();
  if (bbox.width === 0 || bbox.height === 0) return path;

  const scaleX = 100 / bbox.width;
  const scaleY = 100 / bbox.height;
  const scale = Math.min(scaleX, scaleY);

  const translateX = -bbox.x * scale;
  const translateY = -bbox.y * scale;

  let idx = 0;
  const nums = path.match(/-?\d*\.?\d+/g)?.map(Number) ?? [];

  return path.replace(/-?\d*\.?\d+/g, () => {
    const n = nums[idx++];
    const isX = idx % 2 === 1;
    return isX
      ? ((n - bbox.x) * scale + translateX).toFixed(2)
      : ((n - bbox.y) * scale + translateY).toFixed(2);
  });
}

function generateWave({
  width,
  amplitude,
  frequency,
}: { width: number; amplitude: number; frequency: number }) {
  const points: string[] = [];
  for (let x = 0; x <= width; x += 10) {
    const y = 200 + amplitude * Math.sin((x / width) * Math.PI * 2 * frequency);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

function generateCircle({ cx, cy, radius }: { cx: number; cy: number; radius: number }) {
  const points: string[] = [];
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * 2 * Math.PI;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")} Z`;
}

function generateSpiral({
  cx, cy, turns, step,
}: { cx: number; cy: number; turns: number; step: number }) {
  const points: string[] = [];
  const total = Math.max(60, Math.floor(turns * 140));
  for (let i = 0; i <= total; i++) {
    const angle = (i / total) * turns * 2 * Math.PI;
    const r = step * angle;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

function generateZigzag({
  width, segments, amplitude,
}: { width: number; segments: number; amplitude: number }) {
  const points: string[] = [];
  const step = width / segments;
  for (let i = 0; i <= segments; i++) {
    const x = i * step;
    const y = i % 2 === 0 ? 200 - amplitude : 200 + amplitude;
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")}`;
}

function generatePolygon({
  cx, cy, sides, radius, rotationDeg,
  star = false, spike = 0,
}: {
  cx: number; cy: number; sides: number; radius: number; rotationDeg: number;
  star?: boolean; spike?: number;
}) {
  const points: string[] = [];
  const rot = (rotationDeg * Math.PI) / 180;
  const total = star ? sides * 2 : sides;
  for (let i = 0; i <= total; i++) {
    const idx = i % total;
    const angle = (idx / total) * 2 * Math.PI + rot;
    const rad = star ? (idx % 2 === 0 ? radius : Math.max(4, radius - spike)) : radius;
    const x = cx + rad * Math.cos(angle);
    const y = cy + rad * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return `M${points.join(" L")} Z`;
}
function applyTransforms({
  customPath,
  scaleX, scaleY,
  offsetX, offsetY,
  rotate,
}: {
  customPath: string;
  scaleX: number; scaleY: number;
  offsetX: number; offsetY: number;
  rotate: number;
}) {
  const angle = (rotate * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // Regex replace numbers in path
  return customPath.replace(/-?\d+(\.\d+)?/g, (numStr, _, idx) => {
    // Only process if it's part of a coordinate pair (naive but works for M/L commands)
    const n = parseFloat(numStr);
    const prev = customPath.slice(0, idx);
    const countCommas = (prev.match(/,/g) || []).length;
    const isX = countCommas % 2 === 0;

    let x = n, y = n;

    if (isX) {
      x = n * scaleX;
      y = 0;
    } else {
      y = n * scaleY;
      x = 0;
    }

    // Rotate
    const xr = x * cos - y * sin;
    const yr = x * sin + y * cos;

    // Offset
    return (isX ? xr + offsetX : yr + offsetY).toFixed(2);
  });
}


/* ---------------------- Context ---------------------- */
type ShapeType = "wave" | "circle" | "spiral" | "zigzag" | "polygon" | "custom";

type PathState = {
  shape: ShapeType;

  // Wave
  amplitude: number;
  frequency: number;

  // Circle
  radius: number;

  // Spiral
  turns: number;
  spiralStep: number;

  // Zigzag
  segments: number;
  zigzagAmp: number;

  // Polygon / Star
  polySides: number;
  polyRadius: number;
  polyRotation: number;
  polyStar: boolean;
  polySpike: number;

  // Custom
  customPath: string;
  customScaleX: number;
  customScaleY: number;
  customOffsetX: number;
  customOffsetY: number;
  customRotate: number;

  setShape: (s: ShapeType) => void;
  setAmplitude: (v: number) => void;
  setFrequency: (v: number) => void;
  setRadius: (v: number) => void;
  setTurns: (v: number) => void;
  setSpiralStep: (v: number) => void;
  setSegments: (v: number) => void;
  setZigzagAmp: (v: number) => void;
  setPolySides: (v: number) => void;
  setPolyRadius: (v: number) => void;
  setPolyRotation: (v: number) => void;
  setPolyStar: (v: boolean) => void;
  setPolySpike: (v: number) => void;
  setCustomPath: (s: string) => void;
  setCustomScaleX: (v: number) => void;
  setCustomScaleY: (v: number) => void;
  setCustomOffsetX: (v: number) => void;
  setCustomOffsetY: (v: number) => void;
  setCustomRotate: (v: number) => void;
};

const PathContext = createContext<PathState | null>(null);

export function PathProvider({ children }: { children: ReactNode }) {
  const [shape, setShape] = useState<ShapeType>("wave");

  // Wave
  const [amplitude, setAmplitude] = useState(80);
  const [frequency, setFrequency] = useState(1);

  // Circle
  const [radius, setRadius] = useState(150);

  // Spiral
  const [turns, setTurns] = useState(5);
  const [spiralStep, setSpiralStep] = useState(12);

  // Zigzag
  const [segments, setSegments] = useState(6);
  const [zigzagAmp, setZigzagAmp] = useState(60);

  // Polygon / Star
  const [polySides, setPolySides] = useState(5);
  const [polyRadius, setPolyRadius] = useState(140);
  const [polyRotation, setPolyRotation] = useState(0);
  const [polyStar, setPolyStar] = useState(false);
  const [polySpike, setPolySpike] = useState(50);

  // Custom
  const [customPath, setCustomPath] = useState<string>("M 50,200 L 550,200");
  const [customScaleX, setCustomScaleX] = useState(1);
  const [customScaleY, setCustomScaleY] = useState(1);
  const [customOffsetX, setCustomOffsetX] = useState(0);
  const [customOffsetY, setCustomOffsetY] = useState(0);
  const [customRotate, setCustomRotate] = useState(0);

  return (
    <PathContext.Provider
      value={{
        shape,
        amplitude, frequency,
        radius,
        turns, spiralStep,
        segments, zigzagAmp,
        polySides, polyRadius, polyRotation, polyStar, polySpike,
        customPath, customScaleX, customScaleY, customOffsetX, customOffsetY, customRotate,
        setShape,
        setAmplitude, setFrequency,
        setRadius,
        setTurns, setSpiralStep,
        setSegments, setZigzagAmp,
        setPolySides, setPolyRadius, setPolyRotation, setPolyStar, setPolySpike,
        setCustomPath, setCustomScaleX, setCustomScaleY, setCustomOffsetX, setCustomOffsetY, setCustomRotate,
      }}
    >
      {children}
    </PathContext.Provider>
  );
}

/* ---------------------- Hook ---------------------- */
export function useShapePath() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("useShapePath must be used inside PathProvider");

  const {
    shape,
    amplitude,
    frequency,
    radius,
    turns,
    spiralStep,
    segments,
    zigzagAmp,
    polySides,
    polyRadius,
    polyRotation,
    polyStar,
    polySpike,
    customPath,
    customScaleX,
    customScaleY,
    customOffsetX,
    customOffsetY,
    customRotate,
  } = ctx;

  const path = useMemo(() => {
    let raw = "M0,0";

    switch (shape) {
      case "wave":
        raw = generateWave({ width: 600, amplitude, frequency });
        break;
      case "circle":
        raw = generateCircle({ cx: 300, cy: 200, radius });
        break;
      case "spiral":
        raw = generateSpiral({ cx: 300, cy: 200, turns, step: spiralStep });
        break;
      case "zigzag":
        raw = generateZigzag({ width: 600, segments, amplitude: zigzagAmp });
        break;
      case "polygon":
        raw = generatePolygon({
          cx: 300,
          cy: 200,
          sides: Math.max(3, Math.floor(polySides)),
          radius: polyRadius,
          rotationDeg: polyRotation,
          star: polyStar,
          spike: polySpike,
        });
        break;
      case "custom":
        raw = applyTransforms({
          customPath,
          scaleX: customScaleX,
          scaleY: customScaleY,
          offsetX: customOffsetX,
          offsetY: customOffsetY,
          rotate: customRotate,
        });
        break;
    }

    return normalizePath(raw);
  }, [
    shape,
    amplitude,
    frequency,
    radius,
    turns,
    spiralStep,
    segments,
    zigzagAmp,
    polySides,
    polyRadius,
    polyRotation,
    polyStar,
    polySpike,
    customPath,
    customScaleX,
    customScaleY,
    customOffsetX,
    customOffsetY,
    customRotate,
  ]);

  return { path };
}

/* ---------------------- Panel ---------------------- */
export function PathControllerPanel() {
  const ctx = useContext(PathContext);
  if (!ctx) throw new Error("Must be inside PathProvider");
  const {
    shape, setShape,
    amplitude, setAmplitude, frequency, setFrequency,
    radius, setRadius,
    turns, setTurns, spiralStep, setSpiralStep,
    segments, setSegments, zigzagAmp, setZigzagAmp,
    polySides, setPolySides, polyRadius, setPolyRadius, polyRotation, setPolyRotation, polyStar, setPolyStar, polySpike, setPolySpike,
    customPath, setCustomPath,
    customScaleX, setCustomScaleX, customScaleY, setCustomScaleY, customOffsetX, setCustomOffsetX, customOffsetY, setCustomOffsetY, customRotate, setCustomRotate,
  } = ctx;

  return (
    <div className="space-y-4 p-4 border rounded">
      {/* Shape selector */}
      <div className="flex items-center gap-3">
        <label className="font-medium">Shape:</label>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="wave">🌊 Wave</option>
          <option value="circle">⭕ Circle</option>
          <option value="spiral">🌀 Spiral</option>
          <option value="zigzag">⚡ Zigzag</option>
          <option value="polygon">🔺 Polygon / Star</option>
          <option value="custom">✏️ Custom (SVG path)</option>
        </select>
      </div>

      {/* Wave */}
      {shape === "wave" && (
        <>
          <label className="block">
            Amplitude: {amplitude}
            <input type="range" min={20} max={200} value={amplitude} onChange={(e) => setAmplitude(+e.target.value)} />
          </label>
          <label className="block">
            Frequency: {frequency}
            <input type="range" min={1} max={5} step={0.1} value={frequency} onChange={(e) => setFrequency(+e.target.value)} />
          </label>
        </>
      )}

      {/* Circle */}
      {shape === "circle" && (
        <label className="block">
          Radius: {radius}
          <input type="range" min={50} max={300} value={radius} onChange={(e) => setRadius(+e.target.value)} />
        </label>
      )}

      {/* Spiral */}
      {shape === "spiral" && (
        <>
          <label className="block">
            Turns: {turns}
            <input type="range" min={1} max={12} value={turns} onChange={(e) => setTurns(+e.target.value)} />
          </label>
          <label className="block">
            Step: {spiralStep}
            <input type="range" min={5} max={30} value={spiralStep} onChange={(e) => setSpiralStep(+e.target.value)} />
          </label>
        </>
      )}

      {/* Zigzag */}
      {shape === "zigzag" && (
        <>
          <label className="block">
            Segments: {segments}
            <input type="range" min={2} max={18} value={segments} onChange={(e) => setSegments(+e.target.value)} />
          </label>
          <label className="block">
            Amplitude: {zigzagAmp}
            <input type="range" min={10} max={180} value={zigzagAmp} onChange={(e) => setZigzagAmp(+e.target.value)} />
          </label>
        </>
      )}

      {/* Polygon / Star */}
      {shape === "polygon" && (
        <>
          <label className="block">
            Sides: {polySides}
            <input type="range" min={3} max={12} value={polySides} onChange={(e) => setPolySides(+e.target.value)} />
          </label>
          <label className="block">
            Radius: {polyRadius}
            <input type="range" min={40} max={260} value={polyRadius} onChange={(e) => setPolyRadius(+e.target.value)} />
          </label>
          <label className="block">
            Rotation: {polyRotation}°
            <input type="range" min={0} max={360} value={polyRotation} onChange={(e) => setPolyRotation(+e.target.value)} />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={polyStar} onChange={(e) => setPolyStar(e.target.checked)} />
            Star mode
          </label>
          {polyStar && (
            <label className="block">
              Spike: {polySpike}
              <input type="range" min={5} max={150} value={polySpike} onChange={(e) => setPolySpike(+e.target.value)} />
            </label>
          )}
        </>
      )}

      {/* Custom path */}
      {shape === "custom" && (
        <>
        <div className="space-y-3">
          <label className="block font-medium">SVG path (d):</label>
          <textarea
            className="w-full h-28 p-2 border rounded font-mono text-sm"
            value={customPath}
            onChange={(e) => setCustomPath(e.target.value)}
          />

          <label className="block">
            Scale X: {customScaleX.toFixed(2)}
            <input type="range" min={0.2} max={3} step={0.1}
              value={customScaleX}
              onChange={(e) => setCustomScaleX(+e.target.value)} />
          </label>

          <label className="block">
            Scale Y: {customScaleY.toFixed(2)}
            <input type="range" min={0.2} max={3} step={0.1}
              value={customScaleY}
              onChange={(e) => setCustomScaleY(+e.target.value)} />
          </label>

          <label className="block">
            Offset X: {customOffsetX}
            <input type="range" min={-200} max={200}
              value={customOffsetX}
              onChange={(e) => setCustomOffsetX(+e.target.value)} />
          </label>

          <label className="block">
            Offset Y: {customOffsetY}
            <input type="range" min={-200} max={200}
              value={customOffsetY}
              onChange={(e) => setCustomOffsetY(+e.target.value)} />
          </label>

          <label className="block">
            Rotate: {customRotate}°
            <input type="range" min={-180} max={180}
              value={customRotate}
              onChange={(e) => setCustomRotate(+e.target.value)} />
          </label>
        </div>
        </>
      )}

    </div>
  );
}
