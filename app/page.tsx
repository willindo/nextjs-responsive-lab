"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Contact, Github, Linkedin, Mail } from "lucide-react";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import ExplodeSequence from "@/components/ExplodeSequence";
import ExplodeStack from "@/components/ExplodeStack";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import ContactSection from "@/components/Contact";
import TechStack from "@/components/TechStack";
import { techStack } from "@/data/techStack";
export default function Home() {
  return (
    <AnimatedGradientBg>
    <main className="min-h-screen pt-0 sm:px-0 ">
      {/* Hero Section */}
      <section className=" h-[75vh] flex flex-col items-center justify-center  text-center px-6 sm:px-0">
          {/* <ExplodeStack> */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl text-[#10611f] font-bold"
          >
          Badsha K N
        </motion.h1>
        <h1 className="mt-4 text-[#4f2113]  ">
          Full-Stack Web Developer & DevOps Engineer
        </h1>
        <div className="flex gap-4 mt-6">
          <Link href="mailto:badshanoordeen@gmail.com">
            <Mail className="w-6 h-6 text-[#811770] hover:text-blue-500 transition" />
          </Link>
          <Link href="https://github.com/willindo" target="_blank">
            <Github className="w-6 h-6 text-[#83410b] hover:text-blue-500 transition" />
          </Link>
          <Link
            href="https://linkedin.com/in/badsha-noordeen-20b328305"
            target="_blank" className="text-[#0e009f] hover:text-blue-500 transition"
            >
            <Linkedin className="w-6 h-6 hover:text-blue-500 transition" />
          </Link>
        </div>
        <Link
          href="#projects"
          className="mt-8 px-6  py-3 bg-[#4f1113] text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
          View My Work
        </Link>
        {/* </ExplodeStack> */}
      </section>
          <TechStack items={techStack} />

      {/* About */}
      <section className="max-w-3xl mx-auto px-6 sm:px-0 py-12">
      <h2 className=" text-[#154114] font-bold mb-6">About Me</h2>

      <p className="text-lg leading-relaxed mb-4 select-text">
        Hi, I’m <span className="font-semibold text-[#4f0404]">Badsha K N</span>, a{" "}
        <span className="text-[#412214] font-medium">
          Full-Stack & DevOps Engineer
        </span>{" "}
        passionate about building modern applications that are scalable,
        reliable, and user-friendly.
      </p>

      <p className="text-lg leading-relaxed mb-4 select-text">
        My stack includes{" "}
        <span className="font-medium">
          React, Next.js, NestJS, Docker, Kubernetes, ArgoCD
        </span>{" "}
        along with strong experience in{" "}
        <span className="font-medium">3D Web (Three.js, React Three Fiber, Babylon.js)</span>.
      </p>

      <p className="text-lg leading-relaxed select-text">
        Outside of coding, I enjoy exploring new tech, contributing to open
        source, and creating data-driven UI experiments. 
      </p>
    </section>

      {/* Skills */}
      <Skills />
      {/* Projects */}
      <Projects />

      {/* Experience */}
      <Experience />

      {/* Contact */}
      <section id="contact" className="px-6 sm:px-0 py-20 text-center bg-gray-100">
        <h2 className=" text-[#154114] font-semibold mb-4">Get In Touch</h2>
        <p className="text-gray-600 mb-5">
          Feel free to reach out for collaboration, freelance projects, or hiring
          discussions.
        </p>
        <ContactSection />
      </section>
    </main>
    </AnimatedGradientBg>
  );
}
