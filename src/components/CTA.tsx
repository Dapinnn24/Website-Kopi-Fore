"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.25;
    const y = (e.clientY - top - height / 2) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen text-center"
      style={{ background: "#050505" }}
    >
      {/* Parallax animated background layers */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        {/* Large center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
          style={{
            background: "radial-gradient(circle, rgba(212, 165, 116, 0.12) 0%, transparent 70%)",
            scale: glowScale,
          }}
        />
        {/* Top-left warm accent */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06]"
          style={{ background: "#d4a574" }}
        />
        {/* Bottom-right cool accent */}
        <div
          className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.04]"
          style={{ background: "#a5c4d4" }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal lines for texture */}
      <div className="absolute top-1/4 left-0 right-0 h-[1px] opacity-[0.04]" style={{ background: "white" }} />
      <div className="absolute bottom-1/3 left-0 right-0 h-[1px] opacity-[0.04]" style={{ background: "white" }} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <div className="w-12 h-[1px]" style={{ background: "rgba(212, 165, 116, 0.4)" }} />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#d4a574]">
            Get Started
          </span>
          <div className="w-12 h-[1px]" style={{ background: "rgba(212, 165, 116, 0.4)" }} />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-light tracking-[-0.05em] leading-none mb-4">
            <span className="text-white">Ready to</span>
          </h2>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold italic tracking-[-0.05em] leading-none mb-8 md:mb-12">
            <span
              className="bg-clip-text text-transparent pb-6 pr-4 inline-block"
              style={{
                backgroundImage: "linear-gradient(135deg, #d4a574 0%, #e8c9a8 50%, #d4a574 100%)",
              }}
            >
              Brew?
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg mb-16 md:mb-24 font-light max-w-md mx-auto leading-relaxed text-zinc-400"
        >
          Join the community of morning dreamers. Order your first batch and experience the difference.
        </motion.p>

        {/* Magnetic Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
            className="group relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full flex items-center justify-center mx-auto"
            style={{
              background: "linear-gradient(135deg, #d4a574 0%, #a67c52 100%)",
              color: "white",
              boxShadow: "0 0 100px rgba(212, 165, 116, 0.25), inset 0 0 40px rgba(255,255,255,0.05)",
            }}
          >
            {/* Inner shine */}
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="flex flex-col items-center gap-2 relative z-10">
              <span className="text-base sm:text-lg md:text-xl font-medium tracking-tight">
                Shop Now
              </span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-2 transition-transform duration-500"
              />
            </div>

            {/* Animated ripple rings */}
            <div className="absolute inset-0 rounded-full border border-[#d4a574]/30 scale-100 group-hover:scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-700" />
            <div className="absolute inset-0 rounded-full border border-[#d4a574]/20 scale-100 group-hover:scale-[1.3] opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border border-[#d4a574]/10 scale-100 group-hover:scale-[1.45] opacity-0 group-hover:opacity-100 transition-all duration-[1300ms] delay-200" />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-secondary), transparent)" }}
      />
    </section>
  );
}
