"use client"

import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, PerspectiveCamera, ContactShadows, Environment } from "@react-three/drei"
import * as THREE from "three"

function RobotModel() {
  const headRef = useRef<THREE.Group>(null!)
  const bodyRef = useRef<THREE.Group>(null!)
  const leftEyeRef = useRef<THREE.Mesh>(null!)
  const rightEyeRef = useRef<THREE.Mesh>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  const [globalMouse, setGlobalMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      setGlobalMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Smoothly transition from Canvas mouse to global mouse if needed, 
    // but global is more stable for "following gaze"
    const mX = globalMouse.x
    const mY = globalMouse.y

    // Head rotation - more pronounced
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mY * 0.4, 0.1)
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mX * 0.6, 0.1)
      
      // Subtle head bobbing
      headRef.current.position.y = Math.sin(time * 2) * 0.05
    }

    // Body tilt - the body also follows the cursor slightly
    if (bodyRef.current) {
      bodyRef.current.rotation.x = THREE.MathUtils.lerp(bodyRef.current.rotation.x, -mY * 0.1, 0.05)
      bodyRef.current.rotation.y = THREE.MathUtils.lerp(bodyRef.current.rotation.y, mX * 0.15, 0.05)
    }

    if (leftEyeRef.current && rightEyeRef.current) {
        // Eyes tracking cursor within the visor - very reactive
        const eyeMovementRange = 0.2
        const targetEyeX = mX * eyeMovementRange
        const targetEyeY = mY * eyeMovementRange
        
        leftEyeRef.current.position.x = THREE.MathUtils.lerp(leftEyeRef.current.position.x, -0.3 + targetEyeX, 0.2)
        leftEyeRef.current.position.y = THREE.MathUtils.lerp(leftEyeRef.current.position.y, targetEyeY, 0.2)
        
        rightEyeRef.current.position.x = THREE.MathUtils.lerp(rightEyeRef.current.position.x, 0.3 + targetEyeX, 0.2)
        rightEyeRef.current.position.y = THREE.MathUtils.lerp(rightEyeRef.current.position.y, targetEyeY, 0.2)

        // Eye blinking effect
        const blink = Math.sin(time * 0.8) > 0.98 ? 0.05 : 1
        leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, blink, 0.4)
        rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, blink, 0.4)
    }

    // Core pulsing logic
    if (coreRef.current) {
      const corePulse = 1 + Math.sin(time * 4) * 0.1 + (hovered ? 0.3 : 0)
      coreRef.current.scale.set(corePulse, corePulse, corePulse)
    }
  })

  return (
    <group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Head */}
        <group ref={headRef}>
          <mesh castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color={hovered ? "#3b82f6" : "#ffffff"} 
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>

          {/* Visor */}
          <mesh position={[0, 0, 0.8]}>
            <boxGeometry args={[1.2, 0.5, 0.2]} />
            <meshStandardMaterial color="#000000" roughness={0} />
          </mesh>

          {/* Eyes */}
          <mesh ref={leftEyeRef} position={[-0.3, 0, 0.95]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#00f3ff" />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.3, 0, 0.95]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#00f3ff" />
          </mesh>
        </group>

        {/* Body */}
        <group ref={bodyRef} position={[0, -1.5, 0]}>
          <mesh receiveShadow>
            <cylinderGeometry args={[0.8, 0.5, 1.2, 32]} />
            <meshStandardMaterial color={hovered ? "#f8fafc" : "#ffffff"} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Glowing Core */}
          <mesh ref={coreRef} position={[0, 0, 0.6]}>
             <sphereGeometry args={[0.2, 16, 16]} />
             <meshBasicMaterial color={hovered ? "#60a5fa" : "#3b82f6"} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export function RobotCanvas() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className="w-full h-[400px]" />

  return (
    <div className="w-full h-[300px] md:h-[400px] cursor-pointer relative group">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <RobotModel />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  )
}
