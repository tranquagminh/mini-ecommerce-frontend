import { api } from "@/lib/api";
import { User } from "./types";

export async function registerUser(payload: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/users/register", payload);
  return res.data;
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> {
  const res = await api.post("/users/login", payload);
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await api.get("/users/me");
  return res.data;
}

// NEW: Update Profile API ✅
export async function updateProfile(payload: {
  username?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
  birthday?: string; // Format: YYYY-MM-DD
}): Promise<User> {
  const res = await api.put("/users/profile", payload);
  return res.data.user;
}

// NEW: Change Password API ✅
export async function changePassword(payload: {
  current_password: string;
  new_password: string;
  confirm_password: string;
}): Promise<{ message: string }> {
  const res = await api.post("/users/change-password", payload);
  return res.data;
}