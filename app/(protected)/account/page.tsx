"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "./components/Sidebar";
import { ProfileForm } from "./components/ProfileForm";
import { FavoritesTab } from "./components/FavoritesTab";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { OrdersList } from "./components/OrdersList";
import { AccountTabType } from "@/constants";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<AccountTabType>("profile");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Sidebar */}
            <Sidebar 
              active={tab} 
              onChange={setTab} 
              onLogout={logout} 
              user={user} 
            />

            {/* Main content */}
            <div className="flex-1 bg-white rounded-lg border border-gray-200 p-8">
              {tab === "profile" && <ProfileForm user={user} />}
              {tab === "orders" && <OrdersList userId={user.id} />}
              {tab === "favorites" && <FavoritesTab />}
              {tab === "settings" && <ChangePasswordForm />}
              {tab === "address" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Địa chỉ giao hàng</h2>
                  <p className="text-gray-500">Quản lý địa chỉ giao hàng của bạn</p>
                </div>
              )}
              {tab === "notifications" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông báo</h2>
                  <p className="text-gray-500">Các thông báo của bạn sẽ hiển thị ở đây</p>
                </div>
              )}
              {tab === "payment" && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Phương thức thanh toán</h2>
                  <p className="text-gray-500">Quản lý các phương thức thanh toán</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}