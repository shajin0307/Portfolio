"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  Code,
  GraduationCap,
  Award,
  User,
  Briefcase,
  Instagram,
  X,
} from "lucide-react"

const AnimatedText = () => {
  const words = ["AI & ML Learner", "Java Developer", "Cybersecurity Intern", "Hackathon Enthusiast", "Problem Solver"]

  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      key={currentWord}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-amber-500 font-semibold"
    >
      {words[currentWord]}
    </motion.span>
  )
}

const SkillBadge = ({ skill, delay }: { skill: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
    viewport={{ once: true }}
  >
    <Badge
      variant="secondary"
      className="px-4 py-2 text-sm bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 cursor-default"
    >
      {skill}
    </Badge>
  </motion.div>
)

const ProjectImageModal = ({
  src,
  alt,
  isOpen,
  onClose,
}: { src: string; alt: string; isOpen: boolean; onClose: () => void }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 50 }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="relative max-w-5xl max-h-[90vh] w-full mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-20 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>

          {/* Image container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <motion.img
              src={src || "/placeholder.svg"}
              alt={alt}
              className="w-full h-full object-contain max-h-[85vh] rounded-2xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              loading="lazy"
              onError={(e) => {
                console.log("Image failed to load:", src)
                e.currentTarget.src = "/placeholder.svg?height=800&width=1200&text=Image+Not+Found"
              }}
            />
          </div>

          {/* Image title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-b-2xl"
          >
            <h3 id="modal-title" className="text-white text-xl font-semibold text-center">
              {alt}
            </h3>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCardClick = () => {
    console.log("Project card clicked:", project.title)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    console.log("Modal closed for:", project.title)
    setShowModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="h-full cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleCardClick()
          }
        }}
        aria-label={`View ${project.title} project details`}
      >
        <Card className="h-full bg-white border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-gray-900 group-hover:text-amber-600 transition-colors duration-300 flex items-center gap-2">
              <Code className="w-5 h-5" />
              {project.title}
            </CardTitle>
            <CardDescription className="text-gray-600">{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech: string, i: number) => (
                <Badge key={i} variant="outline" className="text-xs border-purple-300 text-purple-700">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-amber-600 font-medium group-hover:text-amber-700 transition-colors duration-300">
              Click to view project image →
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProjectImageModal
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  )
}

const CertificationCard = ({ cert, index }: { cert: any; index: number }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCardClick = () => {
    console.log("Certificate card clicked:", cert.title)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    console.log("Certificate modal closed for:", cert.title)
    setShowModal(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        className="cursor-pointer"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleCardClick()
          }
        }}
        aria-label={`View ${cert.title} certificate`}
      >
        <Card className="bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-500" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600">{cert.provider}</p>
              </div>
            </div>
            <div className="text-xs text-purple-600 font-medium mt-2 group-hover:text-purple-700 transition-colors duration-300">
              Click to view certificate →
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ProjectImageModal
        src={cert.image || "/placeholder.svg"}
        alt={`${cert.title} Certificate`}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const skills = ["Java", "C++", "Python (Basic)", "DBMS", "Web Development", "Firebase", "ESP32", "IoT", "REST APIs"]

  const softSkills = ["Communication", "Teamwork", "Problem Solving (Certified via NPTEL)"]

  const projects = [
    {
      title: "IoT-based Truck TPMS",
      description:
        "Smart India Hackathon project designing and prototyping a smart Tire Pressure Monitoring System for trucks using ESP32 microcontrollers and IoT sensors for real-time monitoring.",
      techStack: ["ESP32", "Embedded C", "IoT Sensors", "Real-time Monitoring"],
      image: "/placeholder.svg?height=800&width=1200&text=IoT+Truck+TPMS+Project+Dashboard",
    },
    {
      title: "24-Hour Fintech Hackathon (Trichy)",
      description:
        "Participated in an intensive 24-hour hackathon solving FinTech challenges, collaborating with teams to ideate and develop rapid prototype solutions for financial technology problems.",
      techStack: ["Team Collaboration", "Rapid Prototyping", "FinTech Solutions", "Innovation"],
      image: "/placeholder.svg?height=800&width=1200&text=Fintech+Hackathon+Team+Project",
    },
    {
      title: "Poster Presentation – Wind Energy",
      description:
        "Presented a technical poster 'BREEZY BRIGHT - A GO GREEN PROJECT' at All India Research Scholars Summit-2024, exploring innovations in renewable wind energy and smart street lighting systems.",
      techStack: ["Research", "Renewable Energy", "Smart Systems", "Technical Presentation"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240306-WA0136.jpg-SRUxf7a3MUn41VzfIxwAipBjIgZam3.jpeg",
    },
  ]

  const certifications = [
    {
      title: "Java Developer",
      provider: "Infosys Springboard",
      image: "/placeholder.svg?height=800&width=1200&text=Java+Developer+Certificate+Infosys",
    },
    {
      title: "DBMS",
      provider: "Infosys Springboard",
      image: "/placeholder.svg?height=800&width=1200&text=DBMS+Certificate+Infosys",
    },
    {
      title: "Programming in C++",
      provider: "Infosys Springboard",
      image: "/placeholder.svg?height=800&width=1200&text=C%2B%2B+Programming+Certificate+Infosys",
    },
    {
      title: "Soft Skills & Personality",
      provider: "NPTEL",
      image: "/placeholder.svg?height=800&width=1200&text=Soft+Skills+NPTEL+Certificate",
    },
    {
      title: "Cybersecurity Internship",
      provider: "Prodigy InfoTech",
      image: "/placeholder.svg?height=800&width=1200&text=Cybersecurity+Internship+Certificate",
    },
    {
      title: "Web Development",
      provider: "Inspire Softech",
      image: "/placeholder.svg?height=800&width=1200&text=Web+Development+Certificate",
    },
  ]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:shajinsree03@gmail.com?subject=${subject}&body=${body}`

    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  const handleDownloadResume = () => {
    window.open("https://drive.google.com/uc?export=download&id=1U-i_LgGLkag_m3QThM0jE4OrzcRXzECj", "_blank")
  }

  const handleConnect = () => {
    window.location.href = "mailto:shajinsree03@gmail.com"
  }

  useEffect(() => {
    // Enable smooth scrolling for the entire document
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  // Debug log to check if component is loading
  useEffect(() => {
    console.log("Portfolio component loaded with modal functionality")
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-gray-900"
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Projects", "Education", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase())
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  }}
                  className="text-gray-700 hover:text-amber-600 transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left side - Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                <motion.div style={{ y }} className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MEpicfi.png-GRF6qF517yIejIYcuaNZQEyA72ewPZ.jpeg"
                    alt="Shajin S P - AI & ML Student"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Hi, I'm <span className="text-amber-500">Shajin S P</span>
              </h1>

              <div className="text-2xl lg:text-3xl text-gray-700 mb-6 h-12">
                I'm an <AnimatedText />
              </div>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Tech explorer passionate about solving real-world problems using AI/ML.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={handleDownloadResume}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Resume
                </Button>
                <Button
                  onClick={handleConnect}
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Let's Connect
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <User className="w-8 h-8 text-amber-500" />
              About Me
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm Shajin S P, a 3rd-year B.Tech student in AI & ML with a CGPA of 8.08. I enjoy exploring intelligent
              systems, solving real-world problems through code, and pushing the boundaries of IoT and machine learning.
              Actively involved in hackathons and certifications, I thrive in tech events and hands-on problem solving.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <Code className="w-8 h-8 text-amber-500" />
              Skills
            </h2>
          </motion.div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <SkillBadge key={skill} skill={skill} delay={index * 0.1} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {softSkills.map((skill, index) => (
                  <SkillBadge key={skill} skill={skill} delay={index * 0.1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <Briefcase className="w-8 h-8 text-amber-500" />
              Projects & Hackathons
            </h2>
            <p className="text-gray-600 mb-4">Click on any project card to view high-resolution images and details</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <GraduationCap className="w-8 h-8 text-amber-500" />
              Education
            </h2>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">R.M.D. Engineering College</h3>
                  <p className="text-amber-600 font-semibold mb-2">
                    B.Tech, Artificial Intelligence and Machine Learning
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600">
                    <p>CGPA: 8.08 (till 3rd Semester)</p>
                    <p>Graduation Year: 2027</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Higher Secondary Education</h3>
                  <p className="text-amber-600 font-semibold">83.6%</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <Award className="w-8 h-8 text-amber-500" />
              Certifications
            </h2>
            <p className="text-gray-600 mb-4">Click on any certificate to view the full image</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
              <Mail className="w-8 h-8 text-amber-500" />
              Get In Touch
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-gray-300 focus:border-amber-500"
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-gray-300 focus:border-amber-500"
                      required
                    />
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-gray-300 focus:border-amber-500"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 hover:scale-105"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-all duration-300">
                <Mail className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a
                    href="mailto:shajinsree03@gmail.com"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    shajinsree03@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-all duration-300">
                <Phone className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a
                    href="tel:+917904457159"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    +91 7904457159
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-amber-300 transition-all duration-300">
                <Instagram className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">Instagram</p>
                  <a
                    href="https://www.instagram.com/shajin_037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    @shajin_037
                  </a>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all duration-300 bg-transparent"
                  onClick={() => window.open("https://www.linkedin.com/in/shajinaiml", "_blank")}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all duration-300 bg-transparent"
                  onClick={() => window.open("https://www.instagram.com/shajin_037", "_blank")}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all duration-300 bg-transparent"
                  onClick={() => window.open("#", "_blank")}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:scale-110 transition-all duration-300 bg-transparent"
                  onClick={() => (window.location.href = "mailto:shajinsree03@gmail.com")}
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">© 2025 Shajin S P. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
