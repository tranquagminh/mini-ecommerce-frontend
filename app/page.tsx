import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/Featuressection";
import { CategoriesSection } from "@/components/home/Categoriessection";
import { DealBanner } from "@/components/home/DealBanner";
import { ProductsSection } from "@/components/home/Productssection";
import { NewsletterSection } from "@/components/home/Newslettersection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <DealBanner />
        <ProductsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}