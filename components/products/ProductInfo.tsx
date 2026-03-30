"use client";

import { useState, useEffect } from "react";
import { Heart, Share2, ShoppingCart, Check, Truck, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import { ApiProduct } from "@/features/products/types";
import { getProductReviews } from "@/features/products/api";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { toast } from "sonner";

interface ProductInfoProps {
  product: ApiProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    getProductReviews(product.id, 1, 1)
      .then((res) => {
        setReviewCount(res.total || 0);
        const reviews = res.data || [];
        if (reviews.length > 0) {
          const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
          setRating(avg);
        }
      })
      .catch(() => {});
  }, [product.id]);

  const hasDiscount = product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const isInStock = product.stock_quantity > 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } else {
      addToWishlist(product);
      toast.success("Đã thêm vào danh sách yêu thích");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description || product.name,
          url: url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      toast.success("Đã sao chép link sản phẩm");
    }
  };

  return (
    <div className="space-y-4">
      {/* Featured Badge */}
      {product.is_featured && (
        <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
          Bán chạy
        </span>
      )}

      {/* Product Name */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {product.name}
      </h1>

      {/* Category */}
      <div className="text-sm text-gray-500">{product.category?.Name}</div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.floor(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : star - 0.5 <= rating
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {rating} ({reviewCount.toLocaleString()} đánh giá)
        </span>
      </div>

      {/* Price Section */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.compare_at_price)}
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500">Đã bao gồm VAT</p>
      </div>

      {/* Short Description */}
      {product.short_description && (
        <div>
          <h3 className="font-medium text-gray-900 mb-1">Mô tả sản phẩm</h3>
          <p className="text-gray-600 text-sm">{product.short_description}</p>
        </div>
      )}

      {/* Quantity and Stock */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Số lượng</label>
        <div className="flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            max={product.stock_quantity}
            min={1}
          />
          {isInStock && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Check className="h-4 w-4 text-green-600" />
              <span>Còn hàng</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!isInStock}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Thêm vào giỏ hàng
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`h-12 w-12 ${isWishlisted ? "text-red-500 border-red-500 hover:bg-red-50" : ""}`}
          onClick={handleToggleWishlist}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Shipping & Warranty Badges */}
      <div className="flex items-center gap-6 pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Truck className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Miễn phí vận chuyển</p>
            <p className="text-xs text-gray-500">Đơn từ 500K</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Shield className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Bảo hành chính hãng</p>
            <p className="text-xs text-gray-500">12 tháng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
