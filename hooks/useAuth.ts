import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { getCurrentUser, loginUser, registerUser } from "@/features/user/api";

export function useAuth() {
  const { user, token, isHydrated, setUser, setToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  // Đăng nhập
  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setToken(data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }

  // Đăng ký
  async function register(username: string, email: string, password: string) {
    setLoading(true);
    try {
      await registerUser({ username, email, password });
    } finally {
      setLoading(false);
    }
  }

  // Lấy thông tin user từ /users/me
  const fetchUser = useCallback(async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch {
      logout();
    }
  }, [logout, setUser]);

  useEffect(() => {
    if (isHydrated && token && !user) {
        fetchUser();
    }
  }, [isHydrated,token, user, fetchUser]);

  return { user, loading, token, login, register, logout };
}