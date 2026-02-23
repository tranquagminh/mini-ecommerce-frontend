"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { items, getItemCount, getTotal, updateQuantity, removeFromCart } = useCartStore();

  const itemCount = getItemCount();
  const total = getTotal();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-blue-600 transition-colors relative p-2"
      >
        <ShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-medium">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">
              Giỏ hàng ({itemCount})
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.product.ID} className="p-4 flex gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.Images && item.product.Images.length > 0 ? (
                        <img
                          src={item.product.Images[0].URL}
                          alt={item.product.Name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.ID}`}
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                      >
                        {item.product.Name}
                      </Link>
                      <p className="text-sm text-red-600 font-semibold mt-1">
                        {formatPrice(item.product.Price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.product.ID, item.quantity - 1)}
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.ID, item.quantity + 1)}
                            disabled={item.quantity >= item.product.StockQuantity}
                            className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.ID)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tổng cộng:</span>
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href="/cart" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Xem giỏ hàng
                  </Button>
                </Link>
                <Link href="/checkout" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Thanh toán
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
