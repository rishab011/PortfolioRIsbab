"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

function NavLink({ name, href, activeSection }: { name: string; href: string; activeSection: string }) {
  const isActive = activeSection === href.replace("#", "");
  return (
    <Link
      href={href}
      className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group link-underline"
    >
      {name}
      {isActive && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const { scrollY } = useScroll();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll spy
  React.useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navHeight = useTransform(scrollY, [0, 60], [80, 60]);
  const navBg = useTransform(
    scrollY,
    [0, 60],
    ["oklch(0.09 0.008 264 / 0)", "oklch(0.09 0.008 264 / 0.75)"]
  );
  const navBgLight = useTransform(
    scrollY,
    [0, 60],
    ["oklch(0.98 0.002 264 / 0)", "oklch(0.98 0.002 264 / 0.8)"]
  );
  const navBorderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-auto"
      style={{
        height: navHeight,
        backdropFilter: "blur(20px) saturate(1.8)",
        WebkitBackdropFilter: "blur(20px) saturate(1.8)",
      }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 dark:block hidden"
        style={{ backgroundColor: navBg }}
      />
      <motion.div
        className="absolute inset-0 dark:hidden block"
        style={{ backgroundColor: navBgLight }}
      />
      {/* Border bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
        style={{ opacity: navBorderOpacity }}
      />

      <div className="container relative mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter relative z-10 group"
        >
          <span className="transition-colors group-hover:text-primary">KB</span>
          <span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              name={link.name}
              href={link.href}
              activeSection={activeSection}
            />
          ))}

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
              data-cursor="Theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full h-9 w-9"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          )}

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="absolute top-full left-0 right-0 glass border-b border-border/50 md:hidden"
          >
            <nav className="container mx-auto px-6 py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-semibold tracking-tight hover:text-primary transition-colors py-2 block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
