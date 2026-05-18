import { create } from 'zustand';
import { addToCartApi, viewCartApi } from '@/services/cart';

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
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, qty?: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  isLoading: false,
  totalQuantities: 0,

  fetchCart: async () => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!userId) return;

    set({ isLoading: true });
    try {
      const response: any = await viewCartApi(userId);
      const items = Array.isArray(response) ? response : (Array.isArray(response?.data) ? response.data : []);
      
      const total = items.reduce((acc: number, item: any) => acc + parseInt(item.qty || "1", 10), 0);

      set({ cartItems: items, totalQuantities: total, isLoading: false });
    } catch (error) {
      console.error("Error fetching cart:", error);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: string, qty = "1") => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!userId) return;

    try {
      await addToCartApi(userId, productId, qty);
      await get().fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
}));
