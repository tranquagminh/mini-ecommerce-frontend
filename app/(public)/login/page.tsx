"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "@/features/user/components/LoginForm";
import { RegisterForm } from "@/features/user/components/RegisterForm";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { token } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (token) {
      router.replace("/account");
    }
  }, [token,router]);
  
  return (
    <div className="min-h-screen flex bg-linear-to-br from-indigo-50 to-white">
      {/* Left content */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2">
      <div className="flex items-center gap-3">
        {/* Biểu tượng icon với gradient */}
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-tr from-blue-500 to-purple-500 shadow-md">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
            >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
        </div>

        {/* Text gradient */}
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
            ShopHub
        </h1>
        </div>

        <h2 className="mt-8 text-3xl font-semibold text-gray-800">
          Chào mừng đến với nền tảng mua sắm trực tuyến
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Khám phá hàng ngàn sản phẩm chất lượng với giá tốt nhất. Trải nghiệm mua sắm dễ dàng, an toàn và tiện lợi.
        </p>

        <div className="mt-10 flex gap-8">
          <div>
            <p className="text-indigo-600 font-bold">10K+</p>
            <p className="text-sm text-gray-500">Sản phẩm</p>
          </div>
          <div>
            <p className="text-indigo-600 font-bold">50K+</p>
            <p className="text-sm text-gray-500">Khách hàng</p>
          </div>
          <div>
            <p className="text-indigo-600 font-bold">4.9★</p>
            <p className="text-sm text-gray-500">Đánh giá</p>
          </div>
        </div>
      </div>

      {/* Right side: Auth card */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white w-full max-w-md shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Tài khoản của bạn
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Đăng nhập hoặc tạo tài khoản mới để tiếp tục
            </p>
          </div>

          {/* Tab */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setTab("login")}
              className={cn(
                "w-1/2 py-2 rounded-md text-sm font-medium transition-colors",
                tab === "login"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setTab("register")}
              className={cn(
                "w-1/2 py-2 rounded-md text-sm font-medium transition-colors",
                tab === "register"
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              Đăng ký
            </button>
          </div>

          {tab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}