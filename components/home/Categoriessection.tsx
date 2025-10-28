import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/constants";

export function CategoriesSection() {
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
            href="/categories"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category, index) => (
            <Link
              key={index}
              href={`/categories/${category.name.toLowerCase()}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-200"
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:opacity-90 transition-opacity`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                <p className="text-xs opacity-90 mb-1">{category.subtitle}</p>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-xs opacity-75">{category.products}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-xl transition-all"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}