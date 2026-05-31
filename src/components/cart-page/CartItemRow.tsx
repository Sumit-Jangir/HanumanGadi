"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

type CartItemRowProps = {
  item: any;
  labels: {
    price: string;
    quantity: string;
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
  const qty = Number(item.quantity || 1);
  const unitPrice = Number(item.price || 0);
  const lineTotal = Number(item.totalPrice || unitPrice * qty || 0);

  const isShaadiYagya = item.name?.toLowerCase() === "shaadi yagya";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-brand-brown/10 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md md:p-5"
    >
      <div className="flex items-center gap-4">
        <Link
          href={`/shop/product/${item.slug}`}
          className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl border border-brand-brown/15 bg-brand-cream sm:h-28 sm:w-28"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-contain"
            unoptimized
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={`/shop/product/${item.slug}`}
            className="line-clamp-2 text-base font-bold text-gray-900 transition-colors hover:text-brand-brown md:text-lg"
          >
            {item.name}

            {isShaadiYagya && (
              <span className="mt-1 block text-sm font-medium text-brand-brown">
                Booking Amount: {formatPrice(unitPrice)}
              </span>
            )}
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-brand-cream px-4 py-1.5 text-sm font-bold text-brand-brown">
              {formatPrice(lineTotal)}
            </span>

            {qty > 1 && (
              <span className="text-xs text-gray-500">
                {formatPrice(unitPrice)} × {qty}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3 lg:hidden">
            {!isShaadiYagya && (
              <QuantityControl
                qty={qty}
                onDecrease={() =>
                  onQtyChange(item.slug, Math.max(1, qty - 1))
                }
                onIncrease={() => onQtyChange(item.slug, qty + 1)}
              />
            )}

            <button
              type="button"
              onClick={() => onRemove(item.slug)}
              aria-label={labels.remove}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 text-red-500 transition-colors hover:bg-red-50"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>

        <div className="hidden flex-shrink-0 flex-col items-end gap-3 lg:flex">
          {!isShaadiYagya && (
            <div>
              {/* <p className="mb-1 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                {labels.quantity}
              </p> */}

              <QuantityControl
                qty={qty}
                onDecrease={() =>
                  onQtyChange(item.slug, Math.max(1, qty - 1))
                }
                onIncrease={() => onQtyChange(item.slug, qty + 1)}
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => onRemove(item.slug)}
            aria-label={labels.remove}
            className="inline-flex items-center gap-2 rounded-full border border-red-100 px-4 py-2 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
          >
            <FaTrash className="text-xs" />
            Remove
          </button>
        </div>
      </div>
    </motion.div>
  );
}