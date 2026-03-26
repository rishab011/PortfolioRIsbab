"use client";

import { useRef } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

export function useParallax(speed = 0.3): {
  ref: React.RefObject<HTMLElement | null>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.5 });

  return { ref, y };
}
