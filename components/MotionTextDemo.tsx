"use client";

import { motion } from "framer-motion";

export default function MotionTextDemo() {
  return (
    <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden flex items-center justify-center">
      {/* Circular Path */}
      <motion.h2
        className="absolute text-2xl font-bold text-blue-600"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{
          offsetPath: "path('M200,200 m-100,0 a100,100 0 1,1 200,0 a100,100 0 1,1 -200,0')",
          offsetRotate: "0deg",
        }}
      >
        Circle Path
      </motion.h2>

      {/* Wave Path */}
      <motion.h2
        className="absolute text-2xl font-bold text-green-600"
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{
          offsetPath: "path('M0,200 Q150,100 300,200 T600,200')",
          offsetRotate: "0deg",
          offsetDistance: "0%",
        }}
      >
        Wave Path
      </motion.h2>

      {/* Diagonal Path */}
      <motion.h2
        className="absolute text-2xl font-bold text-red-600"
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        style={{
          offsetPath: "path('M0,0 L400,400')",
          offsetRotate: "auto",
          offsetDistance: "0%",
        }}
      >
        Diagonal Path
      </motion.h2>
    </div>
  );
}
