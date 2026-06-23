import HeroSection from '@/components/home/HeroSection';
import StockTicker from '@/components/home/StockTicker';
import BrandsGrid from '@/components/home/BrandsGrid';
import FeaturedInventory from '@/components/home/FeaturedInventory';
import BrandShowcase from '@/components/home/BrandShowcase';
import WhyBuySection from '@/components/home/WhyBuySection';
import ProcessSection from '@/components/home/ProcessSection';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';
import FooterCTA from '@/components/home/FooterCTA';
import { getBrands, getProducts } from '@/lib/data';

export const revalidate = 300;

export default async function HomePage() {
  const [brands, featuredProducts, allProducts] = await Promise.all([
    getBrands(),
    getProducts({ featured: true, limit: 16 }),
    getProducts({ limit: 30 }),
  ]);

  return (
    <>
      <HeroSection />
      <StockTicker />
      <BrandsGrid brands={brands} />
      <FeaturedInventory products={featuredProducts} />
      <BrandShowcase products={allProducts} />
      <WhyBuySection />
      <ProcessSection />
      <FooterCTA />
      <WhatsAppCTA />
    </>
  );
}