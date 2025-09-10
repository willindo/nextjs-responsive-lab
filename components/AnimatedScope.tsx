// AnimatedScope.tsx
"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef, ReactNode } from "react";
import { animations, AnimationKey } from "./animations";

type AnimatedScopeProps = {
  children: ReactNode;
  animation?: AnimationKey; // parent default
  delay?: number; // base delay in seconds
  stagger?: number; // stagger between children
  once?: boolean; // animate only once
  className?: string;
};

export function AnimatedScope({
  children,
  animation = "fadeUp",
  delay = 0,
  stagger = 0.15,
  once = true,
  className,
}: AnimatedScopeProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`fle flex-wra gap- ${className ?? ""}`}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // narrow props to include possible overrides
        const props = child.props as {
          ["data-animation"]?: AnimationKey;
          ["data-delay"]?: string | number;
        };

        const customAnimation = props["data-animation"] || animation;
        const customDelay =
          props["data-delay"] !== undefined
            ? parseFloat(props["data-delay"].toString())
            : delay + index * stagger;

        return (
          <motion.div
            key={index}
            variants={animations[customAnimation]}
            transition={{ duration: 0.6, delay: customDelay }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
