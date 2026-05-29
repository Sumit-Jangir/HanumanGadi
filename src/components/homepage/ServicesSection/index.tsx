"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getHomeServices, HomeProduct } from "@/services/product";
import { useLanguageStore } from "@/lib/stores/languageStore";

const copy = {
  en: {
    title: "Our Services",
    subtitle: "A TEMPLE THAT'S RELEVANT SERVICES",
    cta: "View More",
    empty: "No services available right now.",
  },
  hi: {
    title: "हमारी सेवाएं",
    subtitle: "एक मंदिर जो प्रासंगिक सेवाएं प्रदान करता है",
    cta: "और देखें",
    empty: "अभी कोई सेवा उपलब्ध नहीं है।",
  },
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

const ServicesSection = () => {
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
        console.error("Failed to load home services", error);
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


  const services = useMemo(() => items.slice(0, 3), [items]);
  const t = copy[language];

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-10 md:py-14">
      <div className="mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">
          {t.title}
        </h2>
        <p className="text-base text-brand-brown/80 mt-1">{t.subtitle}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className="relative rounded-2xl bg-white/80 border border-[#e7c9a6] shadow-md overflow-hidden flex flex-col h-[520px]"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/80 via-[#f3e7dc]/60 to-white/80 animate-skeleton-shimmer" style={{backgroundSize:'200% 100%'}} />
              {/* Image placeholder */}
              <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="w-4/5 h-60 bg-[#f3e7dc] rounded-xl mb-4" />
              </div>
              {/* Content placeholder */}
              <div className="z-10 px-6 pb-6 pt-2 flex flex-col gap-3">
                <div className="h-6 w-3/4 bg-[#f3e7dc] rounded mb-2" />
                <div className="h-4 w-1/4 bg-[#f3e7dc] rounded mb-2" />
                <div className="h-7 w-full bg-[#e7c9a6] rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl bg-white/80 border border-white p-8 text-brand-brown/80">
          {t.empty}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
          {services.map((item, index) => {
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
                className="group h-full max-w-[340px] xs:max-w-[365px] sm:max-w-[400px] min-w-[340px] xs:min-w-[365px] sm:min-w-[400px] overflow-hidden rounded-2xl bg-white/90 border border-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-[380px] md:h-[400px] bg-[#fff8f1] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={title || "Service image"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-brand-brown leading-tight line-clamp-2">
                    {title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-brand-orange">
                      {formatPrice(item.price)}
                    </span>

                    <span className="text-xs px-3 py-1.5 rounded-full bg-brand-orange-muted text-brand-brown whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>

                  <Link
                    href={`/shop`}
                    className="mt-5 btn-gradient-slide inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-white"
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
  );
};

export default ServicesSection;