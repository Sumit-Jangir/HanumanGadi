"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCartStore } from "@/lib/stores/cartStore";
import useAuthStore from "@/lib/stores/authStore";

const CartBtn = () => {
  const { totalQuantities, fetchCart } = useCartStore();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center mr-3"
    >
      <Image
        priority
        src="/icons/cart.svg"
        height={22}
        width={22}
        alt="cart"
        className="object-contain"
      />

      {totalQuantities > 0 && (
        <span className="absolute -top-4 -right-3 flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-[#61351E] px-1 text-[11px] font-semibold text-white">
          {totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;