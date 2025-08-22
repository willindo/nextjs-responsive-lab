"use client";

import React, { CSSProperties, PropsWithChildren } from "react";
import { motion } from "framer-motion";

export type AnimatedGradientBgProps = PropsWithChildren<{
  colors?: string[];
  duration?: number;
  ease?: any;
  mode?: "position" | "color";
  blur?: number;
  opacity?: number;
  className?: string;
  radius?: number;
  /** if true → full screen background */
  full?: boolean;
}>;

const DEFAULT_COLORS = ["#ff6b6b", "#feca57", "#54a0ff", "#5f27cd"];

export default function AnimatedGradientBg({
  colors = DEFAULT_COLORS,
  duration = 12,
  ease = "linear",
  mode = "position",
  blur = 0,
  opacity = 1,
  className = "",
  radius = 16,
  full = false,
  children,
}: AnimatedGradientBgProps) {
  const cols = colors.length >= 3 ? colors : DEFAULT_COLORS;

  /** shared wrapper */
  const Wrapper = ({ children }: PropsWithChildren) => (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius: radius,
        ...(full ? { minHeight: "100vh", width: "100%" } : {}),
      }}
    >
      {children}
    </div>
  );

  if (mode === "position") {
    const base: CSSProperties = {
      backgroundImage: `linear-gradient(-45deg, ${cols.join(", ")})`,
      backgroundSize: "400% 400%",
      filter: blur ? `blur(${blur}px)` : undefined,
      opacity,
      borderRadius: radius,
    };

    return (
      <Wrapper>
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={base}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration, ease, repeat: Infinity }}
        />
        <div className="relative z-10">{children}</div>
      </Wrapper>
    );
  }

  // color mode
  const pad = (arr: string[], n: number) =>
    Array.from({ length: n }, (_, i) => arr[i % arr.length]);
  const [c1, c2, c3, c4] = pad(cols, 4);

  const cssVars = {
    "--c1": c1,
    "--c2": c2,
    "--c3": c3,
    "--c4": c4,
  } as CSSProperties & Record<string, string>;

  const gradientStyle: CSSProperties = {
    backgroundImage:
      "linear-gradient(135deg, var(--c1) 0%, var(--c2) 33%, var(--c3) 66%, var(--c4) 100%)",
    backgroundSize: "200% 200%",
    filter: blur ? `blur(${blur}px)` : undefined,
    opacity,
    borderRadius: radius,
    ...cssVars,
  };

  return (
    <Wrapper>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={gradientStyle}
        animate={{
          ["--c1"]: [c1, c2, c3, c4, c1],
          ["--c2"]: [c2, c3, c4, c1, c2],
          ["--c3"]: [c3, c4, c1, c2, c3],
          ["--c4"]: [c4, c1, c2, c3, c4],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration, ease, repeat: Infinity }}
      />
      <div className="relative z-10">{children}</div>
    </Wrapper>
  );
}
