"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function GradientMesh() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 40;
      const ny = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(nx);
      mouseY.set(ny);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary orb — blue */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.22 264 / 0.18) 0%, transparent 70%)",
          top: "-15%",
          left: "-10%",
          x: springX,
          y: springY,
          filter: "blur(60px)",
        }}
      />
      {/* Secondary orb — purple */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full animate-float-medium"
        style={{
          background:
            "radial-gradient(circle, oklch(0.68 0.2 290 / 0.15) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
          x: springX,
          y: springY,
          filter: "blur(80px)",
        }}
      />
      {/* Tertiary orb — indigo accent */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full animate-float-fast"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.2 250 / 0.12) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          filter: "blur(50px)",
        }}
      />
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
