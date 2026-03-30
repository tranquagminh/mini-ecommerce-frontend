"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageCircle, Loader2 } from "lucide-react";
import { ApiProduct, Review, QA } from "@/features/products/types";
import { getProductReviews, getProductQA } from "@/features/products/api";

interface ProductTabsProps {
  product: ApiProduct;
}

type TabType = "specs" | "reviews" | "qa";

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("specs");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [qaList, setQaList] = useState<QA[]>([]);
  const [qaTotal, setQaTotal] = useState(0);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingQA, setLoadingQA] = useState(true);

  useEffect(() => {
    getProductReviews(product.id, 1, 10)
      .then((res) => {
        setReviews(res.data || []);
        setReviewTotal(res.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoadingReviews(false));

    getProductQA(product.id, 1, 10)
      .then((res) => {
        setQaList(res.data || []);
        setQaTotal(res.total || 0);
      })
      .catch(() => {})
      .finally(() => setLoadingQA(false));
  }, [product.id]);

  const tabs = [
    { id: "specs" as TabType, label: "Thông số kỹ thuật" },
    { id: "reviews" as TabType, label: `Đánh giá (${reviewTotal.toLocaleString()})` },
    { id: "qa" as TabType, label: `Hỏi & Đáp (${qaTotal})` },
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
        {activeTab === "reviews" && <ReviewsTab reviews={reviews} total={reviewTotal} loading={loadingReviews} />}
        {activeTab === "qa" && <QATab qaList={qaList} loading={loadingQA} />}
      </div>
    </div>
  );
}

// Specifications Tab
function SpecsTab({ product }: { product: ApiProduct }) {
  const specs = [
    { label: "SKU", value: product.sku || "—" },
    { label: "Danh mục", value: product.category?.name || "—" },
    { label: "Trạng thái", value: product.status },
    { label: "Tồn kho", value: product.stock_quantity.toString() },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Chi tiết sản phẩm</h3>
      {product.description && (
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      )}
      <div className="divide-y divide-gray-100">
        {specs.map((spec, index) => (
          <div key={index} className="flex py-3">
            <span className="w-1/3 text-gray-500">{spec.label}</span>
            <span className="w-2/3 text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reviews Tab
function ReviewsTab({ reviews, total, loading }: { reviews: Review[]; total: number; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (reviews.length === 0) {
    return <p className="text-gray-500 text-center py-8">Chưa có đánh giá nào cho sản phẩm này.</p>;
  }

  // Compute average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // Rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return { stars, count, percentage: total > 0 ? Math.round((count / reviews.length) * 100) : 0 };
  });

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex gap-8 pb-6 border-b border-gray-100">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
          <div className="flex items-center justify-center my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">{total.toLocaleString()} đánh giá</div>
        </div>
        <div className="flex-1 space-y-2">
          {ratingCounts.map((stat) => (
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
                    {(review.user_name || "U").charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.user_name || `User #${review.user_id}`}</p>
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
                    <span className="text-xs text-gray-400">
                      {new Date(review.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {review.title && <p className="font-medium text-gray-800 text-sm mb-1">{review.title}</p>}
            <p className="text-gray-600 text-sm mb-3">{review.content}</p>
            {review.admin_reply && (
              <div className="ml-4 pl-4 border-l-2 border-blue-100 mt-2">
                <p className="text-sm text-gray-600">{review.admin_reply}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Shop reply</p>
              </div>
            )}
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mt-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Hữu ích ({review.helpful_count})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Q&A Tab
function QATab({ qaList, loading }: { qaList: QA[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ask Question placeholder */}
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

      {qaList.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Chưa có câu hỏi nào cho sản phẩm này.</p>
      ) : (
        <div className="space-y-6">
          {qaList.map((q) => (
            <div key={q.id} className="pb-6 border-b border-gray-100 last:border-0">
              <div className="flex gap-3 mb-3">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{q.question}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {q.user_name || `User #${q.user_id}`} · {new Date(q.created_at).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
              {q.answer && (
                <div className="ml-8 pl-4 border-l-2 border-blue-100">
                  <p className="text-gray-600 text-sm">{q.answer}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    <span className="text-blue-600 font-medium">Shop</span>
                    {q.answered_at && ` · ${new Date(q.answered_at).toLocaleDateString("vi-VN")}`}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
