// Core Sanity type helpers
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface Slug {
  _type: "slug";
  current: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any;

export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio: number };
    lqip?: string;
  };
}

export interface SanityImage {
  _type: "image";
  asset: SanityImageAsset | { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityImageWithAlt extends SanityImage {
  alt?: string;
}

export type Reference = { _type: "reference"; _ref: string };
