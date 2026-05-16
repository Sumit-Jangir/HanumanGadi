"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
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

const truncate = (value: string, len = 150) =>
  value.length > len ? `${value.slice(0, len).trim()}...` : value;

const ServicesSection = () => {
  const { language } = useLanguageStore();
  const [items, setItems] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await getHomeServices();
        console.log("Fetched home services:", data);
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
  console.log("items state:", services);

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">{t.title}</h2>
          {/* <span className="h-[4px] w-14 rounded-full bg-brand-orange" /> */}
        </div>
        <p className="text-base text-brand-brown/80 mt-1">{t.subtitle}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((key) => (
            <div key={key} className="rounded-xl bg-white/70 border border-white animate-pulse h-[390px]" />
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-xl bg-white/70 border border-white p-8 text-brand-brown/80">
          {t.empty}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group rounded-xl bg-white/80 border border-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    item.image && item.image.startsWith('http')
                      ? `/api/image-proxy?url=${encodeURIComponent(item.image)}`
                      : "/banners/AstrologerContactUs.png"
                  }
                  alt={item.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 w-full h-full"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-semibold text-brand-brown leading-tight mb-2">
                  {language === "hi" ? item.titleHi || item.title : item.title}
                </h3>

                <p className="text-sm text-brand-brown/80 leading-6 min-h-[72px]">
                  {truncate(
                    language === "hi"
                      ? item.descriptionHi || item.description
                      : item.description
                  )}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand-orange">
                    {formatPrice(item.price)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-brand-orange-muted text-brand-brown">
                    {item.category}
                  </span>
                </div>

                <Link
                  href={`/shop/${item.slug}`}
                  className="mt-4 btn-gradient-slide inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  {t.cta}
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
