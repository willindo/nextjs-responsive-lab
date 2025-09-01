"use client";
import { useEffect, useRef } from "react";

type MotionPathProps = {
  path: string;
  duration?: number;
  delay?: number;
  children: React.ReactNode;
};

function MotionPath({ path, duration = 5, delay = 0, children }: MotionPathProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--motion-path", `path("${path}")`);
      ref.current.style.setProperty("--duration", `${duration}s`);
      ref.current.style.setProperty("--delay", `${delay}s`);
    }
  }, [path, duration, delay]);

  return (
    <div ref={ref} className="absolute animate-motion">
      {children}
      <style jsx>{`
        .animate-motion {
          offset-path: var(--motion-path);
          offset-rotate: auto; /* rotate element along path */
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
  gap?: number; // time spacing between children
  children: React.ReactNode | React.ReactNode[];
  showPath?: boolean;
};

export default function MotionGroup({
  path,
  duration = 6,
  gap = 1.2,
  children,
  showPath = true,
}: MotionGroupProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className="relative w-[50vw] h-[300px] border border-green-500 bg-white">
      {items.map((child, i) => (
        <MotionPath
          key={i}
          path={path}
          duration={duration}
          delay={i * gap}
        >
          {child}
        </MotionPath>
      ))}

      {showPath && (
        <svg className="absolute inset-0 w-[50vw] h-[50vh] pointer-events-none">
          <path d={path} stroke="black" strokeWidth="2" fill="none" />
        </svg>
      )}
    </div>
  );
}
