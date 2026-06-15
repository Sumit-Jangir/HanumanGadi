"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { getHomeServices, HomeProduct } from "@/services/product";
import { useLanguageStore } from "@/lib/stores/languageStore";
import useAuthStore from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import ProductCartAction from "@/components/product/ProductCartAction";

const copy = {
  en: {
    title: "Our Services",
    subtitle: "A TEMPLE THAT'S RELEVANT SERVICES",
    cta: "Add to Cart",
    adding: "Adding...",
    added: "Added!",
    yagyaInCart: "Already in cart",
    empty: "No services available right now.",
    viewAll: "View All",
  },
  hi: {
    title: "हमारी सेवाएं",
    subtitle: "एक मंदिर जो प्रासंगिक सेवाएं प्रदान करता है",
    cta: "कार्ट में जोड़ें",
    adding: "जोड़ा जा रहा है...",
    added: "जुड़ गया!",
    yagyaInCart: "पहले से कार्ट में है",
    empty: "अभी कोई सेवा उपलब्ध नहीं है।",
    viewAll: "सभी देखें",
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
  const { isLoggedIn, openLogin } = useAuthStore();
  const { addToCart, removeFromCart } = useCartStore();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const router = useRouter();
  const t = copy[language];

  const loadProducts = useCallback(async () => {
    const data = await getHomeServices();
    setItems(data);
  }, []);

  useEffect(() => {
    let active = true;

    loadProducts()
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isLoggedIn, loadProducts]);

  const services = useMemo(() => items.slice(0, 3), [items]);

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
      setUpdatingId(productId);
      setAddedId(null);
      await addToCart(productId, "1");
      await loadProducts();
      setAddedId(productId);
      setTimeout(() => {
        setAddedId(null);
      }, 1500);
    } catch (error) {
      console.error("Add to cart failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleIncreaseQty = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLogin();
      return;
    }

    const productId = item.slug;
    if (!productId) return;

    const nextQty = (item.cartQuantity || 1) + 1;

    try {
      setUpdatingId(productId);
      await addToCart(productId, String(nextQty));
      await loadProducts();
    } catch (error) {
      console.error("Increase quantity failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecreaseQty = async (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      openLogin();
      return;
    }

    const productId = item.slug;
    if (!productId) return;

    const currentQty = item.cartQuantity || 1;

    try {
      setUpdatingId(productId);

      if (currentQty <= 1) {
        await removeFromCart(productId, "1");
      } else {
        await addToCart(productId, String(currentQty - 1));
      }

      await loadProducts();
    } catch (error) {
      console.error("Decrease quantity failed:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="max-w-frame mx-auto px-4 xl:px-0 py-10 md:py-14">
      <div className="flex items-center justify-between gap-3 mb-8 md:mb-10">
        <div className="min-w-0">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown">
            {t.title}
          </h2>
          <p className="hidden md:block text-base text-brand-brown/80 mt-1">{t.subtitle}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/shop")}
          className="shrink-0 flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full btn-gradient-slide text-white text-sm font-semibold shadow-md"
        >
          <ShoppingBag size={16} />
          {t.viewAll}
        </motion.button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-items-center sm:items-stretch sm:gap-6">
          {[1, 2, 3].map((key) => (
            <div
              key={key}
              className="w-full max-w-[480px] sm:flex sm:flex-col sm:h-full sm:w-[280px] sm:max-w-none md:w-[320px] rounded-2xl border border-[#e7c9a6] bg-white/95 shadow-md overflow-hidden animate-pulse"
            >
              <div className="flex sm:hidden items-stretch gap-3 p-3">
                <div className="shrink-0 w-[100px] h-[100px] rounded-xl bg-[#f3e7dc]" />
                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                  <div className="space-y-2">
                    <div className="h-3.5 w-full bg-[#f3e7dc] rounded" />
                    <div className="h-3.5 w-3/4 bg-[#f3e7dc] rounded" />
                  </div>
                  <div className="h-8 w-full bg-[#e7c9a6] rounded-xl mt-2" />
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:flex-1">
                <div className="shrink-0 h-[220px] md:h-[270px] bg-[#f3e7dc]" />
                <div className="flex flex-1 flex-col p-4 md:p-5 space-y-3">
                  <div className="h-5 w-3/4 bg-[#f3e7dc] rounded min-h-[2.5em]" />
                  <div className="flex items-center justify-between gap-3">
                    <div className="h-4 w-20 bg-[#e7c9a6] rounded" />
                    <div className="h-6 w-16 bg-[#f3e7dc] rounded-full" />
                  </div>
                  <div className="h-12 w-full bg-[#e7c9a6] rounded-2xl mt-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl bg-white/80 border border-white p-8 text-brand-brown/80">
          {t.empty}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-items-center sm:items-stretch sm:gap-6">
          {services.map((item, index) => {
            const title =
              language === "hi" ? item.titleHi || item.title : item.title;
            const imageSrc =
              item.image && item.image.startsWith("http")
                ? `/api/image-proxy?url=${encodeURIComponent(item.image)}`
                : "/banners/AstrologerContactUs.png";
            const isUpdating = updatingId === item.slug;
            const isAdded = addedId === item.slug;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => router.push(`/shop/product/${item.slug}`)}
                className="group w-full max-w-[480px] sm:flex sm:flex-col sm:h-full sm:w-[280px] sm:max-w-none md:w-[320px] overflow-hidden rounded-2xl bg-white/95 border border-[#e7c9a6] shadow-md hover:shadow-xl hover:border-[#8b5a3c] transition-all duration-500 cursor-pointer"
              >
                {/* Below sm: horizontal layout */}
                <div className="flex sm:hidden items-stretch gap-3 p-3">
                  <div className="shrink-0 w-[100px] h-[100px] rounded-xl overflow-hidden bg-[#f9f3ec]">
                    <img
                      src={imageSrc}
                      alt={title || "Product image"}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-evenly flex-1 min-w-0">
                    <div>
                      <h3 className="text-sm font-semibold text-brand-brown leading-snug line-clamp-2 group-hover:text-[#6b3b22] transition-colors duration-300">
                        {title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#7a4326]">
                          {formatPrice(item.price)}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 border border-[#6b3b22] rounded-full bg-[#f3e7dc] text-brand-brown whitespace-nowrap">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 w-full flex justify-center">
                      <ProductCartAction
                        item={item}
                        labels={t}
                        isUpdating={isUpdating}
                        isAdded={isAdded}
                        onAdd={(e) => handleAddToCart(e, item)}
                        onIncrease={(e) => handleIncreaseQty(e, item)}
                        onDecrease={(e) => handleDecreaseQty(e, item)}
                        size="sm"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* sm+: equal-size vertical cards */}
                <div className="hidden sm:flex sm:flex-col sm:flex-1 sm:h-full">
                  <div className="relative shrink-0 -mt-5 pt-2 h-[220px] md:h-[270px] overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={title || "Product image"}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-semibold text-brand-brown leading-tight transition-colors duration-300 group-hover:text-[#6b3b22]">
                      {title}
                    </h3>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-sm md:text-base font-bold text-[#7a4326]">
                        {formatPrice(item.price)}
                      </span>
                      <span className="text-xs px-2.5 py-1 md:px-3 md:py-1.5 border border-[#6b3b22] rounded-full bg-[#f3e7dc] text-brand-brown whitespace-nowrap transition-all duration-300 group-hover:bg-[#6b3b22] group-hover:text-white">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-3 sm:mt-5 w-full flex justify-center">
                      <ProductCartAction
                        item={item}
                        labels={t}
                        isUpdating={isUpdating}
                        isAdded={isAdded}
                        onAdd={(e) => handleAddToCart(e, item)}
                        onIncrease={(e) => handleIncreaseQty(e, item)}
                        onDecrease={(e) => handleDecreaseQty(e, item)}
                        className="w-full"
                      />
                    </div>
                  </div>
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