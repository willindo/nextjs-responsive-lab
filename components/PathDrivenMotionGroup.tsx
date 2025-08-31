"use client";
import { ReactNode } from "react";
import MotionGroup from "./MotionGroup";
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
  const { path } = useShapePath();
  return (
    <MotionGroup path={path} duration={duration ?? 8} gap={gap ?? 1.5}>
      {children}
    </MotionGroup>
  );
}
