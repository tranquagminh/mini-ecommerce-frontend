"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { ApiProduct } from "@/features/products/types";
import { getProducts } from "@/features/products/api";

interface RelatedProductsProps {
  categoryId: number;
  currentProductId: number;
}

export function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const response = await getProducts({
          category_id: categoryId,
          limit: 5,
        });
        // Filter out current product and limit to 4
        const filtered = response.products
          .filter((p) => p.ID !== currentProductId)
          .slice(0, 4);
        setProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sản phẩm liên quan</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.ID} product={product} />
        ))}
      </div>
    </div>
  );
}
