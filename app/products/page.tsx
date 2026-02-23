"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, List, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getProducts, getCategories } from "@/features/products/api";
import { ApiProduct, Category } from "@/features/products/types";

type SortOption = "featured" | "price_asc" | "price_desc" | "newest";
type ViewMode = "grid" | "list";

interface FilterState {
  categories: number[];
  priceRange: [number, number];
  inStock: boolean;
  outOfStock: boolean;
}

const SORT_OPTIONS = [
  { value: "featured", label: "Nổi bật" },
  { value: "price_asc", label: "Giá: Thấp đến cao" },
  { value: "price_desc", label: "Giá: Cao đến thấp" },
  { value: "newest", label: "Mới nhất" },
];

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: [0, 100000000],
  inStock: true,
  outOfStock: false,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Fetch products when filters or sort changes
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const params: Record<string, unknown> = {
          page: 1,
          page_size: 20,
        };

        // Add category filter
        if (filters.categories.length === 1) {
          params.category_id = filters.categories[0];
        }

        // Add price range
        if (filters.priceRange[0] > 0) {
          params.min_price = filters.priceRange[0];
        }
        if (filters.priceRange[1] < 100000000) {
          params.max_price = filters.priceRange[1];
        }

        // Add stock filter
        if (filters.inStock && !filters.outOfStock) {
          params.in_stock = true;
        }

        // Add sort
        if (sortBy !== "featured") {
          params.sort = sortBy;
        }

        const response = await getProducts(params);
        setProducts(response.products || []);
        setTotal(response.total || 0);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters, sortBy]);

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // Convert FilterState for ProductFilters component
  const filtersForComponent = {
    categories: filters.categories.map(
      (id) => categories.find((c) => c.ID === id)?.Name || ""
    ),
    priceRange: filters.priceRange,
    ratings: [] as number[],
    inStock: filters.inStock,
    outOfStock: filters.outOfStock,
  };

  const handleFilterChange = (newFilters: typeof filtersForComponent) => {
    setFilters({
      categories: newFilters.categories
        .map((name) => categories.find((c) => c.Name === name)?.ID)
        .filter((id): id is number => id !== undefined),
      priceRange: newFilters.priceRange,
      inStock: newFilters.inStock,
      outOfStock: newFilters.outOfStock,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Tất cả sản phẩm
            </h1>
            <p className="text-sm text-gray-500">
              {total} sản phẩm được tìm thấy
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <aside className="w-64 flex-shrink-0 hidden lg:block">
              <ProductFilters
                filters={filtersForComponent}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                categories={categories}
              />
            </aside>

            {/* Main Content */}
            <main className="flex-grow">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                {/* Sort */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Sắp xếp:</span>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => setSortBy(value as SortOption)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon-sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid" ? "bg-gray-900 text-white" : ""
                    }
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon-sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list" ? "bg-gray-900 text-white" : ""
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Đang tải...</span>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="text-red-500 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Có lỗi xảy ra
                  </h3>
                  <p className="text-gray-500 mb-4">{error}</p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    Thử lại
                  </Button>
                </div>
              )}

              {/* Products Grid/List */}
              {!loading && !error && products.length > 0 && (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
                      : "flex flex-col gap-4"
                  }
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.ID}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && products.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Thử thay đổi bộ lọc để xem thêm sản phẩm
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
