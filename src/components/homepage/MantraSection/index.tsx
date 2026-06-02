"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MANTRA_DATA } from "@/utils/mantraData";
import { useLanguageStore } from "@/lib/stores/languageStore";

const AUTO_SCROLL_MS = 6000;
const SWIPE_THRESHOLD = 60;

// Mobile: full-width slide (clipped by overflow-hidden wrapper)
const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? "100%" : "-100%" }),
  center: { opacity: 1, x: 0, transition: { duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] as any } },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? "-100%" : "100%",
    transition: { duration: 0.3, ease: [0.55, 0.055, 0.675, 0.19] as any },
  }),
};

// Desktop: fade+y per slot (grid stays stable — no collapse)
const fadeVariants = {
  enter: { opacity: 0, y: 10, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: "easeOut" } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.26, ease: "easeIn" } },
};

const copy = {
  en: {
    title: "Benefits Of Hindu Mantras",
    subtitle: "MANTRAS",
  },
  hi: {
    title: "हिंदू मंत्रों के लाभ",
    subtitle: "मंत्र",
  },
};

const CardBody = ({ item }: { item: (typeof MANTRA_DATA)[0] }) => (
  <>
    <div className="flex items-center gap-2 mb-3 text-brand-orange">
      <Sparkles size={16} />
      <div className="h-[1px] w-14 bg-brand-orange/60" />
    </div>
    <h3 className="text-2xl md:text-3xl font-bold text-brand-brown mb-3 leading-tight">{item.title}</h3>
    <p className="text-base leading-8 text-brand-brown/90">{item.description}</p>
  </>
);

const MantraSection = () => {
  const { language } = useLanguageStore();
  const [direction, setDirection] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalItems = MANTRA_DATA.length;

  const goToIndex = (next: number, nextDir: number) => {
    setDirection(nextDir);
    setActiveIndex((next + totalItems) % totalItems);
  };
  const prev = () => goToIndex(activeIndex - 1, -1);
  const next = () => goToIndex(activeIndex + 1, 1);

  // Desktop: show 2 consecutive cards
  const desktopItems = isDesktop
    ? [MANTRA_DATA[activeIndex], MANTRA_DATA[(activeIndex + 1) % totalItems]]
    : [];

  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((p) => (p + 1) % totalItems);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [isPaused, totalItems]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-frame mx-auto px-4 xl:px-0 py-10 md:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-5 mb-7 md:mb-9">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.05, duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-brand-brown tracking-tight">
            {copy[language].title}
          </h2>
          <p className="text-sm md:text-base text-brand-brown/70 mt-1.5">{copy[language].subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
          className="flex items-center gap-2 shrink-0"
        >
          <button
            onClick={prev}
            aria-label="Previous mantra"
            className="w-10 h-10 rounded-full bg-brand-brown text-white hover:bg-brand-brown-hover transition-colors duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next mantra"
            className="w-10 h-10 rounded-full bg-brand-brown text-white hover:bg-brand-brown-hover transition-colors duration-300 flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Cards — pointer events handle swipe, no visual transform on container */}
      <div
        className="cursor-grab active:cursor-grabbing select-none"
        onPointerDown={(e) => {
          pointerStartX.current = e.clientX;
          pointerStartY.current = e.clientY;
          setIsPaused(true);
        }}
        onPointerUp={(e) => {
          const dx = e.clientX - pointerStartX.current;
          const dy = e.clientY - pointerStartY.current;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
            if (dx < 0) next();
            else prev();
          }
          setIsPaused(false);
        }}
        onPointerLeave={() => setIsPaused(false)}
      >
        {/* Mobile: single-card slider, clipped by overflow-hidden */}
        <div className="lg:hidden overflow-hidden rounded-3xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative rounded-3xl border border-[#e8c9aa] bg-white/55 backdrop-blur-sm p-6 shadow-[0_10px_30px_rgba(93,27,3,0.08)]"
            >
              <CardBody item={MANTRA_DATA[activeIndex]} />
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Desktop: stable 2-column grid, each slot has its own AnimatePresence (no grid collapse) */}
        <div className="hidden lg:grid grid-cols-2 gap-5">
          {desktopItems.map((item, slot) => (
            <AnimatePresence key={slot} mode="wait">
              <motion.article
                key={`slot-${slot}-${item.id}`}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="relative rounded-3xl border border-[#e8c9aa] bg-white/55 backdrop-blur-sm p-7 shadow-[0_10px_30px_rgba(93,27,3,0.08)]"
              >
                <CardBody item={item} />
              </motion.article>
            </AnimatePresence>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.26, duration: 0.35, ease: "easeOut" }}
        className="mt-6 flex items-center gap-2 justify-center lg:justify-start"
      >
        {Array.from({ length: totalItems }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToIndex(i, i > activeIndex ? 1 : -1)}
            aria-label={`Go to mantra ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-brand-orange" : "w-2.5 bg-brand-brown/30 hover:bg-brand-brown/50"
            }`}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MantraSection;
