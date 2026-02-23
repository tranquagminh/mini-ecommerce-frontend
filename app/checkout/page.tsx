"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/store/cartStore";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Building2,
} from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

type PaymentMethod = "cod" | "bank" | "card";

const PAYMENT_METHODS: {
  value: PaymentMethod;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "cod",
    title: "Thanh toán khi nhận hàng (COD)",
    description: "Thanh toán bằng tiền mặt khi nhận hàng",
    icon: Banknote,
  },
  {
    value: "bank",
    title: "Chuyển khoản ngân hàng",
    description: "Chuyển khoản qua ATM/Internet Banking",
    icon: Building2,
  },
  {
    value: "card",
    title: "Thẻ tín dụng/Thẻ ghi nợ",
    description: "Visa, Mastercard, JCB",
    icon: CreditCard,
  },
];

interface ShippingForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note: string;
}

function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
  isLoading,
}: {
  items: { product: { ID: number; Name: string; Price: number; Images: { URL: string }[] | null }; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaceOrder: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h3>

      {/* Order Items */}
      <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
        {items.map((item) => {
          const imageUrl = item.product.Images?.[0]?.URL || "/placeholder.png";
          return (
            <div key={item.product.ID} className="flex gap-3">
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={item.product.Name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.product.Name}
                </h4>
                <p className="text-sm text-red-600 font-medium mt-1">
                  {formatPrice(item.product.Price)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-100 pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Tạm tính</span>
          <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Phí vận chuyển</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Miễn phí</span>
          ) : (
            <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
          <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className="w-full mt-6 h-12 text-base text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        onClick={onPlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? "Đang xử lý..." : "Đặt hàng"}
      </button>

      <p className="text-xs text-center text-gray-500 mt-3">
        Bằng cách đặt hàng, bạn đồng ý với{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Điều khoản dịch vụ
        </Link>
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, getTotal, isHydrated } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Hà Nội",
    district: "Cầu Giấy",
    ward: "Dịch Vọng",
    note: "",
  });

  const subtotal = getTotal();
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement order placement API call
      console.log("Placing order:", { form, paymentMethod, items });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: Navigate to order confirmation page
      alert("Đặt hàng thành công!");
    } catch (error) {
      console.error("Order failed:", error);
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // Wait for hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-48 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="text-gray-500 mb-6">
            Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.
          </p>
          <Link href="/products">
            <Button>Khám phá sản phẩm</Button>
          </Link>
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
          href="/cart"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại giỏ hàng
        </Link>

        {/* Page Title with Steps */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Thanh toán</h1>

          {/* Steps indicator */}
          <div className="flex items-center bg-white rounded-full p-1 border border-gray-200">
            <Link href="/cart" className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                Giỏ hàng
              </span>
            </Link>
            <div className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Thanh toán
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin giao hàng
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Họ và tên <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Số điện thoại <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="0123456789"
                    className="h-11"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="h-11"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Địa chỉ <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="Số nhà, tên đường"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="city"
                    value={form.city}
                    onChange={handleInputChange}
                    placeholder="Hà Nội"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="district"
                    value={form.district}
                    onChange={handleInputChange}
                    placeholder="Cầu Giấy"
                    className="h-11"
                  />
                </div>
                <div>
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Phường/Xã <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="ward"
                    value={form.ward}
                    onChange={handleInputChange}
                    placeholder="Dịch Vọng"
                    className="h-11"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-2 block text-sm font-medium text-gray-700">
                    Ghi chú (tùy chọn)
                  </Label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                    className="w-full min-h-[100px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.value}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === method.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                      />
                      <div className="flex-shrink-0">
                        <Icon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{method.title}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onPlaceOrder={handlePlaceOrder}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
