"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, X, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const CATEGORIES = ["All", "Full Stack", "Backend", "AI / ML"];

const PROJECTS = [
  {
    id: 1,
    title: "PillPrice — Pharmacy Aggregator",
    category: "Full Stack",
    description:
      "A modern web app helping users find the best prescription prices by comparing local pharmacy rates. Features high-end UI animations, real-time scraping logic, and geolocation-based branch filtering.",
    tags: ["Next.js 15", "Tailwind CSS", "Prisma", "Supabase", "Framer Motion"],
    demoUrl: "https://pill-price.vercel.app/",
    githubUrl: "#",
    featured: true,
    gradient: "from-blue-500/20 to-indigo-500/20",
    accentColor: "oklch(0.68 0.22 264)",
  },
  {
    id: 2,
    title: "Event-Driven Order System",
    category: "Backend",
    description:
      "Fault-tolerant microservices on Kubernetes. Implemented Saga and Outbox patterns for reliable multi-service transactions and exactly-once event delivery.",
    tags: ["Spring Boot", "Kafka", "Kubernetes", "Redis", "MySQL", "Prometheus"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true,
    gradient: "from-violet-500/20 to-purple-500/20",
    accentColor: "oklch(0.65 0.2 290)",
  },
  {
    id: 3,
    title: "Real-Time Fraud Detection",
    category: "AI / ML",
    description:
      "Streaming system combining rule-based filtering with ML anomaly detection. Handles 100k+ transactions/minute with fully async communication.",
    tags: ["Spring Boot", "Kafka", "Rule Engine", "ML", "Anomaly Detection"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-cyan-500/20 to-blue-500/20",
    accentColor: "oklch(0.7 0.18 210)",
  },
  {
    id: 4,
    title: "Dementia Recognition System",
    category: "AI / ML",
    description:
      "Deep learning model using pre-trained VGG16 to classify MRI brain scans into various dementia stages. Preprocessed and augmented medical imaging datasets.",
    tags: ["TensorFlow", "Keras", "VGG16", "CNN", "Medical Imaging"],
    demoUrl: "#",
    githubUrl: "#",
    featured: false,
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "oklch(0.65 0.18 170)",
  },
  {
    id: 5,
    title: "AI News Aggregator Platform",
    category: "Full Stack",
    description:
      "End-to-end platform leveraging OpenAI APIs and LLMs to aggregate, summarize, and analyze trending AI news. Includes vector databases for semantic search.",
    tags: ["OpenAI", "Spring Boot", "React", "Vector DB", "RAG"],
    demoUrl: "#",
    githubUrl: "https://github.com/kaveesh1402/news-aggregator",
    featured: true,
    gradient: "from-orange-500/20 to-amber-500/20",
    accentColor: "oklch(0.72 0.18 60)",
  },
];

// 3D tilt card with glow following mouse
function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: (typeof PROJECTS)[0];
  onClick: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={(node) => {
        cardRef.current = node;
        (ref as any)(node);
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="View →"
    >
      {/* Glow that follows mouse */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${project.accentColor}30 0%, transparent 60%)`,
        }}
      />

      <div className="relative h-full rounded-2xl border border-border/50 group-hover:border-primary/20 bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/5">
        {/* Top accent */}
        <div className={`h-px w-full bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

        <div className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border border-primary/20 text-xs"
            >
              {project.category}
            </Badge>
            <div className="flex items-center gap-2">
              {project.featured && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Featured
                </span>
              )}
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
          </div>

          <h3 className="text-lg font-bold tracking-tight mb-3 group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Full-screen modal
function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0] | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-4 md:inset-[10%] z-[101] glass rounded-3xl overflow-hidden border border-border/60 shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {/* Header gradient */}
            <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 h-9 w-9 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="max-w-2xl">
                <div className="flex gap-2 mb-4">
                  <Badge className="bg-primary/10 text-primary border border-primary/20">{project.category}</Badge>
                  {project.featured && <Badge variant="outline">Featured</Badge>}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{project.title}</h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">{project.description}</p>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {project.demoUrl !== "#" && (
                    <Button
                      className="flex-1 h-12 glow-primary"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                      data-cursor="Open ↗"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="flex-1 h-12 glass"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    data-cursor="View →"
                  >
                    <Github className="mr-2 h-4 w-4" /> Source Code
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const filteredProjects = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Things I&apos;ve <span className="gradient-text">built.</span>
            </h2>
          </div>

          {/* Category filter */}
          <motion.div
            className="flex flex-wrap gap-2"
            layout
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${activeCategory === cat
                    ? "text-primary border-primary/50 bg-primary/10"
                    : "text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
