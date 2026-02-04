"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 overflow-hidden bg-background",
                className
            )}
        >
            <div className="absolute h-full w-full bg-neutral-950/20 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* Moving Gradients */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full opacity-50"
            />
            <motion.div
                animate={{
                    rotate: [0, -360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[120px] rounded-full opacity-50"
            />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
    );
};
