"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "react-intersection-observer";
import { animated } from "@react-spring/web";
import { useMagnetic } from "@/hooks/use-magnetic";

const contactItems = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Location",
    value: "Hyderabad, India",
    href: null,
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "rishabchib1@gmail.com",
    href: "mailto:rishabchib1@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+91 6006803618",
    href: "tel:+916006803618",
  },
];

function GlowInput({ ...props }: React.ComponentProps<typeof Input>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <Input
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-background/50 transition-all duration-300 ${
          focused
            ? "border-primary/60 shadow-[0_0_0_3px_oklch(0.68_0.22_264_/_0.12)]"
            : "border-border hover:border-border/80"
        }`}
      />
    </div>
  );
}

function GlowTextarea({ ...props }: React.ComponentProps<typeof Textarea>) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <Textarea
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`bg-background/50 resize-none transition-all duration-300 ${
          focused
            ? "border-primary/60 shadow-[0_0_0_3px_oklch(0.68_0.22_264_/_0.12)]"
            : "border-border hover:border-border/80"
        }`}
      />
    </div>
  );
}

export function Contact() {
  const [headerRef, headerInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [leftRef, leftInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [rightRef, rightInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const submitMag = useMagnetic(0.25);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/mojpqpyp";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Formspree error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission network error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let&apos;s work <span className="gradient-text">together.</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Open to full-time roles, contract work, and interesting conversations about
            web development and building scalable applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — contact info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -24 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {contactItems.map(({ icon, label, value, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                  {icon}
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-foreground hover:text-primary transition-colors link-underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-foreground">{value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 24 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass rounded-3xl p-8 border border-border/50">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-muted-foreground">
                      Name
                    </label>
                    <GlowInput id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <GlowInput id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">
                    Subject
                  </label>
                  <GlowInput id="subject" name="subject" placeholder="Project Inquiry" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">
                    Message
                  </label>
                  <GlowTextarea
                    id="message"
                    name="message"
                    placeholder="How can we work together?"
                    className="min-h-[140px]"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <animated.div style={submitMag.style}>
                    <Button
                      ref={submitMag.ref as any}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base glow-primary ripple-container relative overflow-hidden"
                      onMouseMove={submitMag.onMouseMove as any}
                      onMouseLeave={submitMag.onMouseLeave}
                      data-cursor={isSubmitting ? "Sending..." : "Send →"}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </animated.div>

                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-green-500 font-medium text-center"
                    >
                      Thanks for reaching out! I&apos;ll get back to you soon.
                    </motion.p>
                  )}

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-destructive font-medium text-center"
                    >
                      Something went wrong. Please try again or email me directly at rishabchib1@gmail.com.
                    </motion.p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
