"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiProduct } from "@/features/products/types";

export interface CartItem {
  product: ApiProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isHydrated: boolean;

  // Actions
  addToCart: (product: ApiProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setHydrated: (state: boolean) => void;

  // Computed
  getItemCount: () => number;
  getTotal: () => number;
  getItemByProductId: (productId: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addToCart: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          // Update quantity if item exists
          const newQuantity = Math.min(
            existingItem.quantity + quantity,
            product.stock_quantity
          );
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        } else {
          // Add new item
          set({
            items: [...items, { product, quantity: Math.min(quantity, product.stock_quantity) }],
          });
        }
      },

      removeFromCart: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          set({
            items: items.filter((item) => item.product.id !== productId),
          });
        } else {
          set({
            items: items.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: Math.min(quantity, item.product.stock_quantity) }
                : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      setHydrated: (state) => set({ isHydrated: state }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemByProductId: (productId) => {
        return get().items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
