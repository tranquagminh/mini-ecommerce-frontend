export interface CreateOrderItem {
  product_id: number;
  variant_id?: number;
  product_name: string;
  product_image?: string;
  variant_options?: string;
  sku?: string;
  quantity: number;
  unit_price: number;
}

export interface CreateOrderPayload {
  user_id: number;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_province: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_address: string;
  payment_method: string;
  coupon_code?: string;
  note?: string;
  items: CreateOrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  variant_id?: number;
  product_name: string;
  product_image?: string;
  variant_options?: string;
  sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  shipping_full_name: string;
  shipping_phone: string;
  shipping_province: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_address: string;
  status: string;
  payment_method: string;
  payment_status: string;
  paid_at?: string;
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  coupon_code?: string;
  total: number;
  note?: string;
  cancelled_reason?: string;
  cancelled_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}
