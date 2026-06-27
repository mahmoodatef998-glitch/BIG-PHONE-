import { createClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Product, Brand, RFQ, Collection } from "@/types";
import {
  REFURB_CONDITIONS,
  applyProductFilters,
  applyProductSort,
  type ProductQueryFilters,
} from '@/lib/product-filters';
import { buildStorageVariants, type StorageVariant } from '@/lib/product-variants';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const USE_SUPABASE = !!(SUPABASE_URL && SUPABASE_KEY);

// Anon client — for public reads and public RFQ submissions
function db() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Service-role client — bypasses RLS, server-side only
function adminDb() {
  return createAdminClient();
}

const MOCK_BRANDS: Brand[] = [
  { id: "1", name: "Apple",   slug: "apple",    logo_url: null, banner_url: null, description: "Premium iPhones, iPads, Apple Watch & AirPods",   product_count: 142, is_active: true, sort_order: 1, created_at: "2024-01-01" },
  { id: "2", name: "Samsung", slug: "samsung",  logo_url: null, banner_url: null, description: "Galaxy smartphones, tablets & audio devices",       product_count: 98,  is_active: true, sort_order: 2, created_at: "2024-01-01" },
  { id: "3", name: "Xiaomi",  slug: "xiaomi",   logo_url: null, banner_url: null, description: "Xiaomi, Redmi and POCO smartphones & tablets",      product_count: 76,  is_active: true, sort_order: 3, created_at: "2024-01-01" },
  { id: "4", name: "Huawei",  slug: "huawei",   logo_url: null, banner_url: null, description: "Huawei P, Mate and Pura series",                    product_count: 54,  is_active: true, sort_order: 4, created_at: "2024-01-01" },
  { id: "5", name: "Oppo",    slug: "oppo",     logo_url: null, banner_url: null, description: "Oppo Find X and Reno flagship series",              product_count: 43,  is_active: true, sort_order: 5, created_at: "2024-01-01" },
  { id: "6", name: "Vivo",    slug: "vivo",     logo_url: null, banner_url: null, description: "Vivo X and V series smartphones",                   product_count: 31,  is_active: true, sort_order: 6, created_at: "2024-01-01" },
  { id: "7", name: "OEM",     slug: "oem",      logo_url: null, banner_url: null, description: "Quality accessories, chargers, cases & protectors", product_count: 89,  is_active: false, sort_order: 7, created_at: "2024-01-01" },
];

// Apple device renders — littlebyteorg/apple-device-images (MIT licensed)
const GH = 'https://raw.githubusercontent.com/littlebyteorg/apple-device-images/main/device';
// Samsung official product CDN
const SAM = 'https://images.samsung.com/is/image/samsung/p6pim';

const AB = MOCK_BRANDS;

