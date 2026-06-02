"use client";

import React from "react";
import Image from "next/image";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fdfaf5]">
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* Soft pulse circle */}
        <div className="absolute h-28 w-28 animate-ping rounded-full bg-[#ED940B]/15" />

        {/* Thin rotating ring */}
        <div className="absolute h-28 w-28 animate-spin rounded-full border-2 border-transparent border-t-[#ED940B] border-r-[#61341c]" />

        {/* Logo */}
        <div className="z-10 flex h-24 w-24 items-center justify-center rounded-full border border-[#f3d2a5] bg-white shadow-md">
          <Image
            src="/logo/logo.svg"
            alt="Hanuman Gadi"
            width={60}
            height={60}
            className="h-15 w-15 object-contain"
            priority
          />
        </div>
      </div>

      <div className="mt-3 flex gap-2 text-base font-bold text-[#61341c]">
        {["राम", "राम", "राम"].map((word, index) => (
          <span
            key={index}
            className="animate-bounce"
            style={{
              animationDelay: `${index * 0.18}s`,
              fontFamily: "serif",
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PageLoader;