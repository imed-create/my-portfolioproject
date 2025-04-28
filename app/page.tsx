"use client"

import { useEffect, useState } from "react"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AirplaneScene from "@/components/airplane-scene"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
          }, 500) // Give a small delay after reaching 100%
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative">
      {loading && <Preloader progress={progress} />}
      <Navbar />
      <Hero />
      <About />
      <div className="canvas-container">
        <AirplaneScene />
      </div>
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
