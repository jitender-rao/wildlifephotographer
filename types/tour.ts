import type {
  SanityDocument,
  SanityImageWithAlt,
  Slug,
  PortableTextBlock,
} from "./sanity";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface TourDeparture {
  _key: string;
  startDate: string;
  endDate: string;
  spotsTotal: number;
  spotsBooked: number;
}

export interface TourItineraryDay {
  _key: string;
  day: number;
  title: string;
  description: PortableTextBlock[];
}

export interface TourLocation {
  lat: number;
  lng: number;
  label: string;
}

export interface Tour extends SanityDocument {
  _type: "tour";
  title: string;
  slug: Slug;
  tagline?: string;
  destination: string;
  heroImage: SanityImageWithAlt;
  duration: string;
  maxGroupSize: number;
  skillLevel: SkillLevel;
  pricePerPersonINR: number;
  pricePerPersonUSD: number;
  depositPercent: number;
  departures: TourDeparture[];
  overview: PortableTextBlock[];
  itinerary: TourItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  gallery: SanityImageWithAlt[];
  location?: TourLocation;
  faqs: Array<{ _key: string; question: string; answer: string }>;
  featured: boolean;
}

export type TourSummary = Pick<
  Tour,
  | "_id"
  | "title"
  | "slug"
  | "destination"
  | "heroImage"
  | "duration"
  | "maxGroupSize"
  | "skillLevel"
  | "pricePerPersonINR"
  | "pricePerPersonUSD"
  | "departures"
  | "featured"
>;
