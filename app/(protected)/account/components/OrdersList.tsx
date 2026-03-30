"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getUserOrders } from "@/features/orders/api";
import type { Order } from "@/features/orders/types";
import { Loader2, Package, ChevronRight, ShoppingBag } from "lucide-react";

interface Props {
  userId: number;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN").format(price) + " đ";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Đã xác nhận", color: "bg-blue-100 text-blue-700" },
  processing: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
  shipped: { label: "Đang giao hàng", color: "bg-purple-100 text-purple-700" },
  delivered: { label: "Đã giao hàng", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
  refunded: { label: "Đã hoàn tiền", color: "bg-gray-100 text-gray-700" },
};

export function OrdersList({ userId }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getUserOrders(userId, page)
      .then((res) => {
        setOrders(res.orders ?? []);
        setTotalPages(res.total_pages ?? 1);
      })
      .catch(() => setError("Không thể tải danh sách đơn hàng."))
      .finally(() => setLoading(false));
  }, [userId, page]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="h-16 w-16 text-gray-200 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Chưa có đơn hàng nào</h3>
        <p className="text-gray-500 text-sm mb-6">Hãy mua sắm và quay lại đây nhé!</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Danh sách đơn hàng
      </h2>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = STATUS_MAP[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-700" };
          return (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {order.order_number}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.created_at ? formatDate(order.created_at) : "—"} · {order.items?.length ?? 0} sản phẩm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>

              {/* Item previews */}
              {order.items && order.items.length > 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, i) =>
                      item.product_image ? (
                        <img
                          key={i}
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-8 h-8 rounded-md object-cover border-2 border-white bg-gray-100"
                        />
                      ) : null
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-1 line-clamp-1 flex-1">
                    {order.items[0].product_name}
                    {order.items.length > 1 && ` +${order.items.length - 1} sản phẩm khác`}
                  </span>
                </div>
              )}

              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-500">Tổng cộng</span>
                <span className="text-sm font-bold text-red-600">{formatPrice(order.total)}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page <= 1}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Trước
          </button>
          <span className="px-4 py-2 text-sm text-gray-500">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
