"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Timeline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const [selectedCert, setSelectedCert] = React.useState<string | null>(null);

    const height = useTransform(scrollYProgress, [0, 1], [0, 1000]);

    const education = [
        {
            title: "B.Tech, Artificial Intelligence and Machine Learning",
            place: "R.M.D. Engineering College",
            year: "2023 - 2027",
            description: "CGPA: 7.89 (till 5th Semester). Active problem solver and hackathon participant.",
        },
        {
            title: "Higher Secondary Education",
            place: "VIVEKAM MATRIC HR.SEC SCHOOL",
            year: "Completed 2023",
            description: "Secured 83.6% in 12th Grade.",
        },
    ];

    const certifications = [
        {
            title: "Web Development Internship",
            provider: "Inspire Softech",
            image: "/inspire-certificate.png",
        },
        {
            title: "Database Management System",
            provider: "Infosys Springboard",
            image: "/dbms-cert.png",
        },
        {
            title: "Programming in C++",
            provider: "Infosys Springboard",
            image: "/cpp-cert.png",
        },
        {
            title: "Cybersecurity Job Simulation",
            provider: "Forage - Tata",
            image: "/cybersecurity-cert.png",
        },
        {
            title: "Poster Presentation (AIRSS-2024)",
            provider: "IIT Madras",
            image: "/iitm-cert.png",
        },
        {
            title: "Java Programming Fundamentals",
            provider: "Infosys Springboard",
            image: "/java-cert.png",
        },
        {
            title: "Enhancing Soft Skills and Personality",
            provider: "NPTEL",
            image: "/soft-skills-cert.png",
        },
    ];

    return (
        <section id="education" className="py-20 w-full bg-neutral-950" ref={ref}>
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
                Education & Certifications
            </h2>

            <div className="max-w-4xl mx-auto px-4 relative">

                {/* Education Section with Timeline Line */}
                <div className="relative pb-20">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-800 md:-translate-x-1/2">
                        <motion.div
                            style={{ height, maxHeight: "100%" }}
                            className="w-full bg-gradient-to-b from-primary via-secondary to-transparent"
                        ></motion.div>
                    </div>

                    {/* Education Items */}
                    {education.map((item, idx) => (
                        <div key={idx} className={`relative flex flex-col md:flex-row items-center justify-between mb-16 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                            {/* Timeline Dot */}
                            <div className="absolute left-[11px] md:left-1/2 top-0 w-5 h-5 rounded-full bg-neutral-950 border-4 border-primary z-20 md:-translate-x-1/2"></div>

                            <div className="w-full md:w-[45%] pl-12 md:pl-0">
                                <motion.div
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl hover:border-primary/30 transition-colors"
                                >
                                    <h3 className="text-xl font-bold text-primary mb-1">{item.title}</h3>
                                    <h4 className="text-neutral-300 font-medium mb-2">{item.place} | {item.year}</h4>
                                    <p className="text-neutral-400 text-sm">{item.description}</p>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications (Visualized as a list at the bottom or continuation) */}
                <div className="relative z-10 mt-10">
                    <div className="flex justify-center mb-8">
                        <h3 className="text-2xl font-bold text-neutral-200 border-b-2 border-primary pb-2 inline-block">Certifications</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {certifications.map((cert, idx) => (
                            <motion.div
                                key={`cert-${idx}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => cert.image && setSelectedCert(cert.image)}
                                className={`bg-neutral-900 border border-neutral-800 p-6 rounded-xl transition-all duration-300 text-center flex flex-col justify-center items-center min-h-[140px] relative overflow-hidden group ${cert.image ? 'cursor-pointer hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.15)] hover:-translate-y-1' : ''}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 ${cert.image ? 'group-hover:opacity-100' : ''}`} />
                                <h4 className="text-neutral-100 font-semibold text-lg relative z-10 group-hover:text-white transition-colors">{cert.title}</h4>
                                <p className="text-neutral-400 text-sm font-medium mt-2 relative z-10 group-hover:text-neutral-300 transition-colors">{cert.provider}</p>
                                {cert.image && (
                                    <p className="text-xs text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider font-bold relative z-10">View Certificate</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {selectedCert && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setSelectedCert(null)}
                    >
                        <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                            <button
                                onClick={() => setSelectedCert(null)}
                                className="absolute -top-12 right-0 text-neutral-400 hover:text-white transition-colors"
                            >
                                <div className="bg-neutral-800 rounded-full p-2">
                                    <span className="sr-only">Close</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </div>
                            </button>
                            <img
                                src={selectedCert}
                                alt="Certificate"
                                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                            />
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};
