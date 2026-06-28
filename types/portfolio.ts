import type {
  SanityDocument,
  SanityImageWithAlt,
  Slug,
  PortableTextBlock,
} from "./sanity";

export type PhotoCategory =
  "tiger" | "leopard" | "bird" | "reptile" | "landscape" | "bw" | "other";

export interface PhotoExif {
  camera?: string;
  lens?: string;
  shutterSpeed?: string;
  aperture?: string;
  iso?: number;
}

export interface Photo extends SanityDocument {
  _type: "photo";
  title: string;
  slug: Slug;
  image: SanityImageWithAlt;
  category: PhotoCategory;
  location: string;
  dateCaptured?: string;
  exif?: PhotoExif;
  story?: PortableTextBlock[];
  featured: boolean;
  availableAsPrint: boolean;
  linkedPrintId?: string;
  tags?: string[];
}

export type PhotoSummary = Pick<
  Photo,
  | "_id"
  | "title"
  | "slug"
  | "image"
  | "category"
  | "location"
  | "featured"
  | "availableAsPrint"
>;
