"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 192;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);

    const loadFrame = (i: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, "0");
        img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
        img.onload = () => {
          loadedImages[i - 1] = img;
          resolve();
        };
      });
    };

    const init = async () => {
      // 1. Load first frame instantly
      await loadFrame(1);
      setImages([...loadedImages]);

      // 2. Load next 20 frames for smooth initial scroll
      const initialBatch = [];
      for (let i = 2; i <= 20; i++) {
        initialBatch.push(loadFrame(i));
      }
      await Promise.all(initialBatch);
      setImages([...loadedImages]);

      // 3. Background load the rest
      let loadedSinceLastUpdate = 0;
      for (let i = 21; i <= FRAME_COUNT; i++) {
        loadFrame(i).then(() => {
          loadedSinceLastUpdate++;
          // Batch state updates to prevent freezing the main thread
          if (loadedSinceLastUpdate >= 20 || i === FRAME_COUNT) {
            setImages([...loadedImages]);
            loadedSinceLastUpdate = 0;
          }
        });
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(frameIndex.get()) - 1)
      );

      const img = images[index];
      if (img) {
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > canvasRatio) {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [images, frameIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Text overlay transforms
  const titleOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.22], [0, -80]);
  const titleScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.95]);

  const slogan1Opacity = useTransform(scrollYProgress, [0.25, 0.32, 0.42, 0.48], [0, 1, 1, 0]);
  const slogan1Y = useTransform(scrollYProgress, [0.25, 0.48], [60, -60]);

  const slogan2Opacity = useTransform(scrollYProgress, [0.52, 0.58, 0.68, 0.74], [0, 1, 1, 0]);
  const slogan2Y = useTransform(scrollYProgress, [0.52, 0.74], [60, -60]);

  const ctaOpacity = useTransform(scrollYProgress, [0.82, 0.9], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.82, 0.9], [60, 0]);
  const ctaScale = useTransform(scrollYProgress, [0.82, 0.9], [0.9, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]" style={{ background: "var(--bg-primary)" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at center, transparent 40%, var(--bg-primary) 100%)"
        }} />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
          background: "linear-gradient(to top, var(--bg-primary), transparent)"
        }} />

        {/* 0% - Hero Title */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 md:mb-8"
            style={{ color: "var(--accent)" }}
          >
            Est. 2018 — Indonesia
          </motion.p>
          <h1 className="text-[11vw] sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.05em] uppercase leading-[0.85] mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="block">Fore</span>
            <span className="block font-light italic" style={{ color: "var(--accent)" }}>Coffee</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-light max-w-md" style={{ color: "var(--text-secondary)" }}>
            A sip of perfection, crafted for connoisseurs.
          </p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border flex justify-center pt-1.5"
              style={{ borderColor: "var(--border-medium)" }}
            >
              <motion.div
                animate={{ height: ["4px", "12px", "4px"], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 30% - Slogan Left */}
        <motion.div
          style={{ opacity: slogan1Opacity, y: slogan1Y }}
          className="absolute inset-0 flex items-center justify-start text-left pointer-events-none px-8 md:px-20 lg:px-32"
        >
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6" style={{ color: "var(--accent)" }}>
              The Ritual
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[1.05]" style={{ color: "var(--text-primary)" }}>
              Crafted for <br />
              <span className="font-bold italic" style={{ color: "var(--accent)" }}>Morning</span>
              <br />
              <span className="font-bold italic" style={{ color: "var(--accent)" }}>Dreamers</span>.
            </h2>
          </div>
        </motion.div>

        {/* 60% - Slogan Right */}
        <motion.div
          style={{ opacity: slogan2Opacity, y: slogan2Y }}
          className="absolute inset-0 flex items-center justify-end text-right pointer-events-none px-8 md:px-20 lg:px-32"
        >
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6" style={{ color: "var(--accent)" }}>
              The Origin
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-[1.05]" style={{ color: "var(--text-primary)" }}>
              Sourced from <br />
              <span className="font-bold italic" style={{ color: "var(--accent)" }}>Pristine</span>
              <br />
              <span className="font-bold italic" style={{ color: "var(--accent)" }}>Lands</span>.
            </h2>
          </div>
        </motion.div>

        {/* 90% - CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, scale: ctaScale }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] mb-6" style={{ color: "var(--accent)" }}>
            Experience
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-10" style={{ color: "var(--text-primary)" }}>
            Taste the Magic.
          </h2>
          <button
            className="group relative px-10 py-4 rounded-full overflow-hidden font-medium text-base md:text-lg pointer-events-auto border transition-all duration-500 hover:shadow-lg"
            style={{
              background: "var(--accent)",
              color: "white",
              borderColor: "var(--accent)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <span className="relative z-10 tracking-wide">Order Now</span>
            <div className="absolute inset-0 h-full w-full transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
              style={{ background: "var(--accent-hover)" }}
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
