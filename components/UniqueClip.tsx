"use client";
import React from "react";

export default function UniqueClip() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Wavy clip path */}
          <clipPath id="wave-clip" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0,0 
                L1,0 
                L1,0.8 
                Q0.75,1 0.5,0.8 
                Q0.25,0.6 0,0.8 
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Top Image with wavy bottom */}
      <div
        className="absolute inset-0 z-1"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "url(#wave-clip)",
        }}
      />

      {/* Bottom Image fills rest */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
