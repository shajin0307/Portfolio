"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { Download, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    const words = [
        {
            text: "I'm",
        },
        {
            text: "Shajin",
            className: "text-primary dark:text-primary",
        },
        {
            text: "S",
            className: "text-primary dark:text-primary",
        },
        {
            text: "P",
            className: "text-primary dark:text-primary",
        },
    ];

    const handleDownloadResume = () => {
        window.open("/resume.pdf", "_blank");
    };

    const handleConnect = () => {
        window.location.href = "mailto:shajinsree03@gmail.com";
    };

    return (
        <div className="min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <BackgroundBeams />

            <div className="max-w-7xl mx-auto p-4 relative z-10 w-full pt-20 md:pt-0">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h2 className="text-neutral-300 text-lg md:text-xl font-medium mb-4 tracking-wide uppercase">
                            Portfolio
                        </h2>

                        <div className="mb-6">
                            <TypewriterEffect words={words} className="text-4xl md:text-6xl lg:text-7xl" cursorClassName="bg-primary" />
                        </div>

                        <p className="text-neutral-400 max-w-lg mb-8 text-base md:text-lg leading-relaxed">
                            AI & ML Learner | Java Developer | Problem Solver.
                            <br />
                            Explaining complex systems with simple code. Passionate about cybersecurity and IoT innovations.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleDownloadResume}
                                size="lg"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all duration-300 hover:scale-105"
                            >
                                <Download className="mr-2 h-5 w-5" />
                                Resume
                            </Button>
                            <Button
                                onClick={handleConnect}
                                variant="outline"
                                size="lg"
                                className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 rounded-full text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                <Mail className="mr-2 h-5 w-5" />
                                Contact Me
                            </Button>
                        </div>
                    </div>

                    {/* Image/Visual */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full rounded-full overflow-hidden border-4 border-neutral-800 bg-neutral-900 shadow-2xl"
                            >
                                <img
                                    src="/profile.png"
                                    alt="Shajin S P"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
