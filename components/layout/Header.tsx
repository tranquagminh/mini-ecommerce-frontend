"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, User, LogOut, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistStore } from "@/store/wishlistStore";
import { CartDropdown } from "@/components/cart/CartDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/categories", label: "Danh mục" },
  { href: "/promotions", label: "Khuyến mãi" },
  { href: "/account", label: "Tài khoản", requireAuth: true },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const wishlistCount = useWishlistStore((state) => state.getItemCount());

  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
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
            <span className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
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
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link
              href="/account?tab=favorites"
              className="hover:text-blue-600 transition-colors relative p-2"
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-medium">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <CartDropdown />

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {user.Username?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.Username}</p>
                    <p className="text-xs text-gray-500">{user.Email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Tài khoản của tôi</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=orders" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>Đơn hàng</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account?tab=favorites" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Yêu thích</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="hover:text-blue-600 transition-colors"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-8 text-sm">
            {NAV_ITEMS.map((item) => {
              // Hide auth-required items if not logged in
              if (item.requireAuth && !user) {
                return null;
              }

              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "py-3 block transition-colors",
                      active
                        ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                        : "hover:text-blue-600"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
