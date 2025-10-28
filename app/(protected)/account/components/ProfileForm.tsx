"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User } from "@/features/user/types";

interface Props {
  user: User;
}

export function ProfileForm({ user }: Props) {
  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    gender: user.gender || "",
    birthday: user.birthday || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form cập nhật: ", form);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="mb-2">Họ và tên</Label>
            <Input name="username" value={form.username} onChange={handleChange} />
          </div>
          <div>
            <Label className="mb-2">Số điện thoại</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <Label className="mb-2">Email</Label>
            <Input name="email" value={form.email} onChange={handleChange} disabled />
          </div>
          <div>
            <Label className="mb-2">Ngày sinh</Label>
            <Input type="date" name="birthday" value={form.birthday || ""} onChange={handleChange} />
          </div>
          <div>
            <Label className="mb-2">Giới tính</Label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
            Lưu thay đổi
          </Button>
          <Button type="button" variant="outline">
            Hủy
          </Button>
        </div>
      </form>
    </div>
  );
}