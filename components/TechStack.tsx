"use client";

import { techStack } from "@/data/techStack";
import {motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
type Item = {
  name: string;
  src: string;
};

export default function TechStack({ items }: { items: Item[] }) {
  const controls = useAnimation();
  
    useEffect(() => {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 20, // smoother
        },
      });
    }, [controls]);
  
  return (
    <section id="tech" className=" pt-0 dark:g-gray-900">
      <div className="max-w-5xl mx-auto sm:px-0 px-6 text-center">
        {/* <h2 className=" font-bold mb-10 text-gray-900 dark:text-white">
          My Tech Stack
        </h2> */}
        <div className="overflow-hidden relative w-full pb-8 ">
             <motion.div
               animate={controls}
               className="flex gap-12 whitespace-nowrap"
               onMouseEnter={() => controls.stop()}
               onMouseLeave={() =>
                 controls.start({
                   x: ["0%", "-100%"],
                   transition: {
                     repeat: Infinity,
                     ease: "linear",
                     duration: 20,
                   },
                 })
               }
             > {[...items, ...items].map((icon, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.3,
              transition: { type: "spring", stiffness: 200 },
            }}
            className="w-auto h-16 gap-2 px-2 flex items-center justify-center cursor-pointer"
          >

              <Image
                src={icon.src}
                alt={""}
                width={30}
                height={30}
                // className="transition-transform duration-300 group-hover:scale-110"
                className="object-contain place-self-center"
              />
              <p className="mt-2  text-sm">{icon.name}</p>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
