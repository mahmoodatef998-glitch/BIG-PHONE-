import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailPanel from '@/components/products/ProductDetailPanel';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductImagePlaceholder from '@/components/products/ProductImagePlaceholder';
import {
  ProductBreadcrumb,
  ProductSpecsSection,
  ProductRelatedSection,
} from '@/components/products/ProductPageClient';
import { getProductBySlug as fetchProduct, getProducts as fetchProducts, getProductStorageVariants, getProductColorVariants } from '@/lib/data';
import { getServerLang } from '@/lib/server-lang';
import { productMetadata, productNotFoundMetadata } from '@/lib/page-metadata';
import { getWhatsAppNumber } from '@/lib/site-config';

export const revalidate = 60;

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const lang = await getServerLang();
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) return productNotFoundMetadata(lang);
  return productMetadata(lang, product);
}

const WHATSAPP = getWhatsAppNumber();

const BRAND_GRADIENT: Record<string, [string, string]> = {
  apple:   ['#1C1C1E', '#3A3A3C'],
  samsung: ['#1428A0', '#2F4FE0'],
  xiaomi:  ['#FF6900', '#FF8C00'],
  huawei:  ['#CF0A2C', '#E83048'],
  oppo:    ['#1D3461', '#3B5998'],
  vivo:    ['#415FFF', '#6B7FFF'],
};

export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const [related, storageVariants, colorVariants] = await Promise.all([
    fetchProducts({ brand: product.brand?.slug, limit: 5 }),
    getProductStorageVariants(product),
    getProductColorVariants(product),
  ]);
  const [bg1, bg2] = BRAND_GRADIENT[product.brand?.slug ?? ''] ?? ['#1A2332', '#2D3748'];
  const isTablet = product.category === 'tablet';
  const isAudio  = product.category === 'airpods';

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bigphone.ae';
  const priceValidUntil = product.updated_at
    ? new Date(new Date(product.updated_at).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description ?? `Buy ${product.name} wholesale from BIG PHONE Dubai.`,
    brand: { '@type': 'Brand', name: product.brand?.name ?? '' },
    sku: product.slug,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}`,
      priceCurrency: 'AED',
      ...(product.price_aed && product.show_price !== false ? {
        price: product.price_aed,
        priceValidUntil,
      } : {}),
      availability: product.stock_quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'BIG PHONE' },
    },
  };

  return (
    <div style={{ background: '#F8FAFC' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductBreadcrumb
        brandName={product.brand?.name}
        brandSlug={product.brand?.slug}
        model={product.model}
      />

      <div className="container-site product-page-container">
        <div className="product-detail-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <ProductImageGallery
              key={product.id}
              images={product.images}
              alt={product.name}
              fallback={(
                <ProductImagePlaceholder
                  bg1={bg1}
                  bg2={bg2}
                  isTablet={isTablet}
                  isAudio={isAudio}
                />
              )}
            />

            {product.specifications && (
              <ProductSpecsSection specifications={product.specifications} />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <ProductDetailPanel
              key={product.slug}
              product={product}
              storageVariants={storageVariants}
              colorVariants={colorVariants}
              whatsappNumber={WHATSAPP}
            />
          </div>
        </div>

        <ProductRelatedSection
          related={related}
          currentId={product.id}
          brandName={product.brand?.name}
          brandSlug={product.brand?.slug}
        />
      </div>

      <style>{`
        .product-page-container { padding: 2rem 1rem 4rem; }
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
        }
        @media (min-width: 768px) {
          .product-detail-grid { grid-template-columns: 1fr 1fr; }
          .related-grid { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 389px) {
          .related-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
