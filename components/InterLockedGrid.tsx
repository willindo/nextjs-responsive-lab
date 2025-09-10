"use client"
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * InterlockedGrid
 * - Single-file React component (Tailwind-ready) to render an irregular, interlocked grid
 * - Items: { id, size: [cols, rows], category, hidden, noswap, overlap }
 * - Responsive: grid auto-adjusts columns based on container width
 * - Features: hiding, "noswap" lock, category overlap, staged animations
 *
 * Usage:
 * <InterlockedGrid items={items} columns={[2,3,5]} gap={8} stagger={0.08} />
 */

type Item = {
  id: string;
  content?: React.ReactNode;
  size?: [number, number]; // [colSpan, rowSpan]
  category?: string;
  hidden?: boolean;
  noswap?: boolean;
  overlap?: boolean; // visually overlap with neighbors
};

type Props = {
  items: Item[];
  // columns responsive: [sm, md, lg]
  columns?: [number, number, number];
  gap?: number; // Tailwind spacing unit (eg 4 -> 1rem)
  stagger?: number; // animation stagger
  className?: string;
};

export default function InterlockedGrid({
  items: initItems,
  columns = [2, 3, 5],
  gap = 4,
  stagger = 0.06,
  className = "",
}: Props) {
  const [items, setItems] = useState<Item[]>(initItems);

  // helper to compute CSS grid-template-columns responsively using Tailwind breakpoints
  // we'll apply inline style for the dynamic column counts
  const colCounts = columns;

  const visibleItems = useMemo(() => items.filter((i) => !i.hidden), [items]);

  // swap two items by index, unless either is noswap
  function swapIndexes(aIdx: number, bIdx: number) {
    const a = items[aIdx];
    const b = items[bIdx];
    if (!a || !b) return;
    if (a.noswap || b.noswap) return;
    const copy = [...items];
    copy[aIdx] = b;
    copy[bIdx] = a;
    setItems(copy);
  }

  // simple auto-swap across a cross pattern: for demo, swap every odd index with next
  function attemptCrossSwap() {
    const copy = [...items];
    for (let i = 0; i < copy.length - 1; i += 2) {
      if (copy[i].noswap || copy[i + 1].noswap) continue;
      const t = copy[i];
      copy[i] = copy[i + 1];
      copy[i + 1] = t;
    }
    setItems(copy);
  }

  // animation variants
  const container = {
    visible: { transition: { staggerChildren: stagger } },
    hidden: {},
  };
  const tile = {
    hidden: { opacity: 0, scale: 0.9, y: 6 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -6 },
  };

  // grid style: base columns at small, change via media queries in Tailwind would be preferred.
  // Here we use CSS variables for column count and Tailwind for padding/gap.

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => attemptCrossSwap()}
          className="px-3 py-1 rounded bg-slate-700 text-white text-sm"
        >
          Cross-Swap (demo)
        </button>
        <button
          onClick={() => setItems(initItems)}
          className="px-3 py-1 rounded border text-sm"
        >
          Reset
        </button>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative"
        style={{
          // CSS grid fallback layout for larger screens; responsive handled via Tailwind below
        }}
      >
        {/* Responsive masonry-like grid using CSS grid. We use a wrapping approach: each tile
            is placed inline and we use grid-auto-flow: dense to let it pack irregular shapes. */}
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: `repeat(${colCounts[2]}, minmax(0, 1fr))`,
            gap: `${gap / 4}rem`,
          }}
        >
          <AnimatePresence>
            {items.map((it, idx) => {
              if (it.hidden) return null;
              const [cspan = 1, rspan = 1] = it.size ?? [1, 1];

              // inline style for grid span
              const gridStyle: React.CSSProperties = {
                gridColumn: `span ${cspan}`,
                gridRow: `span ${rspan}`,
                // optional overlap: negative margin and higher z
                marginTop: it.overlap ? `-${Math.min(8, rspan) / 4}rem` : undefined,
                zIndex: it.overlap ? 20 : undefined,
                position: it.overlap ? "relative" : undefined,
              };

              return (
                <motion.div
                  layout
                  key={it.id}
                  variants={tile}
                  exit="exit"
                  className={`rounded-lg p-3 shadow-md cursor-pointer overflow-hidden border border-slate-200 bg-white`}
                  style={gridStyle}
                  onClick={() => {
                    // click behavior: toggle hidden flag for demo if noswap is false
                    if (!it.noswap) {
                      const copy = [...items];
                      copy[idx] = { ...copy[idx], hidden: !copy[idx].hidden };
                      setItems(copy);
                    }
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs opacity-60">#{it.id}</div>
                    <div className="text-xs italic opacity-60">{it.category}</div>
                  </div>

                  <div className="mt-2 text-sm">{it.content ?? <DefaultTile id={it.id} />}</div>

                  {/* small controls */}
                  <div className="mt-3 flex gap-2 text-xs opacity-70">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // toggle noswap
                        const copy = [...items];
                        copy[idx] = { ...copy[idx], noswap: !copy[idx].noswap };
                        setItems(copy);
                      }}
                    >
                      {it.noswap ? "Locked" : "Unlock"}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // bring to front (z-index)
                        const copy = [...items];
                        copy.splice(idx, 1);
                        copy.push(items[idx]);
                        setItems(copy);
                      }}
                    >
                      Bring front
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // small local swap with next if allowed
                        swapIndexes(idx, Math.min(items.length - 1, idx + 1));
                      }}
                    >
                      Swap →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="mt-4 text-xs opacity-60">
        Tip: this component demonstrates irregular sizing via CSS grid spans, simple overlap
        using negative margins, and swap controls. Hook it to your responsive breakpoints and
        replace demo buttons with real triggers as needed.
      </div>
    </div>
  );
}

function DefaultTile({ id }: { id?: string }) {
  return (
    <div className="w-full h-20 flex items-center justify-center bg-slate-50 rounded">Tile {id}</div>
  );
}

/*
Example items array to pass in:
const items = [
  { id: 'a', size: [2,1], category: 'hero', overlap: true },
  { id: 'b', size: [1,2], category: 'card' },
  { id: 'c', size: [1,1], category: 'card', noswap: true },
  { id: 'd', size: [2,2], category: 'media' },
  { id: 'e', size: [1,1], category: 'card' },
];

Notes:
- This file expects Tailwind for basic utility classes and framer-motion installed.
- For full responsiveness, you can dynamically change the `gridTemplateColumns` on
  window resize or use CSS media queries / container queries to set columns per breakpoint.
- "noswap" prevents swapping; "hidden" will remove a tile; "overlap" applies negative
  top margin so tiles visually overlap and animate one-by-one via stagger.
*/
