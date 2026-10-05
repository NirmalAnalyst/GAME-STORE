export type ProductCategory = 
  | 'all' 
  | 'keyboards' 
  | 'mice' 
  | 'audio' 
  | 'displays' 
  | 'rigs' 
  | 'accessories';

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta?: number;
  inStock?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  highlightSpecs: string[]; // e.g. ["8000Hz Polling", "46g Weight", "3395 Sensor"]
  specs: Record<string, string>;
  description: string;
  features: string[];
  variants?: {
    type: string; // e.g. "Switch Type" or "Colorway"
    options: ProductVariant[];
  };
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (product id + variant)
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedColor?: string;
}

export type ComponentCategory = 'cpu' | 'gpu' | 'ram' | 'storage' | 'cooler' | 'psu' | 'case';

export interface RigComponent {
  id: string;
  category: ComponentCategory;
  name: string;
  brand: string;
  price: number;
  wattage: number;
  specs: string;
  fpsScore: number; // 0 - 100 benchmark weight
}

export interface GameBenchmark {
  id: string;
  name: string;
  genre: string;
  baseFps1080p: number;
  baseFps1440p: number;
  baseFps4k: number;
  gpuImpact: number; // 0.1 - 1.0
  cpuImpact: number; // 0.1 - 1.0
}

export interface SwitchProfile {
  id: string;
  name: string;
  type: 'magnetic' | 'linear' | 'tactile' | 'clicky';
  actuationDistance: number; // mm
  totalTravel: number; // mm
  actuationForce: number; // gf
  soundType: 'thock' | 'clack' | 'mute' | 'crisp';
  colorHex: string;
  description: string;
  soundDescription: string;
}

export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  productId: string;
  label: string;
  sublabel: string;
  price: number;
}

export interface BattlestationSetup {
  id: string;
  title: string;
  player: string;
  role: string;
  description: string;
  accentColor: string;
  hotspots: Hotspot[];
}
