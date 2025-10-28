"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md">
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
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-600 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="hover:text-blue-600 transition-colors relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <Link href="/account" className="hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-8 text-sm">
            <li>
              <Link href="/" className="py-3 block hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/products" className="py-3 block hover:text-blue-600 transition-colors">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link href="/categories" className="py-3 block hover:text-blue-600 transition-colors">
                Danh mục
              </Link>
            </li>
            <li>
              <Link href="/promotions" className="py-3 block hover:text-blue-600 transition-colors">
                Khuyến mãi
              </Link>
            </li>
            <li>
              <Link href="/account" className="py-3 block text-blue-600 border-b-2 border-blue-600 font-medium">
                Tài khoản
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}