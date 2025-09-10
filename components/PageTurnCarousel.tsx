"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/*
PageTurnCarousel.tsx

Single-file React component (Tailwind-ready) that creates a "book page roll" edge animation
for divs/images. Drop into a Next.js or CRA project and use like:

<PageTurnCarousel
  images={["/img1.jpg", "/img2.jpg", "/img3.jpg"]}
  width={720}
  height={480}
/>

Notes:
- Uses CSS 3D transforms with perspective and dynamic transform-origin to simulate the page roll.
- Uses framer-motion for springy interactions (already available in the environment per canvas rules).
- Tailwind utility classes are used for quick layout — you can replace with regular CSS.
*/

type Props = {
  images: string[];
  width?: number; // px
  height?: number; // px
  showDots?: boolean;
};

export default function PageTurnCarousel({
  images,
  width = 720,
  height = 480,
  showDots = true,
}: Props) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-1, 1], [35, -35]);
  const shadow = useTransform(x, [-1, 1], [0.5, 0.1]);

  // helper to move to next/prev
  function go(delta: number) {
    setIndex((i) => Math.max(0, Math.min(images.length - 1, i + delta)));
  }

  function handlePointer(e: React.PointerEvent) {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1

    // map px to -1..1 with center 0
    const v = Math.max(-1, Math.min(1, (px - 0.5) * 2));
    x.set(v);
  }

  function handleLeave() {
    x.set(0);
  }

  const current = images[index];
  const next = images[index + 1];
  const prev = images[index - 1];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        onPointerMove={handlePointer}
        onPointerLeave={handleLeave}
        style={{ width, height }}
        className="relative rounded-2xl shadow-lg bg-gray-100/40 overflow-hidden"
      >
        {/* Background page (previous) */}
        {prev && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ transform: "translateZ(-1px) scale(0.99)", zIndex: 10 }}
            aria-hidden
          >
            <img
              src={prev}
              alt="previous"
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        )}

        {/* Next page (peeking behind) */}
        {next && (
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ zIndex: 5, transform: "translateX(6%) scale(0.98)" }}
            aria-hidden
          >
            <img
              src={next}
              alt="next"
              className="w-full h-full object-cover grayscale-[0.15]"
              draggable={false}
            />
            <div className="absolute inset-0 bg-white/60" />
          </div>
        )}

        {/* Current page with interactive 3D roll */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
          style={{
            zIndex: 20,
            // perspective gives that 'page in space' look
            perspective: 1200,
          }}
        >
          <motion.div
            // animate rotation and transform-origin based on pointer x
            style={{
              rotateY: rotateY,
              boxShadow: useTransform(shadow, (s) =>
  `rgba(2,6,23,${0.4 * s}) 0px 20px 40px, rgba(2,6,23,${0.12 * s}) 0px 2px 6px`
),
            }}
            className="w-full h-full origin-center will-change-transform transition-transform duration-150"
          >
            {/* To make the page flip from left or right depending on pointer side, adjust transformOrigin */}
            <motion.div
              className="w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                // dynamic transform origin — left when pointer is left, right when pointer is right
                transformOrigin: useTransform(x, (v) => (v < 0 ? "left center" : "right center")),
              }}
            >
              <img
                src={current}
                alt={`slide-${index}`}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />

              {/* soft edge gradient to simulate rolled paper */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(0,0,0,0.25), rgba(0,0,0,0))",
                  mixBlendMode: "multiply",
                }}
              />

              <div
                aria-hidden
                className="absolute inset-y-0 right-0 w-20 pointer-events-none"
                style={{
                  background: "linear-gradient(270deg, rgba(0,0,0,0.2), rgba(0,0,0,0))",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Controls */}
        <button
          onClick={() => go(-1)}
          aria-label="previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-md rounded-full p-2 shadow z-30"
          style={{ width: 40, height: 40 }}
        >
          ◀
        </button>
        <button
          onClick={() => go(1)}
          aria-label="next"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-md rounded-full p-2 shadow z-30"
          style={{ width: 40, height: 40 }}
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      {showDots && (
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`go-to-${i}`}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-slate-800" : "bg-slate-300"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
