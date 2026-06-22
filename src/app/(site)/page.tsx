import HeroSection from '@/components/home/HeroSection';
import BrandsGrid from '@/components/home/BrandsGrid';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedInventory from '@/components/home/FeaturedInventory';
import TrustSection from '@/components/home/TrustSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CTASection from '@/components/home/CTASection';
import { getBrands, getProducts } from '@/lib/data';

export const revalidate = 300;

export default async function HomePage() {
  const [brands, featuredProducts] = await Promise.all([
    getBrands(),
    getProducts({ featured: true, limit: 12 }),
  ]);

  return (
    <main className="mobile-nav-spacer">
      <HeroSection />
      <BrandsGrid brands={brands} />
      <CategoriesSection />
      <FeaturedInventory products={featuredProducts} />
      <TrustSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
}
