"use client";

import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const GradientMesh = dynamic(
  () => import("@/components/background/gradient-mesh").then((m) => m.GradientMesh),
  { ssr: false }
);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return (
    <>
      <GradientMesh />
      {children}
    </>
  );
}
