"use client";

import { useRef, useCallback } from "react";
import { useSpring } from "@react-spring/web";

export function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLElement>(null);

  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 170, friction: 26 },
  }));

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      api.start({ x: dx, y: dy });
    },
    [api, strength]
  );

  const onMouseLeave = useCallback(() => {
    api.start({ x: 0, y: 0 });
  }, [api]);

  return { ref, style, onMouseMove, onMouseLeave };
}
