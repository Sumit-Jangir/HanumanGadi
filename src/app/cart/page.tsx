"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/lib/stores/languageStore";
import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import CartItemRow from "@/components/cart-page/CartItemRow";
import OrderSummary from "@/components/cart-page/OrderSummary";
import type { CartItem } from "@/types/cart";


const DUMMY_CART: CartItem[] = [
  {
    user_id: "75796fa8e09aa33e2ee615979b2de23173fbf2a6",
    slug: "ram-raksha-yantra17745389943616",
    product_name: "Ram Raksha Yantra",
    product_price: "8100",
    cod_charges: "500",
    sku: "Ram Yantra 1234",
    qty: 1,
    total_price: "8100",
    image_path:
      "https://www.hanumangadi.com/hanumangadi/media/product_images/76d74a023ecbc6afdd2174b802e0c281c49922d6.jpeg",
    codprice: 4300,
  },
];

const content = {
  en: {
    bannerAlt: "Shopping Cart - Hanumangadi",
    // pageHeading: "Shopping Cart",
    productDetails: "Product Details",
    price: "Price",
    quantity: "Quantity",
    sku: "SKU",
    remove: "Remove item",
    emptyTitle: "Your cart is empty",
    emptyDesc: "Explore our sacred Yantras and add something meaningful.",
    shopNow: "Continue Shopping",
    summary: {
      title: "Order Summary",
      subtotal: "Estimated Subtotal",
      shipping: "Shipping",
      codCharges: "COD Charges",
      orderTotal: "Order Total",
      checkout: "Proceed to Checkout",
      codNote: "Cash on delivery charges apply at checkout.",
    },
  },
  hi: {
    bannerAlt: "शॉपिंग कार्ट - हनुमानगढ़ी",
    // pageHeading: "शॉपिंग कार्ट",
    productDetails: "उत्पाद विवरण",
    price: "कीमत",
    quantity: "मात्रा",
    sku: "SKU",
    remove: "आइटम हटाएं",
    emptyTitle: "आपकी कार्ट खाली है",
    emptyDesc: "हमारे पवित्र यंत्र देखें और अपनी कार्ट में जोड़ें।",
    shopNow: "खरीदारी जारी रखें",
    summary: {
      title: "ऑर्डर सारांश",
      subtotal: "अनुमानित उप-योग",
      shipping: "शिपिंग",
      codCharges: "COD शुल्क",
      orderTotal: "कुल राशि",
      checkout: "चेकआउट पर जाएं",
      codNote: "कैश ऑन डिलीवरी शुल्क चेकआउट पर लागू होगा।",
    },
  },
};

export default function CartPage() {
  const language = useLanguageStore((s) => s.language);
  const t = content[language];
  const [items, setItems] = useState<CartItem[]>(DUMMY_CART);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + (parseInt(item.product_price, 10) || 0) * item.qty,
        0
      ),
    [items]
  );

  const codCharges = useMemo(() => {
    if (items.length === 0) return 0;
    return parseInt(items[0].cod_charges, 10) || 0;
  }, [items]);

  const shipping = items.length > 0 ? 0 : 0;

  const orderTotal = subtotal + shipping;

  const handleQtyChange = (slug: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, qty } : item))
    );
  };

  const handleRemove = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const handleCheckout = () => {
    // Placeholder until checkout flow is wired
    window.alert(
      language === "hi"
        ? "चेकआउट जल्द ही उपलब्ध होगा।"
        : "Checkout will be available soon."
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="theme-page max-w-[1900px] mx-auto overflow-x-hidden min-h-screen"
    >
      {/* Hero banner — same pattern as About Us / Contact */}
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="m-3 md:m-0"
        >
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-full h-auto rounded-2xl md:rounded-none overflow-hidden shadow-lg md:shadow-none"
          >
            <Image
              src="/banners/AstrologerAboutYantra.png"
              alt={t.bannerAlt}
              width={1920}
              height={600}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center py-8 px-4"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-[#7b1c1c] uppercase">
            {t.pageHeading}
          </h1>
        </motion.div> */}
      </section>

      {/* Cart body */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* <BreadcrumbCart /> */}

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="theme-card relative p-12 text-center"
          >
            <div className="absolute -inset-2 rounded-3xl bg-brand-cream blur-2xl opacity-60 -z-10" />
            <p className="text-2xl font-bold text-gray-800">{t.emptyTitle}</p>
            <p className="mt-2 text-gray-500">{t.emptyDesc}</p>
            <Link
              href="/shop"
              className="btn-gradient-slide mt-8 inline-flex items-center justify-center px-8 py-3"
            >
              {t.shopNow}
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10"
          >
            {/* Product list */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <motion.div
                  className="pointer-events-none absolute -inset-2 rounded-3xl bg-brand-cream blur-2xl opacity-50 -z-10"
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />

                <div className="theme-card p-5 md:p-8">
                  {/* Table header — desktop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2 hidden border-b border-brand-brown/10 pb-4 text-xs font-bold uppercase tracking-widest text-gray-500 sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:gap-6 sm:pl-12"
                  >
                    <span className="sm:col-span-2 sm:pl-0">{t.productDetails}</span>
                    <span className="text-right">{t.price}</span>
                    <span className="text-right">{t.quantity}</span>
                  </motion.div>

                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.slug}
                        item={item}
                        labels={{
                          price: t.price,
                          quantity: t.quantity,
                          sku: t.sku,
                          remove: t.remove,
                        }}
                        onQtyChange={handleQtyChange}
                        onRemove={handleRemove}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <motion.div
              className="w-full lg:w-[380px] flex-shrink-0"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                orderTotal={orderTotal}
                labels={t.summary}
                onCheckout={handleCheckout}
              />
            </motion.div>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}
