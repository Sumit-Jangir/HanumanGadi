"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getHomeServices, HomeProduct } from "@/services/product";
import { useLanguageStore } from "@/lib/stores/languageStore";
import Image from "next/image";


const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
};


const copy = {
  en: {
    title: "Our Products",
    subtitle: "Explore our Yantra and Yagya offerings",
    cta: "Add to Cart",
    empty: "No products available right now.",
  },
  hi: {
    title: "हमारे उत्पाद",
    subtitle: "हमारे यंत्र और यज्ञ देखें",
    cta: "कार्ट में जोड़ें",
    empty: "अभी कोई उत्पाद उपलब्ध नहीं है।",
  },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);


export default function ShopPage() {
  const { language } = useLanguageStore();
  const [items, setItems] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await getHomeServices();
        if (active) setItems(data);
      } catch (error) {
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const products = items;
  const t = copy[language];

  return (
    <div className="max-w-[1900px] mx-auto bg-[#fdf8f2] overflow-x-hidden">
      {/* Banner Section */}
      <section className="w-full">
        <div className="m-3 md:m-0">
          <div className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden">
            <Image
              src={"/banners/AstrologerAboutYantra.png"}
              alt="Shop Banner"
              width={1920}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center py-8 px-4"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-[#7b1c1c] uppercase">
            {t.title}
          </h1>
        </motion.div> */}
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">
            {t.title}
          </h2>
          {/* <p className="text-base text-brand-brown/80 mt-1">{t.subtitle}</p> */}
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((key) => (
              <div
                key={key}
                className="rounded-2xl bg-white/70 border border-white animate-pulse h-[520px]"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-white/80 border border-white p-8 text-brand-brown/80">
            {t.empty}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
            {products.map((item, index) => {
              const title =
                language === "hi" ? item.titleHi || item.title : item.title;
              const imageSrc =
                item.image && item.image.startsWith("http")
                  ? `/api/image-proxy?url=${encodeURIComponent(item.image)}`
                  : "/banners/AstrologerContactUs.png";
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className="
                          group h-full max-w-[400px] min-w-[400px]
                          overflow-hidden rounded-2xl
                          bg-white/95
                          border border-[#e7c9a6]
                          shadow-md
                          hover:shadow-2xl
                          hover:border-[#8b5a3c]
                          transition-all duration-500
                          relative
                          before:rounded-2xl
                          before:border before:border-transparent
                          before:transition-all before:duration-500
                          hover:bg-[#fffdfb]
                          "                >
                  <div className="relative -mt-7 pt-3 h-[380px] md:h-[400px] overflow-hidden">                  
                    <img
                    src={imageSrc}
                    alt={title || "Product image"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />

                    {/* Gradient Overlay */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}

                    {/* Bottom Fade */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />
                  </div>

                  <div className="p-5">
                    <h3 className="text-2xl font-semibold text-brand-brown leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-[#6b3b22]">
                      {title}
                    </h3>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-[#7a4326] transition-transform duration-300 group-hover:scale-105">
                        {formatPrice(item.price)}
                      </span>

                      <span className="text-xs px-3 py-1.5 border border-[#6b3b22] rounded-full bg-[#f3e7dc] text-brand-brown whitespace-nowrap transition-all duration-300 group-hover:bg-[#6b3b22] group-hover:text-white">
                        {item.category}
                      </span>
                    </div>

                    <Link
                      href={`/shop`}
                      className="mt-5 btn-gradient-slide inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]"
                    >
                      {t.cta}
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
