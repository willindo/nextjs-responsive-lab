"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type ExplodeItem = ReactNode | ReactNode[];

export default function ExplodeStack({
  children,
}: {
  children: ExplodeItem | ExplodeItem[];
}) {
  const [explode, setExplode] = useState(false);

  // arc destinations for each block
  const arcs = [
    { x: 250, y: -80 },
    { x: -250, y: -60 },
    { x: 150, y: 100 },
    { x: -100, y: 150 },
  ];

  /** Scatters multiple children around */
  function ExplodeChildren({
  children,
  delayBase,
}: {
  children: ReactNode | ReactNode[];
  delayBase: number;
}) {
  const raw = Array.isArray(children) ? children : [children];

  return (
    <>
      {raw.map((el, j) => {
        // If string → split into chars
        if (typeof el === "string") {
          return el.split("").map((ch, k) => (
            <motion.span
              key={`${j}-${k}`}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={
                explode
                  ? { x: Math.cos(k) * 50, y: Math.sin(k) * 50, scale: 1, opacity: 1 }
                  : { x: 0, y: 0, scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.6,
                delay: delayBase + k * 0.1,
              }}
              className="inline-block text-xl font-bold text-purple-600"
            >
              {ch}
            </motion.span>
          ));
        }

        // If React element with its own children → recurse
        if (
          typeof el === "object" &&
          "props" in (el as any) &&
          (el as any).props?.children
        ) {
          return (
            <motion.div
              key={j}
              className="relative"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                explode
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{ delay: delayBase + j * 0.3, duration: 0.6 }}
            >
              {/* recurse into its children */}
              <ExplodeChildren
                delayBase={delayBase + (j + 1) * 0.5}
              >
                {(el as any).props.children}
              </ExplodeChildren>
            </motion.div>
          );
        }

        // Otherwise → just render it
        return <div key={j}>{el}</div>;
      })}
    </>
  );
}

  const childBlocks = Array.isArray(children) ? children : [children];

  // timings
  const blockDuration = 1; // how long block itself animates
  const childrenDuration = 1.2; // how long children scatter
  const totalPerBlock = blockDuration + childrenDuration;

  return (
    <div className="relative z-20 mx-auto w-80 h-80 flex items-center justify-center overflow-visible">
      {/* toggle button */}
      <button
        onClick={() => setExplode(!explode)}
        className="absolute top-2 right-[-5] z-25 w-10 h-10 bg-red-500 text-white rounded-full shadow-lg"
      >
        {explode ? "×" : "+"}
      </button>

      {childBlocks.map((block, i) => {
        const baseDelay = i * totalPerBlock; // sequential timing

        return (
          <motion.div
            key={i}
            className="absolute z-0 w-48 h-48 border-amber-500 border flex items-center justify-center font-bold rounded-lg shadow-lg overflow-visible"
            style={{ top: i * 20, left: i * 20 }}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
            animate={
              explode
                ? { ...arcs[i % arcs.length], opacity: 1 }
                : { x: 0, y: 0, rotate: 0, opacity: 0 }
            }
            transition={{
              delay: baseDelay,
              duration: blockDuration,
              ease: "easeOut",
            }}
          >
            {/* scatter block’s own children after block finishes */}
            {explode && (
              <ExplodeChildren delayBase={baseDelay + blockDuration}>
                {block}
              </ExplodeChildren>
            )}

            {/* show block normally before explosion */}
            {!explode && block}
          </motion.div>
        );
      })}
    </div>
  );
}
