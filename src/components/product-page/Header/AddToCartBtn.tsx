"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { Product } from "@/types/product.types";
import React, { useState } from "react";
import useAuthStore from "@/lib/stores/authStore";
import { useCartStore } from "@/lib/stores/cartStore";

const AddToCartBtn = ({ data }: { data: Product & { quantity: number } }) => {
  const { sizeSelection, colorSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const { isLoggedIn, openLogin } = useAuthStore();
  const { addToCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      className="bg-black w-full ml-3 sm:ml-5 rounded-full h-11 md:h-[52px] text-sm sm:text-base text-white hover:bg-black/80 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={async () => {
        if (!isLoggedIn) {
          openLogin();
          return;
        }
        setLoading(true);
        await addToCart(data.id.toString(), data.quantity.toString());
        setLoading(false);
      }}
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
};

export default AddToCartBtn;
