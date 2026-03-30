"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/features/user/api";
import { toast } from "sonner";

export function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }
    setLoading(true);
    try {
      await changePassword({
        current_password: form.currentPassword,
        new_password: form.newPassword,
        confirm_password: form.confirmPassword,
      });
      toast.success("Đổi mật khẩu thành công");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || "Đổi mật khẩu thất bại";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label className="mb-2">Mật khẩu hiện tại</Label>
          <Input name="currentPassword" type="password" value={form.currentPassword} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-2">Mật khẩu mới</Label>
          <Input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-2">Xác nhận mật khẩu mới</Label>
          <Input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        </div>
        <Button type="submit" className="bg-black hover:bg-gray-800 text-white" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </Button>
      </form>
    </div>
  );
}