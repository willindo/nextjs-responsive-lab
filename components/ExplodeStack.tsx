"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type ExplodeItem = ReactNode | ReactNode[];

export default function ExplodeStack({ children }: { children: ExplodeItem | ExplodeItem[] }) {
  const [explode, setExplode] = useState(false);

  // Arc landing positions for the boxes
  const arcs = [
    { x: 150, y: -80 },
    { x: -150, y: -60 },
    { x: 160, y: 120 },
    { x: -140, y: 100 },
  ];

  /** Scatters multiple children around */
  function ExplodeChildren({
    children,
    delayBase,
  }: {
    children: ReactNode | ReactNode[];
    delayBase: number;
  }) {
    const items = (Array.isArray(children) ? children : [children]).filter(
      (el): el is Exclude<typeof el, boolean | null | undefined> =>
        el !== null && el !== undefined && typeof el !== "boolean"
    );

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
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={explode ? { x: offsetX, y: offsetY, scale: 1 } : {}}
              transition={{
                delay: 1 + delayBase + j * 0.15,
                type: "spring",
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
    <div className="relative bg-amber-500 mx-auto w-72 h-72 flex items-center justify-center overflow-visible">
      {childBlocks.map((block, i) => (
        <motion.div
          key={i}
          className="absolute w-48 h-48 bg-blue-500 flex items-center justify-center font-bold rounded-lg shadow-lg cursor-pointer overflow-visible"
          style={{ top: i * 20, left: i * 20 }}
          initial={{ x: 0, y: 0, rotate: 0 }}
          animate={explode ? arcs[i % arcs.length] : {}}
          transition={{ delay: i * 0.3, duration: 1 }}
          onClick={() => setExplode(true)}
        >
          {!explode && block}

          {explode && (
            <ExplodeChildren delayBase={i * 0.4}>
              {block}
            </ExplodeChildren>
          )}
        </motion.div>
      ))}
    </div>
  );
}
