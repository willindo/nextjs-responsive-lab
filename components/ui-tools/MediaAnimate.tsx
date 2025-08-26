"use client";
import React from "react";
import { motion } from "framer-motion";

// hook for media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

const ResponsiveAnimation = ({ items }: { items: string[] }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative w-full h-[300px] flex justify-center items-center">
      {items.map((el, i) => {
        if (isMobile) {
          /* ------------------- mobile stacked fade/slide ------------------- */
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease: "easeOut" }}
              style={{ top: i * 40 }} // stack vertically
            >
              <div className="px-4 py-2 rounded-xl bg-blue-500 text-white shadow-md">
                {el}
              </div>
            </motion.div>
          );
        } else {
          /* ------------------- desktop circular sweep ------------------- */
          const angle = (i / items.length) * Math.PI * 2;
          const radius = 80; // larger radius
          const offsetX = Math.cos(angle) * radius;
          const offsetY = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: offsetX, y: offsetY }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <div className="px-4 py-2 rounded-xl bg-green-500 text-white shadow-md">
                {el}
              </div>
            </motion.div>
          );
        }
      })}
    </div>
  );
};

export default function MediaAnimate() {
  return <ResponsiveAnimation items={["One", "Two", "Three", "Four"]} />;
}
