import { createClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';
import type { Product, Brand, RFQ, Collection } from "@/types";

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

const IMG = {
  apple:      (label: string) => `https://placehold.co/400x300/1C1C1E/FFFFFF?text=${encodeURIComponent(label)}`,
  appleAlt:   (label: string) => `https://placehold.co/400x300/3A3A3C/FFFFFF?text=${encodeURIComponent(label)}`,
  samsung:    (label: string) => `https://placehold.co/400x300/1428A0/FFFFFF?text=${encodeURIComponent(label)}`,
  samsungAlt: (label: string) => `https://placehold.co/400x300/2F4FE0/FFFFFF?text=${encodeURIComponent(label)}`,
  xiaomi:     (label: string) => `https://placehold.co/400x300/FF6900/FFFFFF?text=${encodeURIComponent(label)}`,
  huawei:     (label: string) => `https://placehold.co/400x300/CF0A2C/FFFFFF?text=${encodeURIComponent(label)}`,
  oppo:       (label: string) => `https://placehold.co/400x300/1D3461/FFFFFF?text=${encodeURIComponent(label)}`,
  vivo:       (label: string) => `https://placehold.co/400x300/415FFF/FFFFFF?text=${encodeURIComponent(label)}`,
  oem:        (label: string) => `https://placehold.co/400x300/475569/FFFFFF?text=${encodeURIComponent(label)}`,
};

const AB = MOCK_BRANDS;

const MOCK_PRODUCTS: Product[] = [
  { id: "p1",  brand_id: "1", name: "Apple iPhone 16 Pro Max 256GB Natural Titanium",    slug: "apple-iphone-16-pro-max-256gb-natural-titanium", model: "iPhone 16 Pro Max",    category: "smartphone", subcategory: "iphone-16-series",  condition: "brand-new",              storage: "256GB", color: "Natural Titanium", battery_health: null, warranty: "12 Months", stock_quantity: 85,   moq: 5,  country_of_origin: "UAE",   description: "Brand new sealed iPhone 16 Pro Max with A18 Pro chip.",        specifications: { "Display": "6.9\" Super Retina XDR", "Chip": "A18 Pro" },           images: [IMG.apple("iPhone 16 Pro Max"), IMG.appleAlt("256GB · Natural Titanium")], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p2",  brand_id: "1", name: "Apple iPhone 15 Pro 128GB Grade A Refurbished",     slug: "apple-iphone-15-pro-128gb-grade-a",             model: "iPhone 15 Pro",        category: "smartphone", subcategory: "iphone-15-series",  condition: "refurbished-grade-a",    storage: "128GB", color: "Black Titanium",  battery_health: 92,   warranty: "6 Months",  stock_quantity: 230,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished iPhone 15 Pro.",                          specifications: { "Chip": "A17 Pro", "Camera": "48MP Triple" },                    images: [IMG.apple("iPhone 15 Pro"), IMG.appleAlt("128GB · Grade A · 92% Batt")], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p9",  brand_id: "1", name: "Apple iPhone 15 128GB Brand New",                   slug: "apple-iphone-15-128gb-brand-new",               model: "iPhone 15",            category: "smartphone", subcategory: "iphone-15-series",  condition: "brand-new",              storage: "128GB", color: "Pink",            battery_health: null, warranty: "12 Months", stock_quantity: 200,  moq: 10, country_of_origin: "UAE",   description: "Brand new iPhone 15 with Dynamic Island.",                    specifications: { "Chip": "A16 Bionic", "Camera": "48MP + 12MP" },               images: [IMG.apple("iPhone 15"), IMG.appleAlt("128GB · Pink · Brand New")],       is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p10", brand_id: "1", name: "Apple iPhone 13 Pro 256GB Grade A Refurbished",     slug: "apple-iphone-13-pro-256gb-grade-a",             model: "iPhone 13 Pro",        category: "smartphone", subcategory: "iphone-13-series",  condition: "refurbished-grade-a",    storage: "256GB", color: "Sierra Blue",     battery_health: 89,   warranty: "6 Months",  stock_quantity: 320,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished iPhone 13 Pro.",                          specifications: { "Chip": "A15 Bionic" },                                          images: [IMG.apple("iPhone 13 Pro"), IMG.appleAlt("256GB · Sierra Blue · 89%")],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p3",  brand_id: "1", name: "Apple iPhone 14 256GB Certified Refurbished",       slug: "apple-iphone-14-256gb-certified-refurbished",   model: "iPhone 14",            category: "smartphone", subcategory: "iphone-14-series",  condition: "certified-refurbished",  storage: "256GB", color: "Purple",          battery_health: 88,   warranty: "12 Months", stock_quantity: 190,  moq: 10, country_of_origin: "UAE",   description: "Certified refurbished iPhone 14.",                            specifications: { "Chip": "A15 Bionic" },                                          images: [IMG.apple("iPhone 14"), IMG.appleAlt("256GB · Purple · Certified")],     is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p11", brand_id: "1", name: "Apple iPhone 12 128GB Grade B Refurbished",         slug: "apple-iphone-12-128gb-grade-b",                 model: "iPhone 12",            category: "smartphone", subcategory: "iphone-12-series",  condition: "refurbished-grade-b",    storage: "128GB", color: "Black",           battery_health: 82,   warranty: "3 Months",  stock_quantity: 450,  moq: 20, country_of_origin: "UAE",   description: "Grade B refurbished iPhone 12.",                              specifications: { "Chip": "A14 Bionic" },                                          images: [IMG.appleAlt("iPhone 12"), IMG.apple("128GB · Black · Grade B · 82%")],  is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p4",  brand_id: "2", name: "Samsung Galaxy S25 Ultra 512GB Brand New",          slug: "samsung-galaxy-s25-ultra-512gb",                model: "Galaxy S25 Ultra",     category: "smartphone", subcategory: "galaxy-s25",        condition: "brand-new",              storage: "512GB", color: "Titanium Black",  battery_health: null, warranty: "12 Months", stock_quantity: 65,   moq: 5,  country_of_origin: "UAE",   description: "Brand new Galaxy S25 Ultra with Galaxy AI.",                  specifications: { "Chip": "Snapdragon 8 Elite", "Camera": "200MP" },               images: [IMG.samsung("Galaxy S25 Ultra"), IMG.samsungAlt("512GB · Titanium Black")], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p12", brand_id: "2", name: "Samsung Galaxy S24 Ultra 256GB Brand New",          slug: "samsung-galaxy-s24-ultra-256gb",                model: "Galaxy S24 Ultra",     category: "smartphone", subcategory: "galaxy-s24",        condition: "brand-new",              storage: "256GB", color: "Titanium Gray",   battery_health: null, warranty: "12 Months", stock_quantity: 80,   moq: 5,  country_of_origin: "UAE",   description: "Brand new Galaxy S24 Ultra.",                                 specifications: { "Chip": "Snapdragon 8 Gen 3", "Camera": "200MP" },              images: [IMG.samsung("Galaxy S24 Ultra"), IMG.samsungAlt("256GB · Titanium Gray")], is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p13", brand_id: "2", name: "Samsung Galaxy A54 5G 128GB Brand New",             slug: "samsung-galaxy-a54-5g-128gb",                  model: "Galaxy A54 5G",        category: "smartphone", subcategory: "galaxy-a-series",   condition: "brand-new",              storage: "128GB", color: "Awesome Lime",    battery_health: null, warranty: "12 Months", stock_quantity: 380,  moq: 20, country_of_origin: "UAE",   description: "Brand new Galaxy A54 5G.",                                    specifications: { "Chip": "Exynos 1380", "Camera": "50MP Triple" },              images: [IMG.samsung("Galaxy A54 5G"), IMG.samsungAlt("128GB · Awesome Lime")],    is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p5",  brand_id: "2", name: "Samsung Galaxy S24 256GB Grade A Refurbished",      slug: "samsung-galaxy-s24-256gb-grade-a",              model: "Galaxy S24",           category: "smartphone", subcategory: "galaxy-s24",        condition: "refurbished-grade-a",    storage: "256GB", color: "Cobalt Violet",   battery_health: 90,   warranty: "6 Months",  stock_quantity: 150,  moq: 10, country_of_origin: "UAE",   description: "Grade A refurbished Samsung Galaxy S24.",                     specifications: { "Chip": "Exynos 2400" },                                        images: [IMG.samsung("Galaxy S24"), IMG.samsungAlt("256GB · Grade A · 90% Batt")], is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p6",  brand_id: "3", name: "Xiaomi 14 Ultra 512GB Brand New",                   slug: "xiaomi-14-ultra-512gb",                         model: "Xiaomi 14 Ultra",      category: "smartphone", subcategory: "xiaomi-14",         condition: "brand-new",              storage: "512GB", color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 45,   moq: 5,  country_of_origin: "China",  description: "Brand new Xiaomi 14 Ultra with Leica cameras.",               specifications: { "Chip": "Snapdragon 8 Gen 3" },                                 images: [IMG.xiaomi("Xiaomi 14 Ultra"), IMG.xiaomi("512GB · White · Leica")],      is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[2], price_aed: null, show_price: true },
  { id: "p8",  brand_id: "4", name: "Huawei Pura 70 Ultra 512GB Brand New",              slug: "huawei-pura-70-ultra-512gb",                    model: "Pura 70 Ultra",        category: "smartphone", subcategory: "pura-series",       condition: "brand-new",              storage: "512GB", color: "Black",           battery_health: null, warranty: "12 Months", stock_quantity: 25,   moq: 5,  country_of_origin: "China",  description: "Brand new Huawei Pura 70 Ultra.",                             specifications: { "Camera": "50MP Variable Aperture Leica" },                     images: [IMG.huawei("Pura 70 Ultra"), IMG.huawei("512GB · Black")],               is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[3], price_aed: null, show_price: true },
  { id: "p14", brand_id: "5", name: "OPPO Find X7 Ultra 512GB Brand New",                slug: "oppo-find-x7-ultra-512gb",                      model: "Find X7 Ultra",        category: "smartphone", subcategory: "find-x-series",     condition: "brand-new",              storage: "512GB", color: "Burgundy",        battery_health: null, warranty: "12 Months", stock_quantity: 35,   moq: 5,  country_of_origin: "China",  description: "Brand new OPPO Find X7 Ultra.",                               specifications: { "Camera": "50MP Quad Hasselblad" },                             images: [IMG.oppo("OPPO Find X7 Ultra"), IMG.oppo("512GB · Burgundy")],          is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[4], price_aed: null, show_price: true },
  { id: "p15", brand_id: "6", name: "Vivo X100 Pro 512GB Brand New",                     slug: "vivo-x100-pro-512gb",                           model: "X100 Pro",             category: "smartphone", subcategory: "x-series",          condition: "brand-new",              storage: "512GB", color: "Asteroid Black",  battery_health: null, warranty: "12 Months", stock_quantity: 28,   moq: 5,  country_of_origin: "China",  description: "Brand new Vivo X100 Pro with Zeiss cameras.",                 specifications: { "Camera": "50MP Triple Zeiss" },                               images: [IMG.vivo("Vivo X100 Pro"), IMG.vivo("512GB · Asteroid Black")],         is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[5], price_aed: null, show_price: true },
  { id: "p16", brand_id: "1", name: "Apple AirPods Pro 2nd Generation USB-C",            slug: "apple-airpods-pro-2-usbc",                      model: "AirPods Pro 2",        category: "airpods",    subcategory: "airpods-pro",       condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 250,  moq: 10, country_of_origin: "UAE",   description: "Brand new AirPods Pro 2 with USB-C and ANC.",                 specifications: { "Chip": "H2", "Battery": "30h total" },                         images: [IMG.apple("AirPods Pro 2"), IMG.appleAlt("USB-C · White · ANC")],       is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p17", brand_id: "2", name: "Samsung Galaxy Buds2 Pro Graphite",                 slug: "samsung-galaxy-buds2-pro-graphite",             model: "Galaxy Buds2 Pro",     category: "airpods",    subcategory: "galaxy-buds",       condition: "brand-new",              storage: null,    color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 180,  moq: 10, country_of_origin: "UAE",   description: "Brand new Galaxy Buds2 Pro.",                                 specifications: { "Audio": "24bit Hi-Fi", "IP": "IPX7" },                          images: [IMG.samsung("Galaxy Buds2 Pro"), IMG.samsungAlt("Graphite · IPX7")],    is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p18", brand_id: "7", name: "65W GaN USB-C Fast Charger Bulk Pack x10",          slug: "65w-gan-usbc-charger-bulk-x10",                 model: "65W GaN Charger",      category: "accessory",  subcategory: "chargers",          condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "6 Months",  stock_quantity: 1000, moq: 10, country_of_origin: "China",  description: "Bulk 10x 65W GaN USB-C chargers.",                            specifications: { "Output": "65W USB-C PD", "Tech": "GaN III" },                  images: [IMG.oem("65W GaN Charger"), IMG.oem("Bulk x10 · White")],              is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p19", brand_id: "7", name: "9H Tempered Glass Screen Protectors Bulk x50",      slug: "tempered-glass-screen-protectors-bulk-x50",    model: "Tempered Glass Protectors", category: "accessory", subcategory: "screen-protectors", condition: "brand-new",             storage: null,    color: "Clear",           battery_health: null, warranty: "3 Months",  stock_quantity: 5000, moq: 50, country_of_origin: "China",  description: "Bulk 50pcs 9H tempered glass.",                               specifications: { "Hardness": "9H", "Thickness": "0.33mm" },                       images: [IMG.oem("Tempered Glass x50"), IMG.oem("9H · 0.33mm · Bulk")],         is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p20", brand_id: "7", name: "Premium Liquid Silicone Phone Cases Bulk x50",      slug: "silicone-phone-cases-bulk-x50",                model: "Silicone Cases Bulk",  category: "accessory",  subcategory: "cases",             condition: "brand-new",              storage: null,    color: "Assorted",        battery_health: null, warranty: "3 Months",  stock_quantity: 3000, moq: 50, country_of_origin: "China",  description: "Bulk 50pcs premium liquid silicone cases.",                   specifications: { "Material": "Liquid Silicone", "Colors": "20+ assorted" },       images: [IMG.oem("Silicone Cases x50"), IMG.oem("20+ Colors · Bulk Pack")],     is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[6], price_aed: null, show_price: true },
  { id: "p21", brand_id: "1", name: "Apple MagSafe Charger 15W USB-C 1m",               slug: "apple-magsafe-charger-15w-usbc",                model: "MagSafe Charger",      category: "accessory",  subcategory: "chargers",          condition: "brand-new",              storage: null,    color: "White",           battery_health: null, warranty: "12 Months", stock_quantity: 420,  moq: 10, country_of_origin: "UAE",   description: "Genuine Apple MagSafe Charger 15W.",                          specifications: { "Output": "15W MagSafe" },                                      images: [IMG.apple("MagSafe Charger"), IMG.appleAlt("15W · USB-C · Genuine")],   is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p7",  brand_id: "1", name: "Apple iPad Pro 12.9\" M4 256GB Wi-Fi",             slug: "apple-ipad-pro-12-m4-256gb",                    model: "iPad Pro 12.9\" M4",   category: "tablet",     subcategory: "ipad-pro",          condition: "brand-new",              storage: "256GB", color: "Space Black",     battery_health: null, warranty: "12 Months", stock_quantity: 30,   moq: 3,  country_of_origin: "UAE",   description: "Brand new iPad Pro with M4 chip and OLED display.",           specifications: { "Chip": "Apple M4", "Display": "12.9\" OLED" },                  images: [IMG.apple("iPad Pro M4"), IMG.appleAlt("256GB · Space Black · Wi-Fi")],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p22", brand_id: "2", name: "Samsung Galaxy Tab S9 Ultra 512GB Wi-Fi",           slug: "samsung-galaxy-tab-s9-ultra-512gb",             model: "Galaxy Tab S9 Ultra",  category: "tablet",     subcategory: "galaxy-tab-s9",     condition: "brand-new",              storage: "512GB", color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 40,   moq: 3,  country_of_origin: "UAE",   description: "Brand new Galaxy Tab S9 Ultra, 14.6\" AMOLED.",               specifications: { "Chip": "Snapdragon 8 Gen 2", "S-Pen": "Included" },           images: [IMG.samsung("Galaxy Tab S9 Ultra"), IMG.samsungAlt("512GB · Graphite · S-Pen")], is_featured: true, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p23", brand_id: "1", name: "Apple iPad Air 5 M1 256GB Wi-Fi",                  slug: "apple-ipad-air-5-m1-256gb",                     model: "iPad Air 5 M1",        category: "tablet",     subcategory: "ipad-air",          condition: "brand-new",              storage: "256GB", color: "Starlight",       battery_health: null, warranty: "12 Months", stock_quantity: 55,   moq: 3,  country_of_origin: "UAE",   description: "Brand new iPad Air 5 with M1 chip.",                          specifications: { "Chip": "Apple M1", "Display": "10.9\" Liquid Retina" },         images: [IMG.apple("iPad Air 5 M1"), IMG.appleAlt("256GB · Starlight · Wi-Fi")],  is_featured: true,  is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p24", brand_id: "1", name: "Apple iPad mini 6 256GB Wi-Fi",                    slug: "apple-ipad-mini-6-256gb",                       model: "iPad mini 6",          category: "tablet",     subcategory: "ipad-mini",         condition: "brand-new",              storage: "256GB", color: "Purple",          battery_health: null, warranty: "12 Months", stock_quantity: 45,   moq: 5,  country_of_origin: "UAE",   description: "Brand new iPad mini 6 with A15 Bionic.",                      specifications: { "Chip": "A15 Bionic", "Display": "8.3\" Liquid Retina" },        images: [IMG.apple("iPad mini 6"), IMG.appleAlt("256GB · Purple")],              is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[0], price_aed: null, show_price: true },
  { id: "p25", brand_id: "2", name: "Samsung Galaxy Tab A9+ 128GB Wi-Fi",               slug: "samsung-galaxy-tab-a9-plus-128gb",              model: "Galaxy Tab A9+",       category: "tablet",     subcategory: "galaxy-tab-a",      condition: "brand-new",              storage: "128GB", color: "Graphite",        battery_health: null, warranty: "12 Months", stock_quantity: 120,  moq: 10, country_of_origin: "UAE",   description: "Brand new Galaxy Tab A9+ best-value tablet.",                 specifications: { "Chip": "Snapdragon 695", "Battery": "7040 mAh" },               images: [IMG.samsung("Galaxy Tab A9+"), IMG.samsungAlt("128GB · Graphite")],      is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[1], price_aed: null, show_price: true },
  { id: "p26", brand_id: "3", name: "Xiaomi Pad 6 Pro 256GB Wi-Fi",                     slug: "xiaomi-pad-6-pro-256gb",                        model: "Pad 6 Pro",            category: "tablet",     subcategory: "xiaomi-pad",        condition: "brand-new",              storage: "256GB", color: "Black",           battery_health: null, warranty: "12 Months", stock_quantity: 65,   moq: 5,  country_of_origin: "China",  description: "Brand new Xiaomi Pad 6 Pro, 144Hz display.",                  specifications: { "Chip": "Snapdragon 8+ Gen 1", "Display": "11.47\" 144Hz" },    images: [IMG.xiaomi("Xiaomi Pad 6 Pro"), IMG.xiaomi("256GB · Black · 144Hz")],   is_featured: false, is_active: true, created_at: "2024-01-01", updated_at: "2024-01-01", brand: AB[2], price_aed: null, show_price: true },
];

