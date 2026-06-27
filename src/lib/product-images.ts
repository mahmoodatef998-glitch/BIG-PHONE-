import type { Product } from '@/types';

/** Single source of truth for product image URLs (mock data + Supabase seed). */
const GH = 'https://raw.githubusercontent.com/littlebyteorg/apple-device-images/main/device';
const SAM = 'https://images.samsung.com/is/image/samsung/p6pim';
const SAM_EG = 'https://images.samsung.com/is/image/samsung';
const APPLE_STORE = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is';
const GSMA = 'https://fdn2.gsmarena.com/vv';

export const PRODUCT_IMAGES: Record<string, string[]> = {
  // ── Apple iPhones ──
  'apple-iphone-16-pro-max-256gb-natural-titanium': [
    `${GH}/iPhone17%2C1/Natural%20Titanium.png`,
    `${GH}/iPhone17%2C1/Black%20Titanium.png`,
  ],
  'apple-iphone-15-pro-128gb-grade-a': [
    `${GH}/iPhone16%2C1/Black%20Titanium.png`,
    `${GH}/iPhone16%2C1/Natural%20Titanium.png`,
  ],
  'apple-iphone-15-128gb-brand-new': [
    `${GH}/iPhone15%2C4/Pink.png`,
    `${GH}/iPhone15%2C4/Black.png`,
  ],
  'apple-iphone-15-512gb-brand-new': [
    `${GH}/iPhone15%2C4/Pink.png`,
    `${GH}/iPhone15%2C4/Black.png`,
  ],
  'apple-iphone-15-1tb-brand-new': [
    `${GH}/iPhone15%2C4/Pink.png`,
    `${GH}/iPhone15%2C4/Black.png`,
  ],
  'apple-iphone-14-256gb-certified-refurbished': [
    `${GH}/iPhone14%2C7/Purple.png`,
    `${GH}/iPhone14%2C7/Blue.png`,
  ],
  'apple-iphone-13-pro-256gb-grade-a': [
    `${GH}/iPhone14%2C2/Sierra%20Blue.png`,
    `${GH}/iPhone14%2C2/Graphite.png`,
  ],
  'apple-iphone-12-128gb-grade-b': [
    `${GH}/iPhone13%2C2/Black.png`,
    `${GH}/iPhone13%2C2/Blue.png`,
  ],

  // ── Apple iPads ──
  'apple-ipad-pro-12-m4-256gb': [
    `${GH}/iPad16%2C5/Space%20Black.png`,
    `${GH}/iPad16%2C5/Silver.png`,
  ],
  'apple-ipad-air-5-m1-256gb': [
    `${GH}/iPad13%2C18/Silver.png`,
    `${GH}/iPad13%2C18/Blue.png`,
  ],
  'apple-ipad-mini-6-256gb': [
    `${GH}/iPad14%2C1/Purple.png`,
    `${GH}/iPad14%2C1/Starlight.png`,
  ],

  // ── Apple AirPods ──
  'apple-airpods-pro-2-usbc': [
    `${GH}/AirPodsPro1%2C2-usbc-case/White.png`,
    `${GH}/AirPodsPro1%2C2-usbc-left/White.png`,
  ],

  // ── Apple Accessories ──
  'apple-magsafe-charger-15w-usbc': [
    `${GH}/MagSafe%20Charger%20%281m%29-2.png`,
    `${GH}/MagSafe%20Charger%20%282m%29-2.png`,
  ],
  'apple-lightning-to-usb-cable-1m': [
    `${GH}/Lightning%20to%20USB%20Cable%20%281m%29-1.png`,
    `${GH}/Lightning%20to%20USB%20Cable%20%282m%29.png`,
  ],
  'apple-usb-c-to-lightning-cable-1m': [
    `${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29.png`,
    `${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29-2.png`,
  ],
  'apple-usb-c-60w-cable-1m': [
    `${GH}/USB-C%20Charge%20Cable%20%281m%29.png`,
  ],
  'apple-20w-usb-c-power-adapter': [
    `${APPLE_STORE}/MWVV3_AV1?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1751998598952`,
    `${APPLE_STORE}/MWVV3_AV2?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1751998598498`,
  ],
  'apple-earpods-usb-c': [
    `${GH}/EarPods%20Headphones%20Plug.png`,
  ],

  // ── Samsung Smartphones ──
  'samsung-galaxy-s25-ultra-512gb': [
    `${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-thumb-544359864`,
    `${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-544359864`,
  ],
  'samsung-galaxy-s24-ultra-256gb': [
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-thumb-539463971`,
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-539463971`,
  ],
  'samsung-galaxy-s24-256gb-grade-a': [
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-thumb-539353881`,
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-539353881`,
  ],
  'samsung-galaxy-a54-5g-128gb': [
    `${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-thumb-539573637`,
    `${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-539573637`,
  ],

  // ── Samsung Tablets ──
  'samsung-galaxy-tab-s9-ultra-512gb': [
    `${GSMA}/bigpic/samsung-galaxy-tab-s9-ultra.jpg`,
  ],
  'samsung-galaxy-tab-a9-plus-128gb': [
    `${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-thumb-538905799`,
    `${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-538905788`,
  ],

  // ── Samsung Audio ──
  'samsung-galaxy-buds2-pro-graphite': [
    `${SAM}/ae/2208/gallery/ae-galaxy-buds2-pro-r510-sm-r510nzaamea-thumb-533203132`,
    `${SAM}/ae/2208/gallery/ae-galaxy-buds2-pro-r510-sm-r510nzaamea-533203131`,
  ],

  // ── Samsung Accessories ──
  'samsung-usb-c-cable-3a-1-8m': [
    `${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-thumb-548710466`,
    `${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-548710466`,
  ],
  'samsung-car-charger-45w-15w': [
    `${SAM_EG}/eg-super-fast-dual-car-charger-ep-l5300-ep-l5300xbegww-frontblack-263559783`,
    `${SAM_EG}/eg-super-fast-dual-car-charger-ep-l5300-ep-l5300xbegww-lperspectiveblack-263559773`,
  ],
  'samsung-25w-super-fast-charger': [
    `${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-thumb-542922454`,
    `${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-542922454`,
  ],
  'samsung-45w-super-fast-charger': [
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`,
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-544023430`,
  ],
  'samsung-usb-c-cable-5a-1m': [
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`,
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-548717960`,
  ],
  'samsung-45w-adapter-with-5a-cable': [
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`,
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`,
  ],

  // ── Chinese brands (GSMArena official renders) ──
  'xiaomi-14-ultra-512gb': [
    `${GSMA}/bigpic/xiaomi-14-ultra-new.jpg`,
    `${GSMA}/pics/xiaomi/xiaomi-14-ultra-01.jpg`,
  ],
  'xiaomi-pad-6-pro-256gb': [
    `${GSMA}/pics/xiaomi/xiaomi-pad6-pro-1.jpg`,
    `${GSMA}/pics/xiaomi/xiaomi-pad6-pro-2.jpg`,
  ],
  'huawei-pura-70-ultra-512gb': [
    `${GSMA}/bigpic/huawei-pura70-ultra.jpg`,
    `${GSMA}/pics/huawei/huawei-pura70-ultra-1.jpg`,
  ],
  'oppo-find-x7-ultra-512gb': [
    `${GSMA}/bigpic/oppo-find-x7-ultra.jpg`,
    `${GSMA}/pics/oppo/oppo-find-x7-ultra-1.jpg`,
  ],
  'vivo-x100-pro-512gb': [
    `${GSMA}/bigpic/vivo-x100-pro.jpg`,
    `${GSMA}/pics/vivo/vivo-x100-pro-1.jpg`,
  ],

  // ── OEM bulk accessories (real product-style stock photos) ──
  '65w-gan-usbc-charger-bulk-x10': [
    'https://images.unsplash.com/photo-1763161786687-43d0c9babdf0',
    'https://images.unsplash.com/photo-1624272673361-335d488ef9f7',
  ],
  'tempered-glass-screen-protectors-bulk-x50': [
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
    'https://upload.wikimedia.org/wikipedia/commons/9/94/Screen_protector.png',
  ],
  'silicone-phone-cases-bulk-x50': [
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
  ],
};

/** Resolve images for a product slug, falling back to an empty array. */
export function imagesForProduct(slug: string): string[] {
  return PRODUCT_IMAGES[slug] ?? [];
}

/** Prefer canonical catalog images over stale/empty Supabase values. */
export function withCanonicalImages(product: Product): Product {
  const canonical = PRODUCT_IMAGES[product.slug];
  if (!canonical?.length) return product;
  return { ...product, images: canonical };
}

export function withCanonicalImagesList(products: Product[]): Product[] {
  return products.map(withCanonicalImages);
}
