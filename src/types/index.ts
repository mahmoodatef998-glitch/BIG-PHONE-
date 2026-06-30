export type Condition =
  | 'brand-new'
  | 'refurbished-grade-a'
  | 'refurbished-grade-b'
  | 'certified-refurbished'
  | 'big-deal'
  | 'super-sale';
export type Category = 'smartphone' | 'tablet' | 'accessory' | 'smartwatch' | 'airpods';
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  description: string | null;
  product_count: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  brand_id: string;
  brand?: Brand;
  collection_id?: string | null;
  name: string;
  slug: string;
  model: string;
  category: Category;
  subcategory: string | null;
  condition: Condition;
  storage: string | null;
  color: string | null;
  battery_health: number | null;
  warranty: string | null;
  stock_quantity: number;
  moq: number;
  country_of_origin: string;
  description: string | null;
  specifications: Record<string, string> | null;
  images: string[];
  price_aed?: number | null;
  sale_price_aed?: number | null;
  show_price?: boolean;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  email: string;
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
  registered_at: string;
  last_activity_at: string;
  updated_at: string;
}

export interface RFQItem {
  product_id?: string | null;
  slug: string;
  name: string;
  quantity: number;
  moq?: number;
  storage?: string | null;
  color?: string | null;
  brand_name?: string | null;
}

export interface QuoteCartItem extends RFQItem {
  product_id: string;
  moq: number;
}

export interface RFQ {
  id: string;
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
  email: string;
  product_interest: string | null;
  quantity: number | null;
  items?: RFQItem[] | null;
  message: string | null;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  created_at: string;
}

export interface RFQFormData {
  company_name: string;
  contact_person: string;
  country: string;
  phone: string;
  email: string;
  product_interest?: string;
  quantity?: number;
  items?: RFQItem[];
  message: string;
}

export interface FilterState {
  brand: string[];
  condition: string[];
  storage: string[];
  color: string[];
  search: string;
  sortBy: 'newest' | 'stock-high' | 'stock-low' | 'brand' | 'model';
}
