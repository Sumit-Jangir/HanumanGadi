"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiLoader, FiMinus, FiPlus } from "react-icons/fi";
import type { HomeProduct } from "@/services/product";

type ProductCartActionProps = {
  item: HomeProduct;
  labels: {
    cta: string;
    adding: string;
    added: string;
    yagyaInCart: string;
  };
  isUpdating: boolean;
  isAdded?: boolean;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onIncrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "md";
  className?: string;
};

const sizeStyles = {
  sm: {
    button: "h-8 rounded-xl text-xs",
    qtyWrap: "h-8 rounded-xl px-1",
    qtyButton: "h-6 w-6",
    qtyText: "text-xs min-w-[1.75rem]",
    icon: 14,
    actionIcon: 12,
    spinner: "h-3 w-3",
  },
  md: {
    button: "h-12 rounded-2xl text-base",
    qtyWrap: "h-12 rounded-2xl px-1.5",
    qtyButton: "h-9 w-9",
    qtyText: "text-sm min-w-[2.25rem]",
    icon: 18,
    actionIcon: 14,
    spinner: "h-3.5 w-3.5",
  },
} as const;

const qtyButtonClass =
  "flex items-center justify-center rounded-full text-brand-brown transition-all duration-200 hover:bg-[#f3e7dc] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40";

export default function ProductCartAction({
  item,
  labels,
  isUpdating,
  isAdded = false,
  onAdd,
  onDecrease,
  onIncrease,
  size = "md",
  className = "",
}: ProductCartActionProps) {
  const styles = sizeStyles[size];
  const isYagya = item.category?.toLowerCase() === "yagya";
  const inCart = !isYagya && item.alreadyInCart && item.cartQuantity > 0;
  const qty = item.cartQuantity || 1;

  if (inCart) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex w-full items-center justify-center border border-[#e7c9a6] bg-[#fdf8f2] shadow-sm ${styles.qtyWrap} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onDecrease}
          disabled={isUpdating}
          aria-label="Decrease quantity"
          className={`${qtyButtonClass} ${styles.qtyButton} ${
            qty <= 1 ? "hover:text-red-600" : ""
          }`}
        >
          <FiMinus size={styles.actionIcon} strokeWidth={2.5} />
        </button>

        <span
          className={`${styles.qtyText} text-center font-bold text-[#6b3b22]`}
        >
          {isUpdating ? (
            <span
              className={`inline-block ${styles.spinner} animate-spin rounded-full border-2 border-brand-brown/25 border-t-brand-brown`}
            />
          ) : (
            qty
          )}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isUpdating}
          aria-label="Increase quantity"
          className={`${qtyButtonClass} ${styles.qtyButton}`}
        >
          <FiPlus size={styles.actionIcon} strokeWidth={2.5} />
        </button>
      </motion.div>
    );
  }

  const yagyaAlreadyInCart = isYagya && item.alreadyInCart;

  return (
    <div
      className={`w-full ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {yagyaAlreadyInCart && (
        <p
          className={`mb-1.5 text-center font-medium text-brand-brown/90 ${
            size === "sm" ? "text-[10px]" : "text-xs"
          }`}
        >
          {labels.yagyaInCart}
        </p>
      )}

      <motion.button
        type="button"
        onClick={onAdd}
        disabled={isUpdating || yagyaAlreadyInCart}
        whileHover={
          isUpdating || yagyaAlreadyInCart ? undefined : { y: -1 }
        }
        whileTap={
          isUpdating || yagyaAlreadyInCart ? undefined : { scale: 0.98 }
        }
        className={`w-full ${styles.button} font-semibold flex items-center justify-center gap-2 shadow-md transition-colors duration-300 ${
          isAdded || yagyaAlreadyInCart
            ? "bg-green-500 text-white shadow-green-200/60"
            : "btn-gradient-slide text-white hover:shadow-lg"
        } ${
          isUpdating || yagyaAlreadyInCart
            ? "opacity-90 cursor-not-allowed"
            : ""
        }`}
      >
        {isUpdating ? (
          <>
            <FiLoader className="animate-spin" size={styles.icon} />
            {labels.adding}
          </>
        ) : isAdded || yagyaAlreadyInCart ? (
          <>
            <FiCheckCircle size={styles.icon} />
            {labels.added}
          </>
        ) : (
          labels.cta
        )}
      </motion.button>
    </div>
  );
}
