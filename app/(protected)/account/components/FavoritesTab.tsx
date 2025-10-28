"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function FavoritesTab() {
  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b mb-6">
        <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
          Thông tin cá nhân
        </button>
        <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm">
          Đơn hàng
        </button>
        <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm">
          Yêu thích
        </button>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <Heart className="h-16 w-16 text-gray-300" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Bạn chưa có sản phẩm yêu thích nào
        </h3>
        <p className="text-gray-500 mb-6">
          Danh sách các sản phẩm bạn quan tâm
        </p>
        <Button className="bg-black hover:bg-gray-800 text-white px-6">
          Khám phá ngay
        </Button>
      </div>
    </div>
  );
}