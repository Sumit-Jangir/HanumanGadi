"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import type { CartItem } from "@/types/cart";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

type CartItemRowProps = {
  item: CartItem;
  labels: {
    price: string;
    quantity: string;
    sku: string;
    remove: string;
  };
  onQtyChange: (slug: string, qty: number) => void;
  onRemove: (slug: string) => void;
};

function QuantityControl({
  qty,
  onDecrease,
  onIncrease,
}: {
  qty: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-brand-brown/20 bg-white px-1 py-0.5 shadow-sm">
      <button
        type="button"
        onClick={onDecrease}
        disabled={qty <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full text-brand-brown transition-colors hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <FaMinus className="text-[10px]" />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold text-gray-800">
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="flex h-8 w-8 items-center justify-center rounded-full text-brand-brown transition-colors hover:bg-brand-cream"
        aria-label="Increase quantity"
      >
        <FaPlus className="text-[10px]" />
      </button>
    </div>
  );
}

export default function CartItemRow({
  item,
  labels,
  onQtyChange,
  onRemove,
}: CartItemRowProps) {
  const unitPrice = parseInt(item.product_price, 10) || 0;
  const lineTotal = unitPrice * item.qty;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-brand-brown/10 py-5 last:border-b-0"
    >
      {/* Mobile: trash | image | name + price + qty stacked */}
      <div className="flex items-start gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => onRemove(item.slug)}
          aria-label={labels.remove}
          className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center text-gray-400 transition-colors hover:text-red-500"
        >
          <FaTrash className="text-sm" />
        </button>

        <Link
          href={`/shop/product/${item.slug}`}
          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-brand-brown/15 bg-brand-cream"
        >
          <Image
            src={item.image_path}
            alt={item.product_name}
            fill
            sizes="80px"
            className="object-contain p-1"
            unoptimized
          />
        </Link>

        <motion.div layout="position" className="min-w-0 flex-1">
          <Link
            href={`/shop/product/${item.slug}`}
            className="line-clamp-2 text-sm font-bold leading-snug text-gray-900"
          >
            {item.product_name}
          </Link>
          <p className="mt-1.5 text-base font-bold text-brand-brown">
            {formatPrice(unitPrice)}
          </p>
          <div className="mt-2">
            <QuantityControl
              qty={item.qty}
              onDecrease={() => onQtyChange(item.slug, Math.max(1, item.qty - 1))}
              onIncrease={() => onQtyChange(item.slug, item.qty + 1)}
            />
          </div>
        </motion.div>
      </div>

      {/* Desktop: table-style row */}
      <div className="hidden sm:grid sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:gap-6">
        <button
          type="button"
          onClick={() => onRemove(item.slug)}
          aria-label={labels.remove}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <FaTrash className="text-sm" />
        </button>

        <motion.div layout="position" className="flex items-center gap-4">
          <Link
            href={`/shop/product/${item.slug}`}
            className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-brand-brown/15 bg-brand-cream shadow-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src={item.image_path}
              alt={item.product_name}
              fill
              sizes="96px"
              className="object-contain p-1.5"
              unoptimized
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              href={`/shop/product/${item.slug}`}
              className="text-base font-bold text-gray-800 transition-colors hover:text-brand-brown sm:text-lg"
            >
              {item.product_name}
            </Link>
            <p className="mt-1 text-xs text-gray-500">
              {labels.sku}:{" "}
              <span className="font-medium text-gray-600">{item.sku}</span>
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col items-end justify-center">
          <p className="text-lg font-bold text-brand-brown">{formatPrice(lineTotal)}</p>
          {item.qty > 1 && (
            <p className="text-xs text-gray-500">
              {formatPrice(unitPrice)} × {item.qty}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <QuantityControl
            qty={item.qty}
            onDecrease={() => onQtyChange(item.slug, Math.max(1, item.qty - 1))}
            onIncrease={() => onQtyChange(item.slug, item.qty + 1)}
          />
        </div>
      </div>
    </motion.div>
  );
}
