"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-purple-600 via-purple-500 to-pink-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <ShoppingBag className="h-4 w-4" />
              <span>Phiên bản đặc biệt - Giảm đến 40%</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Mua sắm<br />
              công nghệ<br />
              <span className="text-yellow-300">Giá tốt nhất</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-white/90 max-w-md">
              Khám phá hàng ngàn sản phẩm chính hãng từ các thương hiệu hàng đầu với ưu đãi đặc biệt mỗi ngày
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 h-12"
              >
                Mua ngay
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-black hover:bg-white/10 font-semibold px-8 h-12"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/shop-image.jpg"
                alt="Shop"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}