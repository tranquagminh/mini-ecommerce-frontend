// Product type
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  badgeColor?: string;
  inStock: boolean;
}

// All Products for the products page
export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tai nghe Sony WH-1000XM5",
    category: "Tai nghe & Audio",
    price: 7990000,
    originalPrice: 9990000,
    rating: 4.8,
    reviews: 12456,
    image: "/products/headphone.jpg",
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    inStock: true,
  },
  {
    id: 2,
    name: "Laptop Dell XPS 13",
    category: "Laptop & Máy tính",
    price: 32990000,
    originalPrice: 36990000,
    rating: 4.9,
    reviews: 1823,
    image: "/products/laptop.jpg",
    badge: "Hot",
    badgeColor: "bg-orange-500",
    inStock: true,
  },
  {
    id: 3,
    name: "Apple Watch Series 9",
    category: "Smart Watch",
    price: 10990000,
    originalPrice: null,
    rating: 4.7,
    reviews: 3421,
    image: "/products/watch.jpg",
    badge: null,
    inStock: true,
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    category: "Điện thoại",
    price: 34990000,
    originalPrice: 37990000,
    rating: 4.9,
    reviews: 5678,
    image: "/products/iphone.jpg",
    badge: "Mới",
    badgeColor: "bg-blue-500",
    inStock: true,
  },
  {
    id: 5,
    name: "Loa JBL Charge 5",
    category: "Tai nghe & Audio",
    price: 4290000,
    originalPrice: 4990000,
    rating: 4.6,
    reviews: 1234,
    image: "/products/speaker.jpg",
    badge: null,
    inStock: true,
  },
  {
    id: 6,
    name: "Canon EOS R6 Mark II",
    category: "Camera",
    price: 68990000,
    originalPrice: null,
    rating: 4.9,
    reviews: 892,
    image: "/products/camera.jpg",
    badge: null,
    inStock: true,
  },
  {
    id: 7,
    name: "Bàn phím Gaming Razer",
    category: "Gaming",
    price: 3490000,
    originalPrice: null,
    rating: 4.7,
    reviews: 2156,
    image: "/products/keyboard.jpg",
    badge: "Giảm giá",
    badgeColor: "bg-orange-500",
    inStock: true,
  },
  {
    id: 8,
    name: "iPad Pro 12.9\" M2",
    category: "Laptop & Máy tính",
    price: 29990000,
    originalPrice: 32990000,
    rating: 4.8,
    reviews: 1567,
    image: "/products/ipad.jpg",
    badge: null,
    inStock: true,
  },
  {
    id: 9,
    name: "AirPods Pro 2",
    category: "Tai nghe & Audio",
    price: 6490000,
    originalPrice: 7490000,
    rating: 4.8,
    reviews: 4321,
    image: "/products/airpods.jpg",
    badge: "Bán chạy",
    badgeColor: "bg-red-500",
    inStock: true,
  },
  {
    id: 10,
    name: "LG UltraGear Monitor 27\"",
    category: "Gaming",
    price: 8990000,
    originalPrice: null,
    rating: 4.6,
    reviews: 987,
    image: "/products/monitor.jpg",
    badge: null,
    inStock: false,
  },
];

// Featured Products (subset for homepage)
export const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 4);
  
  // Categories
  export const CATEGORIES = [
    {
      name: "Laptop",
      subtitle: "Máy tính",
      products: "150+ sản phẩm",
      image: "/categories/laptop.jpg",
      gradient: "from-blue-500/80 to-blue-700/80",
    },
    {
      name: "Điện thoại",
      subtitle: "Smartphone",
      products: "234+ sản phẩm",
      image: "/categories/phone.jpg",
      gradient: "from-purple-500/80 to-purple-700/80",
    },
    {
      name: "Tai nghe & Audio",
      subtitle: "Audio",
      products: "78+ sản phẩm",
      image: "/categories/audio.jpg",
      gradient: "from-pink-500/80 to-pink-700/80",
    },
    {
      name: "Smart Watch",
      subtitle: "Đồng hồ thông minh",
      products: "45+ sản phẩm",
      image: "/categories/watch.jpg",
      gradient: "from-green-500/80 to-green-700/80",
    },
    {
      name: "Camera",
      subtitle: "Máy ảnh",
      products: "89+ sản phẩm",
      image: "/categories/camera.jpg",
      gradient: "from-red-500/80 to-red-700/80",
    },
    {
      name: "PC & Gaming",
      subtitle: "Máy tính gaming",
      products: "123+ sản phẩm",
      image: "/categories/gaming.jpg",
      gradient: "from-orange-500/80 to-orange-700/80",
    },
  ];
  
  // Features
  export const FEATURES = [
    {
      title: "Giao hàng nhanh",
      description: "Trong 2 giờ",
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Đổi hàng chính hãng",
      description: "Liên tục 24 tháng",
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Miễn phí vận chuyển",
      description: "Đơn từ 500k",
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Tư vấn nhiệt tình",
      color: "bg-purple-50 text-purple-600",
    },
  ];
  
  // Account tabs
  export type AccountTabType = "profile" | "orders" | "favorites" | "address" | "notifications" | "payment" | "settings";
  
  export const ACCOUNT_MENU_ITEMS = [
    { key: "profile" as AccountTabType, label: "Thông tin cá nhân" },
    { key: "orders" as AccountTabType, label: "Đơn hàng của tôi" },
    { key: "favorites" as AccountTabType, label: "Sản phẩm yêu thích" },
    { key: "address" as AccountTabType, label: "Địa chỉ giao hàng" },
    { key: "notifications" as AccountTabType, label: "Thông báo" },
    { key: "payment" as AccountTabType, label: "Phương thức thanh toán" },
    { key: "settings" as AccountTabType, label: "Cài đặt" },
  ];