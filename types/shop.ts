import type { SanityDocument, SanityImageWithAlt, Slug } from "./sanity";

export type PaperMedium = "matte" | "lustre" | "canvas";

export interface PrintSize {
  label: string; // e.g. "12×8 inches"
  sku: string; // e.g. "WW-TIGERS-A3-MATTE"
  priceINR: number;
  priceUSD: number;
  stripePriceId?: string;
  stock: number; // -1 = unlimited
}

export interface PrintEdition {
  type: "open" | "limited";
  totalEditions?: number;
  soldCount?: number;
}

export interface Print extends SanityDocument {
  _type: "print";
  title: string;
  slug: Slug;
  image: SanityImageWithAlt;
  category: string;
  description?: string;
  sizes: PrintSize[];
  paperTypes: PaperMedium[];
  edition: PrintEdition;
  framingAvailable: boolean;
  shippingInfo?: string;
  featured: boolean;
}

export type PrintSummary = Pick<
  Print,
  | "_id"
  | "title"
  | "slug"
  | "image"
  | "category"
  | "sizes"
  | "edition"
  | "featured"
>;

// Cart types
export interface CartItem {
  sku: string;
  printId: string;
  photoSlug: string;
  photoTitle: string;
  imageUrl: string;
  size: string;
  sizeLabel: string;
  medium: PaperMedium;
  priceINR: number;
  priceUSD: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalINR: number;
  totalUSD: number;
  currency: "INR" | "USD";
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  createdAt: string;
}
