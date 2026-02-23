// Types matching the backend API response

export interface Category {
  ID: number;
  Name: string;
  Slug: string;
  Description: string;
  ParentID: number | null;
  ImageURL: string;
  IsActive: boolean;
  DisplayOrder: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface Tag {
  ID: number;
  Name: string;
  Slug: string;
  CreatedAt: string;
}

export interface ProductImage {
  ID: number;
  ProductID: number;
  URL: string;
  AltText: string;
  Position: number;
  IsPrimary: boolean;
}

export interface ApiProduct {
  ID: number;
  Name: string;
  Slug: string;
  Description: string;
  ShortDescription: string;
  CategoryID: number;
  Category: Category;
  Price: number;
  CompareAtPrice: number;
  CostPerItem: number;
  SKU: string;
  Barcode: string;
  TrackInventory: boolean;
  StockQuantity: number;
  LowStockThreshold: number;
  Status: string;
  IsFeatured: boolean;
  MetaTitle: string;
  MetaDescription: string;
  Images: ProductImage[] | null;
  Tags: Tag[] | null;
  CreatedAt: string;
  UpdatedAt: string;
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
