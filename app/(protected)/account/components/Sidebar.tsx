import { User } from "@/features/user/types";
import { cn } from "@/lib/utils";
import { User as UserIcon, Package, Heart, MapPin, Bell, CreditCard, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  active: string;
  onChange: (tab: string) => void;
  onLogout: () => void;
  user: User;   
}

const menu = [
  { key: "profile", label: "Thông tin cá nhân", icon: UserIcon },
  { key: "orders", label: "Đơn hàng của tôi", icon: Package },
  { key: "favorites", label: "Sản phẩm yêu thích", icon: Heart },
  { key: "address", label: "Địa chỉ giao hàng", icon: MapPin },
  { key: "notifications", label: "Thông báo", icon: Bell },
  { key: "payment", label: "Phương thức thanh toán", icon: CreditCard },
  { key: "settings", label: "Cài đặt", icon: Settings },
];

export function Sidebar({ active, onChange, onLogout, user }: SidebarProps) {
  return (
    <div className="w-80 bg-white rounded-lg border border-gray-200">
      {/* User info */}
      <div className="p-6 border-b">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold shadow-lg">
            {user.username?.[0]?.toUpperCase() || 'N'}
            {user.username?.split(' ').pop()?.[0]?.toUpperCase() || 'V'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user.username}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-3">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-all",
                active === item.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
        
        <hr className="mt-3"/>
        {/* Logout button */}
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 text-red-600 hover:bg-red-50 transition-all mt-2"
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </button>
      </nav>
    </div>
  );
}