"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  MapPin,
  CalendarDays,
  CreditCard,
  Wallet,
  ChevronDown,
  ShoppingBag,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import useAuthStore from "@/lib/stores/authStore";
import { getOrderHistory, OrderItem } from "@/services/order";

// ─── helpers ──────────────────────────────────────────────────────────────────

const formatPrice = (val: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(val) || 0);

const formatDate = (raw: string) => {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const proxyImage = (url: string) =>
  url ? `/api/image-proxy?url=${encodeURIComponent(url)}` : "/images/placeholder.png";

// ─── status config ────────────────────────────────────────────────────────────

const STATUS_MAP: Record<
  string,
  { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
> = {
  success: {
    label: "Delivered",
    icon: <CheckCircle2 size={13} strokeWidth={2.2} />,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={13} strokeWidth={2.2} />,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  fail: {
    label: "Failed",
    icon: <XCircle size={13} strokeWidth={2.2} />,
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },
};

const getStatus = (raw: string) =>
  STATUS_MAP[raw?.toLowerCase()] ?? {
    label: raw ?? "Unknown",
    icon: <Clock size={13} strokeWidth={2.2} />,
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  };

// ─── skeleton ─────────────────────────────────────────────────────────────────

const Skeleton = () => (
  <div className="animate-pulse rounded-2xl border border-brand-cream-dark bg-white overflow-hidden">
    <div className="flex gap-4 p-4">
      <div className="h-20 w-20 shrink-0 rounded-xl bg-brand-cream-dark" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="h-4 w-3/4 rounded bg-brand-cream-dark" />
        <div className="h-3 w-1/2 rounded bg-brand-cream-dark" />
        <div className="h-3 w-1/3 rounded bg-brand-cream-dark" />
      </div>
    </div>
    <div className="h-px bg-brand-cream-dark" />
    <div className="flex gap-4 px-4 py-3">
      <div className="h-3 w-24 rounded bg-brand-cream-dark" />
      <div className="h-3 w-20 rounded bg-brand-cream-dark" />
    </div>
  </div>
);

// ─── order card ───────────────────────────────────────────────────────────────

const OrderCard = ({ order, index }: { order: OrderItem; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const status = getStatus(order.orderStatus);
  const isOnline = order.payment_mode === "2";
  const orderNo = order.order_no || order.order_display_id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group self-start w-full rounded-2xl border border-[#e8cdb0] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Card header */}
      <div className="flex items-start gap-4 p-4 sm:p-5">
        {/* Product image */}
        <div className="relative shrink-0 h-[72px] w-[72px] sm:h-20 sm:w-20 rounded-xl overflow-hidden border border-brand-cream-dark bg-brand-cream">
          <img
            src={proxyImage(order.product_image_link)}
            alt={order.product_name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h3 className="text-[15px] font-bold text-[#2f1a0d] leading-tight line-clamp-2">
              {order.product_name}
            </h3>
            {/* Status badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border} whitespace-nowrap`}
            >
              {status.icon}
              {status.label}
            </span>
          </div>

          <p className="mt-1.5 text-[13px] text-gray-600">
            <span className="font-medium">Order No.</span>{" "}
            <span className="font-mono font-semibold tracking-wide text-brand-brown">
              #{orderNo}
            </span>
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-base font-bold text-brand-brown">
              {formatPrice(order.to_pay)}
            </span>
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(order?.total_amount)}
            </span>
            <span className="text-xs text-gray-500">
              Qty: <span className="font-semibold text-gray-700">{order.quantity}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Divider + meta row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#f3d2a5] px-4 sm:px-5 py-2.5 bg-[#fffaf4]">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} />
            {formatDate(order.order_date)}
          </span>
          <span className="flex items-center gap-1">
            {isOnline ? (
              <CreditCard size={12} className="text-brand-orange" />
            ) : (
              <Wallet size={12} className="text-brand-orange" />
            )}
            {isOnline ? "Online Payment" : "Cash on Delivery"}
          </span>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs font-semibold text-brand-brown hover:text-brand-orange transition-colors"
        >
          {expanded ? "Hide details" : "View details"}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown size={14} />
          </motion.span>
        </button>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-3 px-4 sm:px-5 py-4 border-t border-[#f3d2a5] bg-[#fdf9f4]">
              {/* Delivery address */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  Delivery Address
                </p>
                <div className="flex gap-2 text-sm text-gray-700">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-brown" />
                  <span>
                    {order.address}, {order.city}, {order.state} – {order.pincode},{" "}
                    {order.country}
                  </span>
                </div>
              </div>

              {/* Order info */}
              <div className="space-y-2 text-sm text-gray-700">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  Order Info
                </p>
                <div className="flex items-center gap-2">
                  <Package size={13} className="text-brand-brown shrink-0" />
                  <span>
                    Total: <span className="font-semibold">{formatPrice(order.total_amount)}</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── empty state ──────────────────────────────────────────────────────────────

const EmptyOrders = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange-muted">
      <ShoppingBag size={36} strokeWidth={1.4} className="text-brand-orange" />
    </div>
    <h3 className="text-xl font-bold text-[#2f1a0d] mb-2">No orders yet</h3>
    <p className="text-sm text-gray-500 max-w-xs mb-6">
      You haven't placed any orders. Explore our sacred offerings and place your first order.
    </p>
    <Link
      href="/shop"
      className="inline-flex items-center gap-2 rounded-xl bg-brand-brown px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange"
    >
      <ShoppingBag size={16} />
      Shop Now
    </Link>
  </motion.div>
);

// ─── page ──────────────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { isLoggedIn, openLogin } = useAuthStore();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    getOrderHistory()
      .then((res) => {
        setOrders(res?.data ?? []);
      })
      .catch(() => {
        setError("Unable to load your orders. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-[#fdf8f2]">
      {/* ── Heading ── */}
      <div className="pt-7 md:pt-9 px-4 flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown">My Orders</h1>
      </div>

      {/* ── Content ── */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 py-8 sm:py-10">
        {/* Not logged in */}
        {!isLoggedIn && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange-muted">
              <Package size={36} strokeWidth={1.4} className="text-brand-orange" />
            </div>
            <h3 className="text-xl font-bold text-[#2f1a0d] mb-2">Sign in to view orders</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              Please login to see your order history and track your sacred offerings.
            </p>
            <button
              type="button"
              onClick={openLogin}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-brown px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-brown-hover"
            >
              Login to Continue
            </button>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 text-center my-10"
          >
            {error}
          </motion.div>
        )}

        {/* Skeletons */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {/* Orders grid */}
        {!loading && isLoggedIn && !error && orders.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            {orders.map((order, i) => (
              <OrderCard key={order.order_display_id + i} order={order} index={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && isLoggedIn && !error && orders.length === 0 && <EmptyOrders />}
      </div>
    </div>
  );
}
