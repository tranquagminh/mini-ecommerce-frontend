import { productApi } from "@/lib/api";
import type { CreateOrderPayload, Order } from "./types";

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  const res = await productApi.post("/orders", payload);
  return res.data;
}

export async function getUserOrders(
  userId: number,
  page = 1,
  limit = 10
): Promise<{ orders: Order[]; total: number; total_pages: number }> {
  const res = await productApi.get(
    `/users/${userId}/orders?page=${page}&limit=${limit}`
  );
  return res.data;
}

export async function getOrderById(id: number): Promise<Order> {
  const res = await productApi.get(`/orders/${id}`);
  return res.data;
}
