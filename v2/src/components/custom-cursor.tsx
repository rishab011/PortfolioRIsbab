"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorState {
  label: string;
  expanded: boolean;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState<CursorState>({ label: "", expanded: false });
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Ring lags behind
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.5 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button";

      if (interactive) {
        const el = interactive as HTMLElement;
        const label = el.getAttribute?.("data-cursor") || "";
        setCursor({ label, expanded: true });
      } else {
        setCursor({ label: "", expanded: false });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — instant follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: cursor.expanded ? 0 : 6,
            height: cursor.expanded ? 0 : 6,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>

      {/* Ring — laggy follower, morphs on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full border border-primary/70 flex items-center justify-center overflow-hidden"
          animate={{
            width: cursor.expanded ? (cursor.label ? 80 : 44) : 36,
            height: cursor.expanded ? 44 : 36,
            backgroundColor: cursor.expanded
              ? "oklch(0.68 0.22 264 / 0.15)"
              : "transparent",
            borderColor: cursor.expanded
              ? "oklch(0.68 0.22 264 / 0.8)"
              : "oklch(0.68 0.22 264 / 0.5)",
          }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          {cursor.label && (
            <motion.span
              className="text-[10px] font-semibold text-primary whitespace-nowrap tracking-wide px-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: cursor.expanded ? 1 : 0, scale: cursor.expanded ? 1 : 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {cursor.label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
