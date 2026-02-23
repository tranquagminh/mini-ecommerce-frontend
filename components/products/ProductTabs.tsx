"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { ApiProduct } from "@/features/products/types";

interface ProductTabsProps {
  product: ApiProduct;
}

type TabType = "specs" | "reviews" | "qa";

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("specs");

  // Mock data for reviews count (will be replaced with real data later)
  const reviewCount = 2456;

  const tabs = [
    { id: "specs" as TabType, label: "Thông số kỹ thuật" },
    { id: "reviews" as TabType, label: `Đánh giá (${reviewCount.toLocaleString()})` },
    { id: "qa" as TabType, label: "Hỏi & Đáp" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 -mb-[1px]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "specs" && <SpecsTab product={product} />}
        {activeTab === "reviews" && <ReviewsTab />}
        {activeTab === "qa" && <QATab />}
      </div>
    </div>
  );
}

// Specifications Tab
function SpecsTab({ product }: { product: ApiProduct }) {
  // Mock specifications data based on product info
  // In a real app, this would come from the product data
  const specifications = [
    { label: "Thương hiệu", value: "Sony" },
    { label: "Model", value: "WH-1000XM5" },
    { label: "Màu sắc", value: "Đen, Bạc" },
    { label: "Kết nối", value: "Bluetooth 5.2, Jack 3.5mm" },
    { label: "Thời lượng pin", value: "Lên đến 30 giờ" },
    { label: "Trọng lượng", value: "250g" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Chi tiết sản phẩm</h3>
      <div className="divide-y divide-gray-100">
        {specifications.map((spec, index) => (
          <div key={index} className="flex py-3">
            <span className="w-1/3 text-gray-500">{spec.label}</span>
            <span className="w-2/3 text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reviews Tab (UI placeholder)
function ReviewsTab() {
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      rating: 5,
      date: "15/01/2025",
      content: "Sản phẩm rất tốt, chất lượng âm thanh tuyệt vời. Chống ồn hiệu quả, đeo thoải mái trong thời gian dài.",
      helpful: 24,
    },
    {
      id: 2,
      author: "Trần Thị B",
      rating: 4,
      date: "12/01/2025",
      content: "Tai nghe đẹp, âm thanh hay. Giao hàng nhanh, đóng gói cẩn thận.",
      helpful: 15,
    },
    {
      id: 3,
      author: "Lê Văn C",
      rating: 5,
      date: "10/01/2025",
      content: "Đã dùng được 2 tuần, rất hài lòng với sản phẩm. Pin trâu, kết nối nhanh.",
      helpful: 8,
    },
  ];

  const ratingStats = [
    { stars: 5, count: 1850, percentage: 75 },
    { stars: 4, count: 420, percentage: 17 },
    { stars: 3, count: 120, percentage: 5 },
    { stars: 2, count: 45, percentage: 2 },
    { stars: 1, count: 21, percentage: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex gap-8 pb-6 border-b border-gray-100">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">4.8</div>
          <div className="flex items-center justify-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">2,456 đánh giá</div>
        </div>
        <div className="flex-1 space-y-2">
          {ratingStats.map((stat) => (
            <div key={stat.stars} className="flex items-center gap-2">
              <span className="text-sm text-gray-500 w-12">{stat.stars} sao</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-500 w-12">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {review.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.author}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{review.content}</p>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
              <ThumbsUp className="h-4 w-4" />
              <span>Hữu ích ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          Xem thêm đánh giá
        </button>
      </div>
    </div>
  );
}

// Q&A Tab (UI placeholder)
function QATab() {
  const questions = [
    {
      id: 1,
      question: "Tai nghe có hỗ trợ kết nối đồng thời 2 thiết bị không?",
      author: "Minh Tuấn",
      date: "14/01/2025",
      answers: [
        {
          content: "Có bạn nhé, tai nghe hỗ trợ multipoint connection, kết nối được 2 thiết bị cùng lúc.",
          author: "Shop ShopHub",
          date: "14/01/2025",
          isOfficial: true,
        },
      ],
    },
    {
      id: 2,
      question: "Sản phẩm này có bảo hành quốc tế không ạ?",
      author: "Thu Hà",
      date: "12/01/2025",
      answers: [
        {
          content: "Sản phẩm được bảo hành chính hãng 12 tháng tại Việt Nam bạn nhé.",
          author: "Shop ShopHub",
          date: "12/01/2025",
          isOfficial: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Ask Question */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Đặt câu hỏi về sản phẩm..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Gửi
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="pb-6 border-b border-gray-100 last:border-0">
            <div className="flex gap-3 mb-3">
              <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{q.question}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {q.author} · {q.date}
                </p>
              </div>
            </div>
            {q.answers.map((answer, idx) => (
              <div key={idx} className="ml-8 pl-4 border-l-2 border-blue-100">
                <p className="text-gray-600 text-sm">{answer.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  <span className={answer.isOfficial ? "text-blue-600 font-medium" : ""}>
                    {answer.author}
                  </span>
                  {" · "}{answer.date}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
