"use client";
import { useEffect, useRef, useState } from "react";

interface RippleBoxProps {
  shape?: "box" | "circle" | "triangle";
  variant?: "ripple" | "zigzag";
  animate?: boolean;
  size?: number; // initial size (fallback)
  color?: string;
  className?: string;
  padding?: number;
}

export default function Ripples({
  shape = "box",
  variant = "ripple",
  animate = true,
  size = 200,
  color = "dodgerblue",
  padding = 6, // default padding if not provided
  className,
}: RippleBoxProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: size, h: size });

  const generatePath = (
    w: number,
    h: number,
    amp: number,
    freq: number,
    phase: number
  ) => {
    const steps = 80;
    const points: string[] = [];

    const offset = (pos: number) =>
      variant === "ripple"
        ? amp * Math.sin(freq * pos + phase)
        : amp * Math.sign(Math.sin(freq * pos + phase));

    if (shape === "box") {
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const y = 0 + offset(x);
        points.push(`${x},${y}`);
      }
      for (let i = 0; i <= steps; i++) {
        const y = (i / steps) * h;
        const x = w + offset(y);
        points.push(`${x},${y}`);
      }
      for (let i = 0; i <= steps; i++) {
        const x = w - (i / steps) * w;
        const y = h + offset(x);
        points.push(`${x},${y}`);
      }
      for (let i = 0; i <= steps; i++) {
        const y = h - (i / steps) * h;
        const x = 0 + offset(y);
        points.push(`${x},${y}`);
      }
    }

    if (shape === "circle") {
      const r = Math.min(w, h) / 2;
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        const radius = r + offset(i * 5);
        const x = r + radius * Math.cos(angle);
        const y = r + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
    }

    if (shape === "triangle") {
      const side = w;
      const hTri = (Math.sqrt(3) / 2) * side;
      const basePoints = [
        [side / 2, 0],
        [side, hTri],
        [0, hTri],
      ];

      for (let i = 0; i < basePoints.length; i++) {
        const [x1, y1] = basePoints[i];
        const [x2, y2] = basePoints[(i + 1) % basePoints.length];
        for (let j = 0; j <= steps; j++) {
          const t = j / steps;
          const x = x1 + (x2 - x1) * t + offset(j * 5);
          const y = y1 + (y2 - y1) * t + offset(j * 5);
          points.push(`${x},${y}`);
        }
      }
    }

    return "M" + points.join(" L") + " Z";
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDims({ w: width, h: height });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animatePath = () => {
      frame += 0.05;
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          generatePath(dims.w, dims.h, 6, 0.12, frame)
        );
      }
      raf = requestAnimationFrame(animatePath);
    };
    if (animate) animatePath();
    return () => cancelAnimationFrame(raf);
  }, [animate, shape, variant, dims]);

  return (
    <div ref={containerRef} className={`${className} p-4 w-full h-full`}>
      <svg
        width="100%"
        height="100%"
        viewBox={`${-padding} ${-padding} ${dims.w + padding * 2} ${dims.h + padding * 2}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path ref={pathRef} fill="white" stroke={color} strokeWidth={2} />
      </svg>
    </div>
  );
}
