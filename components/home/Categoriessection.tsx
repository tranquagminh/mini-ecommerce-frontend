import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Laptop",
    subtitle: "Máy tính",
    products: "150+ sản phẩm",
    image: "/categories/laptop.jpg",
    gradient: "from-blue-500/80 to-blue-700/80",
  },
  {
    name: "Điện thoại",
    subtitle: "Smartphone",
    products: "234+ sản phẩm",
    image: "/categories/phone.jpg",
    gradient: "from-purple-500/80 to-purple-700/80",
  },
  {
    name: "Tai nghe & Audio",
    subtitle: "Audio",
    products: "78+ sản phẩm",
    image: "/categories/audio.jpg",
    gradient: "from-pink-500/80 to-pink-700/80",
  },
  {
    name: "Smart Watch",
    subtitle: "Đồng hồ thông minh",
    products: "45+ sản phẩm",
    image: "/categories/watch.jpg",
    gradient: "from-green-500/80 to-green-700/80",
  },
  {
    name: "Camera",
    subtitle: "Máy ảnh",
    products: "89+ sản phẩm",
    image: "/categories/camera.jpg",
    gradient: "from-red-500/80 to-red-700/80",
  },
  {
    name: "PC & Gaming",
    subtitle: "Máy tính gaming",
    products: "123+ sản phẩm",
    image: "/categories/gaming.jpg",
    gradient: "from-orange-500/80 to-orange-700/80",
  },
];

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
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/categories/${category.name.toLowerCase()}`}
              className="group relative aspect-3/4 rounded-xl overflow-hidden bg-gray-200"
            >
              {/* Background image */}
              <div className="absolute inset-0 bg-linear-to-br from-gray-400 to-gray-600">
                <Image
                    src={category.image}
                    alt="Shop"
                    fill
                    className="object-cover"
                    priority
                />
              </div>
              
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-linear-to-br ${category.gradient} group-hover:opacity-90 transition-opacity`}></div>

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