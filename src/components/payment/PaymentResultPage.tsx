"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Home,
  ShoppingBag,
  Hash,
  CreditCard,
  User,
  MapPin,
  Loader2,
} from "lucide-react";
import { getOrderStatus, OrderStatusResponse } from "@/services/order";

type PaymentVariant = "success" | "failure";

const formatPrice = (val: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

function AnimatedIcon({ variant }: { variant: PaymentVariant }) {
  const isSuccess = variant === "success";

  return (
    <div className="relative mb-4 flex items-center justify-center">
      <motion.div
        className={`absolute h-24 w-24 rounded-full ${isSuccess ? "bg-emerald-200/35" : "bg-red-200/30"}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 ${
          isSuccess ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 size={40} strokeWidth={1.8} className="text-emerald-600" />
        ) : (
          <motion.div
            animate={{ rotate: [0, -6, 6, 0] }}
            transition={{ delay: 0.4, duration: 0.45 }}
          >
            <XCircle size={40} strokeWidth={1.8} className="text-red-500" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex w-full flex-row gap-3">
      <Link
        href="/"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-brown px-3 py-3 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-brand-brown-hover"
      >
        <Home size={16} className="shrink-0" />
        Back to Home
      </Link>
      <Link
        href="/orders"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-orange/40 bg-white px-3 py-3 text-xs sm:text-sm font-semibold text-brand-brown transition-colors hover:bg-brand-cream-dark"
      >
        <ShoppingBag size={16} className="shrink-0" />
        View Orders
      </Link>
    </div>
  );
}

function FailureView() {
  return (
    <div className="flex items-center justify-center bg-[#fdf8f2] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="rounded-2xl border border-[#e7c9a6] bg-white/95 px-6 py-10 text-center shadow-md">
          <AnimatedIcon variant="failure" />
          <motion.h1 {...fadeUp(0.1)} className="text-3xl font-bold text-brand-brown">
            Payment Failed
          </motion.h1>
          <motion.div {...fadeUp(0.2)} className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-brand-brown px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-brown-hover"
            >
              <Home size={16} />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function SuccessView() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("order_id") || "";
  const amount = searchParams?.get("amount") || "";
  const statusParam = searchParams?.get("status") || "";

  const [order, setOrder] = useState<OrderStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError("Order ID is missing from the payment redirect.");
      return;
    }

    getOrderStatus(orderId)
      .then(setOrder)
      .catch(() => setError("Unable to load order details."))
      .finally(() => setLoading(false));
  }, [orderId]);

  const displayAmount = order?.total_price || amount;
  const displayOrderNo = order?.order_display_id || orderId;

  return (
    <div className="min-h-screen bg-[#fdf8f2] px-4 py-12 md:py-16">
      <div className="mx-auto max-w-lg text-center">
        <AnimatedIcon variant="success" />

        <motion.h1 {...fadeUp(0.1)} className="text-3xl md:text-4xl font-bold text-brand-brown">
          Thank You!
        </motion.h1>
        <motion.p {...fadeUp(0.18)} className="mt-2 text-sm md:text-base text-brand-brown/70">
          {order?.msg || "Your order has been placed successfully."}
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.25)}
        className="mx-auto mt-8 max-w-lg overflow-hidden rounded-2xl border border-[#e7c9a6] bg-white/95 shadow-md"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-brand-brown/70">
            <Loader2 size={32} className="animate-spin text-brand-orange" />
            <p className="text-sm font-medium">Loading order details...</p>
          </div>
        ) : error ? (
          <div className="px-6 py-10 text-center">
            <p className="text-sm text-amber-700">{error}</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-brand-cream/80 to-white px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-brand-brown">
                Order Summary
              </p>
            </div>

            <div className="divide-y divide-[#f3d2a5] px-5 py-1 text-sm">
              <div className="flex items-center justify-between gap-3 py-3.5">
                <span className="flex items-center gap-2 text-gray-600">
                  <Hash size={14} className="text-brand-brown shrink-0" />
                  Order No.
                </span>
                <span className="font-mono font-semibold text-brand-brown">
                  {displayOrderNo}
                </span>
              </div>

              {displayAmount && (
                <div className="flex items-center justify-between gap-3 py-3.5">
                  <span className="flex items-center gap-2 text-gray-600">
                    <CreditCard size={14} className="text-brand-brown shrink-0" />
                    Amount
                  </span>
                  <span className="font-bold text-brand-brown">
                    {formatPrice(displayAmount)}
                  </span>
                </div>
              )}

              {order?.payment_type && (
                <div className="flex items-center justify-between gap-3 py-3.5">
                  <span className="text-gray-600">Payment Type</span>
                  <span className="font-medium text-gray-800">{order.payment_type}</span>
                </div>
              )}

              {(order?.payment_status || statusParam) && (
                <div className="flex items-center justify-between gap-3 py-3.5">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-semibold text-emerald-600">
                    {order?.payment_status || statusParam}
                  </span>
                </div>
              )}

              {order?.customer_name && (
                <div className="flex items-center justify-between gap-3 py-3.5">
                  <span className="flex items-center gap-2 text-gray-600">
                    <User size={14} className="text-brand-brown shrink-0" />
                    Customer
                  </span>
                  <span className="font-medium text-gray-800 text-right">
                    {order.customer_name}
                  </span>
                </div>
              )}

              {order?.address && (
                <div className="flex gap-2 py-3.5">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-brown" />
                  <span className="text-gray-700 leading-relaxed">
                    {order.address.address_1}
                    {order.address.address_2 ? `, ${order.address.address_2}` : ""},{" "}
                    {order.address.city}, {order.address.state} – {order.address.zip_code},{" "}
                    {order.address.country}
                  </span>
                </div>
              )}
            </div>
          </>
        )}

        <div className="border-t border-[#f3d2a5] bg-[#fffaf4] px-5 py-5">
          <ActionButtons />
        </div>
      </motion.div>
    </div>
  );
}

function PaymentResultFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf8f2]">
      <Loader2 size={28} className="animate-spin text-brand-orange" />
    </div>
  );
}

function PaymentResultContent({ variant }: { variant: PaymentVariant }) {
  if (variant === "failure") return <FailureView />;
  return <SuccessView />;
}

export default function PaymentResultPage({ variant }: { variant: PaymentVariant }) {
  return (
    <Suspense fallback={<PaymentResultFallback />}>
      <PaymentResultContent variant={variant} />
    </Suspense>
  );
}
