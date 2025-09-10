"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = [
  "https://picsum.photos/200?random=1",
  "https://picsum.photos/200?random=2",
  "https://picsum.photos/200?random=3",
  "https://picsum.photos/200?random=4",
  "https://picsum.photos/200?random=5",
];

// sequential final sizes (first biggest, last smallest)
const FINAL_SIZES = [100, 80, 65, 55, 45];

export default function ScrollAvatarTrain() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="relative h-[200vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]),
            scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]),
            opacity: useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]),
          }}
          className="flex gap-6"
        >
          {IMAGES.map((src, i) => {
            const finalSize = FINAL_SIZES[i];
            const scale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
            const imgOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

            return (
              <motion.div
                key={i}
                style={{ scale }}
                className="relative rounded-full bg-neutral-700 ring-1 ring-white/10 overflow-hidden flex items-center justify-center"
              >
                <div
                  style={{ width: finalSize, height: finalSize }}
                  className="relative rounded-full"
                >
                  {/* placeholder avatar (empty state) */}
                  <motion.div
                    style={{ opacity: useTransform(imgOpacity, [0, 1], [1, 0]) }}
                    className="absolute inset-0 flex items-center justify-center text-neutral-400"
                  >
                    <svg
                      className="w-1/2 h-1/2"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="3.2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>

                  {/* real image fades in */}
                  <motion.div style={{ opacity: imgOpacity }} className="absolute inset-0">
                    <Image
                      src={src}
                      alt={`avatar-${i}`}
                      fill
                      sizes={`${finalSize}px`}
                      className="object-cover rounded-full"
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
