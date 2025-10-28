import { User } from "@/features/user/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  active: string;
  onChange: (tab: string) => void;
  onLogout: () => void;
  user: User;   
}

const menu = [
  { key: "profile", label: "Thông tin cá nhân", icon: "👤" },
  { key: "orders", label: "Đơn hàng của tôi", icon: "📦" },
  { key: "favorites", label: "Sản phẩm yêu thích", icon: "❤️" },
  { key: "password", label: "Đổi mật khẩu", icon: "🔒" },
];

export function Sidebar({ active, onChange, onLogout, user }: SidebarProps) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl text-indigo-600 mx-auto">
          {user.username?.[0]?.toUpperCase()}
        </div>
        <p className="mt-2 font-semibold text-gray-900">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <hr className="my-4" />

      <nav className="space-y-1">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2",
              active === item.key
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        <hr className="my-4" />

        <button
          onClick={onLogout}
          className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium"
        >
          🚪 Đăng xuất
        </button>
      </nav>
    </div>
  );
}