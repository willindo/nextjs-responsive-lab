"use client";
import { useEffect, useRef } from "react";

export default function RippleBox() {
  const pathRef = useRef<SVGPathElement>(null);

  const generateRipplePath = (
    w: number,
    h: number,
    amp: number,
    freq: number,
    phase: number
  ) => {
    const steps = 80;
    const points: string[] = [];

    // top edge (left → right)
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * w;
      const y = 0 + amp * Math.sin(freq * x + phase);
      points.push(`${x},${y}`);
    }

    // right edge (top → bottom)
    for (let i = 0; i <= steps; i++) {
      const y = (i / steps) * h;
      const x = w + amp * Math.sin(freq * y + phase);
      points.push(`${x},${y}`);
    }

    // bottom edge (right → left)
    for (let i = 0; i <= steps; i++) {
      const x = w - (i / steps) * w;
      const y = h + amp * Math.sin(freq * x + phase);
      points.push(`${x},${y}`);
    }

    // left edge (bottom → top)
    for (let i = 0; i <= steps; i++) {
      const y = h - (i / steps) * h;
      const x = 0 + amp * Math.sin(freq * y + phase);
      points.push(`${x},${y}`);
    }

    return "M" + points.join(" L") + " Z";
  };

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame += 0.05;
      if (pathRef.current) {
        pathRef.current.setAttribute(
          "d",
          generateRipplePath(200, 120, 6, 0.12, frame)
        );
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="  w-[230px]  b-gray-400">
      <svg width={220} height={130}  viewBox="-10 -10 260 220" className=" mx-2 block pt-3 pl-4 " >
        {/* The box itself */}
        <rect
          x={10}
          y={10}
          width={200}
          height={120}
          rx={12}
          ry={12}
          fill="white"
          // stroke="lightgray"
          // strokeWidth={2}
        />
        {/* Ripple path hugging the rect */}
        <path
          ref={pathRef}
          fill="none"
          stroke="dodgerblue"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
