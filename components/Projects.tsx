"use client";
import { useEffect, useState } from "react";
import Circle3D from "./Circle3d";
import { extraLinks } from "@/app/config/links";
import Link from "next/link";

export default function Projects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // Tailwind sm
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      name: "Reload-Ops",
      desc: "Fullstack app with authentication, CRUD, pagination, filtering. Deployed on Vercel.",
      tech: "Next.js, NestJS, PostgreSQL, Prisma, Docker",
      link: "https://reload-ops.vercel.app",
    },
    {
      name: "DevOps Miniapp",
      desc: "Implemented CI/CD pipelines with GitHub Actions, ArgoCD, and Kubernetes (Kind).",
      tech: "Kubernetes, Helm, Terraform, GitHub Actions",
      link: "https://github.com/willindo/devops-miniapp",
    },
    {
      name: "Playground",
      desc: "Responsive UI demos and 3D integration using React Three Fiber.",
      tech: "React, r3f, Three.js",
      link: "https://nextjs-responsive-lab.vercel.app/responsive-image1",
    },
    {
      name: " E-Commerce",
      desc: "on processing real world e-commerce project where multiple vendors can sell their products .",
      tech: "nextjs, nestjs, postgresql, prisma, zod, docker, tailwindcss ",
      link: "https://multy-commerce.vercel.app/",
    },
  ];

  return (
    <div id="projects" className="px-6 py-10">
      {isMobile ? (
        // ✅ Mobile view: stacked cards
        <div className="grid gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className="p-4 -[7rem] bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
              >
                VISIT
              </a>
              <h3 className="text-[#154114] font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.desc}</p>
              <p className="text-gray-500 mt-3 text-xs">{p.tech}</p>
            </div>
          ))}
        </div>
      ) : (
        // ✅ Desktop view: 3D circle
        <Circle3D
          className="h-[40vh] w-auto relative max-w-5xl mx-auto"
          radius={120}
          perspective={800}
          autoRotate={true}
          speed={0.2}
          real3D={false}
        >
          {projects.map((p) => (
            <div
              key={p.name}
              className="w-[30vw] max-w-[280px] grid justify-items-center backface-hidden bg-amber-100 rounded-xl p-3"
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-2 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105 text-center"
              >
                VISIT
              </a>
              <h3 className="text-[#154114] font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.desc}</p>
              <p className="text-gray-500 mt-4 text-xs">{p.tech}</p>
            </div>
          ))}
          <Link
            href={extraLinks[0].href}
            className="block p-3 rounded-lg border hover:bg-gray-50"
          >
            {extraLinks[0].label}
          </Link>
        </Circle3D>
      )}
    </div>
  );
}
