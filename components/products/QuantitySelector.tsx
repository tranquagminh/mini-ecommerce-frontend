"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
  min?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={decrease}
        disabled={quantity <= min}
        className="h-9 w-9"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="w-12 h-9 flex items-center justify-center border border-gray-200 rounded-md text-sm font-medium">
        {quantity}
      </div>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={increase}
        disabled={quantity >= max}
        className="h-9 w-9"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
