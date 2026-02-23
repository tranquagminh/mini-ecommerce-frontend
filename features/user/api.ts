import { api } from "@/lib/api";
import { User } from "./types";

// Auth endpoints
export async function registerUser(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/api/v1/auth/register", payload);
  return res.data;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> {
  const res = await api.post("/api/v1/auth/login", payload);
  return res.data;
}

// User endpoints
export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/api/v1/users/me");
  return res.data;
}

export async function updateProfile(payload: {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
  birthday?: string; // Format: YYYY-MM-DD
}): Promise<User> {
  const res = await api.put("/api/v1/users/profile", payload);
  return res.data.user;
}

export async function changePassword(payload: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}): Promise<{ message: string }> {
  const res = await api.post("/api/v1/users/change-password", payload);
  return res.data;
}
