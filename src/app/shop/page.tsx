"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getHomeServices, HomeProduct } from "@/services/product";
import { useLanguageStore, type AppLanguage } from "@/lib/stores/languageStore";
import Image from "next/image";
import useAuthStore from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";
import ProductCartAction from "@/components/product/ProductCartAction";

const SKELETON_COUNT = 3;
const ADDED_FEEDBACK_MS = 1500;
const FALLBACK_IMAGE = "/banners/AstrologerContactUs.png";
const PRODUCT_GRID =
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center items-stretch gap-6";

const copy = {
  en: {
    title: "Our Products",
    cta: "Add to Cart",
    adding: "Adding...",
    added: "Added!",
    yagyaInCart: "Already in cart",
    empty: "No products available right now.",
  },
  hi: {
    title: "हमारे उत्पाद",
    cta: "कार्ट में जोड़ें",
    adding: "जोड़ा जा रहा है...",
    added: "जुड़ गया!",
    yagyaInCart: "पहले से कार्ट में है",
    empty: "अभी कोई उत्पाद उपलब्ध नहीं है।",
  },
} as const;

type ShopCopy = (typeof copy)[AppLanguage];

const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const formatPrice = (price: number) => priceFormatter.format(price || 0);

const getLocalizedTitle = (item: HomeProduct, language: AppLanguage) =>
  language === "hi" ? item.titleHi || item.title : item.title;

const getProductImageSrc = (image?: string) =>
  image?.startsWith("http")
    ? `/api/image-proxy?url=${encodeURIComponent(image)}`
    : FALLBACK_IMAGE;

function ShopProductSkeleton() {
  return (
    <div className="flex flex-col h-full max-w-[280px] sm:max-w-[320px] min-w-[280px] sm:min-w-[320px] overflow-hidden rounded-2xl bg-white/95 border border-[#e7c9a6] shadow-md animate-pulse">
      <div className="relative shrink-0 -mt-7 pt-3 h-[270px] md:h-[300px] bg-[#f3e7dc]" />
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="h-6 w-3/4 bg-[#f3e7dc] rounded min-h-[2.5em]" />
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-20 bg-[#e7c9a6] rounded" />
          <div className="h-6 w-16 bg-[#f3e7dc] rounded-full" />
        </div>
        <div className="h-12 w-full bg-[#e7c9a6] rounded-2xl mt-auto" />
      </div>
    </div>
  );
}

type ShopProductCardProps = {
  item: HomeProduct;
  index: number;
  language: AppLanguage;
  labels: ShopCopy;
  isUpdating: boolean;
  isAdded: boolean;
  onAddToCart: (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => void;
  onIncreaseQty: (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => void;
  onDecreaseQty: (
    e: React.MouseEvent<HTMLButtonElement>,
    item: HomeProduct
  ) => void;
  onNavigate: (slug: string) => void;
};

const ShopProductCard = memo(function ShopProductCard({
  item,
  index,
  language,
  labels,
  isUpdating,
  isAdded,
  onAddToCart,
  onIncreaseQty,
  onDecreaseQty,
  onNavigate,
}: ShopProductCardProps) {
  const title = getLocalizedTitle(item, language);
  const imageSrc = getProductImageSrc(item.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      onClick={() => onNavigate(item.slug)}
      className="group flex flex-col h-full max-w-[280px] sm:max-w-[320px] min-w-[280px] sm:min-w-[320px] overflow-hidden rounded-2xl bg-white/95 border border-[#e7c9a6] shadow-md hover:shadow-2xl hover:border-[#8b5a3c] transition-all duration-500 relative hover:bg-[#fffdfb]"
    >
      <div className="relative shrink-0 -mt-7 pt-3 h-[270px] md:h-[300px] overflow-hidden">
        <img
          src={imageSrc}
          alt={title || "Product image"}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/90 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl sm:text-2xl font-semibold text-brand-brown leading-tight transition-colors duration-300 group-hover:text-[#6b3b22]">
          {title}
        </h3>

        <div className="mt-2 sm:mt-4 flex items-center justify-between gap-3">
          <span className="text-base font-bold text-[#7a4326] transition-transform duration-300 group-hover:scale-105">
            {formatPrice(item.price)}
          </span>

          <span className="text-xs px-3 py-1.5 border border-[#6b3b22] rounded-full bg-[#f3e7dc] text-brand-brown whitespace-nowrap transition-all duration-300 group-hover:bg-[#6b3b22] group-hover:text-white">
            {item.category}
          </span>
        </div>

        <div className="mt-5 w-full flex justify-center">
          <ProductCartAction
            item={item}
            labels={labels}
            isUpdating={isUpdating}
            isAdded={isAdded}
            onAdd={(e) => onAddToCart(e, item)}
            onIncrease={(e) => onIncreaseQty(e, item)}
            onDecrease={(e) => onDecreaseQty(e, item)}
            className="w-full"
          />
        </div>
      </div>
    </motion.article>
  );
});

export default function ShopPage() {
  const { language } = useLanguageStore();
  const router = useRouter();
  const { isLoggedIn, openLogin } = useAuthStore();
  const { addToCart, removeFromCart } = useCartStore();

  const [items, setItems] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const addedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[language];

  const loadProducts = useCallback(async () => {
    const data = await getHomeServices();
    setItems(data);
  }, []);

  const handleNavigate = useCallback(
    (slug: string) => {
      router.push(`/shop/product/${slug}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, item: HomeProduct) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isLoggedIn) {
        openLogin();
        return;
      }

      const productId = item.slug;
      if (!productId) return;

      try {
        setUpdatingId(productId);
        setAddedId(null);

        await addToCart(productId, "1");
        await loadProducts();

        setAddedId(productId);

        if (addedTimeoutRef.current) {
          clearTimeout(addedTimeoutRef.current);
        }

        addedTimeoutRef.current = setTimeout(() => {
          setAddedId(null);
          addedTimeoutRef.current = null;
        }, ADDED_FEEDBACK_MS);
      } catch (error) {
        console.error("Add to cart failed:", error);
      } finally {
        setUpdatingId(null);
      }
    },
    [addToCart, isLoggedIn, loadProducts, openLogin]
  );

  const handleIncreaseQty = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, item: HomeProduct) => {
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
    },
    [addToCart, isLoggedIn, loadProducts, openLogin]
  );

  const handleDecreaseQty = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>, item: HomeProduct) => {
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
    },
    [addToCart, isLoggedIn, loadProducts, openLogin, removeFromCart]
  );

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

  useEffect(() => {
    return () => {
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
    };
  }, []);

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
          <div className={PRODUCT_GRID}>
            {Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <ShopProductSkeleton key={index} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white/80 border border-white p-8 text-brand-brown/80">
            {t.empty}
          </div>
        ) : (
          <div className={PRODUCT_GRID}>
            {items.map((item, index) => (
              <ShopProductCard
                key={item.id}
                item={item}
                index={index}
                language={language}
                labels={t}
                isUpdating={updatingId === item.slug}
                isAdded={addedId === item.slug}
                onAddToCart={handleAddToCart}
                onIncreaseQty={handleIncreaseQty}
                onDecreaseQty={handleDecreaseQty}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
