"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  images?: { URL: string; AltText: string }[] | null;
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use placeholder images if no images provided
  const displayImages =
    images && images.length > 0
      ? images
      : [
          { URL: "", AltText: productName },
          { URL: "", AltText: productName },
          { URL: "", AltText: productName },
          { URL: "", AltText: productName },
        ];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
        {displayImages[selectedIndex]?.URL ? (
          <img
            src={displayImages[selectedIndex].URL}
            alt={displayImages[selectedIndex].AltText || productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-gray-400 text-lg">Product Image</span>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3">
        {displayImages.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? "border-blue-600"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {image.URL ? (
              <img
                src={image.URL}
                alt={image.AltText || `${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <span className="text-gray-400 text-xs">Img</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
