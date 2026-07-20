"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Flame, Cookie, ShoppingBag } from "lucide-react";

const cards = [
  {
    title: "Our Roastery",
    desc: "Small-batch perfection, roasted in-house daily with precision and love.",
    icon: Flame,
    tag: "Featured",
  },
  {
    title: "Cold Brew",
    desc: "12 hours steeped, silky smooth.",
    icon: Coffee,
    tag: "Popular",
  },
  {
    title: "Pastries",
    desc: "Fresh every morning, baked with love.",
    icon: Cookie,
    tag: "New",
  },
  {
    title: "Merch",
    desc: "Wear the culture, live the grind.",
    icon: ShoppingBag,
    tag: "Shop",
  },
];

function LiquidCard({
  card,
  index,
}: {
  card: (typeof cards)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = card.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border group h-full"
      style={{
        background: "var(--bg-card)",
        borderColor: isHovered ? "var(--border-medium)" : "var(--border-subtle)",
        boxShadow: isHovered ? "var(--shadow-glow)" : "var(--shadow-card)",
        transition: "border-color 0.5s, box-shadow 0.5s",
      }}
    >
      {/* ===== Liquid Fill Effect ===== */}
      {/* This is the "water drip" effect — a radial white glow that expands from the cursor position */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(
              600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              rgba(255, 255, 255, 0.06),
              transparent 40%
            )
          `,
        }}
      />

      {/* Liquid drip fill from top */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 60%, transparent)",
          transform: isHovered ? "translateY(0%)" : "translateY(-100%)",
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Drip ripple at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.05), transparent 70%)",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "opacity 0.6s 0.3s, transform 0.8s 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Glow border shimmer on hover */}
      <div
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl md:rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `
            radial-gradient(
              400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
              rgba(255, 255, 255, 0.04),
              transparent 50%
            )
          `,
          transition: "opacity 0.4s",
        }}
      />

      {/* ===== Card Content ===== */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[200px] md:min-h-[240px]">
        {/* Top Row: Icon + Tag */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{
              background: isHovered ? "rgba(255,255,255,0.1)" : "var(--accent-subtle)",
              color: isHovered ? "white" : "var(--accent)",
              transition: "background 0.5s, color 0.5s, transform 0.5s",
            }}
          >
            <Icon size={20} />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border transition-all duration-500"
            style={{
              borderColor: isHovered ? "rgba(255,255,255,0.15)" : "var(--border-subtle)",
              color: isHovered ? "rgba(255,255,255,0.7)" : "var(--text-muted)",
            }}
          >
            {card.tag}
          </span>
        </div>

        {/* Bottom: Title + Desc + Arrow */}
        <div>
          <h3
            className="text-xl md:text-2xl font-medium mb-2 tracking-tight transition-colors duration-500"
            style={{ color: isHovered ? "white" : "var(--text-primary)" }}
          >
            {card.title}
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed mb-4 transition-colors duration-500"
            style={{ color: isHovered ? "rgba(255,255,255,0.6)" : "var(--text-secondary)" }}
          >
            {card.desc}
          </p>

          {/* Arrow */}
          <div className="flex justify-end">
            <div
              className="w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{
                borderColor: isHovered ? "rgba(255,255,255,0.2)" : "var(--border-medium)",
                background: isHovered ? "rgba(255,255,255,0.08)" : "transparent",
                color: isHovered ? "white" : "var(--text-muted)",
              }}
            >
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  return (
    <section
      id="products"
      className="py-24 md:py-32 px-6 md:px-16 lg:px-24"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-8 md:w-12 h-[1px]" style={{ background: "var(--accent)" }} />
              <span
                className="text-xs md:text-sm uppercase tracking-[0.3em]"
                style={{ color: "var(--accent)" }}
              >
                Explore
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em]"
              style={{ color: "var(--text-primary)" }}
            >
              The{" "}
              <span className="font-bold italic" style={{ color: "var(--accent)" }}>
                Menu
              </span>
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] animated-underline transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            View All <ArrowUpRight size={16} />
          </motion.button>
        </div>

        {/* Bento Grid — Asymmetric Layout with explicit row heights */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4"
          style={{
            gridTemplateRows: "auto",
          }}
        >
          {/* Row 1+2: Large left + two stacked right */}
          <div className="md:col-span-7 md:row-start-1 md:row-end-3 [&>div]:h-full">
            <LiquidCard card={cards[0]} index={0} />
          </div>

          <div className="md:col-span-5 md:row-start-1 md:row-end-2">
            <LiquidCard card={cards[1]} index={1} />
          </div>

          <div className="md:col-span-5 md:row-start-2 md:row-end-3">
            <LiquidCard card={cards[2]} index={2} />
          </div>

          {/* Row 3: Full width */}
          <div className="md:col-span-12 md:row-start-3">
            <LiquidCard card={cards[3]} index={3} />
          </div>
        </div>
      </div>
    </section>
  );
}
