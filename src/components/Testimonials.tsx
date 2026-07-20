"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The best coffee experience I've ever had. Fore turned my mornings into a ritual I look forward to.",
    author: "Amara Chen",
    role: "Coffee Enthusiast",
    location: "Jakarta",
  },
  {
    quote: "Fore redefines what it means to start your morning right. The aroma alone is worth waking up for.",
    author: "David Hartono",
    role: "Creative Director",
    location: "Bandung",
  },
  {
    quote: "A perfect blend of taste, aesthetics, and community. This is coffee culture done right.",
    author: "Sarah Wijaya",
    role: "Product Designer",
    location: "Bali",
  },
  {
    quote: "Every cup tells a story of craftsmanship. The attention to detail is unmatched in Indonesia.",
    author: "Rizal Pratama",
    role: "Food Critic",
    location: "Surabaya",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-28 md:py-40 px-6 md:px-16 lg:px-24 flex items-center justify-center relative overflow-hidden min-h-[70vh] md:min-h-[80vh]"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent)" }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-16 md:mb-20"
        >
          <div className="w-8 h-[1px]" style={{ background: "var(--accent)" }} />
          <span className="text-xs md:text-sm uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            Testimonials
          </span>
          <div className="w-8 h-[1px]" style={{ background: "var(--accent)" }} />
        </motion.div>

        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <Quote size={32} style={{ color: "var(--accent)", opacity: 0.3 }} />
        </div>

        {/* Testimonial Content */}
        <div className="h-[220px] sm:h-[200px] md:h-[240px] relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed mb-8 md:mb-10 max-w-4xl"
                style={{ color: "var(--text-primary)" }}
              >
                &ldquo;{testimonials[index].quote}&rdquo;
              </p>
              <div>
                <div className="font-medium text-base md:text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {testimonials[index].author}
                </div>
                <div className="text-xs md:text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  {testimonials[index].role} — {testimonials[index].location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-12 md:mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="relative h-[2px] transition-all duration-500 overflow-hidden rounded-full"
              style={{
                width: i === index ? "48px" : "24px",
                background: "var(--border-subtle)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            >
              {i === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={`progress-${index}`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
