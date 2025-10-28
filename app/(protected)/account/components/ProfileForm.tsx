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
      {/* Tabs */}
      <div className="flex items-center gap-6 border-b mb-6">
        <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">
          Thông tin cá nhân
        </button>
        <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm">
          Đơn hàng
        </button>
        <button className="pb-3 px-1 text-gray-600 hover:text-gray-900 font-medium text-sm">
          Yêu thích
        </button>
      </div>

      {/* Form content */}
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin cá nhân</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Họ và tên
              </Label>
              <Input 
                name="username" 
                value={form.username} 
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Số điện thoại
              </Label>
              <Input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                disabled
                className="h-11 bg-gray-50"
              />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Ngày sinh
              </Label>
              <Input 
                type="date" 
                name="birthday" 
                value={form.birthday || ""} 
                onChange={handleChange}
                className="h-11"
              />
            </div>
            <div className="col-span-2">
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Giới tính
              </Label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full h-11 border border-gray-300 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              type="submit" 
              className="bg-black hover:bg-gray-800 text-white h-11 px-8"
            >
              Lưu thay đổi
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="h-11 px-8"
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}