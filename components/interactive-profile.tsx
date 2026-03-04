"use client"

import { useState } from "react"

export function InteractiveProfile() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="relative w-full h-96 flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated glow background */}
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: isHovering
            ? "radial-gradient(circle at 50% 50%, rgba(79, 143, 255, 0.3) 0%, rgba(79, 143, 255, 0.1) 40%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(79, 143, 255, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Outer ring animation */}
      <div
        className="absolute inset-0 rounded-3xl border-2 border-white/20 transition-all duration-300"
        style={{
          boxShadow: isHovering
            ? "0 0 40px rgba(79, 143, 255, 0.6), inset 0 0 40px rgba(79, 143, 255, 0.2)"
            : "0 0 20px rgba(79, 143, 255, 0.3)",
        }}
      />

      {/* Main profile image container with subtle 3D effect */}
      <div
        className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl transition-all duration-300"
        style={{
          transform: isHovering ? "scale(1.02)" : "scale(1)",
          boxShadow: isHovering
            ? "0 20px 60px rgba(79, 143, 255, 0.5), 0 0 40px rgba(79, 143, 255, 0.3)"
            : "0 10px 30px rgba(79, 143, 255, 0.2)",
        }}
      >
        {/* Image wrapper */}
        <div className="w-full h-full overflow-hidden">
          <img
            src="/images/profile-photo.jpg"
            alt="Nischith S"
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovering ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/20 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isHovering ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}
