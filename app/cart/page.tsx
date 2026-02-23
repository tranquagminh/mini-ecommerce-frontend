"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { product: { ID: number; Name: string; Price: number; CompareAtPrice: number; StockQuantity: number; Images: { URL: string }[] | null; Category: { Name: string } }; quantity: number };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}) {
  const { product, quantity } = item;
  const imageUrl = product.Images?.[0]?.URL || "/placeholder.png";
  const isInStock = product.StockQuantity > 0;
  const itemTotal = product.Price * quantity;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.Name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{product.Name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {product.Category?.Name || "Sản phẩm"}
                </span>
                {isInStock ? (
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Còn hàng
                  </span>
                ) : (
                  <span className="text-xs text-red-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    Hết hàng
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => onRemove(product.ID)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-red-600 font-semibold">
                {formatPrice(product.Price)}
              </span>
              {product.CompareAtPrice > product.Price && (
                <span className="text-gray-400 text-sm line-through">
                  {formatPrice(product.CompareAtPrice)}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Tổng: {formatPrice(itemTotal)}
              </span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => onUpdateQuantity(product.ID, quantity - 1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[40px] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product.ID, quantity + 1)}
                  disabled={quantity >= product.StockQuantity}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-12 h-12 text-blue-500" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Giỏ hàng trống
      </h2>
      <p className="text-gray-500 mb-2">
        Bạn chưa có sản phẩm nào trong giỏ hàng.
      </p>
      <p className="text-gray-500 mb-6">
        Hãy khám phá và thêm sản phẩm yêu thích của bạn!
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/products">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Khám phá sản phẩm
          </Button>
        </Link>
        <Link href="/promotions">
          <Button variant="outline">
            <Tag className="w-4 h-4 mr-2" />
            Xem khuyến mãi
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="flex items-center justify-center gap-8 mt-12">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-2">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-600">Miễn phí vận chuyển</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-sm text-gray-600">Bảo hành chính hãng</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-2">
            <RotateCcw className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-sm text-gray-600">Đổi trả dễ dàng</span>
        </div>
      </div>
    </div>
  );
}

function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  discount,
  total,
  onCheckout,
  couponCode,
  onCouponChange,
  onApplyCoupon,
}: {
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  onCheckout: () => void;
  couponCode: string;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
}) {
  const isFreeShipping = subtotal >= 500000;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Tóm tắt đơn hàng</h3>
        <span className="text-sm text-gray-500">{itemCount} sản phẩm</span>
      </div>

      <div className="space-y-3 pb-4 border-b border-gray-100">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển</span>
          {isFreeShipping ? (
            <span className="text-green-600 font-medium flex items-center gap-1">
              <Truck className="w-4 h-4" />
              Miễn phí
            </span>
          ) : (
            <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
          )}
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Giảm giá</span>
            <span className="text-green-600 font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between py-4 border-b border-gray-100">
        <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
        <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
      </div>

      {/* Coupon Code */}
      <div className="py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Tag className="w-4 h-4 text-red-500" />
          <span className="text-sm font-medium text-gray-700">Mã giảm giá</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            className="flex-grow"
          />
          <Button variant="outline" onClick={onApplyCoupon}>
            Áp dụng
          </Button>
        </div>
        <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1">
          <span>💡</span>
          Nhập mã để nhận ưu đãi đặc biệt
        </p>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full mt-4 h-12 text-base text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        onClick={onCheckout}
      >
        <Shield className="w-4 h-4" />
        Tiến hành thanh toán
      </button>

      {/* Trust Badges */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Thanh toán bảo mật & an toàn</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4 text-blue-500" />
          <span>Giao hàng nhanh 2-3 ngày</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <RotateCcw className="w-4 h-4 text-orange-500" />
          <span>Đổi trả miễn phí trong 30 ngày</span>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal, getItemCount, isHydrated } = useCartStore();
  const [couponCode, setCouponCode] = useState("");

  const itemCount = getItemCount();
  const subtotal = getTotal();
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleApplyCoupon = () => {
    // TODO: Implement coupon logic
    console.log("Applying coupon:", couponCode);
  };

  // Wait for hydration to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-gray-200 rounded-xl"></div>
                <div className="h-32 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
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
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tiếp tục mua sắm
        </Link>

        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
            <p className="text-sm text-gray-500 mt-1">
              {itemCount} sản phẩm trong giỏ hàng
            </p>
          </div>

          {/* Steps indicator */}
          {items.length > 0 && (
            <div className="flex items-center bg-white rounded-full p-1 border border-gray-200">
              <div className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  Giỏ hàng
                </span>
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                  Thanh toán
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {items.map((item) => (
                <CartItem
                  key={item.product.ID}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}

              {/* Suggested Products */}
              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-4" style={{
                        background: "linear-gradient(135deg, #EFF6FF 0%, #FAF5FF 100%)",
                }}>
                <div className="flex items-center justify-between" >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Sản phẩm có thể bạn quan tâm
                    </h3>
                    <p className="text-sm text-gray-500">
                      Khám phá thêm nhiều sản phẩm tuyệt vời
                    </p>
                  </div>
                  <Link href="/products">
                    <Button variant="outline" size="sm">
                      Xem thêm
                    </Button>
                  </Link>
                </div>
                {/* TODO: Add suggested products carousel */}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                itemCount={itemCount}
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                onCheckout={handleCheckout}
                couponCode={couponCode}
                onCouponChange={setCouponCode}
                onApplyCoupon={handleApplyCoupon}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
