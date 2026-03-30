"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/features/user/api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  useEffect(() => {
    if (token) router.replace("/account");
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Vui lòng nhập tên người dùng");
      return;
    }
    if (!form.email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    if (!form.agree) {
      toast.error("Vui lòng đồng ý với điều khoản dịch vụ");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      toast.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      router.push("/login?registered=1");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-white">
      {/* Left side — branding */}
      <div className="hidden lg:flex flex-col justify-center px-16 w-1/2">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
            ShopHub
          </h1>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800">
          Tham gia cùng hàng ngàn khách hàng của chúng tôi
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Tạo tài khoản miễn phí và trải nghiệm mua sắm trực tuyến dễ dàng, an toàn với hàng ngàn sản phẩm chất lượng.
        </p>

        <div className="mt-10 flex gap-8">
          <div>
            <p className="text-indigo-600 font-bold">10K+</p>
            <p className="text-sm text-gray-500">Sản phẩm</p>
          </div>
          <div>
            <p className="text-indigo-600 font-bold">50K+</p>
            <p className="text-sm text-gray-500">Khách hàng</p>
          </div>
          <div>
            <p className="text-indigo-600 font-bold">4.9★</p>
            <p className="text-sm text-gray-500">Đánh giá</p>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="bg-white w-full max-w-md shadow-lg rounded-2xl p-8 border border-gray-100">
          {/* Logo (mobile only) */}
          <div className="flex lg:hidden items-center gap-2 mb-6 justify-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              ShopHub
            </span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Tạo tài khoản</h2>
            <p className="text-sm text-gray-500 mt-1">Điền thông tin để đăng ký miễn phí</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm font-medium text-gray-700">
                Tên người dùng <span className="text-red-500">*</span>
              </Label>
              <Input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="h-11"
                required
              />
            </div>

            <div>
              <Label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="h-11"
                required
              />
            </div>

            <div>
              <Label className="mb-1.5 block text-sm font-medium text-gray-700">
                Mật khẩu <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Tối thiểu 8 ký tự"
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <Label className="mb-1.5 block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-0.5 accent-indigo-600"
                required
              />
              <label htmlFor="agree" className="text-gray-600 cursor-pointer">
                Tôi đồng ý với{" "}
                <Link href="#" className="text-indigo-600 hover:underline">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href="#" className="text-indigo-600 hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
