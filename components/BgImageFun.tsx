"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type LayerConfig = {
  src: string;
  direction?: "horizontal" | "vertical" | "diagonal";
  speed?: number;
  reverse?: boolean;
  size?: string;
  attachment?: "scroll" | "fixed" | "local";
  repeatCount?: number | "infinite";
  opacity?: number; // layer blending
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // quadrant
};

type BgImageProps = {
  src?: string; // fallback single image
  children?: ReactNode;
  className?: string;
  animate?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal";
  attachment?: "scroll" | "fixed" | "local";
  speed?: number;
  reverse?: boolean;
  size?: string;
  repeatCount?: number | "infinite";
  layers?: LayerConfig[]; // multiple backgrounds
};

export default function BgImageFun({
  src,
  children,
  className = "",
  animate = true,
  direction = "diagonal",
  attachment = "local",
  speed = 20,
  reverse = false,
  size = "cover",
  repeatCount = "infinite",
  layers,
}: BgImageProps) {
  // Utility to compute animation
  const getAnimation = (
    dir: "horizontal" | "vertical" | "diagonal",
    rev: boolean
  ) => {
    return {
      horizontal: rev
        ? { backgroundPosition: ["100% 0%", "0% 0%"] }
        : { backgroundPosition: ["0% 0%", "100% 0%"] },

      vertical: rev
        ? { backgroundPosition: ["0% 100%", "0% 0%"] }
        : { backgroundPosition: ["0% 0%", "0% 100%"] },

      diagonal: rev
        ? { backgroundPosition: ["100% 100%", "0% 0%"] }
        : { backgroundPosition: ["0% 0%", "100% 100%"] },
    }[dir];
  };

  // Map quadrant to Tailwind positioning
  const quadrantStyles: Record<
    NonNullable<LayerConfig["position"]>,
    string
  > = {
    "top-left": "top-0 left-0 w-1/2 h-1/2",
    "top-right": "top-0 right-0 w-1/2 h-1/2",
    "bottom-left": "bottom-0 left-0 w-1/2 h-1/2",
    "bottom-right": "bottom-0 right-0 w-1/2 h-1/2",
  };

  // Build a single motion background layer
  const renderLayer = (cfg: LayerConfig, i: number) => (
    <motion.div
      key={i}
      className={`absolute ${quadrantStyles[cfg.position ?? "top-left"]}`}
      style={{
        backgroundImage: `url(${cfg.src})`,
        backgroundSize: cfg.size ?? "cover",
        backgroundPosition: "center",
        backgroundAttachment: cfg.attachment ?? "local",
        opacity: cfg.opacity ?? 1,
      }}
      animate={
        animate
          ? getAnimation(cfg.direction ?? "diagonal", cfg.reverse ?? false)
          : {}
      }
      transition={
        animate
          ? {
              duration: cfg.speed ?? 20,
              repeat:
                cfg.repeatCount === "infinite"
                  ? Infinity
                  : cfg.repeatCount ?? Infinity,
              ease: "linear",
            }
          : undefined
      }
    />
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {layers && layers.length > 0
        ? layers.map((layer, i) => renderLayer(layer, i))
        : renderLayer(
            {
              src: src ?? "",
              direction,
              speed, 
              reverse,
              size,
              attachment,
              repeatCount,
              position: "top-left",
            },
            0
          )}

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
