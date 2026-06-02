"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { MANTRA_DATA } from "@/utils/mantraData";
import { useLanguageStore } from "@/lib/stores/languageStore";

const AUTO_SCROLL_MS = 6000;
const SWIPE_THRESHOLD = 70;

const cardVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 90 : -90, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -90 : 90,
    scale: 0.98,
    transition: { duration: 0.32, ease: "easeInOut" },
  }),
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

const MantraSection = () => {
  const { language } = useLanguageStore();
  const [direction, setDirection] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const totalItems = MANTRA_DATA.length;

  const currentItems = useMemo(() => {
    if (!totalItems) return [];
    if (!isDesktop) return [MANTRA_DATA[activeIndex]];

    const nextIndex = (activeIndex + 1) % totalItems;
    return [MANTRA_DATA[activeIndex], MANTRA_DATA[nextIndex]];
  }, [activeIndex, isDesktop, totalItems]);

  const goToIndex = (next: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((next + totalItems) % totalItems);
  };

  const prev = () => goToIndex(activeIndex - 1, -1);
  const next = () => goToIndex(activeIndex + 1, 1);

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
      <div className="flex items-start justify-between gap-5 mb-7 md:mb-9">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.05, duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown tracking-tight">{copy[language].title}</h2>
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

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.18, duration: 0.45, ease: "easeOut" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.30}
        onDragStart={() => setIsPaused(true)}
        onDragEnd={(_, info) => {
          if (info.offset.x <= -SWIPE_THRESHOLD) {
            next();
            return;
          }
          if (info.offset.x >= SWIPE_THRESHOLD) {
            prev();
          }
        }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 cursor-grab active:cursor-grabbing"
      >
        <LayoutGroup id="mantra-cards">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          {currentItems.map((item) => (
            <motion.article
              key={item.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-3xl border border-[#e8c9aa] bg-white/55 backdrop-blur-sm p-6 md:p-7 shadow-[0_10px_30px_rgba(93,27,3,0.08)]"
            >
              <div className="flex items-center gap-2 mb-3 text-brand-orange">
                <Sparkles size={16} />
                <div className="h-[1px] w-14 bg-brand-orange/60" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-brand-brown mb-3 leading-tight">{item.title}</h3>
              <p className="text-base leading-8 text-brand-brown/90">{item.description}</p>
            </motion.article>
          ))}
        </AnimatePresence>
        </LayoutGroup>
      </motion.div>

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
            className={`h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-brand-orange" : "w-2.5 bg-brand-brown/30 hover:bg-brand-brown/50"}`}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MantraSection;
