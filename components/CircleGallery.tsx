"use client";
import React from "react";
import { useScrollGroup } from "../configs/useScrollGroup";
import { AnimatedScope } from "./AnimatedScope";

export default function CircleGallery() {
  useScrollGroup(".circle", {
    trigger: ".circle-gallery",
    start: "top 90%",
    end: "bottom top",
    scrub: true,
    scaleStep: 0.2,
    yStep: 40,
  });

  return (
    <div className="circle-gallery h-[200vh] flex flex-col items-center justify-center gap-8">
      {/* <AnimatedScope animation="slideRight" stagger={0.2} className="circle-gallery h-[200vh] flex flex-col gap-8  items-center justify-center"> */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
          key={i}
          className="circle w-20 h-20 rounded-full bg-blue-800 opacity-0"
          />
        ))}
         {/* </AnimatedScope> */}
     </div>
  );
}
