"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const socials = [
  { icon: <Github className="h-4 w-4" />, href: "https://github.com", label: "GitHub" },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/in/kaveesh-bhat", label: "LinkedIn" },
  { icon: <Mail className="h-4 w-4" />, href: "mailto:12akaveeshbhat@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full border-t border-border/40 bg-background py-10">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold tracking-tighter">
            KB<span className="text-primary">.</span>
          </Link>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-cursor={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kaveesh Bhat
            </p>
            <motion.button
              onClick={scrollToTop}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
