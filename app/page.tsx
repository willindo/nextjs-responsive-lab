"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Badsha K N
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Full-Stack Web Developer & DevOps Engineer
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="mailto:badshanoordeen@gmail.com">
            <Mail className="w-6 h-6 hover:text-blue-500 transition" />
          </Link>
          <Link href="https://github.com/willindo" target="_blank">
            <Github className="w-6 h-6 hover:text-blue-500 transition" />
          </Link>
          <Link
            href="https://linkedin.com/in/badsha-noordeen-20b328305"
            target="_blank"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-500 transition" />
          </Link>
        </div>
        <Link
          href="#projects"
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View My Work
        </Link>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 leading-relaxed">
          DevOps Engineer with deep full-stack awareness, specializing in scalable
          infrastructure using Kubernetes, Docker, Helm, ArgoCD, GitHub Actions,
          and Terraform. Experienced in building backend systems (NestJS, Fastify)
          and responsive frontends (React, Next.js) with secure authentication
          flows. Also explore 3D integration with r3f and Three.js.
        </p>
      </section>

      {/* Skills */}
      <Skills />

      {/* Projects */}
      <Projects />

      {/* Experience */}
      <Experience />

      {/* Contact */}
      <section id="contact" className="px-6 py-20 text-center bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Get In Touch</h2>
        <p className="text-gray-600">
          Feel free to reach out for collaboration, freelance projects, or hiring
          discussions.
        </p>
        <Link
          href="mailto:badshanoordeen@gmail.com"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Contact Me
        </Link>
      </section>
    </main>
  );
}
