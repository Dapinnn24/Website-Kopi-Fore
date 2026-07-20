"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";

const stats = [
  { value: 1500, label: "Daily Cups Brewed", suffix: "+", prefix: "" },
  { value: 12, label: "Locations Nationwide", suffix: "", prefix: "" },
  { value: 50, label: "Farmers Supported", suffix: "+", prefix: "" },
  { value: 99, label: "Satisfaction Rate", suffix: "%", prefix: "" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-16 lg:px-24"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center p-4 md:p-6 rounded-2xl transition-all duration-500"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.04em] mb-3" style={{ color: "var(--text-primary)" }}>
              {stat.prefix}
              {isInView ? (
                <CountUp end={stat.value} duration={2.5} separator="," />
              ) : (
                "0"
              )}
              <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>
            </div>
            <div
              className="text-[10px] sm:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
