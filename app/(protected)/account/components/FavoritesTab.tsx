"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

export function FavoritesTab() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (productId: number) => {
    const product = items.find((item) => item.ID === productId);
    if (product && product.StockQuantity > 0) {
      addToCart(product, 1);
      toast.success("Đã thêm vào giỏ hàng");
    }
  };

  const handleRemove = (productId: number) => {
    removeFromWishlist(productId);
    toast.success("Đã xóa khỏi yêu thích");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <Heart className="h-16 w-16 text-gray-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Bạn chưa có sản phẩm yêu thích nào
        </h3>
        <p className="text-gray-500 mb-6">
          Danh sách các sản phẩm bạn quan tâm
        </p>
        <Link href="/products">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Khám phá ngay
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Sản phẩm yêu thích ({items.length})
        </h2>
        <button
          onClick={() => {
            clearWishlist();
            toast.success("Đã xóa tất cả sản phẩm yêu thích");
          }}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((product) => {
          const inStock = product.StockQuantity > 0;
          const hasDiscount = product.CompareAtPrice > product.Price;

          return (
            <div
              key={product.ID}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link href={`/products/${product.ID}`}>
                <div className="relative aspect-square bg-gray-100">
                  {product.Images && product.Images.length > 0 ? (
                    <img
                      src={product.Images[0].URL}
                      alt={product.Name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                  {!inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Hết hàng</span>
                    </div>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">
                  {product.Category?.Name}
                </p>
                <Link href={`/products/${product.ID}`}>
                  <h3 className="font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.Name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-red-600">
                    {formatPrice(product.Price)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.CompareAtPrice)}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => handleAddToCart(product.ID)}
                    disabled={!inStock}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemove(product.ID)}
                    className="h-9 w-9 text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
