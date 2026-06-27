import HeroSection from '@/components/home/HeroSection';
import LiveStockTicker from '@/components/home/LiveStockTicker';
import BrandsGrid from '@/components/home/BrandsGrid';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedInventory from '@/components/home/FeaturedInventory';
import PopularListings from '@/components/home/PopularListings';
import TrustBar from '@/components/home/TrustBar';
import TrustSection from '@/components/home/TrustSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';
import { getBrands, getProducts, getNewArrivals } from '@/lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [brands, featuredProducts, popularProducts, newArrivals, tickerProducts] = await Promise.all([
    getBrands(),
    getProducts({ featured: true, limit: 12 }),
    getProducts({ limit: 60 }),
    getNewArrivals(12),
    getProducts({ limit: 30 }),
  ]);

  return (
    <>
      <HeroSection />
      <LiveStockTicker products={tickerProducts} />
      <BrandsGrid brands={brands} />
      <CategoriesSection />
      <FeaturedInventory products={featuredProducts} />
      <PopularListings products={popularProducts} newArrivals={newArrivals} />
      <TrustBar />
      <TrustSection />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
