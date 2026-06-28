import { sanityClient, SANITY_CONFIGURED } from "./client";
import type { Photo, PhotoSummary, PhotoCategory } from "@/types/portfolio";
import type { Print, PrintSummary } from "@/types/shop";
import type { Tour, TourSummary } from "@/types/tour";

// Returns empty array when Sanity is not yet configured (no project ID)
async function safeQuery<T>(
  query: string,
  params: Record<string, unknown>,
  options: { next: { revalidate: number; tags?: string[] } },
): Promise<T[]> {
  if (!SANITY_CONFIGURED) return [];
  return sanityClient.fetch<T[]>(query, params, options);
}

async function safeQueryOne<T>(
  query: string,
  params: Record<string, unknown>,
  options: { next: { revalidate: number; tags?: string[] } },
): Promise<T | null> {
  if (!SANITY_CONFIGURED) return null;
  return sanityClient.fetch<T | null>(query, params, options);
}

const PHOTO_SUMMARY_FIELDS = `
  _id, title, slug, category, location, featured, availableAsPrint,
  image { ..., asset-> { _id, url, metadata { dimensions, lqip } } }
`;

const PRINT_SUMMARY_FIELDS = `
  _id, title, slug, category, featured,
  sizes, edition,
  image { ..., asset-> { _id, url, metadata { dimensions, lqip } } }
`;

const TOUR_SUMMARY_FIELDS = `
  _id, title, slug, destination, duration, maxGroupSize, skillLevel,
  pricePerPersonINR, pricePerPersonUSD, featured, departures,
  heroImage { ..., asset-> { _id, url, metadata { dimensions, lqip } } }
`;

// ── Portfolio ────────────────────────────────────────────────────────────────

export async function getFeaturedPhotos(limit = 6): Promise<PhotoSummary[]> {
  return safeQuery(
    `*[_type == "photo" && featured == true] | order(_createdAt desc) [0...$limit] { ${PHOTO_SUMMARY_FIELDS} }`,
    { limit: limit - 1 },
    { next: { revalidate: 60, tags: ["photos"] } },
  );
}

export async function getPortfolioPhotos(
  opts: {
    category?: PhotoCategory;
    cursor?: string;
    limit?: number;
  } = {},
): Promise<PhotoSummary[]> {
  const { category, cursor, limit = 24 } = opts;
  const categoryFilter = category ? `&& category == $category` : "";
  const cursorFilter = cursor ? `&& _id > $cursor` : "";

  return safeQuery(
    `*[_type == "photo" ${categoryFilter} ${cursorFilter}] | order(_createdAt desc) [0...$limit] { ${PHOTO_SUMMARY_FIELDS} }`,
    { category, cursor, limit: limit - 1 },
    { next: { revalidate: 60, tags: ["photos"] } },
  );
}

export async function getPhotoBySlug(slug: string): Promise<Photo | null> {
  return safeQueryOne<Photo>(
    `*[_type == "photo" && slug.current == $slug][0] {
      ${PHOTO_SUMMARY_FIELDS},
      exif, story, tags, dateCaptured,
      "linkedPrintId": linkedPrint->_id
    }`,
    { slug },
    { next: { revalidate: 60, tags: ["photos"] } },
  );
}

// ── Shop ─────────────────────────────────────────────────────────────────────

export async function getPrints(
  opts: { featured?: boolean } = {},
): Promise<PrintSummary[]> {
  const featuredFilter = opts.featured ? "&& featured == true" : "";
  return safeQuery(
    `*[_type == "print" ${featuredFilter}] | order(_createdAt desc) { ${PRINT_SUMMARY_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ["prints"] } },
  );
}

export async function getPrintBySlug(slug: string): Promise<Print | null> {
  return safeQueryOne<Print>(
    `*[_type == "print" && slug.current == $slug][0] {
      ${PRINT_SUMMARY_FIELDS},
      description, paperTypes, framingAvailable, shippingInfo
    }`,
    { slug },
    { next: { revalidate: 60, tags: ["prints"] } },
  );
}

// ── Tours ─────────────────────────────────────────────────────────────────────

export async function getTours(
  opts: { featured?: boolean } = {},
): Promise<TourSummary[]> {
  const featuredFilter = opts.featured ? "&& featured == true" : "";
  return safeQuery(
    `*[_type == "tour" ${featuredFilter}] | order(_createdAt desc) { ${TOUR_SUMMARY_FIELDS} }`,
    {},
    { next: { revalidate: 60, tags: ["tours"] } },
  );
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  return safeQueryOne<Tour>(
    `*[_type == "tour" && slug.current == $slug][0] {
      ${TOUR_SUMMARY_FIELDS},
      tagline, overview, itinerary, inclusions, exclusions, gallery, location, faqs, depositPercent
    }`,
    { slug },
    { next: { revalidate: 60, tags: ["tours"] } },
  );
}

// ── Site settings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  heroImageUrl?: string;
  heroVideoUrl?: string;
  whatsappNumber?: string;
  instagramUrl?: string;
  contactEmail?: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const result = await safeQueryOne<SiteSettings>(
    `*[_type == "siteSettings"][0] { heroImageUrl, heroVideoUrl, whatsappNumber, instagramUrl, contactEmail }`,
    {},
    { next: { revalidate: 300, tags: ["settings"] } },
  );
  return result ?? {};
}

// ── Static params helpers ─────────────────────────────────────────────────────

export async function getAllPhotoSlugs(): Promise<string[]> {
  if (!SANITY_CONFIGURED) return [];
  return sanityClient.fetch(
    `*[_type == "photo"][0...50].slug.current`,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getAllPrintSlugs(): Promise<string[]> {
  if (!SANITY_CONFIGURED) return [];
  return sanityClient.fetch(
    `*[_type == "print"][0...50].slug.current`,
    {},
    { next: { revalidate: 3600 } },
  );
}

export async function getAllTourSlugs(): Promise<string[]> {
  if (!SANITY_CONFIGURED) return [];
  return sanityClient.fetch(
    `*[_type == "tour"][0...50].slug.current`,
    {},
    { next: { revalidate: 3600 } },
  );
}
