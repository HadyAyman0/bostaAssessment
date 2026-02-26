import { create } from "zustand";
import type { ICartStore } from "../features/cart/types/cart.types";

export const useCartStore = create<ICartStore>((set) => ({
  cartItems: [],

  addToStore: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
    }),

  removeFromStore: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, qty) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      ),
    })),

  clearCart: () => set({ cartItems: [] }),
}));
