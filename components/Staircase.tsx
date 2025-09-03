"use client";
import React from "react";
// import { cn } from "@/lib/utils";

type StaircaseProps = {
  children: React.ReactNode;
  stepX?: number; // horizontal step size
  stepY?: number; // vertical step size
  mode?: "one-side" | "two-side"; // layout style
  direction?: "up" | "down"; // staircase vertical flow
  className?: string;
};

export default function Staircase({
  children,
  stepX = 40,
  stepY = 20,
  mode = "one-side",
  direction = "up",
  className,
}: StaircaseProps) {
  const items = React.Children.toArray(children);

  return (
    // <div className={cn("relative flex flex-col gap-2", className)}>
    <div className={`relative flex flex-col gap-2 ${className}`}>
      {items.map((child, i) => {
        let offsetX = 0;
        let offsetY = 0;

        if (mode === "one-side") {
          // classic staircase: every step shifts right & up/down
          offsetX = i * stepX;
          offsetY = i * stepY * (direction === "up" ? -1 : 1);
        } else {
          // two-side: alternate left/right, still step in Y
          offsetX = (i % 2 === 0 ? 1 : -1) * (i * stepX);
          offsetY = i * stepY * (direction === "up" ? -1 : 1);
        }

        return (
          <div
            key={i}
            className="absolute transition-transform"
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
