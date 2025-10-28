"use client"
import { ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FEATURED_PRODUCTS } from "@/constants";

export function ProductsSection() {
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Image container */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {/* Placeholder image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Product Image</span>
                </div>

                {/* Badge */}
                {product.badge && (
                  <div className={`absolute top-3 left-3 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {product.badge}
                  </div>
                )}

                {/* Wishlist button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Add to wishlist
                  }}
                  className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-gray-500">{product.category}</p>
                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()}₫
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()}₫
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View more button */}
        <div className="text-center mt-10">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8"
          >
            Xem thêm sản phẩm
          </Button>
        </div>
      </div>
    </section>
  );
}