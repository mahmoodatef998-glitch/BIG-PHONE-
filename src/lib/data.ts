import { createClient } from '@supabase/supabase-js';
import type { Product, Brand, RFQ } from "@/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const USE_SUPABASE = !!(SUPABASE_URL && SUPABASE_KEY);

function db() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

// ─── Mock Brands (fallback) ───────────────────────────────────────────────────
const MOCK_BRANDS: Brand[] = [
  { id: "1", name: "Apple",   slug: "apple",   logo_url: null, banner_url: null, description: "Premium iPhones, iPads, Apple Watch & AirPods", product_count: 142, is_active: true, sort_order: 1, created_at: "2024-01-01" },
  { id: "2", name: "Samsung", slug: "samsung", logo_url: null, banner_url: null, description: "Galaxy Series smartphones and tablets",            product_count: 98,  is_active: true, sort_order: 2, created_at: "2024-01-01" },
  { id: "3", name: "Xiaomi",  slug: "xiaomi",  logo_url: null, banner_url: null, description: "Xiaomi, Redmi and POCO devices",                   product_count: 76,  is_active: true, sort_order: 3, created_at: "2024-01-01" },
  { id: "4", name: "Huawei",  slug: "huawei",  logo_url: null, banner_url: null, description: "Huawei P and Mate series",                         product_count: 54,  is_active: true, sort_order: 4, created_at: "2024-01-01" },
  { id: "5", name: "Oppo",    slug: "oppo",    logo_url: null, banner_url: null, description: "Oppo Find and Reno series",                         product_count: 43,  is_active: true, sort_order: 5, created_at: "2024-01-01" },
  { id: "6", name: "Vivo",    slug: "vivo",    logo_url: null, banner_url: null, description: "Vivo X and V series smartphones",                  product_count: 31,  is_active: true, sort_order: 6, created_at: "2024-01-01" },
];

// ─── Mock Products (fallback) ─────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1", brand_id: "1", name: "Apple iPhone 16 Pro Max 256GB Natural Titanium", slug: "apple-iphone-16-pro-max-256gb-natural-titanium",
    model: "iPhone 16 Pro Max", category: "smartphone", subcategory: "iphone-16-series",
    condition: "brand-new", storage: "256GB", color: "Natural Titanium", battery_health: null,
    warranty: "12 Months International", stock_quantity: 85, moq: 5, country_of_origin: "UAE",
    description: "Brand new sealed iPhone 16 Pro Max",
    specifications: { "Display": "6.9 inch Super Retina XDR", "Chip": "A18 Pro", "Camera": "48MP Triple Camera", "Battery": "4685 mAh" },
    images: [], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[0],
  },
  {
    id: "p2", brand_id: "1", name: "Apple iPhone 15 Pro 128GB Grade A Refurbished", slug: "apple-iphone-15-pro-128gb-grade-a",
    model: "iPhone 15 Pro", category: "smartphone", subcategory: "iphone-15-series",
    condition: "refurbished-grade-a", storage: "128GB", color: "Black Titanium", battery_health: 92,
    warranty: "6 Months", stock_quantity: 230, moq: 10, country_of_origin: "UAE",
    description: "Grade A refurbished iPhone 15 Pro in excellent condition",
    specifications: { "Display": "6.1 inch Super Retina XDR", "Chip": "A17 Pro", "Camera": "48MP Triple Camera" },
    images: [], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[0],
  },
  {
    id: "p3", brand_id: "1", name: "Apple iPhone 14 256GB Certified Refurbished", slug: "apple-iphone-14-256gb-certified-refurbished",
    model: "iPhone 14", category: "smartphone", subcategory: "iphone-14-series",
    condition: "certified-refurbished", storage: "256GB", color: "Purple", battery_health: 88,
    warranty: "12 Months", stock_quantity: 190, moq: 10, country_of_origin: "UAE",
    description: "Certified refurbished iPhone 14",
    specifications: { "Display": "6.1 inch Super Retina XDR", "Chip": "A15 Bionic" },
    images: [], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[0],
  },
  {
    id: "p4", brand_id: "2", name: "Samsung Galaxy S25 Ultra 512GB Brand New", slug: "samsung-galaxy-s25-ultra-512gb",
    model: "Galaxy S25 Ultra", category: "smartphone", subcategory: "galaxy-s25",
    condition: "brand-new", storage: "512GB", color: "Titanium Black", battery_health: null,
    warranty: "12 Months", stock_quantity: 65, moq: 5, country_of_origin: "UAE",
    description: "Brand new Samsung Galaxy S25 Ultra",
    specifications: { "Display": "6.9 inch QHD+ Dynamic AMOLED", "Chip": "Snapdragon 8 Elite", "Camera": "200MP Quad Camera" },
    images: [], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[1],
  },
  {
    id: "p5", brand_id: "2", name: "Samsung Galaxy S24 256GB Grade A", slug: "samsung-galaxy-s24-256gb-grade-a",
    model: "Galaxy S24", category: "smartphone", subcategory: "galaxy-s24",
    condition: "refurbished-grade-a", storage: "256GB", color: "Cobalt Violet", battery_health: 90,
    warranty: "6 Months", stock_quantity: 150, moq: 10, country_of_origin: "UAE",
    description: "Grade A refurbished Samsung Galaxy S24",
    specifications: { "Display": "6.2 inch FHD+ Dynamic AMOLED", "Chip": "Exynos 2400" },
    images: [], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[1],
  },
  {
    id: "p6", brand_id: "3", name: "Xiaomi 14 Ultra 512GB Brand New", slug: "xiaomi-14-ultra-512gb",
    model: "Xiaomi 14 Ultra", category: "smartphone", subcategory: "xiaomi-14",
    condition: "brand-new", storage: "512GB", color: "White", battery_health: null,
    warranty: "12 Months", stock_quantity: 45, moq: 5, country_of_origin: "China",
    description: "Brand new Xiaomi 14 Ultra with Leica cameras",
    specifications: { "Display": "6.73 inch AMOLED", "Chip": "Snapdragon 8 Gen 3" },
    images: [], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[2],
  },
  {
    id: "p7", brand_id: "1", name: "Apple iPad Pro 12.9\" M4 256GB Wi-Fi", slug: "apple-ipad-pro-12-m4-256gb",
    model: "iPad Pro 12.9\" M4", category: "tablet", subcategory: "ipad-pro",
    condition: "brand-new", storage: "256GB", color: "Space Black", battery_health: null,
    warranty: "12 Months", stock_quantity: 30, moq: 3, country_of_origin: "UAE",
    description: "Brand new iPad Pro with M4 chip",
    specifications: { "Display": "12.9 inch Liquid Retina XDR", "Chip": "Apple M4" },
    images: [], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[0],
  },
  {
    id: "p8", brand_id: "4", name: "Huawei Pura 70 Ultra 512GB", slug: "huawei-pura-70-ultra-512gb",
    model: "Pura 70 Ultra", category: "smartphone", subcategory: "pura-series",
    condition: "brand-new", storage: "512GB", color: "Black", battery_health: null,
    warranty: "12 Months", stock_quantity: 25, moq: 5, country_of_origin: "China",
    description: "Brand new Huawei Pura 70 Ultra",
    specifications: { "Display": "6.8 inch OLED", "Camera": "50MP Variable Aperture" },
    images: [], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01",
    brand: MOCK_BRANDS[3],
  },
];

