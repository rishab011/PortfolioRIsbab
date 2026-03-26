"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  const rafRef = useRef<number>(0);

  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisInstance;
}
