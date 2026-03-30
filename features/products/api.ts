import {
  ProductsResponse,
  ProductsQueryParams,
  ApiProduct,
  Category,
  ReviewsResponse,
  QAResponse,
} from "./types";

const PRODUCT_SERVICE_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL || "http://localhost:8082";

// Create a separate axios instance for product service
import axios from "axios";

const productApi = axios.create({
  baseURL: PRODUCT_SERVICE_URL,
});

// Get all products with optional filters
export async function getProducts(
  params?: ProductsQueryParams
): Promise<ProductsResponse> {
  const response = await productApi.get<ProductsResponse>("/products", {
    params,
  });
  return response.data;
}

// Get single product by ID
export async function getProduct(id: number): Promise<ApiProduct> {
  const response = await productApi.get<ApiProduct>(`/products/${id}`);
  return response.data;
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const response = await productApi.get<{ categories: Category[]; total: number }>("/categories");
  return response.data.categories || [];
}

// Get root categories only
export async function getRootCategories(): Promise<Category[]> {
  const response = await productApi.get<Category[]>("/categories/root");
  return response.data;
}

// Get single category by ID
export async function getCategory(id: number): Promise<Category> {
  const response = await productApi.get<Category>(`/categories/${id}`);
  return response.data;
}

// Get product reviews
export async function getProductReviews(
  productId: number,
  page = 1,
  limit = 10
): Promise<ReviewsResponse> {
  const response = await productApi.get<ReviewsResponse>(
    `/products/${productId}/reviews`,
    { params: { page, limit } }
  );
  return response.data;
}

// Get product Q&A
export async function getProductQA(
  productId: number,
  page = 1,
  limit = 10
): Promise<QAResponse> {
  const response = await productApi.get<QAResponse>(
    `/products/${productId}/qa`,
    { params: { page, limit } }
  );
  return response.data;
}
