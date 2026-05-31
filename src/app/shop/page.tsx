"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getHomeServices, HomeProduct } from "@/services/product";
import { useLanguageStore } from "@/lib/stores/languageStore";
import Image from "next/image";
import useAuthStore from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import { FiCheckCircle, FiLoader } from "react-icons/fi";

const copy = {
  en: {
    title: "Our Products",
    subtitle: "Explore our Yantra and Yagya offerings",
    cta: "Add to Cart",
    adding: "Adding...",
    added: "Added!",
    empty: "No products available right now.",
  },
  hi: {
    title: "हमारे उत्पाद",
    subtitle: "हमारे यंत्र और यज्ञ देखें",
    cta: "कार्ट में जोड़ें",
    adding: "जोड़ा जा रहा है...",
    added: "जुड़ गया!",
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
  const router = useRouter();

  const [items, setItems] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, openLogin } = useAuthStore();
  const { addToCart } = useCartStore();

  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const t = copy[language];

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLogin();
      return;
    }

    const productId = item?.slug;
    if (!productId) return;

    try {
      setAddingId(productId);
      setAddedId(null);

      await addToCart(productId, "1");

      setAddedId(productId);

      setTimeout(() => {
        setAddedId(null);
      }, 1500);
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setAddingId(null);
    }
  };

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

  return (
    <div className="theme-page max-w-[1920px] mx-auto overflow-x-hidden">
      <section className="w-full">
        <div className="m-3 md:m-0">
          <div className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden">
            <Image
              src="/banners/AstrologerAboutYantra.png"
              alt="Shop Banner"
              width={1920}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">
            {t.title}
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((key) => (
              <div
                key={key}
                className="relative rounded-2xl bg-white/80 border border-[#e7c9a6] shadow-md overflow-hidden flex flex-col h-[520px]"
              >
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-white/80 via-[#f3e7dc]/60 to-white/80 animate-skeleton-shimmer"
                  style={{ backgroundSize: "200% 100%" }}
                />

                <div className="relative z-10 flex-1 flex items-center justify-center">
                  <div className="w-4/5 h-60 bg-[#f3e7dc] rounded-xl mb-4" />
                </div>

                <div className="z-10 px-6 pb-6 pt-2 flex flex-col gap-3">
                  <div className="h-6 w-3/4 bg-[#f3e7dc] rounded mb-2" />
                  <div className="h-4 w-1/4 bg-[#f3e7dc] rounded mb-2" />
                  <div className="h-7 w-full bg-[#e7c9a6] rounded-xl mt-4" />
                </div>
              </div>
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

              const isAdding = addingId === item.slug;
              const isAdded = addedId === item.slug;

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
                  onClick={() => router.push(`/shop/product/${item.slug}`)}
                  className="
                    group h-full max-w-[340px] xs:max-w-[365px] sm:max-w-[400px] min-w-[340px] sm:min-w-[400px]
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
                  "
                >
                  <div className="relative -mt-7 pt-3 h-[380px] md:h-[400px] overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title || "Product image"}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />

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

                    <motion.button
                      type="button"
                      onClick={(e) => handleAddToCart(e, item)}
                      disabled={isAdding}
                      className={`mt-5 w-full h-12 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${isAdded
                          ? "bg-green-500 text-white"
                          : "btn-gradient-slide text-white"
                        } ${isAdding ? "opacity-90 cursor-not-allowed" : ""
                        }`}
                    >
                      {isAdding ? (
                        <>
                          <FiLoader className="animate-spin" size={18} />
                          {t.adding}
                        </>
                      ) : isAdded ? (
                        <>
                          <FiCheckCircle size={18} />
                          {t.added}
                        </>
                      ) : (
                        <>
                          {t.cta}
                        </>
                      )}
                    </motion.button>
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