"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp ❌");
      return;
    }
    console.log("Đổi mật khẩu:", form);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label className="mb-2">Mật khẩu hiện tại</Label>
          <Input name="currentPassword" type="password" onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-2">Mật khẩu mới</Label>
          <Input name="newPassword" type="password" onChange={handleChange} />
        </div>
        <div>
          <Label className="mb-2">Xác nhận mật khẩu mới</Label>
          <Input name="confirmPassword" type="password" onChange={handleChange} />
        </div>
        <Button type="submit" className="bg-black hover:bg-gray-800 text-white">
          Đổi mật khẩu
        </Button>
      </form>
    </div>
  );
}