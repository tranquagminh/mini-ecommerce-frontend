"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

export default function WishlistPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const { items, removeFromWishlist, clearWishlist, isHydrated } = useWishlistStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace("/login?returnUrl=/wishlist");
    }
  }, [isHydrated, token, router]);

  const handleAddToCart = (productId: number) => {
    const product = items.find((p) => p.id === productId);
    if (!product) return;
    if (product.stock_quantity <= 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }
    addToCart(product, 1);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleRemove = (productId: number) => {
    removeFromWishlist(productId);
    toast.success("Đã xóa khỏi danh sách yêu thích");
  };

  const handleClearAll = () => {
    clearWishlist();
    toast.success("Đã xóa tất cả sản phẩm yêu thích");
  };

  // Loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl aspect-square" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="w-32 h-32 rounded-full bg-pink-50 flex items-center justify-center mb-6">
              <Heart className="h-16 w-16 text-pink-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Danh sách yêu thích trống
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Bạn chưa thêm sản phẩm nào vào danh sách yêu thích. Hãy khám phá và lưu những sản phẩm bạn thích!
            </p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 gap-2">
                Khám phá sản phẩm
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              Sản phẩm yêu thích
            </h1>
            <p className="text-gray-500 mt-1">{items.length} sản phẩm</p>
          </div>
          <button
            onClick={handleClearAll}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Xóa tất cả
          </button>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => {
            const inStock = product.stock_quantity > 0;
            const hasDiscount =
              product.compare_at_price && product.compare_at_price > product.price;
            const discountPct = hasDiscount
              ? Math.round(
                  ((product.compare_at_price - product.price) /
                    product.compare_at_price) *
                    100
                )
              : 0;
            const imageUrl = product.images?.[0]?.image_url;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                        <span className="text-gray-400 text-sm">Chưa có ảnh</span>
                      </div>
                    )}

                    {/* Out of stock overlay */}
                    {!inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm bg-black/70 px-3 py-1 rounded-full">
                          Hết hàng
                        </span>
                      </div>
                    )}

                    {/* Discount badge */}
                    {hasDiscount && discountPct > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        -{discountPct}%
                      </div>
                    )}

                    {/* Remove button (hover) */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemove(product.id);
                      }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-3">
                  {product.category?.Name && (
                    <p className="text-xs text-gray-400 mb-1">{product.category.Name}</p>
                  )}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-bold text-red-600">
                      {formatPrice(product.price)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(product.compare_at_price)}
                      </span>
                    )}
                  </div>

                  {/* Stock label */}
                  <p
                    className={`text-xs mt-1 ${
                      inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {inStock ? `Còn ${product.stock_quantity} sản phẩm` : "Hết hàng"}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={!inStock}
                      className="flex-1 h-9 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Thêm giỏ hàng
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemove(product.id)}
                      className="h-9 w-9 text-red-500 border-red-200 hover:bg-red-50 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="outline" className="gap-2 h-11 px-8">
              Tiếp tục mua sắm
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
