"use client";
import React from "react";
import { motion } from "framer-motion";

export const Skills = () => {
    const skills = [
        "Java", "C", "C++", "Python", "HTML", "CSS", "React", "Node.js", "MySQL", "DBMS", "Problem Solving"
    ];

    return (
        <section id="skills" className="py-20 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-200 mb-12">
                    Skills
                </h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-neutral-900 border border-neutral-800 px-6 py-3 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-primary transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-primary/20"
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
