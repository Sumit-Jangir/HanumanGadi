import { create } from "zustand";
import { addToCartApi, viewCartApi, removeFromCartApi } from "@/services/cart";

interface CartItem {
  id: string;
  product_id: string;
  qty: string;
  [key: string]: any;
}

interface CartState {
  cartItems: CartItem[];
  isLoading: boolean;
  totalQuantities: number;
  totalCod: any;
  totalOnline: any;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, qty?: string) => Promise<void>;
  removeFromCart: (productId: string, qty?: string) => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  isLoading: false,
  totalQuantities: 0,
  totalCod: null,
  totalOnline: null,

  fetchCart: async () => {
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("token")?.replace(/"/g, "") : null;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const response: any = await viewCartApi(userId);
      const items = response?.data?.items || [];
      const totalCod = response?.data?.totalCod || null;
      const totalOnline = response?.data?.totalOnline || null;
      const total = items.reduce(
        (acc: number, item: any) => acc + parseInt(item.quantity || "1", 10),
        0,
      );
      set({ cartItems: items, totalQuantities: total, totalCod, totalOnline, isLoading: false });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: string, qty = "1") => {
    const rawToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const userId = rawToken?.replace(/"/g, ""); // 🔥 FIX

    if (!userId) return;

    try {
      await addToCartApi(userId, productId, qty);
      await get().fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  clearCart: () => {
    set({ cartItems: [], totalQuantities: 0, totalCod: null, totalOnline: null });
  },

  removeFromCart: async (productId: string, qty = "1") => {
    const rawToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userId = rawToken?.replace(/"/g, ""); // 🔥 FIX
    if (!userId) return;

    try {
      await removeFromCartApi(userId, productId, qty);
      await get().fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  },
}));
