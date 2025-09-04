"use client";

import React from "react";
import Image from "next/image";

type Shape = "circle" | "hexagon" | "wave" | "diagonal";

interface ClipImageProps {
  src: string;
  alt?: string;
  shape?: Shape;
  width?: number;
  height?: number;
  aboveFold?: boolean;   // 👈 new
  className?: string;
}

const shapeStyles: Record<Shape, string> = {
  circle: "[clip-path:circle(50%_at_50%_50%)]",
  hexagon:
    "[clip-path:polygon(25%_0,75%_0,100%_50%,75%_100%,25%_100%,0_50%)]",
  diagonal: "[clip-path:polygon(0_0,100%_0,100%_80%,0_100%)]",
  wave: "[clip-path:polygon(0%_85%,10%_90%,25%_80%,40%_95%,60%_80%,75%_90%,90%_85%,100%_90%,100%_100%,0%_100%)]",
};

export default function ClipImage({
  src,
  alt = "image",
  shape = "circle",
  width,
  height,
  aboveFold = false,
  className = "",
}: ClipImageProps) {
  const isFill = !width || !height; // 👈 if width/height not provided → use fill mode

  return (
    <div
      className={`relative overflow-hidden ${shapeStyles[shape]} ${className}`}
      style={isFill ? { aspectRatio: "16/9" } : { width, height }} // keep aspect ratio if fill
    >
      {isFill ? (
        <div>
          <h4 className="">text item</h4>
          <Image
            src={src}
            alt={alt}
            fill
            priority={aboveFold}
            className="object-cover"
          />
        </div>
      ) : (
        <div>
          <h4>text item</h4>
          <h3>text item</h3>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={aboveFold}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
