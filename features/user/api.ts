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