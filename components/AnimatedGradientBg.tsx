"use client"
import React, { CSSProperties, PropsWithChildren } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedGradientBg
 *
 * A drop-in, looping gradient background powered by Framer Motion keyframes.
 * - Mode "position": classic smooth gradient shift via background-position.
 * - Mode "color": morphs between color palettes by animating CSS variables.
 *
 * Usage:
 * <AnimatedGradientBg className="h-64 rounded-2xl overflow-hidden">
 *   <div className="relative z-10 p-8 text-white">Content on top</div>
 * </AnimatedGradientBg>
 *
 * Tailwind optional; works fine without it. Children render on top.
 */

export type AnimatedGradientBgProps = PropsWithChildren<{
  /** gradient colors (used by both modes). At least 3 recommended */
  colors?: string[];
  /** total seconds for one full loop */
  duration?: number;
  /** css easing; e.g. "linear", "easeInOut" or [0.42,0,0.58,1] */
  ease?: any;
  /** "position" (default) or "color" */
  mode?: "position" | "color";
  /** optional blur strength for a soft, glassy vibe */
  blur?: number;
  /** background opacity (0–1) */
  opacity?: number;
  /** extra classes */
  className?: string;
  /** border radius (fallback if not using utility classes) */
  radius?: number;
}>;

const DEFAULT_COLORS = ["#ff6b6b", "#feca57", "#54a0ff", "#5f27cd"]; // warm → cool

export default function AnimatedGradientBg({
  colors = DEFAULT_COLORS,
  duration = 12,
  ease = "linear",
  mode = "position",
  blur = 0,
  opacity = 1,
  className = "",
  radius = 16,
  children,
}: AnimatedGradientBgProps) {
  // Ensure we have at least 3 colors
  const cols = colors.length >= 3 ? colors : DEFAULT_COLORS;

  if (mode === "position") {
    /**
     * POSITION MODE
     * We create a large gradient and animate background-position across keyframes for a seamless loop.
     */
    const base: CSSProperties = {
      // A big, smooth gradient that tile-shifts across the element
      backgroundImage: `linear-gradient(-45deg, ${cols.join(", ")})`,
      backgroundSize: "400% 400%",
      filter: blur ? `blur(${blur}px)` : undefined,
      opacity,
      borderRadius: radius,
    };

    return (
      <div className={`relative ${className}`} style={{ borderRadius: radius }}>
        {/* Animated layer */}
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={base}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration, ease, repeat: Infinity }}
        />

        {/* Content layer */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  /**
   * COLOR MODE
   * We construct the gradient from CSS custom properties (–-c1..–-c4) and animate those color vars.
   * Framer Motion can tween CSS variables, so the gradient itself updates smoothly.
   */
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
    // spread the vars
    ...cssVars,
  };

  return (
    <div className={`relative ${className}`} style={{ borderRadius: radius }}>
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={gradientStyle}
        animate={{
          // animate the CSS variables through a palette loop
          ["--c1"]: [c1, c2, c3, c4, c1],
          ["--c2"]: [c2, c3, c4, c1, c2],
          ["--c3"]: [c3, c4, c1, c2, c3],
          ["--c4"]: [c4, c1, c2, c3, c4],
          // also drift the position for extra motion
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration, ease, repeat: Infinity }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

/*
Quick presets:

<AnimatedGradientBg />
<AnimatedGradientBg duration={20} ease={[0.5, 0, 0.5, 1]} />
<AnimatedGradientBg mode="color" colors={["#00E5FF", "#29FF6A", "#FFD600", "#FF3D00"]} />
<AnimatedGradientBg className="h-80 w-full rounded-3xl overflow-hidden" blur={8} opacity={0.9} />
*/
