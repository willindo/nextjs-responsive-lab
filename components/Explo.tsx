// Explo.jsx (or Explo.tsx)
"use client";

import { motion, Variants, Transition } from "framer-motion";
// --- DATA DEFINITIONS (Simplified for example) ---
const secondaryElements = [
  { id: "B1", parent: "A", color: "bg-red-500" },
  { id: "B2", parent: "A", color: "bg-green-500" },
  { id: "B3", parent: "A", color: "bg-blue-500" },
  { id: "B4", parent: "A", color: "bg-yellow-500" },
];

const tertiaryElements = [
  { id: "C1", parent: "B1" },
  { id: "C2", parent: "B1" },
  { id: "C3", parent: "B2" },
  { id: "C4", parent: "B2" },
  { id: "C5", parent: "B3" },
  { id: "C6", parent: "B3" },
  { id: "C7", parent: "B4" },
  { id: "C8", parent: "B4" },
];

// --- VARIANT DEFINITIONS ---

// 1. Container: Orchestrates the stagger for its children (Secondary Elements)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // INCREASED STAGGER to 0.2s - adds more time between B1, B2, B3, B4 starting
      staggerChildren: 0.2,
    },
  },
};

// 2. Secondary Elements: The Exploding Particles
const secondaryVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 0, scale: 1 },
  visible: (index: number) => {
    // Calculate a position on a circle for a perfect radial "explosion"
    const secondaryElements = [
      /* ... define or import this array here */
    ];
    const customEase: [number, number, number, number] = [0.1, 0.8, 0.9, 1];
    const totalItems = secondaryElements.length;
    const angle = (index / totalItems) * 2 * Math.PI;
    const distance = 150;
    const transition: Transition = {
      // 1. INCREASED DURATION to make the outward movement feel bigger
      duration: 1.0,
      ease: customEase,

      // 2. INCREASED DELAYS for dramatic cascading
      staggerChildren: 0.1, // Delay between C1/C2 popping out
      delayChildren: 0.5, // Wait 0.5s *after B1 starts moving* before C1/C2 start
    };
    return {
      opacity: 1,
      scale: 1,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      transition: transition,
    };
  },
  // Add an exit state for cleanup (optional, requires AnimatePresence)
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

// 3. Tertiary Elements: The Final Branches
const tertiaryVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2, // Keep the final pop fast and snappy
      type: "spring",
      stiffness: 400, // Increased stiffness for a quicker 'hit'
      damping: 15, // Slightly increased damping to control overshoot
    },
  },
};

export default function Explo() {
  return (
    // Center the entire animation area
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-40 h-40 flex justify-center items-center"
      >
        {/* 1. The Main Element (A) - Remains a focal point, maybe it fades out or shrinks */}
        <motion.div
          className="w-12 h-12 rounded-full bg-indigo-600 shadow-xl flex justify-center items-center absolute"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <span className="text-white font-bold text-xl">A</span>
        </motion.div>

        {/* 2. Secondary Elements (B1, B2, B3, B4) - The Radial Explosion */}
        {secondaryElements.map((secondary, index) => (
          <motion.div
            key={secondary.id}
            custom={index}
            variants={secondaryVariants}
            className="absolute w-10 h-10 rounded-lg flex flex-col items-center justify-start text-xs font-medium"
            style={{
              // Start all secondary elements in the exact center of the container
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <div
              className={`w-full h-full rounded-lg ${secondary.color} shadow-lg flex items-center justify-center`}
            >
              {secondary.id}
            </div>

            {/* 3. Tertiary Elements (C1, C2, C3, etc.) - The Branching Pop-Out */}
            <motion.div
              // This is the container for the final elements, making them relative to the secondary element
              className="absolute top-10 flex space-x-2 mt-2"
            >
              {tertiaryElements
                .filter((t) => t.parent === secondary.id)
                .map((tertiary) => (
                  <motion.div
                    key={tertiary.id}
                    variants={tertiaryVariants}
                    className="w-5 h-5 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center"
                  >
                    {tertiary.id.slice(1)} {/* Just show the number */}
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
