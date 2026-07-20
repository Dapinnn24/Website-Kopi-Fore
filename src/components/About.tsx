"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const text =
  "Fore is more than just coffee. It's a daily ritual of warmth, crafted meticulously for those who appreciate the finer notes of life. Our beans are ethically sourced from pristine Indonesian highlands, roasted to perfection, and brewed with passion in every single cup.";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-40 px-6 md:px-16 lg:px-24 min-h-screen flex items-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <div className="w-8 md:w-12 h-[1px]" style={{ background: "var(--accent)" }} />
          <span
            className="text-xs md:text-sm uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            The Philosophy
          </span>
        </motion.div>

        {/* Text Reveal */}
        <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light leading-[1.3] md:leading-[1.2] flex flex-wrap gap-x-2 sm:gap-x-3 md:gap-x-4">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;

            return (
              <Word key={i} word={word} start={start} end={end} scrollYProgress={scrollYProgress} />
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  word,
  start,
  end,
  scrollYProgress,
}: {
  word: string;
  start: number;
  end: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
  const color = useTransform(scrollYProgress, [start, end], ["var(--text-muted)", "var(--text-primary)"]);

  return (
    <motion.span style={{ opacity, color }} className="transition-colors duration-100">
      {word}
    </motion.span>
  );
}
