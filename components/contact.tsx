"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:shajinsree03@gmail.com?subject=${subject}&body=${body}`;
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section id="contact" className="py-20 w-full relative">
            <div className="max-w-4xl mx-auto px-4 z-10 relative">
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-200 text-center mb-12">
                    Get in Touch
                </h2>

                <div className="grid md:grid-cols-2 gap-12 bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-neutral-800">
                    <div>
                        <h3 className="text-2xl font-semibold text-white mb-6">Let's Talk</h3>
                        <p className="text-neutral-400 mb-8">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:shajinsree03@gmail.com" className="flex items-center text-neutral-300 hover:text-yellow-400 transition-colors">
                                <Mail className="mr-3 h-5 w-5" /> shajinsree03@gmail.com
                            </a>
                            <a href="https://linkedin.com/in/shajinaiml" target="_blank" className="flex items-center text-neutral-300 hover:text-yellow-400 transition-colors">
                                <Linkedin className="mr-3 h-5 w-5" /> LinkedIn
                            </a>
                            <a href="https://github.com/shajin-s-p" target="_blank" className="flex items-center text-neutral-300 hover:text-yellow-400 transition-colors">
                                <Github className="mr-3 h-5 w-5" /> Github
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            required
                        />
                        <Textarea
                            placeholder="Your Message"
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>

            <footer className="w-full text-center py-8 mt-20 border-t border-neutral-900 text-neutral-500 text-sm">
                <p>© {new Date().getFullYear()} Shajin S P. All rights reserved.</p>
            </footer>
        </section>
    );
};