const MOCK_RFQS: RFQ[] = [
  { id: '1', company_name: 'Al Baraka Mobile', contact_person: 'Ahmed Al-Rashid', country: 'Saudi Arabia', phone: '+966501234567', email: 'ahmed@albaraka.sa', product_interest: 'iPhone 15 Pro 128GB Grade A', quantity: 50, message: 'Need urgent delivery to Riyadh', status: 'new', created_at: '2024-01-15T10:30:00Z' },
  { id: '2', company_name: 'Tech World LLC', contact_person: 'Mohamed Hassan', country: 'Egypt', phone: '+201001234567', email: 'mohamed@techworld.eg', product_interest: 'Samsung Galaxy S24 256GB', quantity: 100, message: 'Export to Egypt, need HS codes', status: 'contacted', created_at: '2024-01-15T08:15:00Z' },
  { id: '3', company_name: 'Dubai Phone Mart', contact_person: 'Sarah Johnson', country: 'UAE', phone: '+971501234567', email: 'sarah@dubaiphone.ae', product_interest: 'Mixed iPhone 14 Lot', quantity: 200, message: 'Various colors and storage', status: 'quoted', created_at: '2024-01-14T16:45:00Z' },
  { id: '4', company_name: 'Global Mobile KE', contact_person: 'James Mwangi', country: 'Kenya', phone: '+254701234567', email: 'james@globalmobile.ke', product_interest: 'Xiaomi 13 Pro 256GB', quantity: 30, message: 'Nairobi delivery required', status: 'new', created_at: '2024-01-14T09:00:00Z' },
  { id: '5', company_name: 'Horizon Phones PK', contact_person: 'Ali Raza', country: 'Pakistan', phone: '+923001234567', email: 'ali@horizonphones.pk', product_interest: 'Huawei P60 Pro', quantity: 25, message: 'Karachi port delivery', status: 'closed', created_at: '2024-01-13T14:30:00Z' },
];

