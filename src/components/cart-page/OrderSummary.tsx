"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  orderTotal: number;
  labels: {
    title: string;
    subtotal: string;
    shipping: string;
    orderTotal: string;
    checkout: string;
    codNote: string;
  };
  onCheckout: () => void;
};

function SummaryRow({
  label,
  value,
  boldValue,
}: {
  label: string;
  value: number;
  boldValue?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span
        className={
          boldValue
            ? "font-bold text-brand-brown"
            : "font-semibold text-gray-800"
        }
      >
        {formatPrice(value)}
      </span>
    </div>
  );
}

export default function OrderSummary({
  subtotal,
  shipping,
  orderTotal,
  labels,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="lg:sticky lg:top-24"
    >
      <div className="theme-card relative overflow-hidden p-6 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
          {labels.title}
        </h2>

        <div className="mt-6 space-y-3 border-b border-brand-brown/10 pb-6">
          <SummaryRow label={labels.subtotal} value={subtotal} />
          <SummaryRow label={labels.shipping} value={shipping} />
        </div>

        <motion.div className="mt-6 flex items-center justify-between">
          <span className="text-base font-bold text-gray-900">
            {labels.orderTotal}
          </span>
          <motion.span
            key={orderTotal}
            initial={{ scale: 0.95, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-extrabold text-brand-brown md:text-3xl"
          >
            {formatPrice(orderTotal)}
          </motion.span>
        </motion.div>
        
        <motion.button
          type="button"
          onClick={onCheckout}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="btn-gradient-slide relative mt-8 flex w-full items-center justify-center gap-2 py-4"
        >
          {labels.checkout}
          <FaArrowRight className="text-sm" />
        </motion.button>
      </div>
    </motion.aside>
  );
}
