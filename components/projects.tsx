"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Aerospace Dashboard",
      description: "Real-time flight data visualization dashboard for aerospace engineers",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["web", "aerospace"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 2,
      title: "Flight Simulator",
      description: "Interactive 3D flight simulator built with Three.js and WebGL",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["web", "aerospace", "3d"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["web"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 4,
      title: "Aerodynamics Calculator",
      description: "Web application for calculating aerodynamic properties of airfoils",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["web", "aerospace"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 5,
      title: "Virtual Wind Tunnel",
      description: "3D simulation of airflow around aircraft components",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["aerospace", "3d"],
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description: "Personal portfolio website with 3D animations and interactive elements",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["web", "3d"],
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  const filteredProjects =
    activeTab === "all" ? projects : projects.filter((project) => project.tags.includes(activeTab))

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="projects" className="section">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 custom={0} variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            My Projects
          </motion.h2>
          <motion.div custom={1} variants={fadeIn} className="h-1 w-20 bg-primary mx-auto mb-8" />
          <motion.p custom={2} variants={fadeIn} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing my work across web development and aerospace engineering projects.
          </motion.p>
        </motion.div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web Dev</TabsTrigger>
              <TabsTrigger value="aerospace">Aerospace</TabsTrigger>
              <TabsTrigger value="3d">3D</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Card className="overflow-hidden project-card h-full flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <div className="flex gap-4">
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        <Button size="sm" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
