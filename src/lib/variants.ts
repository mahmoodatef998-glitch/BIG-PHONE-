// Per-color product variants for iPhone models.
// Each variant has its own image (and optionally its own spec overrides).
// Image filenames are verified against the littlebyteorg/apple-device-images repo.

const GH = 'https://raw.githubusercontent.com/littlebyteorg/apple-device-images/main/device';

export interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  /** Optional spec overrides shown when this color is selected. */
  specs?: Record<string, string>;
}

export const PRODUCT_VARIANTS: Record<string, ColorVariant[]> = {
  // iPhone 16 Pro Max — iPhone17,1
  'apple-iphone-16-pro-max-256gb-natural-titanium': [
    { name: 'Natural Titanium', hex: '#C7C2BA', image: `${GH}/iPhone17%2C1/Natural%20Titanium.png` },
    { name: 'Black Titanium',   hex: '#41434A', image: `${GH}/iPhone17%2C1/Black%20Titanium.png` },
    { name: 'White Titanium',   hex: '#F5F3EF', image: `${GH}/iPhone17%2C1/White%20Titanium.png` },
    { name: 'Desert Titanium',  hex: '#BBA088', image: `${GH}/iPhone17%2C1/Desert%20Titanium.png` },
  ],

  // iPhone 15 Pro — iPhone16,1
  'apple-iphone-15-pro-128gb-grade-a': [
    { name: 'Black Titanium',   hex: '#41434A', image: `${GH}/iPhone16%2C1/Black%20Titanium.png` },
    { name: 'Natural Titanium', hex: '#C7C2BA', image: `${GH}/iPhone16%2C1/Natural%20Titanium.png` },
    { name: 'White Titanium',   hex: '#F5F3EF', image: `${GH}/iPhone16%2C1/White%20Titanium.png` },
    { name: 'Blue Titanium',    hex: '#5F6E7E', image: `${GH}/iPhone16%2C1/Blue%20Titanium.png` },
  ],

  // iPhone 15 — iPhone15,4
  'apple-iphone-15-128gb-brand-new': [
    { name: 'Pink',   hex: '#F0D6D9', image: `${GH}/iPhone15%2C4/Pink.png` },
    { name: 'Black',  hex: '#34373D', image: `${GH}/iPhone15%2C4/Black.png` },
    { name: 'Blue',   hex: '#CDD6D6', image: `${GH}/iPhone15%2C4/Blue.png` },
    { name: 'Green',  hex: '#C8D4C5', image: `${GH}/iPhone15%2C4/Green.png` },
    { name: 'Yellow', hex: '#F4E9C4', image: `${GH}/iPhone15%2C4/Yellow.png` },
  ],

  // iPhone 14 — iPhone14,7
  'apple-iphone-14-256gb-certified-refurbished': [
    { name: 'Purple',    hex: '#E3DEEC', image: `${GH}/iPhone14%2C7/Purple.png` },
    { name: 'Midnight',  hex: '#25282D', image: `${GH}/iPhone14%2C7/Midnight.png` },
    { name: 'Starlight', hex: '#FAF6EE', image: `${GH}/iPhone14%2C7/Starlight.png` },
    { name: 'Blue',      hex: '#A6C0D9', image: `${GH}/iPhone14%2C7/Blue.png` },
    { name: 'Yellow',    hex: '#F7E06A', image: `${GH}/iPhone14%2C7/Yellow.png` },
    { name: 'Red',       hex: '#BB2638', image: `${GH}/iPhone14%2C7/%28PRODUCT%29RED.png` },
  ],

  // iPhone 13 Pro — iPhone14,2
  'apple-iphone-13-pro-256gb-grade-a': [
    { name: 'Sierra Blue',  hex: '#A9C8DC', image: `${GH}/iPhone14%2C2/Sierra%20Blue.png` },
    { name: 'Graphite',     hex: '#54524F', image: `${GH}/iPhone14%2C2/Graphite.png` },
    { name: 'Gold',         hex: '#F4E8D0', image: `${GH}/iPhone14%2C2/Gold.png` },
    { name: 'Silver',       hex: '#F1F2EE', image: `${GH}/iPhone14%2C2/Silver.png` },
    { name: 'Alpine Green', hex: '#51584E', image: `${GH}/iPhone14%2C2/Alpine%20Green.png` },
  ],

  // iPhone 12 — iPhone13,2
  'apple-iphone-12-128gb-grade-b': [
    { name: 'Black',  hex: '#2A2A2C', image: `${GH}/iPhone13%2C2/Black.png` },
    { name: 'White',  hex: '#F6F5F0', image: `${GH}/iPhone13%2C2/White.png` },
    { name: 'Blue',   hex: '#2E4D6B', image: `${GH}/iPhone13%2C2/Blue.png` },
    { name: 'Green',  hex: '#D7E1D0', image: `${GH}/iPhone13%2C2/Green.png` },
    { name: 'Purple', hex: '#E4D7E8', image: `${GH}/iPhone13%2C2/Purple.png` },
    { name: 'Red',    hex: '#C0212F', image: `${GH}/iPhone13%2C2/%28PRODUCT%29RED.png` },
  ],
};

export function getVariants(slug: string): ColorVariant[] | null {
  return PRODUCT_VARIANTS[slug] ?? null;
}
