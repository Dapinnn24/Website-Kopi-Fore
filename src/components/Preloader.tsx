"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scroll during loading
    document.body.style.overflow = "hidden";
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 600);
      }
      setProgress(Math.floor(currentProgress));
    }, 120);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "var(--bg-preloader)" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
            style={{ background: "var(--accent)" }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="text-5xl md:text-8xl font-bold tracking-[-0.06em] mb-2" style={{ color: "var(--text-primary)" }}>
              FORE
            </div>
            <div
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-center"
              style={{ color: "var(--text-muted)" }}
            >
              Coffee Company
            </div>
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-16 md:bottom-20 flex flex-col items-center gap-6 w-full px-8"
          >
            <div className="flex items-center justify-between w-full max-w-[200px]">
              <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                Loading
              </span>
              <span className="text-sm font-light tabular-nums" style={{ color: "var(--text-secondary)" }}>
                {progress}%
              </span>
            </div>
            <div className="w-full max-w-[200px] h-[1px] overflow-hidden relative" style={{ background: "var(--border-subtle)" }}>
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ background: "var(--accent)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
