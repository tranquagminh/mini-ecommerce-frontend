import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Image from "next/image";

export function DealBanner() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 via-orange-500 to-red-600 p-8 md:p-12">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Left content */}
            <div className="text-white space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Flame className="h-4 w-4" />
                <span>🔥 Flash Sale</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Deal Hot Hôm Nay
              </h2>
              <p className="text-3xl font-bold text-yellow-300">
                Giảm đến 50%
              </p>
              <p className="text-white/90 text-lg">
                Chỉ trong thời gian giới hạn. Nhanh tay đặt hàng ngay!
              </p>

              <Button 
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 h-12 mt-4"
              >
                Mua ngay
              </Button>
            </div>

            {/* Right image/illustration */}
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
                  <Image
                    src="/sale-image.jpg"
                    alt="Sale"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}