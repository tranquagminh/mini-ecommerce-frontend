"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getOrderById } from "@/features/orders/api";
import type { Order } from "@/features/orders/types";
import { CheckCircle, Package, MapPin, CreditCard, Loader2, ChevronRight } from "lucide-react";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
  processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Đang giao hàng", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Đã giao hàng", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
  refunded: { label: "Đã hoàn tiền", color: "bg-gray-100 text-gray-700" },
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
  card: "Thẻ tín dụng/Thẻ ghi nợ",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }

    const id = Number(params.id);
    if (!id) {
      setError("Đơn hàng không tồn tại.");
      setLoading(false);
      return;
    }

    getOrderById(id)
      .then(setOrder)
      .catch(() => setError("Không thể tải thông tin đơn hàng."))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const statusInfo = order ? (STATUS_LABELS[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" }) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-600 mb-4">{error}</p>
            <Link href="/products" className="text-blue-600 hover:underline">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : order ? (
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Đặt hàng thành công!
              </h1>
              <p className="text-gray-500 mb-4">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.
              </p>
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <span className="text-sm text-gray-500">Mã đơn hàng:</span>
                <span className="font-semibold text-gray-900">{order.order_number}</span>
              </div>
            </div>

            {/* Order Status & Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  Thông tin đơn hàng
                </h2>
                {statusInfo && (
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Mã đơn hàng</p>
                  <p className="font-medium text-gray-900">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ngày đặt</p>
                  <p className="font-medium text-gray-900">
                    {order.created_at ? formatDate(order.created_at) : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 flex items-center gap-1">
                    <CreditCard className="h-3.5 w-3.5" />
                    Thanh toán
                  </p>
                  <p className="font-medium text-gray-900">
                    {PAYMENT_METHOD_LABELS[order.payment_method] ?? order.payment_method}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Trạng thái thanh toán</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {order.payment_status === "pending" ? "Chưa thanh toán" : order.payment_status}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-500" />
                Địa chỉ giao hàng
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-medium">{order.shipping_full_name}</p>
                <p>{order.shipping_phone}</p>
                <p>
                  {order.shipping_address}, {order.shipping_ward}, {order.shipping_district}, {order.shipping_province}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Sản phẩm đã đặt ({order.items?.length ?? 0})
              </h2>
              <div className="divide-y divide-gray-100">
                {order.items?.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-14 h-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {item.product_name}
                      </p>
                      {item.variant_options && (
                        <p className="text-xs text-gray-500">{item.variant_options}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-0.5">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                      {formatPrice(item.total_price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4">Tổng thanh toán</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  {order.shipping_fee === 0 ? (
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  ) : (
                    <span>{formatPrice(order.shipping_fee)}</span>
                  )}
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span>-{formatPrice(order.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-gray-900 text-base border-t border-gray-100 pt-3 mt-2">
                  <span>Tổng cộng</span>
                  <span className="text-red-600 text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="flex-1 flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Tiếp tục mua sắm
              </Link>
              <Link
                href="/account"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium text-white transition-colors"
                style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
              >
                Đơn hàng của tôi
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}
