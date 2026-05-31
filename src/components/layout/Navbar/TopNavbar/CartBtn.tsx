"use client";


import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/stores/cartStore";
import useAuthStore from "@/lib/stores/authStore";


const CartBtn = () => {
  const { totalQuantities, fetchCart } = useCartStore();
  const { isLoggedIn, openLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      openLogin();
    }
  };

  return (
    <button
      onClick={handleCartClick}
      className="relative flex items-center justify-center mr-3"
      aria-label="Cart"
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
    </button>
  );
};

export default CartBtn;