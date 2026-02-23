"use client";

import { Star } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Category } from "@/features/products/types";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  ratings: number[];
  inStock: boolean;
  outOfStock: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  categories?: Category[];
}

const RATING_OPTIONS = [5, 4, 3, 2, 1];

export function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
  categories = [],
}: ProductFiltersProps) {
  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryName]
      : filters.categories.filter((c) => c !== categoryName);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    });
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked
      ? [...filters.ratings, rating]
      : filters.ratings.filter((r) => r !== rating);
    onFilterChange({ ...filters, ratings: newRatings });
  };

  const handleStockChange = (type: "inStock" | "outOfStock", checked: boolean) => {
    onFilterChange({ ...filters, [type]: checked });
  };

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)} triệu`;
    }
    return `${value.toLocaleString()} đ`;
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-5 h-5 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Danh mục</h3>
        <div className="space-y-2.5">
          {categories.map((category) => (
            <label
              key={category.ID}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.categories.includes(category.Name)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.Name, checked as boolean)
                }
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-grow">
                {category.Name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Khoảng giá</h3>
        <div className="px-1">
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            max={100000000}
            min={0}
            step={1000000}
            onValueChange={handlePriceChange}
            className="mb-3"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Đánh giá</h3>
        <div className="space-y-2.5">
          {RATING_OPTIONS.map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Checkbox
                checked={filters.ratings.includes(rating)}
                onCheckedChange={(checked) =>
                  handleRatingChange(rating, checked as boolean)
                }
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">& lên</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Tình trạng</h3>
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={(checked) =>
                handleStockChange("inStock", checked as boolean)
              }
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Còn hàng
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <Checkbox
              checked={filters.outOfStock}
              onCheckedChange={(checked) =>
                handleStockChange("outOfStock", checked as boolean)
              }
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Hết hàng
            </span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={onClearFilters}
      >
        Xóa bộ lọc
      </Button>
    </div>
  );
}
