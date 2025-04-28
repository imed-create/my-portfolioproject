"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

interface PreloaderProps {
  progress: number
}

export default function Preloader({ progress }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const airplaneRef = useRef<THREE.Object3D | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Load airplane model
    const loader = new GLTFLoader()

    // Create a simple airplane mesh as a placeholder
    const createPlaceholderAirplane = () => {
      const group = new THREE.Group()

      // Fuselage
      const fuselageGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8)
      const fuselageMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
      const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial)
      fuselage.rotation.z = Math.PI / 2
      group.add(fuselage)

      // Wings
      const wingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.5)
      const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
      const wing = new THREE.Mesh(wingGeometry, wingMaterial)
      wing.position.y = 0.1
      group.add(wing)

      // Tail
      const tailGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05)
      const tailMaterial = new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
      const tail = new THREE.Mesh(tailGeometry, tailMaterial)
      tail.position.x = -0.8
      tail.position.y = 0.2
      group.add(tail)

      return group
    }

    const airplane = createPlaceholderAirplane()
    scene.add(airplane)
    airplaneRef.current = airplane

    // Position camera
    camera.position.z = 5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (airplaneRef.current) {
        // Make the airplane move in a figure-8 pattern
        const time = Date.now() * 0.001
        airplaneRef.current.position.x = Math.sin(time) * 2
        airplaneRef.current.position.y = Math.sin(time * 2) * 0.5

        // Rotate the airplane to follow its path
        airplaneRef.current.rotation.z = Math.sin(time) * 0.2
        airplaneRef.current.rotation.x = Math.sin(time * 2) * 0.1
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)

      // Clean up Three.js resources
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="preloader">
      <canvas ref={canvasRef} className="preloader-canvas" />
      <div className="preloader-progress">{Math.round(progress)}%</div>
    </div>
  )
}