// ─── Data Functions ───────────────────────────────────────────────────────────

export async function getProducts(filters?: Partial<{
  brand: string; condition: string; category: string; featured: boolean; search: string; limit: number;
}>): Promise<Product[]> {

  if (!USE_SUPABASE) {
    let products = [...MOCK_PRODUCTS];
    if (filters?.brand)     products = products.filter(p => p.brand?.slug === filters.brand);
    if (filters?.condition) products = products.filter(p => p.condition === filters.condition);
    if (filters?.category)  products = products.filter(p => p.category === filters.category);
    if (filters?.featured)  products = products.filter(p => p.is_featured);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q));
    }
    if (filters?.limit) products = products.slice(0, filters.limit);
    return products.filter(p => p.is_active);
  }

  let query = db()
    .from('products')
    .select('*, brand:brands(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (filters?.condition) query = query.eq('condition', filters.condition);
  if (filters?.category)  query = query.eq('category', filters.category);
  if (filters?.featured)  query = query.eq('is_featured', true);
  if (filters?.search) {
    const q = filters.search;
    query = query.or(`name.ilike.%${q}%,model.ilike.%${q}%`);
  }
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) { console.error('[getProducts]', error.message); return []; }

  let products = (data ?? []) as Product[];
  if (filters?.brand) {
    products = products.filter(p => (p.brand as Brand)?.slug === filters.brand);
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_SUPABASE) {
    return MOCK_PRODUCTS.find(p => p.slug === slug) ?? null;
  }

  const { data, error } = await db()
    .from('products')
    .select('*, brand:brands(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) { console.error('[getProductBySlug]', error.message); return null; }
  return (data as Product) ?? null;
}

export async function getBrands(): Promise<Brand[]> {
  if (!USE_SUPABASE) {
    return MOCK_BRANDS.filter(b => b.is_active).sort((a, b) => a.sort_order - b.sort_order);
  }

  const { data, error } = await db()
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) { console.error('[getBrands]', error.message); return []; }
  return (data ?? []) as Brand[];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!USE_SUPABASE) {
    return MOCK_BRANDS.find(b => b.slug === slug) ?? null;
  }

  const { data, error } = await db()
    .from('brands')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) { console.error('[getBrandBySlug]', error.message); return null; }
  return (data as Brand) ?? null;
}

export async function submitRFQ(data: Omit<RFQ, 'id' | 'status' | 'created_at'>): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!USE_SUPABASE) {
    console.log('[RFQ submitted - no Supabase]', data);
    return { success: true, id: Math.random().toString(36).slice(2) };
  }

  const { data: row, error } = await db()
    .from('rfqs')
    .insert([{ ...data, status: 'new' }])
    .select('id')
    .single();

  if (error) { console.error('[submitRFQ]', error.message); return { success: false, error: error.message }; }
  return { success: true, id: row.id };
}
