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

  // Arc landing positions for the boxes
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

    // auto-split plain text into characters
    const items = raw.flatMap((el, i) => {
      if (typeof el === "string") {
        return el.split("").map((ch, j) => (
          <span key={`${i}-${j}`} className="text-2xl font-bold text-purple-600">
            {ch}
          </span>
        ));
      }
      return el;
    });

    return (
      <>
        {items.map((el, j) => {
          const angle = (j / items.length) * Math.PI * 2;
          const radius = 70;
          const offsetX = Math.cos(angle) * radius;
          const offsetY = Math.sin(angle) * radius;

          return (
            <motion.div
              key={j}
              initial={{ x: 0, y: 0, scale: 0 , opacity: 0 }}
              animate={
                explode
                  ? {
                      // jump effect: center → up → final pos
                      x: [0, 0, offsetX],
                      y: [0, -40, offsetY],
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 1],
                    }
                  : {
                      // collapse back
                      x: [offsetX, 0],
                      y: [offsetY, 0],
                      scale: [1, 0],
                      opacity: [1, 0],
                    }
              }
              transition={{
                duration: explode ? 1.2 : 0.6,
                times: explode ? [0, 0.3, 1] : [0, 1],
                ease: "easeOut",
                delay: j * 0.15 + delayBase,
              }}
              className="absolute"
            >
              {el}
            </motion.div>
          );
        })}
      </>
    );
  }

  const childBlocks = Array.isArray(children) ? children : [children];

  return (
    <div className="relative  mx-auto w-80 h-80 flex items-center justify-center overflow-visible">

      {/* toggle button */}
      <button
        onClick={() => setExplode(!explode)}
        className="absolute top-2 right-2 z-40 w-10 h-10 bg-red-500 text-white rounded-full shadow-lg"
      >
        {explode ? "×" : "+"}
      </button>

      {childBlocks.map((block, i) => (
        <motion.div
        key={i}
        className="absolute top-[-65%] w-48 h-48 border-amber-500 border-1 z-25 flex items-center justify-center font-bold rounded-lg shadow-lg overflow-visible"
        style={{ top: i * 20, left: i * 20 }}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={explode ? arcs[i % arcs.length] : { x: 0, y: 0, rotate: 0 }}
          transition={{ delay: i * 0.3, duration: 1 }}
        >
          {!explode && block}

          {explode && (
            <ExplodeChildren delayBase={i * 0.4}>{block}</ExplodeChildren>
          )}
        </motion.div>
      ))}
    </div>
  );
}
