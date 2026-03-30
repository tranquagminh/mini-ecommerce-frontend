// Types matching the backend API response

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  image_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: number;
  category: Category;
  price: number;
  compare_at_price: number;
  cost_per_item: number;
  sku: string;
  barcode: string;
  track_inventory: boolean;
  stock_quantity: number;
  low_stock_threshold: number;
  status: string;
  is_featured: boolean;
  meta_title: string;
  meta_description: string;
  images: ProductImage[] | null;
  tags: Tag[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProductsResponse {
  page: number;
  page_size: number;
  products: ApiProduct[];
  total: number;
  total_pages: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Query params for fetching products
export interface ProductsQueryParams {
  page?: number;
  page_size?: number;
  category_id?: number;
  q?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sort?: "price_asc" | "price_desc" | "newest" | "name_asc" | "name_desc";
  status?: string;
}

// Review types
export interface Review {
  id: number;
  user_id: number;
  product_id: number;
  order_id?: number;
  rating: number;
  title?: string;
  content: string;
  images?: string[];
  status: string;
  helpful_count: number;
  admin_reply?: string;
  admin_reply_at?: string;
  created_at: string;
  updated_at: string;
  // populated by backend
  user_name?: string;
}

export interface ReviewsResponse {
  data: Review[];
  total: number;
  page: number;
  limit: number;
}

// Q&A types
export interface QA {
  id: number;
  user_id: number;
  product_id: number;
  question: string;
  answer?: string;
  status: string;
  answered_by?: number;
  answered_at?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  user_name?: string;
}

export interface QAResponse {
  data: QA[];
  total: number;
  page: number;
  limit: number;
}