"use client";
import { ReactNode } from "react";
import MotionGroup from "./MotionGroup";
import { useShapePath } from "./ui-tools/PathControls1";

type PathDrivenMotionGroupProps = {
  duration?: number;
  gap?: number;
  children: ReactNode | ReactNode[];
  showPath?: boolean;
  className?: string;
};

export default function PathDrivenMotionGroup({
  duration = 6,
  gap = 1.2,
  children,
  showPath = true,
  className,
}: PathDrivenMotionGroupProps) {
  const { path, transform } = useShapePath();

  return (
    <MotionGroup
      path={path}
      transform={transform}
      duration={duration}
      gap={gap}
      showPath={showPath}
      className={className}
    >
      {children}
    </MotionGroup>
  );
}
