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
  Clock,
  User,
  XCircle,
} from "lucide-react";
import useAuthStore from "@/lib/stores/authStore";
import {
  getOrderHistory,
  isCodPayment,
  isOnlinePayment,
  Order,
  OrderLineItem,
} from "@/services/order";

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

const STATUS_MAP: Record<
  string,
  { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
> = {
  "fully paid": {
    label: "Fully Paid",
    icon: <CheckCircle2 size={13} strokeWidth={2.2} />,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  "partial payment": {
    label: "Partial Payment",
    icon: <Clock size={13} strokeWidth={2.2} />,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
};

const getStatus = (raw: string) =>
  STATUS_MAP[raw?.trim().toLowerCase()] ?? {
    label: raw ?? "Unknown",
    icon: <Clock size={13} strokeWidth={2.2} />,
    bg: "bg-gray-50",
    text: "text-gray-600",
    border: "border-gray-200",
  };

const isPaymentFailed = (paymentStatus?: string) =>
  paymentStatus?.trim().toLowerCase() === "failed";

const CANCELLED_STATUS = {
  label: "Order Cancelled",
  icon: <XCircle size={13} strokeWidth={2.2} />,
  bg: "bg-red-50",
  text: "text-red-700",
  border: "border-red-200",
};

const Skeleton = () => (
  <div className="animate-pulse rounded-2xl border border-brand-cream-dark bg-white overflow-hidden">
    <div className="p-4 sm:p-5 space-y-3">
      <div className="flex justify-between">
        <div className="h-4 w-28 rounded bg-brand-cream-dark" />
        <div className="h-6 w-24 rounded-full bg-brand-cream-dark" />
      </div>
      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 rounded-xl bg-brand-cream-dark" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-brand-cream-dark" />
          <div className="h-3 w-1/2 rounded bg-brand-cream-dark" />
        </div>
      </div>
    </div>
    <div className="h-px bg-brand-cream-dark" />
    <div className="flex gap-4 px-4 py-3">
      <div className="h-3 w-24 rounded bg-brand-cream-dark" />
      <div className="h-3 w-20 rounded bg-brand-cream-dark" />
    </div>
  </div>
);

const OrderLineRow = ({ item }: { item: OrderLineItem }) => (
  <div className="flex items-start gap-3 py-3 first:pt-0 last:pb-0 border-b border-[#f3d2a5]/60 last:border-0">
    <div className="relative shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border border-brand-cream-dark bg-brand-cream">
      <img
        src={proxyImage(item.product_image_link)}
        alt={item.product_name}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[14px] font-semibold text-[#2f1a0d] leading-snug line-clamp-2">
        {item.product_name}
      </h4>
      <p className="mt-1 text-xs text-gray-500">
        Qty: <span className="font-semibold text-gray-700">{item.quantity}</span>
        <span className="mx-1.5 text-gray-300">·</span>
        {Number(item.quantity) > 1 ? `Unit: ${item.product_price}` : ""}
      </p>
      <p className="mt-1.5 text-sm font-bold text-brand-brown">
        {formatPrice(item.total_amount)}
      </p>
    </div>
  </div>
);

const PricingSummary = ({ order, cancelled = false }: { order: Order; cancelled?: boolean }) => {
  const { pricing } = order;
  const isCod = isCodPayment(order.payment_mode);
  const pending = Math.max(0, Number(pricing.pending_amount) || 0);

  return (
    <>
    {cancelled ? (
      <div className="col-span-full flex items-center gap-2 text-red-700">
        <XCircle size={15} strokeWidth={2.2} className="shrink-0" />
        <p className="text-sm font-medium">
        If any amount was deducted, it will be refunded within 5-7 days.

        </p>
      </div>
    ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Order Total
        </p>
        <p className="font-bold text-[#2f1a0d]">{formatPrice(pricing.total_amount)}</p>
      </div>
      {Number(pricing.shipping_charge) > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Shipping
          </p>
          <p className="font-semibold text-gray-700">
            {formatPrice(pricing.shipping_charge)}
          </p>
        </div>
      )}
      {isCod && Number(pricing.cod_advance) > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            COD Advance
          </p>
          <p className="font-bold text-brand-brown">{formatPrice(pricing.cod_advance)}</p>
        </div>
      )}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          Paid
        </p>
        <p className="font-bold text-emerald-700">{formatPrice(pricing.paid_amount)}</p>
      </div>
      {pending > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            Pending
          </p>
          <p className="font-bold text-amber-700">{formatPrice(pending)}</p>
        </div>
      )}
    </div>
    )}
    </>
  );
};

const OrderCard = ({ order, index }: { order: Order; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const paymentFailed = isPaymentFailed(order.paymentStatus);
  const status = paymentFailed ? CANCELLED_STATUS : getStatus(order.orderStatus);
  const isOnline = isOnlinePayment(order.payment_mode);
  const orderNo = order.order_display_id || order.order_no;
  const itemCount = order.items?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group self-start w-full rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${
        paymentFailed ? "border-red-200" : "border-[#e8cdb0]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5 pb-3">
        <div className="min-w-0">
          <p className="font-mono text-base font-bold tracking-wide text-brand-brown">
            {orderNo}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Order #{order.order_no}
            {itemCount > 1 && (
              <span className="text-gray-400">
                {" "}
                · {itemCount} items
              </span>
            )}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.bg} ${status.text} ${status.border} whitespace-nowrap`}
        >
          {status.icon}
          {status.label}
        </span>
      </div>

      {paymentFailed && (
        <div className="mx-4 sm:mx-5 mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700">
          Payment failed. This order has been cancelled.
        </div>
      )}

      {/* Items */}
      <div className="px-4 sm:px-5">
        {order.items?.map((item, i) => (
          <OrderLineRow key={`${item.product_name}-${i}`} item={item} />
        ))}
      </div>

      {/* Pricing summary */}
      <div className="mx-4 sm:mx-5 mt-2 mb-3 rounded-xl bg-[#fffaf4] border border-[#f3d2a5]/80 px-4 py-3">
        <PricingSummary order={order} cancelled={paymentFailed} />
      </div>

      {/* Meta row */}
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
            {isOnline ? "Online" : "Cash on Delivery"}
          </span>
        </div>

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

      {/* Expanded shipping */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 py-4 border-t border-[#f3d2a5] bg-[#fdf9f4] space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">
                  Delivery Address
                </p>
                <div className="flex gap-2 text-sm text-gray-700">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-brown" />
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold text-[#2f1a0d]">
                      <User size={13} className="text-brand-brown" />
                      {order.shipping.name}
                    </p>
                    <p className="mt-1">
                      {order.shipping.address}, {order.shipping.city},{" "}
                      {order.shipping.state} – {order.shipping.pincode},{" "}
                      {order.shipping.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={13} className="text-brand-brown shrink-0" />
                <span>
                  {order.pricing.items_total}{" "}
                  {order.pricing.items_total === 1 ? "item" : "items"} in this order
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
      You haven&apos;t placed any orders. Explore our sacred offerings and place your first order.
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

export default function OrdersPage() {
  const { isLoggedIn, openLogin } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
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
        setOrders(res?.orders ?? []);
      })
      .catch(() => {
        setError("Unable to load your orders. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  return (
    <div className="bg-[#fdf8f2]">
      <div className="pt-7 md:pt-9 px-4 flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-brown">My Orders</h1>
      </div>

      <div className="max-w-frame mx-auto px-4 xl:px-0 py-8 sm:py-10">
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

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 text-center my-10"
          >
            {error}
          </motion.div>
        )}

        {loading && (
          <div className="grid gap-4 lg:grid-cols-2 items-start">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {!loading && isLoggedIn && !error && orders.length > 0 && (
          <div className="grid gap-4 lg:grid-cols-2 items-start">
            {orders.map((order, i) => (
              <OrderCard key={order.order_display_id} order={order} index={i} />
            ))}
          </div>
        )}

        {!loading && isLoggedIn && !error && orders.length === 0 && <EmptyOrders />}
      </div>
    </div>
  );
}
