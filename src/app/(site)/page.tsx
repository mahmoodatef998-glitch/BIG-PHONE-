import HeroSection from '@/components/home/HeroSection';
import BrandsGrid from '@/components/home/BrandsGrid';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedInventory from '@/components/home/FeaturedInventory';
import PopularListings from '@/components/home/PopularListings';
import TrustBar from '@/components/home/TrustBar';
import TrustSection from '@/components/home/TrustSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';
import { getBrands, getProducts } from '@/lib/data';

export const revalidate = 300;

export default async function HomePage() {
  const [brands, featuredProducts, popularProducts] = await Promise.all([
    getBrands(),
    getProducts({ featured: true, limit: 12 }),
    getProducts({ limit: 60 }),
  ]);

  return (
    <main className="mobile-nav-spacer">
      <HeroSection />
      <BrandsGrid brands={brands} />
      <CategoriesSection />
      <FeaturedInventory products={featuredProducts} />
      <PopularListings products={popularProducts} />
      <TrustBar />
      <TrustSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
