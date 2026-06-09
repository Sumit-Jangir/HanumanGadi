"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGalleryStore } from "@/lib/stores/galleryStore";
import { useLanguageStore } from "@/lib/stores/languageStore";
import { Images } from "lucide-react";

const copy = {
  en: { title: "Our Gallery", subtitle: "Glimpses of devotion & divine moments" },
  hi: { title: "हमारी गैलरी", subtitle: "भक्ति और दिव्य क्षणों की झलक" },
};

const GallerySection = () => {
  const router = useRouter();
  const { language } = useLanguageStore();
  const { images, fetchGallery, loading } = useGalleryStore();
  const t = copy[language];

  useEffect(() => {
    // Only fetch if not already loaded
    if (images.length === 0) {
      fetchGallery();
    }
  }, [fetchGallery, images.length]);

  const preview = images.slice(0, 4);

  const getProxyImage = (src: string) =>
    src?.startsWith("http")
      ? `/api/image-proxy?url=${encodeURIComponent(src)}`
      : src;

  return (
    <section className="bg-[#e8d5be] py-10 md:py-14 md:px-14 mx-2 md:mx-6 xl:mx-16 rounded-tl-[50px] md:rounded-tl-[100px] rounded-br-[50px] md:rounded-br-[100px]">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 md:mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">
            {t.title}
          </h2>
          {/* <p className="text-base text-brand-brown/80 mt-1">
            Glimpses of devotion & divine moments
          </p> */}
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/gallery")}
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-slide text-white text-sm font-semibold shadow-md"
        >
          <Images size={16} />
          View All
        </motion.button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((k) => (
            <div
              key={k}
              className="rounded-2xl bg-[#f3e7dc] animate-pulse aspect-square"
            />
          ))}
        </div>
      ) : preview.length === 0 ? (
        <div className="rounded-2xl bg-white/80 border border-[#e7c9a6] p-8 text-brand-brown/70 text-center">
          No gallery images available.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {preview.map((src, index) => {
            const proxied = getProxyImage(src);
            // Make first image span 2 rows on md+
            const isFeatured = index === 0;
            return (
              <motion.div
                key={src + index}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, y: -4 }}
                // onClick={() => router.push("/gallery")}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-[#e7c9a6] shadow-md hover:shadow-xl hover:border-[#8b5a3c] transition-all duration-500 ${
                  isFeatured ? "md:row-span-2" : ""
                }`}
              >
                <div
                  className={`w-full overflow-hidden ${
                    isFeatured ? "aspect-square md:h-full" : "aspect-square"
                  }`}
                >
                  <img
                    src={proxied}
                    alt={`Gallery image ${index + 1}`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay on hover */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-[#3b1a08]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-semibold tracking-wide uppercase bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                    View
                  </span>
                </div> */}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Mobile view-all button */}
      <div className="mt-6 flex sm:hidden justify-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/gallery")}
          className="flex items-center gap-2 px-6 py-3 rounded-full btn-gradient-slide text-white text-sm font-semibold shadow-md"
        >
          <Images size={16} />
          View All Photos
        </motion.button>
      </div>
      </div>
    </section>
  );
};

export default GallerySection;
