"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProfileForm } from "@/app/(protected)/account/components/ProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { changePassword } from "@/features/user/api";
import { toast } from "sonner";
import { User, Lock, Loader2 } from "lucide-react";

type Tab = "profile" | "password";

function ChangePasswordSection() {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current_password) {
      toast.error("Vui lòng nhập mật khẩu hiện tại");
      return;
    }
    if (form.new_password.length < 8) {
      toast.error("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }
    if (form.new_password !== form.confirm_password) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    setLoading(true);
    try {
      await changePassword(form);
      toast.success("Đổi mật khẩu thành công!");
      setForm({ current_password: "", new_password: "", confirm_password: "" });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </Label>
          <Input
            name="current_password"
            type="password"
            value={form.current_password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
            className="h-11"
          />
        </div>
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">
            Mật khẩu mới <span className="text-red-500">*</span>
          </Label>
          <Input
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="Tối thiểu 8 ký tự"
            className="h-11"
          />
        </div>
        <div>
          <Label className="mb-2 block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
          </Label>
          <Input
            name="confirm_password"
            type="password"
            value={form.confirm_password}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            className="h-11"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-black hover:bg-gray-800 text-white h-11 px-8"
        >
          {loading ? "Đang cập nhật..." : "Đổi mật khẩu"}
        </Button>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("profile");

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login?returnUrl=/profile");
    }
  }, [loading, token, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-3" />
            <p className="text-gray-500">Đang tải thông tin...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Thông tin cá nhân", icon: <User className="w-4 h-4" /> },
    { key: "password", label: "Đổi mật khẩu", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tài khoản của tôi</h1>
          <p className="text-gray-500 mt-1">Quản lý thông tin cá nhân và bảo mật tài khoản</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar tabs */}
          <aside className="w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left ${
                    tab === t.key
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-8">
            {tab === "profile" && <ProfileForm user={user} />}
            {tab === "password" && <ChangePasswordSection />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
