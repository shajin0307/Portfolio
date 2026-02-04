"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
    x: number;
    y: number;
    radius: number;
    opacity: number;
}

export const MouseRipple = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripples = useRef<Ripple[]>([]);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            // Add new ripple
            ripples.current.push({
                x: e.clientX,
                y: e.clientY,
                radius: 0,
                opacity: 0.6, // Starting opacity
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Loop through ripples
            for (let i = 0; i < ripples.current.length; i++) {
                const ripple = ripples.current[i];

                // Update ripple
                ripple.radius += 2.5; // Expansion speed
                ripple.opacity -= 0.015; // Fade speed

                // Draw ripple
                if (ripple.opacity > 0) {
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    // Use a gold/primary color for the ripple
                    ctx.strokeStyle = `rgba(212, 175, 55, ${ripple.opacity})`; // RGB for #D4AF37 (Gold)
                    ctx.lineWidth = 2;
                    ctx.stroke();
                } else {
                    // Remove dead ripples
                    ripples.current.splice(i, 1);
                    i--;
                }
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
