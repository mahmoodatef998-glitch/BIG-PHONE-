/** iPhone models and official color names for admin + storefront variant pickers. */

export interface IphoneModelEntry {
  model: string;
  series: string;
  colors: string[];
}

export const IPHONE_MODELS: IphoneModelEntry[] = [
  { model: 'iPhone 11', series: 'iphone-11-series', colors: ['Black', 'Green', 'Yellow', 'Purple', 'Red', 'White'] },
  { model: 'iPhone 11 Pro', series: 'iphone-11-series', colors: ['Midnight Green', 'Space Gray', 'Silver', 'Gold'] },
  { model: 'iPhone 11 Pro Max', series: 'iphone-11-series', colors: ['Midnight Green', 'Space Gray', 'Silver', 'Gold'] },

  { model: 'iPhone 12 mini', series: 'iphone-12-series', colors: ['Black', 'White', 'Red', 'Green', 'Blue', 'Purple'] },
  { model: 'iPhone 12', series: 'iphone-12-series', colors: ['Black', 'White', 'Red', 'Green', 'Blue', 'Purple'] },
  { model: 'iPhone 12 Pro', series: 'iphone-12-series', colors: ['Graphite', 'Silver', 'Gold', 'Pacific Blue'] },
  { model: 'iPhone 12 Pro Max', series: 'iphone-12-series', colors: ['Graphite', 'Silver', 'Gold', 'Pacific Blue'] },

  { model: 'iPhone 13 mini', series: 'iphone-13-series', colors: ['Starlight', 'Midnight', 'Blue', 'Pink', 'Green', 'Red'] },
  { model: 'iPhone 13', series: 'iphone-13-series', colors: ['Starlight', 'Midnight', 'Blue', 'Pink', 'Green', 'Red'] },
  { model: 'iPhone 13 Pro', series: 'iphone-13-series', colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'] },
  { model: 'iPhone 13 Pro Max', series: 'iphone-13-series', colors: ['Graphite', 'Gold', 'Silver', 'Sierra Blue', 'Alpine Green'] },

  { model: 'iPhone 14', series: 'iphone-14-series', colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Yellow', 'Red'] },
  { model: 'iPhone 14 Plus', series: 'iphone-14-series', colors: ['Midnight', 'Starlight', 'Blue', 'Purple', 'Yellow', 'Red'] },
  { model: 'iPhone 14 Pro', series: 'iphone-14-series', colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'] },
  { model: 'iPhone 14 Pro Max', series: 'iphone-14-series', colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'] },

  { model: 'iPhone 15', series: 'iphone-15-series', colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'] },
  { model: 'iPhone 15 Plus', series: 'iphone-15-series', colors: ['Black', 'Blue', 'Green', 'Yellow', 'Pink'] },
  { model: 'iPhone 15 Pro', series: 'iphone-15-series', colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium'] },
  { model: 'iPhone 15 Pro Max', series: 'iphone-15-series', colors: ['Black Titanium', 'White Titanium', 'Blue Titanium', 'Natural Titanium'] },

  { model: 'iPhone 16', series: 'iphone-16-series', colors: ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'] },
  { model: 'iPhone 16 Plus', series: 'iphone-16-series', colors: ['Black', 'White', 'Pink', 'Teal', 'Ultramarine'] },
  { model: 'iPhone 16 Pro', series: 'iphone-16-series', colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'] },
  { model: 'iPhone 16 Pro Max', series: 'iphone-16-series', colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'] },

  { model: 'iPhone 17', series: 'iphone-17-series', colors: ['Black', 'White', 'Pink', 'Blue', 'Green'] },
  { model: 'iPhone 17 Pro', series: 'iphone-17-series', colors: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'] },
  { model: 'iPhone 17 Pro Max', series: 'iphone-17-series', colors: ['Cosmic Orange', 'Deep Blue', 'Silver'] },
];

export const IPHONE_MODEL_NAMES = IPHONE_MODELS.map(m => m.model);

export function getIphoneModelEntry(model: string): IphoneModelEntry | undefined {
  return IPHONE_MODELS.find(m => m.model === model);
}

export function getIphoneColors(model: string): string[] {
  return getIphoneModelEntry(model)?.colors ?? [];
}

export function getIphoneSubcategory(model: string): string | null {
  return getIphoneModelEntry(model)?.series ?? null;
}

export function isIphoneModel(model: string): boolean {
  return IPHONE_MODEL_NAMES.includes(model);
}

/** Approximate swatch colors for storefront pills (fallback: gray). */
export const IPHONE_COLOR_SWATCH: Record<string, string> = {
  Black: '#1C1C1E',
  White: '#F5F5F7',
  Red: '#BF0013',
  Green: '#394C38',
  Blue: '#276787',
  Purple: '#594F63',
  Yellow: '#F9E479',
  Pink: '#FADDD7',
  Teal: '#4F9A8E',
  Ultramarine: '#4A6FA5',
  Midnight: '#232A31',
  Starlight: '#F6F2EF',
  Graphite: '#535150',
  Silver: '#E3E4E5',
  Gold: '#F4E8CE',
  'Space Gray': '#535150',
  'Space Black': '#1C1C1E',
  'Midnight Green': '#4E5851',
  'Pacific Blue': '#2D4F6E',
  'Sierra Blue': '#A7C1D9',
  'Alpine Green': '#576856',
  'Deep Purple': '#594F63',
  'Black Titanium': '#3C3C3D',
  'White Titanium': '#F2F1ED',
  'Blue Titanium': '#2F3D4C',
  'Natural Titanium': '#C2BFB8',
  'Desert Titanium': '#C9B89A',
  'Cosmic Orange': '#FF7A2E',
  'Deep Blue': '#2B4570',
};

export function colorSwatchHex(color: string): string {
  return IPHONE_COLOR_SWATCH[color] ?? '#94A3B8';
}
