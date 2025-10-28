import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Đăng ký nhận tin khuyến mãi
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên và cập nhật về sản phẩm mới nhất cùng ưu đãi hấp dẫn mỗi tuần
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 h-12 px-4 text-base"
              required
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold px-8 h-12 whitespace-nowrap"
            >
              Đăng ký ngay
            </Button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Bằng việc đăng ký, bạn đồng ý với{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Chính sách bảo mật
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}