const MOCK_COLLECTIONS: Collection[] = [
  { id: 'c1', name: 'New Arrivals',     slug: 'new-arrivals',     description: 'Latest additions to our wholesale catalog', image_url: null, sort_order: 1, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c2', name: 'Best Sellers',     slug: 'best-sellers',     description: 'Most popular wholesale items',              image_url: null, sort_order: 2, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c3', name: 'Accessories',      slug: 'accessories',      description: 'Chargers, cases, protectors & more',        image_url: null, sort_order: 3, is_active: true,  created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c4', name: 'Refurbished Deals', slug: 'refurbished-deals', description: 'Grade A and certified refurbished',       image_url: null, sort_order: 4, is_active: false, created_at: '2024-01-01', updated_at: '2024-01-01' },
];

// ─── Public functions (anon key) ───────────────────────────────────────────────

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
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        (p.brand?.name.toLowerCase().includes(q) ?? false)
      );
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
  if (filters?.brand) products = products.filter(p => (p.brand as Brand)?.slug === filters.brand);
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!USE_SUPABASE) return MOCK_PRODUCTS.find(p => p.slug === slug) ?? null;
  const { data, error } = await db().from('products').select('*, brand:brands(*)').eq('slug', slug).eq('is_active', true).maybeSingle();
  if (error) { console.error('[getProductBySlug]', error.message); return null; }
  return (data as Product) ?? null;
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
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);
  const result: { brand: Brand; products: Product[]; total: number }[] = [];
  for (const brand of brands) {
    const bp = products.filter(p => p.brand?.slug === brand.slug || p.brand_id === brand.id);
    if (bp.length > 0) result.push({ brand, products: bp, total: bp.length });
  }
  return result;
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
