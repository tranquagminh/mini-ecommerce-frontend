"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AccountPage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login"); 
    }
  }, [token]);

  if (!user) return <p className="p-8 text-gray-500">Đang tải thông tin người dùng...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Xin chào, {user.username} 👋</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          logout();
          router.replace("/login");
        }}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Đăng xuất
      </button>
    </div>
  );
}