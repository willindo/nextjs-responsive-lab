"use client";
import { imageList } from "@/data/images";
import React from "react";
import { motion } from "framer-motion";

type Shape = "wave" | "circle" | "zigzag" | "blob";

export default function UniqueClipChoice({
  shape = "wave",
  animate = false,
  sequence, // 🔥 custom sequence of shapes
  speed = 12, // 🔥 speed in seconds per full cycle
  className = " ",
}: {
  topSrc?: string;
  bottomSrc?: string;
  shape?: Shape;
  animate?: boolean;
  sequence?: Shape[]; // if not provided → defaults to all shapes
  speed?: number;
  className?: string;
}) {
  const clipPaths: Record<Shape, string> = {
    wave: `
      M0,0 
      L1,0 
      L1,0.8 
      Q0.75,1 0.5,0.8 
      Q0.25,0.6 0,0.8 
      Z
    `,
    circle: `
      M0,0
      H1 V1 H0 Z
      M0.5,0.5
      m-0.4,0
      a0.4,0.4 0 1,0 0.8,0
      a0.4,0.4 0 1,0 -0.8,0
    `,
    zigzag: `
      M0,0 
      L1,0 
      L1,0.85 
      L0.75,0.75 
      L0.5,0.85 
      L0.25,0.75 
      L0,0.85 
      Z
    `,
    blob: `
      M0.5,0 
      C0.7,0.1 1,0.3 1,0.5 
      C1,0.7 0.7,1 0.5,1 
      C0.3,1 0,0.7 0,0.5 
      C0,0.3 0.3,0.1 0.5,0 
      Z
    `,
  };

  // Decide which shapes to cycle
  const sequencePaths =
    sequence && sequence.length > 0
      ? sequence.map((s) => clipPaths[s])
      : [clipPaths.wave, clipPaths.circle, clipPaths.zigzag, clipPaths.blob, clipPaths.wave];

  return (
    <div className={`relative aspect-[16/9] overflow-hidden ${className}`}>
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="dynamic-clip" clipPathUnits="objectBoundingBox">
            {animate ? (
              <motion.path
                d={clipPaths[shape]} // starting shape
                animate={{ d: sequencePaths }}
                transition={{
                  duration: speed,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              />
            ) : (
              <path d={clipPaths[shape]} />
            )}
          </clipPath>
        </defs>
      </svg>

      {/* Top Image with chosen shape */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${imageList[6]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "url(#dynamic-clip)",
        }}
      />

      {/* Bottom Image fills rest */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageList[7]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
