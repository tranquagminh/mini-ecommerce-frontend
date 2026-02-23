"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { ApiProduct } from "@/features/products/types";
import { getProduct } from "@/features/products/api";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProduct(parseInt(id));
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Không tìm thấy sản phẩm");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-4 w-48 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-6 w-32 bg-gray-200 rounded" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error || "Không tìm thấy sản phẩm"}
            </h1>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700"
            >
              Quay lại trang sản phẩm
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </button>

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <ProductImageGallery
            images={product.Images}
            productName={product.Name}
          />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs - Specs, Reviews, Q&A */}
        <div className="mb-12">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts
          categoryId={product.CategoryID}
          currentProductId={product.ID}
        />
      </main>
      <Footer />
    </div>
  );
}
