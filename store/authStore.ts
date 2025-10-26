"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/features/user/types";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (u: User | null) => void;
  setToken: (t: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
      setUser: (u) => set({ user: u }),
      setToken: (token) => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
        set({ token });
      },
      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // tên key trong localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);