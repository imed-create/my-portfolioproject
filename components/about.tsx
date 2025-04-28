"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Plane, Code, Rocket } from "lucide-react"

export default function About() {
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
    <section id="about" className="section bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 custom={0} variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </motion.h2>
          <motion.div custom={1} variants={fadeIn} className="h-1 w-20 bg-primary mx-auto mb-8" />
          <motion.p custom={2} variants={fadeIn} className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Combining my passion for aerospace engineering and web development to create innovative solutions.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg?height=600&width=600"
              alt="Imed Khed"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          <div className="space-y-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
              <motion.h3 custom={0} variants={fadeIn} className="text-2xl font-bold mb-4">
                My Journey
              </motion.h3>
              <motion.p custom={1} variants={fadeIn} className="text-muted-foreground mb-6">
                With a background in aeronautical engineering and a passion for coding, I've developed a unique skill
                set that bridges the gap between aerospace innovation and digital solutions. My journey began in the
                aerospace industry, where I worked on cutting-edge projects that pushed the boundaries of what's
                possible.
              </motion.p>
              <motion.p custom={2} variants={fadeIn} className="text-muted-foreground">
                As I delved deeper into web development, I discovered the power of creating digital experiences that can
                transform how we interact with technology. Today, I combine these two worlds to build applications that
                are not only technically sound but also intuitive and user-friendly.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                custom={3}
                variants={fadeIn}
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Plane className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Aeronautical Engineering</h4>
                    <p className="text-sm text-muted-foreground">Specialized in aerospace design and analysis</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                custom={4}
                variants={fadeIn}
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Code className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Web Development</h4>
                    <p className="text-sm text-muted-foreground">Full-stack development with modern technologies</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                custom={5}
                variants={fadeIn}
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Rocket className="h-10 w-10 text-primary mb-4" />
                    <h4 className="font-bold mb-2">Innovation</h4>
                    <p className="text-sm text-muted-foreground">Combining disciplines for unique solutions</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
