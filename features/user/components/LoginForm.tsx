"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/features/user/validation";
import { toast } from "sonner";

export function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Đăng nhập thành công 🎉");
      router.push("/account");
    } catch { 
      toast.error("Email hoặc mật khẩu không chính xác ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Email</Label>
      <Input
        name="email"
        type="email"
        placeholder="name@example.com"
        onChange={handleChange}
        required
      />
      <Label>Mật khẩu</Label>
      <Input
        name="password"
        type="password"
        placeholder="Nhập mật khẩu"
        onChange={handleChange}
        required
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="text-indigo-600" /> Ghi nhớ đăng nhập
        </label>
        <a href="#" className="text-indigo-600 hover:underline">
          Quên mật khẩu?
        </a>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

<div className="text-center text-gray-400 text-sm mt-4 relative">
        <span className="bg-white px-2 relative z-10">HOẶC TIẾP TỤC VỚI</span>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 z-0"></div>
      </div>

      <div className="flex mt-4 gap-3">
        <button
          type="button"
          className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.6 32.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12
                12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4
                24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.4 16.3 18.8 14 24 14c3.1 0 5.9
                1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 15.4 4 8.2 8.5 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5.1c-2
                1.5-4.6 2.3-7.2 2.3-5.2 0-9.5-3.5-11.1-8.2l-6.6
                5C8.3 38.8 15.5 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3C34.5 31.6 29.8
                36 24 36c-4.7 0-8.8-2.7-10.8-6.6l-6.6
                5C9.9 39.4 16.4 44 24 44c11 0 20-9
                20-20 0-1.3-.1-2.7-.4-3.9z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.288 2.75-1.025 2.75-1.025c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.6 1.025 2.688c0 3.837-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.575.7.475A10.001 10.001 0 0 0 22 12C22 6.475 17.525 2 12 2Z"
          />
        </svg>
          GitHub
        </button>
      </div>
    </form>
  );
}