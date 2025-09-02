"use client";
import { useEffect, useRef } from "react";

interface RippleBoxProps {
  shape?: "box" | "circle" | "triangle";
  variant?: "ripple" | "zigzag";
  animate?: boolean;
  size?: number; // size of the shape
  color?: string;
  className?: string
}

export default function Ripples({
  shape = "box",
  variant = "ripple",
  animate = true,
  size = 200,
  color = "dodgerblue",
  className,
}: RippleBoxProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const generatePath = (
    w: number,
    h: number,
    amp: number,
    freq: number,
    phase: number
  ) => {
    const steps = 80;
    const points: string[] = [];

    // helper: wave offset
    const offset = (pos: number) =>
      variant === "ripple"
        ? amp * Math.sin(freq * pos + phase)
        : amp * Math.sign(Math.sin(freq * pos + phase));

    if (shape === "box") {
      // top edge
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const y = 0 + offset(x);
        points.push(`${x},${y}`);
      }
      // right edge
      for (let i = 0; i <= steps; i++) {
        const y = (i / steps) * h;
        const x = w + offset(y);
        points.push(`${x},${y}`);
      }
      // bottom edge
      for (let i = 0; i <= steps; i++) {
        const x = w - (i / steps) * w;
        const y = h + offset(x);
        points.push(`${x},${y}`);
      }
      // left edge
      for (let i = 0; i <= steps; i++) {
        const y = h - (i / steps) * h;
        const x = 0 + offset(y);
        points.push(`${x},${y}`);
      }
    }

    if (shape === "circle") {
      const r = w / 2;
      for (let i = 0; i <= steps; i++) {
        const angle = (i / steps) * 2 * Math.PI;
        const radius = r + offset(i * 5);
        const x = r + radius * Math.cos(angle);
        const y = r + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
    }

    if (shape === "triangle") {
      const side = w; // treat width as triangle side length
      const h = (Math.sqrt(3) / 2) * side; // equilateral triangle height

      // vertices: centered horizontally
      const basePoints = [
        [side / 2, 0],     // top vertex
        [side, h],         // bottom-right
        [0, h],            // bottom-left
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
  const getViewBox = (shape: string, size: number, pad: number = 20) => {
    switch (shape) {
      case "circle":
      case "box":
        return `-${pad} -${pad} ${size + pad * 2} ${size + pad * 2}`;
      case "triangle":
        const h = (Math.sqrt(3) / 2) * size;
        return `-${pad} -${pad} ${size + pad * 2} ${h + pad * 2}`;
      default:
        return `-${pad} -${pad} ${size + pad * 2} ${size + pad * 2}`;
    }
  };


  useEffect(() => {
    let frame = 0;
    let raf: number;
    const animatePath = () => {
      frame += 0.05;
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          generatePath(size, size * 0.6, 6, 0.12, frame)
        );
      }
      raf = requestAnimationFrame(animatePath);
    };
    if (animate) animatePath();
    return () => cancelAnimationFrame(raf);
  }, [animate, shape, variant, size]);

  return (
    <div className={`${className} p-4 max-w-fit`}>
      <svg width={size + 40} height={size + 40} viewBox={getViewBox(shape, size)}>
        <path ref={pathRef} fill="none" stroke={color} strokeWidth={2} />
      </svg>
    </div>
  );
}
