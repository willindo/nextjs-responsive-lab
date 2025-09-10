"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Variants library (you can add more presets here)
const variantsMap: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  },
};

interface AnimatedIntroProps {
  children: ReactNode;
  type?: keyof typeof variantsMap;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedIntro({
  children,
  type = "fadeUp",
  className,
  delay = 0,
  once = true,
}: AnimatedIntroProps) {
  return (
    <motion.div
      className={`animated-intro ${className || ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -100px 0px" }}
      variants={variantsMap[type]}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
