"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function AirplaneScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111827) // Dark background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    camera.position.y = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create a simple airplane model
    const createAirplane = () => {
      const airplane = new THREE.Group()

      // Fuselage
      const fuselageGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8)
      const fuselageMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.2,
      })
      const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial)
      fuselage.rotation.z = Math.PI / 2
      airplane.add(fuselage)

      // Wings
      const wingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.5)
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.2,
      })
      const wing = new THREE.Mesh(wingGeometry, wingMaterial)
      wing.position.y = 0.1
      airplane.add(wing)

      // Tail
      const tailGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.05)
      const tailMaterial = new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        metalness: 0.7,
        roughness: 0.2,
      })
      const tail = new THREE.Mesh(tailGeometry, tailMaterial)
      tail.position.x = -0.8
      tail.position.y = 0.2
      airplane.add(tail)

      // Cockpit
      const cockpitGeometry = new THREE.SphereGeometry(0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2)
      const cockpitMaterial = new THREE.MeshStandardMaterial({
        color: 0xadd8e6,
        metalness: 0.2,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8,
      })
      const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial)
      cockpit.position.x = 0.5
      cockpit.position.y = 0.15
      cockpit.rotation.z = Math.PI / 2
      airplane.add(cockpit)

      return airplane
    }

    const airplane = createAirplane()
    scene.add(airplane)

    // Create a grid for reference
    const gridHelper = new THREE.GridHelper(20, 20, 0x555555, 0x333333)
    scene.add(gridHelper)

    // Add some stars
    const createStars = () => {
      const starsGeometry = new THREE.BufferGeometry()
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
      })

      const starsVertices = []
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 100
        const y = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 100
        starsVertices.push(x, y, z)
      }

      starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
      const stars = new THREE.Points(starsGeometry, starsMaterial)
      return stars
    }

    const stars = createStars()
    scene.add(stars)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the airplane
      airplane.rotation.y += 0.005

      // Update controls
      controls.update()

      // Render
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

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      scene.clear()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
