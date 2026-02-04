"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { User, Code, Briefcase, GraduationCap, Mail } from "lucide-react";

export const FloatingNav = ({
    className,
}: {
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    const scrolltoHash = function (element_id: string) {
        const element = document.getElementById(element_id)
        element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }

    const navItems = [
        { name: "About", link: "about", icon: <User className="h-4 w-4" /> },
        { name: "Skills", link: "skills", icon: <Code className="h-4 w-4" /> },
        { name: "Projects", link: "projects", icon: <Briefcase className="h-4 w-4" /> },
        { name: "Education", link: "education", icon: <GraduationCap className="h-4 w-4" /> },
        { name: "Contact", link: "contact", icon: <Mail className="h-4 w-4" /> },
    ];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-neutral-200 dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-8 py-4 items-center justify-center space-x-4",
                    className
                )}
            >
                {navItems.map((navItem, idx) => (
                    <button
                        key={`link=${idx}`}
                        onClick={() => scrolltoHash(navItem.link)}
                        className={cn(
                            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors"
                        )}
                    >
                        <span className="block sm:hidden">{navItem.icon}</span>
                        <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
                    </button>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
