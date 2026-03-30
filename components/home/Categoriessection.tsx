"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/features/products/api";
import { Category } from "@/features/products/types";

const gradients = [
  "from-blue-500/80 to-blue-700/80",
  "from-purple-500/80 to-purple-700/80",
  "from-pink-500/80 to-pink-700/80",
  "from-green-500/80 to-green-700/80",
  "from-red-500/80 to-red-700/80",
  "from-orange-500/80 to-orange-700/80",
];

export function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((cats) => setCategories(cats.filter((c) => c.is_active).slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Danh mục nổi bật
            </h2>
            <p className="text-gray-600">
              Khám phá theo sở thích của bạn
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
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Chưa có danh mục nào.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/products?category_id=${category.id}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} group-hover:opacity-90 transition-opacity`}></div>

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  {category.description && (
                    <p className="text-xs opacity-75 line-clamp-2">{category.description}</p>
                  )}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-xl transition-all"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}