"use client";
import { motion } from "framer-motion";
import { Repeat } from "lucide-react";

const container = {
  animate: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  initial: { clipPath: "circle(0% at 50% 50%)" },
  animate: { clipPath: "circle(150% at 50% 50%)" },
  exit: { clipPath: "circle(0% at 50% 50%)" },
  transition: { duration: 5, ease: "easeInOut", repeat: Infinity },
};

export default function RoundFoldList() {
  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      className="flex gap-4"
    >
      {["One", "Two", "Three"].map((text) => (
        <motion.div
          key={text}
          variants={item}
          className="p-4 h-36 w-3xs bg-purple-500 text-white rounded-xl"
        >
          {text}
        </motion.div>
      ))}
    </motion.div>
  );
}
