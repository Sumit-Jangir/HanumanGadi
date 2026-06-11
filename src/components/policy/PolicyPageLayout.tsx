"use client";

import { motion } from "framer-motion";

type PolicyPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function PolicyPageLayout({
  title,
  children,
}: PolicyPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fdf8f2]">
      {/* <div className="h-1 bg-gradient-to-r from-brand-orange via-[#d48806] to-brand-orange" /> */}

      <div className="pt-7 md:pt-9 px-4 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl md:text-4xl font-bold text-brand-brown text-center"
        >
          {title}
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 xl:px-0 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/95 border border-[#e7c9a6] rounded-2xl shadow-sm p-6 md:p-10 text-gray-800"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
