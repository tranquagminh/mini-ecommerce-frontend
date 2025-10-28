"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "./components/Sidebar";
import { ProfileForm } from "./components/ProfileForm";
import { ChangePasswordForm } from "./components/ChangePasswordForm";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<"profile" | "orders" | "favorites" | "password">("profile");

  if (!user) return <p className="p-8 text-gray-500">Đang tải thông tin người dùng...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto flex py-10">
        {/* Sidebar */}
        <Sidebar active={tab} onChange={(newTab) => setTab(newTab as "profile" | "orders" | "favorites" | "password")} 
                onLogout={logout} user={user} />

        {/* Main content */}
        <div className="flex-1 ml-10 bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          {tab === "profile" && <ProfileForm user={user} />}
          {tab === "password" && <ChangePasswordForm />}
          {tab === "orders" && <p>Danh sách đơn hàng sẽ hiển thị ở đây 💳</p>}
          {tab === "favorites" && <p>Danh sách yêu thích 🧡</p>}
        </div>
      </div>
    </div>
  );
}