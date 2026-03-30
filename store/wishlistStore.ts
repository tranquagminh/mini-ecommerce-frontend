"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiProduct } from "@/features/products/types";

interface WishlistState {
  items: ApiProduct[];
  isHydrated: boolean;

  // Actions
  addToWishlist: (product: ApiProduct) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  setHydrated: (state: boolean) => void;

  // Computed
  isInWishlist: (productId: number) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addToWishlist: (product) => {
        const { items } = get();
        const exists = items.some((item) => item.id === product.id);
        if (!exists) {
          set({ items: [...items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      setHydrated: (state) => set({ isHydrated: state }),

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
