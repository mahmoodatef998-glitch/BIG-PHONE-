import HeroSection from '@/components/home/HeroSection';
import StockTicker from '@/components/home/StockTicker';
import BrandsGrid from '@/components/home/BrandsGrid';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedInventory from '@/components/home/FeaturedInventory';
import PopularListings from '@/components/home/PopularListings';
import BrandShowcase from '@/components/home/BrandShowcase';
import TrustSection from '@/components/home/TrustSection';
import WhyBuySection from '@/components/home/WhyBuySection';
import ProcessSection from '@/components/home/ProcessSection';
import FooterCTA from '@/components/home/FooterCTA';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';
import { getBrands, getProducts } from '@/lib/data';

export const revalidate = 300;

export default async function HomePage() {
  const [brands, featuredProducts, allProducts] = await Promise.all([
    getBrands(),
    getProducts({ featured: true, limit: 16 }),
    getProducts({ limit: 60 }),
  ]);

  return (
    <main className="mobile-nav-spacer">
      <HeroSection />
      <StockTicker />
      <BrandsGrid brands={brands} />
      <CategoriesSection />
      <FeaturedInventory products={featuredProducts} />
      <PopularListings products={allProducts} />
      <BrandShowcase products={allProducts} />
      <TrustSection />
      <WhyBuySection />
      <ProcessSection />
      <FooterCTA />
      <WhatsAppCTA />
    </main>
  );
}
