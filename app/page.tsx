"use client"

import { useEffect, useState, useRef } from "react"
import {
  MoveRight,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Calendar,
  Database,
  Code,
  BarChart3,
  BrainCircuit,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"
import { SkillIcon } from "@/components/skill-icon"
import { cn } from "@/lib/utils"
import { sendEmail } from "./actions/send-email"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("about")
  const [showPopup, setShowPopup] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const sectionRefs = {
    about: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    skills: useRef(null),
    publications: useRef(null),
    contact: useRef(null),
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section
      const sections = Object.keys(sectionRefs)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const ref = sectionRefs[section]
        if (ref.current && window.scrollY >= ref.current.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Show welcome popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />

      {/* Welcome Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleClosePopup}>
          <motion.div
            className="bg-black/80 border border-cyan-500 p-8 rounded-lg max-w-md backdrop-blur-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">Welcome to my Portfolio</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClosePopup}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
              >
                ✕
              </Button>
            </div>
            <p className="mb-4 text-cyan-100">
              Explore my journey in data science, machine learning, and analytics through this interactive portfolio.
            </p>
            <div className="flex justify-end">
              <Button onClick={handleClosePopup} className="bg-cyan-600 hover:bg-cyan-500 text-white border-none">
                Let's Explore
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-cyan-900/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="font-bold text-xl text-cyan-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nethum Perera
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {Object.keys(sectionRefs).map((section) => (
              <Link
                key={section}
                href={`#${section}`}
                className={cn(
                  "text-sm font-medium transition-colors relative",
                  activeSection === section ? "text-cyan-400" : "text-gray-400 hover:text-cyan-300",
                )}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                {activeSection === section && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="activeSection"
                  />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-cyan-700 text-cyan-400 hover:bg-cyan-950"
            >
              Download CV
              <FileText className="ml-2 h-4 w-4" />
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <motion.section
          id="about"
          className="py-12 md:py-16 flex flex-col md:flex-row gap-8 items-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          ref={sectionRefs.about}
        >
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-cyan-500/20 z-10 mix-blend-overlay"></div>
              <img src="/images/profile.png" alt="Nethum Perera" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent"></div>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight text-cyan-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Nethum Perera
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl text-cyan-300/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Data Scientist & Analytics Professional
            </motion.h2>
            <motion.p
              className="text-cyan-100/80 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              A self-motivated and determined individual passionate about data science, machine learning, and analytics.
              Currently pursuing BSc (Hons) in Data Science.
            </motion.p>
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                className="bg-cyan-600 hover:bg-cyan-500 text-white border-none"
                onClick={() =>
                  (window.location.href = "mailto:nethumsemithaperera@gmail.com?subject=Portfolio%20Contact")
                }
              >
                Contact Me
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-cyan-700 text-cyan-400 hover:bg-cyan-950">
                View Resume
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          ref={sectionRefs.experience}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Experience</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-black/60 border-cyan-900/50 overflow-hidden">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-cyan-300">Intern - Data Science & Automation</CardTitle>
                    <CardDescription className="text-cyan-100/70">
                      AI & Business Intelligence Division, Sri Lanka Telecom PLC
                    </CardDescription>
                  </div>
                  <Badge className="w-fit bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/50">
                    October 2024 - April 2025
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-cyan-100/80">
                <p>Worked on data science and automation projects in the AI & Business Intelligence Division.</p>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          ref={sectionRefs.education}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-cyan-300">BSc (Hons) Data Science</CardTitle>
                    <Badge className="bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/50">Current</Badge>
                  </div>
                  <CardDescription className="text-cyan-100/70">
                    Coventry University, UK affiliated with NIBM Sri Lanka
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>Undergraduate - Final Year</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">BA Music (Visharad)</CardTitle>
                  <CardDescription className="text-cyan-100/70">Bhatkhande Sanskriti Vishwavidyalaya</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>2020</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">German Language</CardTitle>
                  <CardDescription className="text-cyan-100/70">Goethe-Institut Sri Lanka</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>Present</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">School</CardTitle>
                  <CardDescription className="text-cyan-100/70">Royal College, Colombo 07 Sri Lanka</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>Physical Science Stream (2007 - 2020)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Professional Qualifications */}
        <motion.section
          id="certifications"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Professional Qualifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Higher National Diploma in Data Science</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    National Institute of Business Management, Sri Lanka
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-cyan-100/70">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>2024</span>
                    </div>
                    <p className="font-medium text-cyan-300">GPA: 3.90 / 4.00</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Advanced Diploma in Data Science</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    National Institute of Business Management, Sri Lanka
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-cyan-100/70">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span>2023</span>
                    </div>
                    <p className="font-medium text-cyan-300">GPA: 3.85 / 4.00</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">CIMA Professional Qualification</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    Charted Institute of Management Accountant - UK
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="flex items-center gap-2 text-cyan-100/70">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>2024 - Present</span>
                  </div>
                  <p className="mt-2">Completed Certificate Level</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Certificate in Network Engineering</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    National Institute of Business Management, Sri Lanka
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="flex items-center gap-2 text-cyan-100/70">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>2021</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Cyber security IT and Network Essentials</CardTitle>
                  <CardDescription className="text-cyan-100/70">Cisco Networking Academy</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="flex items-center gap-2 text-cyan-100/70">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>2021</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          ref={sectionRefs.skills}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Skills</h2>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-black/60 border border-cyan-900/50">
              <TabsTrigger
                value="technical"
                className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
              >
                Technical Skills
              </TabsTrigger>
              <TabsTrigger
                value="soft"
                className="data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-300"
              >
                Soft Skills
              </TabsTrigger>
            </TabsList>
            <TabsContent value="technical" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="python" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Python</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Advanced Python Programming</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="r" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">R</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Statistical Analysis with R</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="sql" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">SQL</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Database Management & Queries</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.25 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="tensorflow" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">TensorFlow</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Deep Learning & Neural Networks</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="pytorch" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">PyTorch</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Deep Learning Framework</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.35 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="powerbi" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Power BI</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Business Intelligence & Dashboards</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="tableau" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Tableau</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Data Visualization & Analytics</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.45 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="keras" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Keras</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Neural Network API</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="oracle" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Oracle SQL</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Enterprise Database Management</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.55 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="java" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Java</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Object-Oriented Programming</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center p-4 bg-black/60 border border-cyan-900/50 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <SkillIcon name="scikit" className="w-12 h-12 mb-2 text-cyan-400" />
                        <span className="text-cyan-100">Scikit-Learn</span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-black/90 border-cyan-700">
                      <p>Machine Learning Algorithms</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TabsContent>
            <TabsContent value="soft" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/60 border-cyan-900/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 flex items-center gap-2">
                        <BrainCircuit className="h-5 w-5 text-cyan-400" />
                        Team Collaboration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-cyan-100/80">
                      <p>Experienced in collaborating effectively within teams to achieve common goals.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/60 border-cyan-900/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 flex items-center gap-2">
                        <Code className="h-5 w-5 text-cyan-400" />
                        Problem Solving
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-cyan-100/80">
                      <p>Analytical approach to solving complex problems with data-driven solutions.</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/60 border-cyan-900/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 flex items-center gap-2">
                        <Database className="h-5 w-5 text-cyan-400" />
                        Professional Ethics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-cyan-100/80">
                      <p>
                        Adhere to a sense of moral obligations and ethics of integrity, objectivity, due care and
                        professional competence.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-black/60 border-cyan-900/50 h-full">
                    <CardHeader>
                      <CardTitle className="text-cyan-300 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-cyan-400" />
                        Adaptability
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-cyan-100/80">
                      <p>Self-motivated and determined to grasp new practical experiences while enhancing skills.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Publications Section */}
        <motion.section
          id="publications"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          ref={sectionRefs.publications}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Publications</h2>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 hover:border-cyan-700 transition-colors overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-cyan-300">
                    Machine Learning Approach To Model Rainfall & River Overflow in Nilwala River Basin, Sri Lanka
                  </CardTitle>
                  <CardDescription className="text-cyan-100/70">ICARC 2025 - IEEE Xplore Publication</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>
                    Research publication on using machine learning techniques to model rainfall patterns and predict
                    river overflow in the Nilwala River Basin in Sri Lanka.
                  </p>
                  <Button variant="outline" className="mt-4 border-cyan-700 text-cyan-400 hover:bg-cyan-950">
                    View Publication
                    <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 hover:border-cyan-700 transition-colors overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-cyan-300">
                    Optimizing Demand Forecasting and Supply Chain Resilience Using Machine Learning and Time Series
                    Analysis
                  </CardTitle>
                  <CardDescription className="text-cyan-100/70">ICME 2024 - University of Ruhuna</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <p>
                    Research on applying machine learning and time series analysis techniques to optimize demand
                    forecasting and improve supply chain resilience.
                  </p>
                  <Button variant="outline" className="mt-4 border-cyan-700 text-cyan-400 hover:bg-cyan-950">
                    View Publication
                    <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          ref={sectionRefs.contact}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-cyan-300">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-900/30 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-300">Email</p>
                    <p className="text-sm text-cyan-100/80">nethumsemithaperera@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-900/30 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-300">Phone</p>
                    <p className="text-sm text-cyan-100/80">+94 75 940 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-900/30 p-3 rounded-full">
                    <Linkedin className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-300">LinkedIn</p>
                    <a
                      href="https://lk.linkedin.com/in/nethum-perera-6333691b6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      linkedin.com/in/nethum-perera-6333691b6
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Send Me a Message</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    Fill out the form below to get in touch with me.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    action={async (formData) => {
                      const result = await sendEmail(formData)
                      if (result.success) {
                        // Clear the form
                        const form = document.getElementById("contact-form") as HTMLFormElement
                        if (form) form.reset()

                        // Show success message
                        setFormStatus({ type: "success", message: result.message })
                      } else {
                        // Show error message
                        setFormStatus({ type: "error", message: result.message })
                      }
                    }}
                    className="space-y-4"
                    id="contact-form"
                  >
                    {formStatus && (
                      <div
                        className={`p-3 rounded-md ${formStatus.type === "success" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"}`}
                      >
                        {formStatus.message}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-cyan-300">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          className="w-full p-2 rounded-md border border-cyan-900/50 bg-black/30 text-cyan-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-cyan-300">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full p-2 rounded-md border border-cyan-900/50 bg-black/30 text-cyan-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-cyan-300">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        required
                        className="w-full p-2 rounded-md border border-cyan-900/50 bg-black/30 text-cyan-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-cyan-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full p-2 rounded-md border border-cyan-900/50 bg-black/30 text-cyan-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                        placeholder="Your message"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white border-none">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* References Section */}
        <motion.section
          id="references"
          className="py-12 border-t border-cyan-900/30"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-cyan-400">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Mr. Badrajith Siriwardana</CardTitle>
                  <CardDescription className="text-cyan-100/70">
                    Chief Executive Officer, Kings Hospital
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm">+94 71 483 7167</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/60 border-cyan-900/50 h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Eng. Mr. Gration Fernando</CardTitle>
                  <CardDescription className="text-cyan-100/70">Chairman/Director, BPP Engineering</CardDescription>
                </CardHeader>
                <CardContent className="text-cyan-100/80">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm">+94 77 361 6805</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-900/30 py-6 md:py-0 relative">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <p className="text-sm text-cyan-100/60">© {new Date().getFullYear()} Nethum Perera. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
            >
              <Link href="https://lk.linkedin.com/in/nethum-perera-6333691b6" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
