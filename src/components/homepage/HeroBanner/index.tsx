"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "/banners/AstrologerHomePageBanners.png",
    alt: "Shri Ram Raksha Yantra",
    href: "/shop",
    btnLabel: "Book Now",
  },
  {
    id: 2,
    src: "/banners/AstrologerHomePageBanners2.png",
    alt: "Yagya Puja",
    href: "/shop",
    btnLabel: "अभी बुक करें",
  },
];

const AUTOPLAY_DELAY = 4500;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.04,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.38, ease: "easeInOut" },
  }),
};

const NavBtn = ({
  onClick,
  label,
  children,
  side,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  side: "left" | "right";
}) => (
  <div
    className={`hidden sm:block absolute ${
      side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
    } top-1/2 -translate-y-1/2 z-10`}
  >
    <motion.button
      whileHover={{ scale: 1.12, backgroundColor: "rgba(255,255,255,0.72)" }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={label}
      className="flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 text-white shadow-md transition-colors duration-300"
    >
      {children}
    </motion.button>
  </div>
);

const HeroBanner = () => {
  const [[current, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  const paginate = useCallback((newDir: number) => {
    setPage(([prev]) => [
      (prev + newDir + slides.length) % slides.length,
      newDir,
    ]);
  }, []);

  // Preload all slides so cached images never miss onLoad on slide change
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.src;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => paginate(1), AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [current, paused, paginate]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full aspect-[1920/600] overflow-hidden rounded-2xl md:mx-0 md:rounded-none bg-brand-cream-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 cursor-grab active:cursor-grabbing rounded-2xl sm:rounded-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) paginate(1);
            else if (info.offset.x > 60) paginate(-1);
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={current === 0}
            className="object-cover select-none pointer-events-none"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <NavBtn onClick={() => paginate(-1)} label="Previous slide" side="left">
        <ChevronLeft size={18} strokeWidth={2.5} />
      </NavBtn>

      <NavBtn onClick={() => paginate(1)} label="Next slide" side="right">
        <ChevronRight size={18} strokeWidth={2.5} />
      </NavBtn>

      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="focus:outline-none"
          >
            <motion.span
              animate={{
                width: i === current ? 24 : 8,
                backgroundColor:
                  i === current ? "#ED940B" : "rgba(255,255,255,0.6)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="block h-2 rounded-full"
              style={{ width: 8 }}
            />
          </button>
        ))}
      </div>

      {!paused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[3px] w-full origin-left z-10 rounded-b-2xl sm:rounded-none"
          style={{ background: "var(--brand-orange)" }}
        />
      )}
    </section>
  );
};

export default HeroBanner;
