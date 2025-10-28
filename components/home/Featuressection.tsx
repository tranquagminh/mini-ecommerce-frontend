import { Truck, RefreshCw, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Trong 2 giờ",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: RefreshCw,
    title: "Đổi hàng chính hãng",
    description: "Liên tục 24 tháng",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: CreditCard,
    title: "Miễn phí vận chuyển",
    description: "Đơn từ 500k",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Tư vấn nhiệt tình",
    color: "bg-purple-50 text-purple-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}