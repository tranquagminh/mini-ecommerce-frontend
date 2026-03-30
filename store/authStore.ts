"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/user/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  setUser: (u: User | null) => void;
  setToken: (t: string | null) => void;
  logout: () => void;
  setHydrated: (state:boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
      isHydrated: false,
      setUser: (u) => set({ user: u }),
      setToken: (token) => {
        if (token) {
          localStorage.setItem("token", token);
          document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
        } else {
          localStorage.removeItem("token");
          document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
        }
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
        set({ user: null, token: null });
      },
      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: "auth-storage", // tên key trong localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      }
    }
  )
);