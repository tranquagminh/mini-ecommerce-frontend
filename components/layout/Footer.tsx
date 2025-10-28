import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                ShopHub
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nền tảng mua sắm trực tuyến hàng đầu với hàng ngàn sản phẩm công nghệ chính hãng, giá tốt và dịch vụ chăm sóc khách hàng tận tâm.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Về chúng tôi */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="hover:text-blue-600 transition-colors">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-600 transition-colors">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/guide" className="hover:text-blue-600 transition-colors">
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-blue-600 transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-blue-600 transition-colors">
                  Bảo hành
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/payment" className="hover:text-blue-600 transition-colors">
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-600 transition-colors">
                  Vận chuyển
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 ShopHub. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Chính sách bảo mật
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}