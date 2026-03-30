"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImage {
  image_url: string;
  alt_text?: string;
  display_order?: number;
  is_primary?: boolean;
}

interface ProductImageGalleryProps {
  images?: ProductImage[] | null;
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const displayImages =
    images && images.length > 0 ? images : [{ image_url: "", alt_text: productName }];

  const total = displayImages.length;

  const goTo = (index: number) => {
    const next = (index + total) % total;
    setSelectedIndex(next);
    // Scroll the selected thumbnail into view
    const container = thumbnailsRef.current;
    if (container) {
      const thumb = container.children[next] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  };

  const current = displayImages[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image with prev/next arrows */}
      <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
        {current?.image_url ? (
          <img
            src={current.image_url}
            alt={current.alt_text || productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
            <span className="text-gray-400 text-lg">Product Image</span>
          </div>
        )}

        {/* Navigation arrows — only shown when more than 1 image */}
        {total > 1 && (
          <>
            <button
              onClick={() => goTo(selectedIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
            <button
              onClick={() => goTo(selectedIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === selectedIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Scrollable thumbnail strip — shows ALL images */}
      {total > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-blue-600"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {image.image_url ? (
                <img
                  src={image.image_url}
                  alt={image.alt_text || `${productName} ${index + 1}`}
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
      )}
    </div>
  );
}
