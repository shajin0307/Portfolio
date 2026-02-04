"use client";

import React from "react";
import { Hero } from "@/components/hero";
import { FloatingNav } from "@/components/navbar";
import { Skills } from "@/components/skills";
import { ProjectsSection } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { Contact } from "@/components/contact";
import { motion } from "framer-motion";

import { MouseRipple } from "@/components/ui/mouse-ripple";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 antialiased selection:bg-primary selection:text-black">
      <MouseRipple />
      <FloatingNav />

      <Hero />

      {/* About Section Text - Kept simple between Hero and Skills */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-400 leading-relaxed"
          >
            I'm <span className="text-yellow-400 font-semibold">Shajin S P</span>, a 3rd-year B.Tech AI & ML undergraduate (CGPA: 7.89) with a strong foundation in programming and problem-solving, passionate about building intelligent, real-world software solutions through hands-on development and hackathons.
          </motion.p>
        </div>
      </section>

      <Skills />

      <ProjectsSection />

      <Timeline />

      <Contact />

    </main>
  );
}
