-- ═══════════════════════════════════════════════════════════════════════
-- BIG PHONE — Accessories Seed (11 products from Product_details.xlsx)
-- Run this once in Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════════════════

WITH
  apple_id   AS (SELECT id FROM brands      WHERE slug = 'apple'       LIMIT 1),
  samsung_id AS (SELECT id FROM brands      WHERE slug = 'samsung'     LIMIT 1),
  acc_id     AS (SELECT id FROM collections WHERE slug = 'accessories' LIMIT 1)

INSERT INTO products (
  brand_id, name, slug, model,
  category, subcategory, condition,
  warranty, stock_quantity, moq, country_of_origin,
  description, specifications, images,
  is_featured, is_active, collection_id
) VALUES

-- ── APPLE ────────────────────────────────────────────────────────────────

-- 1. Apple Lightning to USB Cable – 1 Meter
(
  (SELECT id FROM apple_id),
  'Apple Lightning to USB Cable – 1 Meter',
  'apple-lightning-to-usb-cable-1m',
  'Lightning to USB Cable 1m',
  'accessory', 'cables', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Reliable charging for your Apple devices. Built for fast syncing, stable charging, and long-lasting performance.',
  '{"Key Features":["Fast charging support","High-speed data transfer","Durable original-quality connectors","Compatible with all Lightning devices","Strong and flexible cable design"],"Compatible With":["iPhone 5 to iPhone 14 series","iPad (Lightning models)","AirPods charging cases"],"Selling Points":["Original quality","Safe charging","Premium finish"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 2. Apple USB-C to Lightning Cable – 1 Meter
(
  (SELECT id FROM apple_id),
  'Apple USB-C to Lightning Cable – 1 Meter',
  'apple-usb-c-to-lightning-cable-1m',
  'USB-C to Lightning Cable 1m',
  'accessory', 'cables', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Charge your iPhone faster with USB-C power delivery technology.',
  '{"Key Features":["Supports fast charging with USB-C adapters","High-speed charging for iPhone","Strong connector protection","Premium cable quality"],"Compatible With":["iPhone 8 and newer","AirPods","Lightning iPads"],"Selling Points":["Fast charge support","Premium quality","High efficiency"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 3. Apple USB-C to USB-C 60W Cable – 1 Meter
(
  (SELECT id FROM apple_id),
  'Apple USB-C to USB-C 60W Charging Cable – 1 Meter',
  'apple-usb-c-60w-cable-1m',
  'USB-C to USB-C 60W Cable 1m',
  'accessory', 'cables', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Perfect for high-speed charging and data transfer across all USB-C devices.',
  '{"Key Features":["Up to 60W power delivery","Fast charging support","Braided premium cable","High durability"],"Compatible With":["MacBook","iPad Pro","USB-C phones & tablets"],"Selling Points":["Fast charging","Strong braided cable","Premium build"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 4. Apple 20W USB-C Power Adapter
(
  (SELECT id FROM apple_id),
  'Apple 20W USB-C Power Adapter',
  'apple-20w-usb-c-power-adapter',
  '20W USB-C Power Adapter',
  'accessory', 'chargers', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Fast, compact, and efficient charging for your daily Apple devices.',
  '{"Key Features":["20W fast charging","Compact design","Safe charging technology","Efficient power delivery"],"Compatible With":["iPhone 8 and above","iPad","AirPods"],"Selling Points":["Fast charge","Travel friendly","Premium quality"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 5. Apple EarPods USB-C
(
  (SELECT id FROM apple_id),
  'Apple EarPods USB-C',
  'apple-earpods-usb-c',
  'EarPods USB-C',
  'accessory', 'earphones', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Enjoy clear sound, deep bass, and comfortable listening all day.',
  '{"Key Features":["Clear sound quality","Comfortable fit","Built-in microphone","USB-C connectivity"],"Compatible With":["iPhone 15 series","USB-C iPads","USB-C devices"],"Selling Points":["Crystal clear audio","Comfortable fit","Premium sound"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- ── SAMSUNG ──────────────────────────────────────────────────────────────

-- 6. Samsung USB-C to USB-C Cable 3A 1.8m
(
  (SELECT id FROM samsung_id),
  'Samsung USB-C to USB-C Cable – 3A / 1.8 Meter',
  'samsung-usb-c-cable-3a-1-8m',
  'USB-C Cable 3A 1.8m',
  'accessory', 'cables', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Reliable charging with extra cable length for better convenience.',
  '{"Key Features":["3A fast charging","Long 1.8m cable","Strong connectors","Fast data transfer"],"Compatible With":["Samsung Galaxy phones","Tablets","USB-C devices"],"Selling Points":["Fast charging","Long cable","Durable"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 7. Samsung Super Fast Car Charger Dual Port 45W + 15W
(
  (SELECT id FROM samsung_id),
  'Samsung Super Fast Car Charger Dual Port (45W + 15W)',
  'samsung-car-charger-45w-15w',
  'Super Fast Car Charger 45W+15W',
  'accessory', 'chargers', 'brand-new',
  '12 Months', 0, 5, 'UAE',
  'Charge two devices simultaneously with powerful fast charging on the road.',
  '{"Key Features":["Dual charging ports","45W super fast charging","15W additional port","Safe charging protection"],"Compatible With":["Samsung devices","iPhones","Tablets"],"Selling Points":["Fast car charging","Dual output","Premium design"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 8. Samsung 25W Super Fast Charger
(
  (SELECT id FROM samsung_id),
  'Samsung 25W Super Fast Charger',
  'samsung-25w-super-fast-charger',
  '25W Super Fast Charger',
  'accessory', 'chargers', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Fast and efficient charging for everyday use.',
  '{"Key Features":["25W super fast charging","USB-C output","Compact design","Safe charging"],"Compatible With":["Samsung Galaxy series","USB-C devices"],"Selling Points":["Super fast charging","Compact","Reliable"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 9. Samsung 45W Super Fast Charger
(
  (SELECT id FROM samsung_id),
  'Samsung 45W Super Fast Charger',
  'samsung-45w-super-fast-charger',
  '45W Super Fast Charger',
  'accessory', 'chargers', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Fast and efficient charging for everyday use.',
  '{"Key Features":["45W super fast charging","USB-C output","Compact design","Safe charging"],"Compatible With":["Samsung Galaxy series","USB-C devices"],"Selling Points":["Super fast charging","Compact","Reliable"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 10. Samsung USB-C Cable 5A 1m
(
  (SELECT id FROM samsung_id),
  'Samsung USB-C to USB-C Cable – 5A / 1 Meter',
  'samsung-usb-c-cable-5a-1m',
  'USB-C Cable 5A 1m',
  'accessory', 'cables', 'brand-new',
  '12 Months', 0, 10, 'UAE',
  'Built for high-speed charging and powerful performance.',
  '{"Key Features":["5A ultra-fast charging","Supports high watt charging","Durable cable build","Fast data sync"],"Compatible With":["Samsung devices","Tablets","Laptops"],"Selling Points":["5A support","High speed","Durable"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
),

-- 11. Samsung 45W Power Adapter with 5A Cable
(
  (SELECT id FROM samsung_id),
  'Samsung 45W Power Adapter with 5A Cable',
  'samsung-45w-adapter-with-5a-cable',
  '45W Power Adapter with 5A Cable',
  'accessory', 'chargers', 'brand-new',
  '12 Months', 0, 5, 'UAE',
  'The complete fast charging solution for power users.',
  '{"Key Features":["45W super fast charging","Includes 5A USB-C cable","Power delivery support","Safe charging system"],"Compatible With":["Samsung Galaxy Ultra series","Tablets","USB-C laptops"],"Selling Points":["Powerful 45W charging","Cable included","Premium quality"]}',
  '{}', false, true,
  (SELECT id FROM acc_id)
)

ON CONFLICT (slug) DO NOTHING
RETURNING id, name, slug;
