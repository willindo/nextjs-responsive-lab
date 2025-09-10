"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedElements() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return; // null check

    const elements = containerRef.current.querySelectorAll<HTMLDivElement>(".element");

    elements.forEach((el: HTMLDivElement, index: number) => {
      gsap.fromTo(
        el,
        { x: 0, y: 0, scale: 0.1 },
        {
          x: 200 + index * 50,
          y: 100 + Math.sin(index) * 50,
          scale: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            markers: true, 
          },
        }
      );
    });
  }, []);

  return (
    <>
      <div ref={containerRef} className="scroll-container">
        <div className="element" />
        <div className="element" />
        <div className="element" />
      </div>
      <style jsx>{`
        .scroll-container {
          position: relative;
          width: 100%;
          height: 300px;
          background: #f7f0f0;
          overflow: visible;
        }

        .element {
          width: 100px;
          height: 100px;
          background: crimson;
          border-radius: 10px;
          position: absolute;
          top: 50%;
          left: 0;
        }
      `}</style>
    </>
  );
}
