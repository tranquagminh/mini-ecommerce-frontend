"use client"
import { useEffect, useState } from "react";
import { ArrowRight, Heart, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProducts } from "@/features/products/api";
import { ApiProduct } from "@/features/products/types";

export function ProductsSection() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ page: 1, page_size: 4, sort: "newest" })
      .then((res) => setProducts(res.products || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600">
              Được yêu thích nhất tháng này
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Chưa có sản phẩm nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const hasDiscount = product.compare_at_price > product.price;
              const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                >
                  {/* Image container */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {primaryImage ? (
                      <img src={primaryImage.image_url} alt={primaryImage.alt_text || product.name} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Product Image</span>
                      </div>
                    )}

                    {product.is_featured && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Bán chạy
                      </div>
                    )}

                    <button
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-gray-500">{product.category?.name}</p>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.compare_at_price)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* View more button */}
        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" size="lg" className="px-8">
              Xem thêm sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}