const MOCK_PRODUCTS: Product[] = [
  // ── Smartphones ─────────────────────────────────────────────────────────────
  { id: "p1",  brand_id: "1", name: "Apple iPhone 16 Pro Max 256GB Natural Titanium",    slug: "apple-iphone-16-pro-max-256gb-natural-titanium", model: "iPhone 16 Pro Max",    category: "smartphone", subcategory: "iphone-16-series",  condition: "brand-new",              storage: "256GB", color: "Natural Titanium", battery_health: null, warranty: "12 Months", stock_quantity: 85,   moq: 5,  country_of_origin: "UAE",   description: "Brand new sealed iPhone 16 Pro Max with A18 Pro chip.",        specifications: { "Display": "6.9\" Super Retina XDR", "Chip": "A18 Pro" },           images: [`${GH}/iPhone17%2C1/Natural%20Titanium.png`, `${GH}/iPhone17%2C1/Black%20Titanium.png`], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p2",  brand_id: "1", name: "Apple iPhone 15 Pro 128GB Grade A Refurbished",     slug: "apple-iphone-15-pro-128gb-grade-a",             model: "iPhone 15 Pro",        category: "smartphone", subcategory: "iphone-15-series",  condition: "refurbished-grade-a",    storage: "128GB", color: "Black Titanium",  battery_health: 92,   warranty: "6 Months",  stock_quantity: 230,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished iPhone 15 Pro.",                          specifications: { "Chip": "A17 Pro", "Camera": "48MP Triple" },                    images: [`${GH}/iPhone16%2C1/Black%20Titanium.png`, `${GH}/iPhone16%2C1/Natural%20Titanium.png`], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p9",  brand_id: "1", name: "Apple iPhone 15 128GB Brand New",                   slug: "apple-iphone-15-128gb-brand-new",               model: "iPhone 15",            category: "smartphone", subcategory: "iphone-15-series",  condition: "brand-new",              storage: "128GB", color: "Pink",            battery_health: null, warranty: "12 Months", stock_quantity: 200,  moq: 10, country_of_origin: "UAE",   description: "Brand new iPhone 15 with Dynamic Island.",                    specifications: { "Chip": "A16 Bionic", "Camera": "48MP + 12MP" },               images: [`${GH}/iPhone15%2C4/Pink.png`, `${GH}/iPhone15%2C4/Black.png`],       is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: 2850, show_price: true },
  { id: "p9b", brand_id: "1", name: "Apple iPhone 15 512GB Brand New",                   slug: "apple-iphone-15-512gb-brand-new",               model: "iPhone 15",            category: "smartphone", subcategory: "iphone-15-series",  condition: "brand-new",              storage: "512GB", color: "Pink",            battery_health: null, warranty: "12 Months", stock_quantity: 45,   moq: 10, country_of_origin: "UAE",   description: "Brand new iPhone 15 with Dynamic Island.",                    specifications: { "Chip": "A16 Bionic", "Camera": "48MP + 12MP" },               images: [`${GH}/iPhone15%2C4/Pink.png`, `${GH}/iPhone15%2C4/Black.png`],       is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: 3400, show_price: true },
  { id: "p9c", brand_id: "1", name: "Apple iPhone 15 1TB Brand New",                       slug: "apple-iphone-15-1tb-brand-new",                 model: "iPhone 15",            category: "smartphone", subcategory: "iphone-15-series",  condition: "brand-new",              storage: "1TB",   color: "Pink",            battery_health: null, warranty: "12 Months", stock_quantity: 0,    moq: 10, country_of_origin: "UAE",   description: "Brand new iPhone 15 with Dynamic Island.",                    specifications: { "Chip": "A16 Bionic", "Camera": "48MP + 12MP" },               images: [`${GH}/iPhone15%2C4/Pink.png`, `${GH}/iPhone15%2C4/Black.png`],       is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: 4100, show_price: true },
  { id: "p10", brand_id: "1", name: "Apple iPhone 13 Pro 256GB Grade A Refurbished",     slug: "apple-iphone-13-pro-256gb-grade-a",             model: "iPhone 13 Pro",        category: "smartphone", subcategory: "iphone-13-series",  condition: "refurbished-grade-a",    storage: "256GB", color: "Sierra Blue",     battery_health: 89,   warranty: "6 Months",  stock_quantity: 320,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished iPhone 13 Pro.",                          specifications: { "Chip": "A15 Bionic" },                                          images: [`${GH}/iPhone14%2C2/Sierra%20Blue.png`, `${GH}/iPhone14%2C2/Graphite.png`],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p3",  brand_id: "1", name: "Apple iPhone 14 256GB Certified Refurbished",       slug: "apple-iphone-14-256gb-certified-refurbished",   model: "iPhone 14",            category: "smartphone", subcategory: "iphone-14-series",  condition: "certified-refurbished",  storage: "256GB", color: "Purple",          battery_health: 88,   warranty: "12 Months", stock_quantity: 190,  moq: 10, country_of_origin: "UAE",   description: "Certified refurbished iPhone 14.",                            specifications: { "Chip": "A15 Bionic" },                                          images: [`${GH}/iPhone14%2C7/Purple.png`, `${GH}/iPhone14%2C7/Blue.png`],     is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p11", brand_id: "1", name: "Apple iPhone 12 128GB Grade B Refurbished",         slug: "apple-iphone-12-128gb-grade-b",                 model: "iPhone 12",            category: "smartphone", subcategory: "iphone-12-series",  condition: "refurbished-grade-b",    storage: "128GB", color: "Black",           battery_health: 82,   warranty: "3 Months",  stock_quantity: 450,  moq: 20, country_of_origin: "UAE",   description: "Grade B refurbished iPhone 12.",                              specifications: { "Chip": "A14 Bionic" },                                          images: [`${GH}/iPhone13%2C2/Black.png`, `${GH}/iPhone13%2C2/Blue.png`],  is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p4",  brand_id: "2", name: "Samsung Galaxy S25 Ultra 512GB Brand New",          slug: "samsung-galaxy-s25-ultra-512gb",                model: "Galaxy S25 Ultra",     category: "smartphone", subcategory: "galaxy-s25",        condition: "brand-new",              storage: "512GB", color: "Titanium Black",  battery_health: null, warranty: "12 Months", stock_quantity: 65,   moq: 5,  country_of_origin: "UAE",   description: "Brand new Galaxy S25 Ultra with Galaxy AI.",                  specifications: { "Chip": "Snapdragon 8 Elite", "Camera": "200MP" },               images: [`${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-thumb-544359864`, `${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-544359864`], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p12", brand_id: "2", name: "Samsung Galaxy S24 Ultra 256GB Brand New",          slug: "samsung-galaxy-s24-ultra-256gb",                model: "Galaxy S24 Ultra",     category: "smartphone", subcategory: "galaxy-s24",        condition: "brand-new",              storage: "256GB", color: "Titanium Gray",   battery_health: null, warranty: "12 Months", stock_quantity: 80,   moq: 5,  country_of_origin: "UAE",   description: "Brand new Galaxy S24 Ultra.",                                 specifications: { "Chip": "Snapdragon 8 Gen 3", "Camera": "200MP" },              images: [`${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-thumb-539463971`, `${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-539463971`], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p13", brand_id: "2", name: "Samsung Galaxy A54 5G 128GB Brand New",             slug: "samsung-galaxy-a54-5g-128gb",                  model: "Galaxy A54 5G",        category: "smartphone", subcategory: "galaxy-a-series",   condition: "brand-new",              storage: "128GB", color: "Awesome Lime",    battery_health: null, warranty: "12 Months", stock_quantity: 380,  moq: 20, country_of_origin: "UAE",   description: "Brand new Galaxy A54 5G.",                                    specifications: { "Chip": "Exynos 1380", "Camera": "50MP Triple" },              images: [`${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-thumb-539573637`, `${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-539573637`],    is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p5",  brand_id: "2", name: "Samsung Galaxy S24 256GB Grade A Refurbished",      slug: "samsung-galaxy-s24-256gb-grade-a",              model: "Galaxy S24",           category: "smartphone", subcategory: "galaxy-s24",        condition: "refurbished-grade-a",    storage: "256GB", color: "Cobalt Violet",   battery_health: 90,   warranty: "6 Months",  stock_quantity: 150,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished Samsung Galaxy S24.",                     specifications: { "Chip": "Exynos 2400" },                                        images: [`${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-thumb-539353881`, `${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-539353881`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p6",  brand_id: "3", name: "Xiaomi 14 Ultra 512GB Brand New",                   slug: "xiaomi-14-ultra-512gb",                         model: "Xiaomi 14 Ultra",      category: "smartphone", subcategory: "xiaomi-14",         condition: "brand-new",              storage: "512GB", color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 45,   moq: 5,  country_of_origin: "China",  description: "Brand new Xiaomi 14 Ultra with Leica cameras.",               specifications: { "Chip": "Snapdragon 8 Gen 3" },                                 images: ['https://viostore.vn/wp-content/uploads/2024/02/3-2-510x510.png', 'https://viostore.vn/wp-content/uploads/2024/02/3-2-510x510.png'],      is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[2], price_aed: null, show_price: true },
  { id: "p8",  brand_id: "4", name: "Huawei Pura 70 Ultra 512GB Brand New",              slug: "huawei-pura-70-ultra-512gb",                    model: "Pura 70 Ultra",        category: "smartphone", subcategory: "pura-series",       condition: "brand-new",              storage: "512GB", color: "Black",           battery_health: null, warranty: "12 Months", stock_quantity: 25,   moq: 5,  country_of_origin: "China",  description: "Brand new Huawei Pura 70 Ultra.",                             specifications: { "Camera": "50MP Variable Aperture Leica" },                     images: ['https://sonpixel.vn/wp-content/uploads/2024/04/huawei-pura-70-ultra-13.webp', 'https://sonpixel.vn/wp-content/uploads/2024/04/huawei-pura-70-ultra-13.webp'],               is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[3], price_aed: null, show_price: true },
  { id: "p14", brand_id: "5", name: "OPPO Find X7 Ultra 512GB Brand New",                slug: "oppo-find-x7-ultra-512gb",                      model: "Find X7 Ultra",        category: "smartphone", subcategory: "find-x-series",     condition: "brand-new",              storage: "512GB", color: "Burgundy",        battery_health: null, warranty: "12 Months", stock_quantity: 35,   moq: 5,  country_of_origin: "China",  description: "Brand new OPPO Find X7 Ultra.",                               specifications: { "Camera": "50MP Quad Hasselblad" },                             images: ['https://viostore.vn/wp-content/uploads/2024/03/3-7-510x510.png', 'https://viostore.vn/wp-content/uploads/2024/03/3-7-510x510.png'],          is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[4], price_aed: null, show_price: true },
  { id: "p15", brand_id: "6", name: "Vivo X100 Pro 512GB Brand New",                     slug: "vivo-x100-pro-512gb",                           model: "X100 Pro",             category: "smartphone", subcategory: "x-series",          condition: "brand-new",              storage: "512GB", color: "Asteroid Black",  battery_health: null, warranty: "12 Months", stock_quantity: 28,   moq: 5,  country_of_origin: "China",  description: "Brand new Vivo X100 Pro with Zeiss cameras.",                 specifications: { "Camera": "50MP Triple Zeiss" },                               images: ['https://viostore.vn/wp-content/uploads/2024/04/6-1-510x510.png', 'https://viostore.vn/wp-content/uploads/2024/04/6-1-510x510.png'],         is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[5], price_aed: null, show_price: true },
  // ── Tablets ──────────────────────────────────────────────────────────────────
  { id: "p7",  brand_id: "1", name: "Apple iPad Pro 12.9\" M4 256GB Wi-Fi",             slug: "apple-ipad-pro-12-m4-256gb",                    model: "iPad Pro 12.9\" M4",   category: "tablet",     subcategory: "ipad-pro",          condition: "brand-new",              storage: "256GB", color: "Space Black",     battery_health: null, warranty: "12 Months", stock_quantity: 30,   moq: 3,  country_of_origin: "UAE",   description: "Brand new iPad Pro with M4 chip and OLED display.",           specifications: { "Chip": "Apple M4", "Display": "12.9\" OLED" },                  images: [`${GH}/iPad16%2C5/Space%20Black.png`, `${GH}/iPad16%2C5/Silver.png`],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p22", brand_id: "2", name: "Samsung Galaxy Tab S9 Ultra 512GB Wi-Fi",           slug: "samsung-galaxy-tab-s9-ultra-512gb",             model: "Galaxy Tab S9 Ultra",  category: "tablet",     subcategory: "galaxy-tab-s9",     condition: "brand-new",              storage: "512GB", color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 40,   moq: 3,  country_of_origin: "UAE",   description: "Brand new Galaxy Tab S9 Ultra, 14.6\" AMOLED.",               specifications: { "Chip": "Snapdragon 8 Gen 2", "S-Pen": "Included" },           images: [`${SAM}/id/sm-x910-sm-x910nzdidxid/gallery/id-galaxy-tab-s9-ultra-sm-x910-sm-x910nzdidxid-thumb-532824371`, `${SAM}/id/sm-x910-sm-x910nzdidxid/gallery/id-galaxy-tab-s9-ultra-sm-x910-sm-x910nzdidxid-532824371`], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p23", brand_id: "1", name: "Apple iPad Air 5 M1 256GB Wi-Fi",                  slug: "apple-ipad-air-5-m1-256gb",                     model: "iPad Air 5 M1",        category: "tablet",     subcategory: "ipad-air",          condition: "brand-new",              storage: "256GB", color: "Starlight",       battery_health: null, warranty: "12 Months", stock_quantity: 55,   moq: 3,  country_of_origin: "UAE",   description: "Brand new iPad Air 5 with M1 chip.",                          specifications: { "Chip": "Apple M1", "Display": "10.9\" Liquid Retina" },         images: [`${GH}/iPad13%2C18/Silver.png`, `${GH}/iPad13%2C18/Blue.png`],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p24", brand_id: "1", name: "Apple iPad mini 6 256GB Wi-Fi",                    slug: "apple-ipad-mini-6-256gb",                       model: "iPad mini 6",          category: "tablet",     subcategory: "ipad-mini",         condition: "brand-new",              storage: "256GB", color: "Purple",          battery_health: null, warranty: "12 Months", stock_quantity: 45,   moq: 5,  country_of_origin: "UAE",   description: "Brand new iPad mini 6 with A15 Bionic.",                      specifications: { "Chip": "A15 Bionic", "Display": "8.3\" Liquid Retina" },        images: [`${GH}/iPad14%2C1/Purple.png`, `${GH}/iPad14%2C1/Starlight.png`],              is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p25", brand_id: "2", name: "Samsung Galaxy Tab A9+ 128GB Wi-Fi",               slug: "samsung-galaxy-tab-a9-plus-128gb",              model: "Galaxy Tab A9+",       category: "tablet",     subcategory: "galaxy-tab-a",      condition: "brand-new",              storage: "128GB", color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 120,  moq: 10, country_of_origin: "UAE",   description: "Brand new Galaxy Tab A9+ best-value tablet.",                 specifications: { "Chip": "Snapdragon 695", "Battery": "7040 mAh" },               images: [`${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-thumb-538905799`, `${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-538905788`],      is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p26", brand_id: "3", name: "Xiaomi Pad 6 Pro 256GB Wi-Fi",                     slug: "xiaomi-pad-6-pro-256gb",                        model: "Pad 6 Pro",            category: "tablet",     subcategory: "xiaomi-pad",        condition: "brand-new",              storage: "256GB", color: "Black",           battery_health: null, warranty: "12 Months", stock_quantity: 65,   moq: 5,  country_of_origin: "China",  description: "Brand new Xiaomi Pad 6 Pro, 144Hz display.",                  specifications: { "Chip": "Snapdragon 8+ Gen 1", "Display": "11.47\" 144Hz" },    images: ['https://images.kabum.com.br/produtos/fotos/sync_mirakl/580369/Tablet-Xiaomi-Mi-Pad-6-8GB-RAM-128GB-Octa-Core-Camera-13MP-Tela-De-11-Gravity-Gray_1716309108_gg.jpg', 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/580369/Tablet-Xiaomi-Mi-Pad-6-8GB-RAM-128GB-Octa-Core-Camera-13MP-Tela-De-11-Gravity-Gray_1716309108_gg.jpg'],   is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[2], price_aed: null, show_price: true },
  // ── AirPods / Audio ───────────────────────────────────────────────────────────
  { id: "p16", brand_id: "1", name: "Apple AirPods Pro 2nd Generation USB-C",            slug: "apple-airpods-pro-2-usbc",                      model: "AirPods Pro 2",        category: "airpods",    subcategory: "airpods-pro",       condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 250,  moq: 10, country_of_origin: "UAE",   description: "Brand new AirPods Pro 2 with USB-C and ANC.",                 specifications: { "Chip": "H2", "Battery": "30h total" },                         images: [`${GH}/AirPodsPro1%2C2-usbc-case/White.png`, `${GH}/AirPodsPro1%2C2-usbc-left/White.png`],       is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p17", brand_id: "2", name: "Samsung Galaxy Buds2 Pro Graphite",                 slug: "samsung-galaxy-buds2-pro-graphite",             model: "Galaxy Buds2 Pro",     category: "airpods",    subcategory: "galaxy-buds",       condition: "brand-new",              storage: null,    color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 180,  moq: 10, country_of_origin: "UAE",   description: "Brand new Galaxy Buds2 Pro.",                                 specifications: { "Audio": "24bit Hi-Fi", "IP": "IPX7" },                          images: [`${SAM}/uk/2208/gallery/uk-galaxy-buds2-pro-r510-sm-r510nlvaeub-thumb-533240882`, `${SAM}/uk/2208/gallery/uk-galaxy-buds2-pro-r510-sm-r510nlvaeub-533240882`],    is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  // ── Accessories ──────────────────────────────────────────────────────────────
  { id: "p18", brand_id: "7", name: "65W GaN USB-C Fast Charger Bulk Pack x10",          slug: "65w-gan-usbc-charger-bulk-x10",                 model: "65W GaN Charger",      category: "accessory",  subcategory: "chargers",          condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "6 Months",  stock_quantity: 1000, moq: 10, country_of_origin: "China",  description: "Bulk 10x 65W GaN USB-C chargers.",                            specifications: { "Output": "65W USB-C PD", "Tech": "GaN III" },                  images: ['https://placehold.co/400x400/1a1a1a/FFFFFF?text=65W+GaN+Charger', 'https://placehold.co/400x400/2a2a2a/FFFFFF?text=Bulk+x10'],              is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p19", brand_id: "7", name: "9H Tempered Glass Screen Protectors Bulk x50",      slug: "tempered-glass-screen-protectors-bulk-x50",    model: "Tempered Glass Protectors", category: "accessory", subcategory: "screen-protectors", condition: "brand-new",             storage: null,    color: "Clear",           battery_health: null, warranty: "3 Months",  stock_quantity: 5000, moq: 50, country_of_origin: "China",  description: "Bulk 50pcs 9H tempered glass.",                               specifications: { "Hardness": "9H", "Thickness": "0.33mm" },                       images: ['https://placehold.co/400x400/0a0a0a/FFFFFF?text=9H+Tempered+Glass', 'https://placehold.co/400x400/111111/FFFFFF?text=Bulk+x50'],         is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p20", brand_id: "7", name: "Premium Liquid Silicone Phone Cases Bulk x50",      slug: "silicone-phone-cases-bulk-x50",                model: "Silicone Cases Bulk",  category: "accessory",  subcategory: "cases",             condition: "brand-new",              storage: null,    color: "Assorted",        battery_health: null, warranty: "3 Months",  stock_quantity: 3000, moq: 50, country_of_origin: "China",  description: "Bulk 50pcs premium liquid silicone cases.",                   specifications: { "Material": "Liquid Silicone", "Colors": "20+ assorted" },       images: ['https://placehold.co/400x400/334155/FFFFFF?text=Silicone+Cases', 'https://placehold.co/400x400/475569/FFFFFF?text=20%2B+Colors'],     is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p21", brand_id: "1", name: "Apple MagSafe Charger 15W USB-C 1m",               slug: "apple-magsafe-charger-15w-usbc",                model: "MagSafe Charger",      category: "accessory",  subcategory: "chargers",          condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 420,  moq: 10, country_of_origin: "UAE",   description: "Genuine Apple MagSafe Charger 15W.",                          specifications: { "Output": "15W MagSafe" },                                      images: [`${GH}/MagSafe%20Charger%20%281m%29-2.png`, `${GH}/MagSafe%20Duo%20Charger.png`],   is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  // ── Accessories from Product_details.xlsx ────────────────────────────────────
  { id: "acc1", brand_id: "1", name: "Apple Lightning to USB Cable – 1 Meter",           slug: "apple-lightning-to-usb-cable-1m",               model: "Lightning to USB Cable 1m",   category: "accessory", subcategory: "cables",   condition: "brand-new", storage: null, color: null, battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Reliable charging for your Apple devices. Built for fast syncing, stable charging, and long-lasting performance.", specifications: { "Compatible With": "iPhone 5–14, iPad Lightning, AirPods", "Selling Points": "Original quality · Safe charging · Premium finish" }, images: [`${GH}/Lightning%20to%20USB%20Cable%20%281m%29-1.png`, `${GH}/Lightning%20to%20USB%20Cable%20%282m%29.png`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "acc2", brand_id: "1", name: "Apple USB-C to Lightning Cable – 1 Meter",         slug: "apple-usb-c-to-lightning-cable-1m",             model: "USB-C to Lightning Cable 1m", category: "accessory", subcategory: "cables",   condition: "brand-new", storage: null, color: null, battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Charge your iPhone faster with USB-C power delivery technology.",                                                  specifications: { "Compatible With": "iPhone 8+, AirPods, Lightning iPads",     "Selling Points": "Fast charge · Premium quality · High efficiency" },           images: [`${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29.png`, `${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29-2.png`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "acc3", brand_id: "1", name: "Apple USB-C to USB-C 60W Charging Cable – 1 Meter", slug: "apple-usb-c-60w-cable-1m",                     model: "USB-C 60W Cable 1m",          category: "accessory", subcategory: "cables",   condition: "brand-new", storage: null, color: null, battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Perfect for high-speed charging and data transfer across all USB-C devices.",                                       specifications: { "Output": "60W Power Delivery", "Compatible With": "MacBook, iPad Pro, USB-C devices", "Selling Points": "Braided premium cable" },         images: [`${GH}/USB-C%20Charge%20Cable%20%281m%29.png`, `${GH}/240W%20USB-C%20Charge%20Cable%20%282m%29.png`],    is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "acc4", brand_id: "1", name: "Apple 20W USB-C Power Adapter",                    slug: "apple-20w-usb-c-power-adapter",                 model: "20W USB-C Power Adapter",     category: "accessory", subcategory: "chargers", condition: "brand-new", storage: null, color: "White", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Fast, compact, and efficient charging for your daily Apple devices.",                                               specifications: { "Output": "20W USB-C", "Compatible With": "iPhone 8+, iPad, AirPods", "Selling Points": "Fast charge · Travel friendly" },               images: [`${GH}/35W%20Dual%20USB-C%20Port%20Compact%20Power%20Adapter.png`, `${GH}/70W%20USB-C%20Power%20Adapter.png`],          is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "acc5", brand_id: "1", name: "Apple EarPods USB-C",                              slug: "apple-earpods-usb-c",                           model: "EarPods USB-C",               category: "accessory", subcategory: "earphones", condition: "brand-new", storage: null, color: "White", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Enjoy clear sound, deep bass, and comfortable listening all day.",                                                   specifications: { "Connectivity": "USB-C", "Compatible With": "iPhone 15 series, USB-C iPads", "Selling Points": "Crystal clear audio · Built-in mic" },   images: [`${GH}/EarPods%20with%20Lightning%20Connector.png`, `${GH}/EarPods%20with%203.5mm%20Headphone%20Plug.png`],     is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "acc6", brand_id: "2", name: "Samsung USB-C to USB-C Cable – 3A / 1.8 Meter",   slug: "samsung-usb-c-cable-3a-1-8m",                  model: "USB-C Cable 3A 1.8m",         category: "accessory", subcategory: "cables",   condition: "brand-new", storage: null, color: null, battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Reliable charging with extra cable length for better convenience.",                                                  specifications: { "Output": "3A Fast Charging", "Length": "1.8 Meter", "Compatible With": "Samsung Galaxy, Tablets, USB-C devices" },                       images: [`${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-thumb-548710466`, `${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-548710466`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "acc7", brand_id: "2", name: "Samsung Super Fast Car Charger Dual Port (45W + 15W)", slug: "samsung-car-charger-45w-15w",               model: "Car Charger 45W+15W",         category: "accessory", subcategory: "chargers", condition: "brand-new", storage: null, color: "Black", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 5,  country_of_origin: "UAE", description: "Charge two devices simultaneously with powerful fast charging on the road.",                                         specifications: { "Output": "45W + 15W Dual Port", "Compatible With": "Samsung, iPhones, Tablets", "Selling Points": "Dual output · Fast car charging" },    images: [`${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`, `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-544023430`],  is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "acc8", brand_id: "2", name: "Samsung 25W Super Fast Charger",                    slug: "samsung-25w-super-fast-charger",                model: "25W Super Fast Charger",      category: "accessory", subcategory: "chargers", condition: "brand-new", storage: null, color: "Black", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Fast and efficient charging for everyday use.",                                                                      specifications: { "Output": "25W USB-C", "Compatible With": "Samsung Galaxy, USB-C devices", "Selling Points": "Super fast charging · Compact" },            images: [`${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-thumb-542922454`, `${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-542922454`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "acc9", brand_id: "2", name: "Samsung 45W Super Fast Charger",                    slug: "samsung-45w-super-fast-charger",                model: "45W Super Fast Charger",      category: "accessory", subcategory: "chargers", condition: "brand-new", storage: null, color: "Black", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Fast and efficient charging for everyday use.",                                                                      specifications: { "Output": "45W USB-C", "Compatible With": "Samsung Galaxy, USB-C devices", "Selling Points": "Super fast charging · Compact" },            images: [`${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`, `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-544023430`], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "ac10", brand_id: "2", name: "Samsung USB-C to USB-C Cable – 5A / 1 Meter",     slug: "samsung-usb-c-cable-5a-1m",                    model: "USB-C Cable 5A 1m",           category: "accessory", subcategory: "cables",   condition: "brand-new", storage: null, color: null, battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 10, country_of_origin: "UAE", description: "Built for high-speed charging and powerful performance.",                                                            specifications: { "Output": "5A Ultra-Fast", "Compatible With": "Samsung, Tablets, Laptops", "Selling Points": "5A support · High speed · Durable" },        images: [`${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`, `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-548717960`],  is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "ac11", brand_id: "2", name: "Samsung 45W Power Adapter with 5A Cable",          slug: "samsung-45w-adapter-with-5a-cable",             model: "45W Adapter + 5A Cable",      category: "accessory", subcategory: "chargers", condition: "brand-new", storage: null, color: "Black", battery_health: null, warranty: "12 Months", stock_quantity: 0, moq: 5,  country_of_origin: "UAE", description: "The complete fast charging solution for power users.",                                                               specifications: { "Output": "45W USB-C + 5A Cable", "Compatible With": "Samsung Galaxy Ultra, Tablets, USB-C laptops", "Selling Points": "Cable included · Powerful 45W" }, images: [`${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`, `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`],is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
];

const MOCK_RFQS: RFQ[] = [
  { id: '1', company_name: 'Al Baraka Mobile', contact_person: 'Ahmed Al-Rashid', country: 'Saudi Arabia', phone: '+966501234567', email: 'ahmed@albaraka.sa', product_interest: 'iPhone 15 Pro 128GB Grade A', quantity: 50, message: 'Need urgent delivery to Riyadh', status: 'new', created_at: '2024-01-15T10:30:00Z' },
  { id: '2', company_name: 'Tech World LLC', contact_person: 'Mohamed Hassan', country: 'Egypt', phone: '+201001234567', email: 'mohamed@techworld.eg', product_interest: 'Samsung Galaxy S24 256GB', quantity: 100, message: 'Export to Egypt, need HS codes', status: 'contacted', created_at: '2024-01-15T08:15:00Z' },
  { id: '3', company_name: 'Dubai Phone Mart', contact_person: 'Sarah Johnson', country: 'UAE', phone: '+971501234567', email: 'sarah@dubaiphone.ae', product_interest: 'Mixed iPhone 14 Lot', quantity: 200, message: 'Various colors and storage', status: 'quoted', created_at: '2024-01-14T16:45:00Z' },
  { id: '4', company_name: 'Global Mobile KE', contact_person: 'James Mwangi', country: 'Kenya', phone: '+254701234567', email: 'james@globalmobile.ke', product_interest: 'Xiaomi 13 Pro 256GB', quantity: 30, message: 'Nairobi delivery required', status: 'new', created_at: '2024-01-14T09:00:00Z' },
  { id: '5', company_name: 'Horizon Phones PK', contact_person: 'Ali Raza', country: 'Pakistan', phone: '+923001234567', email: 'ali@horizonphones.pk', product_interest: 'Huawei P60 Pro', quantity: 25, message: 'Karachi port delivery', status: 'closed', created_at: '2024-01-13T14:30:00Z' },
];

const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'New Arrivals',      slug: 'new-arrivals',     description: 'Latest additions to our wholesale catalog', image_url: null, sort_order: 1, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c2', name: 'Best Sellers',      slug: 'best-sellers',     description: 'Most popular wholesale items',              image_url: null, sort_order: 2, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c3', name: 'Accessories',       slug: 'accessories',      description: 'Chargers, cables, earphones & more',        image_url: null, sort_order: 3, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c4', name: 'Refurbished Deals', slug: 'refurbished-deals', description: 'Grade A and certified refurbished',        image_url: null, sort_order: 4, is_active: false, created_at: '2024-01-01', updated_at: '2024-01-01' },
];

// ─── Public functions (anon key) ───────────────────────────────────────────────

export type { ProductQueryFilters } from '@/lib/product-filters';

async function resolveCollectionId(slugOrId: string): Promise<string | null> {
  if (!USE_SUPABASE) {
    return MOCK_COLLECTIONS.find(c => c.slug === slugOrId || c.id === slugOrId)?.id ?? null;
  }
  const { data, error } = await db()
    .from('collections')
    .select('id')
    .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
    .maybeSingle();
  if (error || !data) return null;
  return (data as { id: string }).id;
}

export async function getProducts(filters?: ProductQueryFilters): Promise<Product[]> {
  const resolvedFilters = { ...(filters ?? {}) };

  if (resolvedFilters.collection) {
    const collectionId = await resolveCollectionId(resolvedFilters.collection);
    if (!collectionId) return [];
    resolvedFilters.collection = collectionId;
  }

  if (!USE_SUPABASE) {
    return applyProductFilters(MOCK_PRODUCTS, resolvedFilters);
  }

  let query = db()
    .from('products')
    .select('*, brand:brands(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (resolvedFilters.brand) {
    const brand = await getBrandBySlug(resolvedFilters.brand);
    if (!brand) return [];
    query = query.eq('brand_id', brand.id);
  }

  if (resolvedFilters.excludeBrand) {
    const brand = await getBrandBySlug(resolvedFilters.excludeBrand);
    if (brand) query = query.neq('brand_id', brand.id);
  }

  if (resolvedFilters.refurbished) {
    query = query.in('condition', [...REFURB_CONDITIONS]);
  } else if (resolvedFilters.conditions?.length) {
    query = query.in('condition', resolvedFilters.conditions);
  } else if (resolvedFilters.condition) {
    query = query.eq('condition', resolvedFilters.condition);
  }

  if (resolvedFilters.category) query = query.eq('category', resolvedFilters.category);
  if (resolvedFilters.collection) query = query.eq('collection_id', resolvedFilters.collection);
  if (resolvedFilters.featured) query = query.eq('is_featured', true);

  if (resolvedFilters.search) {
    const q = resolvedFilters.search;
    query = query.or(`name.ilike.%${q}%,model.ilike.%${q}%`);
  }

  if (resolvedFilters.limit) query = query.limit(resolvedFilters.limit);

  const { data, error } = await query;
  if (error) { console.error('[getProducts]', error.message); return []; }

  let products = (data ?? []) as Product[];
  products = applyProductSort(products, resolvedFilters.sortBy);
  if (resolvedFilters.limit) products = products.slice(0, resolvedFilters.limit);
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_SUPABASE) return MOCK_PRODUCTS.find(p => p.slug === slug) ?? null;
  const { data, error } = await db().from('products').select('*, brand:brands(*)').eq('slug', slug).eq('is_active', true).maybeSingle();
  if (error) { console.error('[getProductBySlug]', error.message); return null; }
  return (data as Product) ?? null;
}

/** Sibling products with the same brand, model, and condition — one row per storage size. */
export async function getProductStorageVariants(product: Product): Promise<StorageVariant[]> {
  if (!product.storage) return [];

  if (!USE_SUPABASE) {
    const siblings = MOCK_PRODUCTS.filter(p =>
      p.is_active &&
      p.brand_id === product.brand_id &&
      p.model === product.model &&
      p.condition === product.condition &&
      p.storage
    );
    const variants = buildStorageVariants(siblings);
    return variants.length > 1 ? variants : [];
  }

  const { data, error } = await db()
    .from('products')
    .select('slug, storage, price_aed, show_price, stock_quantity, moq, name, color, is_active, brand_id, model, condition')
    .eq('brand_id', product.brand_id)
    .eq('model', product.model)
    .eq('condition', product.condition)
    .eq('is_active', true)
    .not('storage', 'is', null);

  if (error) {
    console.error('[getProductStorageVariants]', error.message);
    return [];
  }

  const variants = buildStorageVariants((data ?? []) as Product[]);
  return variants.length > 1 ? variants : [];
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!USE_SUPABASE) return MOCK_PRODUCTS.filter(p => p.is_active).map(p => p.slug);
  const { data, error } = await db().from('products').select('slug').eq('is_active', true);
  if (error) { console.error('[getAllProductSlugs]', error.message); return []; }
  return (data ?? []).map((row: { slug: string }) => row.slug);
}

export async function getBrands(): Promise<Brand[]> {
  if (!USE_SUPABASE) return MOCK_BRANDS.filter(b => b.is_active).sort((a, b) => a.sort_order - b.sort_order);
  const { data, error } = await db().from('brands').select('*').eq('is_active', true).order('sort_order', { ascending: true });
  if (error) { console.error('[getBrands]', error.message); return []; }
  return (data ?? []) as Brand[];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!USE_SUPABASE) return MOCK_BRANDS.find(b => b.slug === slug) ?? null;
  const { data, error } = await db().from('brands').select('*').eq('slug', slug).eq('is_active', true).maybeSingle();
  if (error) { console.error('[getBrandBySlug]', error.message); return null; }
  return (data as Brand) ?? null;
}

export async function getCollections(): Promise<Collection[]> {
  if (!USE_SUPABASE) return MOCK_COLLECTIONS.filter(c => c.is_active);
  const { data, error } = await db().from('collections').select('*').eq('is_active', true).order('sort_order', { ascending: true });
  if (error) { console.error('[getCollections]', error.message); return []; }
  return (data ?? []) as Collection[];
}

export async function getProductsGroupedByBrand(): Promise<{ brand: Brand; products: Product[]; total: number }[]> {
  const products = await getProducts();
  const groups = new Map<string, { brand: Brand; products: Product[] }>();

  for (const product of products) {
    if (!product.brand) continue;
    const existing = groups.get(product.brand_id);
    if (existing) {
      existing.products.push(product);
    } else {
      groups.set(product.brand_id, { brand: product.brand, products: [product] });
    }
  }

  return Array.from(groups.values())
    .map(({ brand, products: bp }) => ({ brand, products: bp, total: bp.length }))
    .sort((a, b) => a.brand.sort_order - b.brand.sort_order);
}

// Public RFQ submission — anon key is fine (policy: "Anyone can submit RFQ")
export async function submitRFQ(data: Omit<RFQ, 'id' | 'status' | 'created_at'>): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!USE_SUPABASE) {
    console.log('[RFQ submitted - no Supabase]', data);
    return { success: true, id: Math.random().toString(36).slice(2) };
  }
  const { data: row, error } = await db().from('rfqs').insert([{ ...data, status: 'new' }]).select('id').single();
  if (error) { console.error('[submitRFQ]', error.message); return { success: false, error: error.message }; }
  return { success: true, id: row.id };
}

// ─── Admin functions (service-role key — bypasses RLS) ─────────────────────────

export async function getProductsAdmin(): Promise<Product[]> {
  if (!USE_SUPABASE) return MOCK_PRODUCTS;
  const { data, error } = await adminDb()
    .from('products')
    .select('*, brand:brands(*)')
    .order('created_at', { ascending: false });
  if (error) { console.error('[getProductsAdmin]', error.message); return []; }
  return (data ?? []) as Product[];
}

export async function getBrandsAdmin(): Promise<Brand[]> {
  if (!USE_SUPABASE) return MOCK_BRANDS;
  const { data, error } = await adminDb().from('brands').select('*').order('sort_order', { ascending: true });
  if (error) { console.error('[getBrandsAdmin]', error.message); return []; }
  return (data ?? []) as Brand[];
}

export async function getCollectionsAdmin(): Promise<Collection[]> {
  if (!USE_SUPABASE) return MOCK_COLLECTIONS;
  const { data, error } = await adminDb().from('collections').select('*').order('sort_order', { ascending: true });
  if (error) { console.error('[getCollectionsAdmin]', error.message); return []; }
  return (data ?? []) as Collection[];
}

export async function getRFQs(): Promise<RFQ[]> {
  if (!USE_SUPABASE) return MOCK_RFQS;
  // Must use service-role client: rfqs table has no SELECT policy for anon users
  const { data, error } = await adminDb().from('rfqs').select('*').order('created_at', { ascending: false });
  if (error) { console.error('[getRFQs]', error.message); return []; }
  return (data ?? []) as RFQ[];
}

export async function getSettings(): Promise<Record<string, string>> {
  if (!USE_SUPABASE) return {};
  const { data } = await adminDb().from('site_settings').select('key, value');
  if (!data) return {};
  return Object.fromEntries((data as { key: string; value: string | null }[]).map(r => [r.key, r.value ?? '']));
}
