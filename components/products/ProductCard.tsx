"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ApiProduct } from "@/features/products/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

// Helper to get badge info from tags
function getBadgeFromTags(tags: ApiProduct["Tags"]): {
  badge: string | null;
  badgeColor: string;
} {
  if (!tags || tags.length === 0) return { badge: null, badgeColor: "" };

  const tag = tags[0];
  const colorMap: Record<string, string> = {
    "ban-chay": "bg-red-500",
    "moi": "bg-blue-500",
    "giam-gia": "bg-orange-500",
    "hot": "bg-orange-500",
  };

  return {
    badge: tag.Name,
    badgeColor: colorMap[tag.Slug] || "bg-gray-500",
  };
}

interface ProductCardProps {
  product: ApiProduct;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { badge, badgeColor } = getBadgeFromTags(product.Tags);
  const inStock = product.StockQuantity > 0;

  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.ID);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inStock) {
      addToCart(product, 1);
      toast.success("Đã thêm vào giỏ hàng");
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.ID);
      toast.success("Đã xóa khỏi yêu thích");
    } else {
      addToWishlist(product);
      toast.success("Đã thêm vào yêu thích");
    }
  };

  if (viewMode === "list") {
    return (
      <Link
        href={`/products/${product.ID}`}
        className="group flex gap-4 bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all p-4"
      >
        {/* Image container */}
        <div className="relative w-48 h-48 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          {product.Images && product.Images.length > 0 ? (
            <img
              src={product.Images[0].URL}
              alt={product.Name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Product Image</span>
            </div>
          )}
          {/* Badge */}
          {badge && (
            <div
              className={`absolute top-2 left-2 ${badgeColor} text-white text-xs font-medium px-2 py-1 rounded-md`}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow py-2">
          <p className="text-xs text-gray-500 mb-1">{product.Category?.Name}</p>
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
            {product.Name}
          </h3>

          {/* Short description */}
          {product.ShortDescription && (
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.ShortDescription}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-xl font-bold text-red-500">
              {product.Price.toLocaleString()} đ
            </span>
            {product.CompareAtPrice > 0 && product.CompareAtPrice !== product.Price && (
              <span className="text-sm text-gray-400 line-through">
                {product.CompareAtPrice.toLocaleString()} đ
              </span>
            )}
          </div>

          {/* Stock status */}
          {!inStock && (
            <span className="text-sm text-red-500 mt-2">Hết hàng</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 self-start">
          <button
            onClick={handleToggleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isWishlisted
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
          </button>
          {inStock && (
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/products/${product.ID}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      {/* Image container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.Images && product.Images.length > 0 ? (
          <img
            src={product.Images[0].URL}
            alt={product.Name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-gray-400 text-sm">Product Image</span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div
            className={`absolute top-3 left-3 ${badgeColor} text-white text-xs font-medium px-2.5 py-1 rounded-md`}
          >
            {badge}
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
              isWishlisted
                ? "bg-red-50 text-red-500"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
          </button>
          {inStock && (
            <button
              onClick={handleAddToCart}
              className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-gray-500">{product.Category?.Name}</p>
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.Name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-red-500">
            {product.Price.toLocaleString()} đ
          </span>
          {product.CompareAtPrice > 0 && product.CompareAtPrice !== product.Price && (
            <span className="text-sm text-gray-400 line-through">
              {product.CompareAtPrice.toLocaleString()} đ
            </span>
          )}
        </div>

        {/* Stock status */}
        {!inStock && (
          <span className="text-xs text-red-500">Hết hàng</span>
        )}
      </div>
    </Link>
  );
}
