"use client";

import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/hero";

const About = dynamic(() => import('@/components/sections/about').then(mod => mod.About), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/projects').then(mod => mod.Projects), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/contact').then(mod => mod.Contact), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
