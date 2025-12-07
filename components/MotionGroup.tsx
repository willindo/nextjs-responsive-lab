"use client";
import { ReactNode, useState, useRef, useEffect } from "react";

type MotionPathProps = {
  path: string;
  duration: number;
  delay: number;
  children: ReactNode;
};

function MotionPath({ path, duration, delay, children }: MotionPathProps) {
  return (
    <div
      className="absolute animate-motion"
      style={{
        ["--motion-path" as any]: `path("${path}")`,
        ["--duration" as any]: `${duration}s`,
        ["--delay" as any]: `${delay}s`,
      }}
    >
      {children}
      <style jsx>{`
        .animate-motion {
          offset-path: var(--motion-path);
          offset-rotate: auto;
          animation: move var(--duration) linear infinite;
          animation-delay: var(--delay);
        }
        @keyframes move {
          to {
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}

type MotionGroupProps = {
  path: string;
  duration?: number;
  gap?: number;
  children: ReactNode | ReactNode[];
  showPath?: boolean;
  transform?: string;
  className?: string;
  padding?: number;
};

export default function MotionGroup({
  path,
  duration = 6,
  gap = 1.2,
  children,
  showPath = true,
  transform,
  className,
  padding = 0, // same idea as Ripples
}: MotionGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 100, h: 100 });

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden ${className ?? ""}`}
    >
      {showPath && (
        <svg
          // width="100%"
          // height="100%"
          className="absolute  pointer-events-none "
          viewBox={`${-padding} ${-padding} ${dims.w + padding * 2} ${
            dims.h + padding * 2
          }`}
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={path}
            fill="none"
            stroke="blue"
            strokeWidth={2}
            transform={transform}
          />
        </svg>
      )}

      {items.map((child, i) => (
        <MotionPath key={i} path={path} duration={duration} delay={i * gap}>
          {child}
        </MotionPath>
      ))}
    </div>
  );
}
