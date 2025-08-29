"use client";

import {motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

 export const techStack = [
  // Frontend
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "TailwindCSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },

  // Backend
  { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "NestJS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
  { name: "GraphQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },

  // Database
  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Prisma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },

  // DevOps
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Kubernetes", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "Terraform", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "GitHub Actions", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

export default function TechStack() {
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
        <div className="overflow-hidden relative w-full py-8 ">
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
             > {[...techStack, ...techStack].map((icon, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.3,
              transition: { type: "spring", stiffness: 200 },
            }}
            className="w-16 h-16 flex items-center justify-center cursor-pointer"
          >

              <Image
                src={icon.src}
                alt={""}
                width={30}
                height={30}
                // className="transition-transform duration-300 group-hover:scale-110"
                className="object-contain"
              />
              <p className="mt-2 text-sm">{icon.name}</p>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
