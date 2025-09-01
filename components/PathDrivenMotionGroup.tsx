"use client";
import { ReactNode } from "react";
import MotionGroup from "./MotionGroup";
// import { useShapePath } from "./ShapecontrolPanel";
import { motion } from "framer-motion";
import { useShapePath } from "./ui-tools/PathControls";

export function PathDrivenMotionGroup({
  children,
  duration,
  gap,
}: {
  children: ReactNode;
  duration?: number;
  gap?: number;
}) {
  // const { path, transform } = useShapePath();
  const { path } = useShapePath();
  return (
    <MotionGroup  path={path} duration={duration ?? 8} gap={gap ?? 1.5}>
      {children}
    </MotionGroup>
    //  <svg width={400} height={200} className="border bg-white">
    //   <motion.path d={path} stroke="blue" fill="transparent" transform={transform} />
    // </svg>
  );
}
