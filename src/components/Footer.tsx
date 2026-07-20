"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    { label: "Locations", href: "#" },
    { label: "Careers", href: "#" },
  ],
  products: [
    { label: "Coffee Beans", href: "#" },
    { label: "Cold Brew", href: "#" },
    { label: "Merchandise", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="pt-16 md:pt-24 pb-8 px-6 md:px-16 lg:px-24 border-t"
      style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-24">
          {/* Brand */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold tracking-[-0.04em] uppercase mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Fore
                <span className="text-sm align-super ml-1 font-light" style={{ color: "var(--accent)" }}>
                  ®
                </span>
              </h2>
              <p className="text-sm md:text-base leading-relaxed max-w-sm" style={{ color: "var(--text-secondary)" }}>
                Website ini dibuat oleh Davin Adi Fathurrahman.
              </p>

              {/* Newsletter */}
              <div className="mt-8 flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-full text-sm border outline-none focus:ring-1 transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-medium)",
                    color: "var(--text-primary)",
                  }}
                />
                <button
                  className="px-5 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([category, links], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.8 }}
              >
                <h3
                  className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {category}
                </h3>
                <ul className="flex flex-col gap-3 md:gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm md:text-base animated-underline transition-colors duration-300 flex items-center gap-1 group"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {link.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{ color: "var(--accent)" }}
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Fore Coffee. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] md:text-xs tracking-[0.15em] uppercase animated-underline transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
