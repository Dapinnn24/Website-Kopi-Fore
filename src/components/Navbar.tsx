"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { title: "Home", href: "/", num: "01" },
  { title: "Our Story", href: "#about", num: "02" },
  { title: "Products", href: "#products", num: "03" },
  { title: "Contact", href: "#contact", num: "04" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Nav Bar */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center p-5 md:px-10 md:py-6">
        {/* Glass pill background */}
        <div
          className="absolute inset-x-4 md:inset-x-8 top-4 md:top-5 bottom-2 rounded-full backdrop-blur-xl border"
          style={{
            background: "var(--glass-bg)",
            borderColor: "var(--glass-border)",
          }}
        />

        <Link
          href="/"
          className="relative z-50 text-xl md:text-2xl font-bold tracking-[-0.04em] uppercase pl-4 md:pl-6"
          style={{ color: "var(--text-primary)" }}
        >
          Fore
          <span className="text-[8px] md:text-[10px] align-super tracking-widest font-light ml-1" style={{ color: "var(--accent)" }}>
            ®
          </span>
        </Link>

        <div className="relative z-50 flex items-center gap-2 pr-2 md:pr-4">
          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
            style={{
              background: isOpen ? "var(--accent)" : "transparent",
              borderColor: isOpen ? "var(--accent)" : "var(--border-medium)",
              color: isOpen ? "white" : "var(--text-primary)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center"
            style={{ background: "var(--bg-primary)" }}
          >
            {/* Decorative gradient */}
            <div
              className="absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full blur-[150px] opacity-10"
              style={{ background: "var(--accent)" }}
            />

            <div className="px-8 md:px-20 lg:px-32 relative z-10">
              {/* Nav Links */}
              <div className="flex flex-col gap-2 md:gap-4">
                {navLinks.map((link, i) => (
                  <div key={link.title} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 md:gap-8 py-3 md:py-4 transition-all duration-500"
                      >
                        <span
                          className="text-xs tracking-[0.3em] font-light w-8"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {link.num}
                        </span>
                        <span
                          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.04em] transition-all duration-500 group-hover:tracking-[0.02em] group-hover:italic"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {link.title}
                        </span>
                        <ArrowUpRight
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 ml-auto"
                          style={{ color: "var(--accent)" }}
                          size={28}
                        />
                      </Link>
                      <div className="h-[1px] w-full" style={{ background: "var(--border-subtle)" }} />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute bottom-8 md:bottom-12 left-8 md:left-20 lg:left-32 right-8 md:right-20 lg:right-32 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
            >
              <div className="flex gap-6 md:gap-8">
                {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs uppercase tracking-[0.2em] animated-underline transition-colors duration-300"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
              <div className="text-xs tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                hello@forecoffee.com
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
