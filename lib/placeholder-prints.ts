import type { PaperMedium } from "@/types/shop";

export interface PrintSize {
  id: string;
  label: string;
  inches: string;
  cm: string;
  priceINR: number;
  priceUSD: number;
}

export function buildSku(
  slug: string,
  sizeId: string,
  medium: PaperMedium,
): string {
  return `${slug}-${sizeId}-${medium}`;
}

export interface PrintMedium {
  id: PaperMedium;
  label: string;
  description: string;
  priceMultiplier: number; // relative to matte base price
}

export interface PlaceholderPrint {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  description: string;
  src: string; // same Unsplash images as portfolio
  aspectRatio: number;
  featured: boolean;
  edition: {
    type: "open" | "limited";
    total?: number;
    sold?: number;
  };
  framingAvailable: boolean;
  sizes: PrintSize[];
  availableMediums: PaperMedium[];
  // Print specs for accordion
  specs: {
    paper?: string;
    ink?: string;
    archivalLife?: string;
    substrate?: string;
    coating?: string;
  };
}

export const PRINT_SIZES: PrintSize[] = [
  {
    id: "sm",
    label: "Small",
    inches: '12 × 8"',
    cm: "30 × 20 cm",
    priceINR: 4500,
    priceUSD: 55,
  },
  {
    id: "md",
    label: "Medium",
    inches: '18 × 12"',
    cm: "45 × 30 cm",
    priceINR: 8500,
    priceUSD: 105,
  },
  {
    id: "lg",
    label: "Large",
    inches: '24 × 16"',
    cm: "60 × 40 cm",
    priceINR: 14500,
    priceUSD: 175,
  },
  {
    id: "xl",
    label: "Extra Large",
    inches: '36 × 24"',
    cm: "90 × 60 cm",
    priceINR: 24000,
    priceUSD: 290,
  },
  {
    id: "xxl",
    label: "Statement",
    inches: '48 × 32"',
    cm: "120 × 80 cm",
    priceINR: 38000,
    priceUSD: 460,
  },
];

export const PRINT_MEDIUMS: PrintMedium[] = [
  {
    id: "matte",
    label: "Fine Art Matte",
    description:
      "Hahnemühle Photo Rag 308gsm — velvety texture, deep blacks, museum standard",
    priceMultiplier: 1,
  },
  {
    id: "lustre",
    label: "Archival Lustre",
    description:
      "Kodak Endura Lustre — vibrant colour, subtle sheen, fingerprint resistant",
    priceMultiplier: 1.1,
  },
  {
    id: "canvas",
    label: "Canvas Wrap",
    description:
      'Gallery-wrapped 1.5" deep on kiln-dried pine stretcher bars, ready to hang',
    priceMultiplier: 1.6,
  },
];

export const PLACEHOLDER_PRINTS: PlaceholderPrint[] = [
  {
    id: "pr1",
    slug: "bengal-tiger-ranthambore",
    title: "Bengal Tiger, Ranthambore",
    category: "tiger",
    location: "Ranthambore National Park, Rajasthan",
    description:
      "A dominant male Bengal tiger strides through the golden light of Ranthambore. Shot during the peak of winter morning light, this image captures both the power and quiet dignity of India's most iconic apex predator.",
    src: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1600&q=80",
    aspectRatio: 0.667,
    featured: true,
    edition: { type: "limited", total: 50, sold: 23 },
    framingAvailable: true,
    sizes: PRINT_SIZES,
    availableMediums: ["matte", "lustre", "canvas"],
    specs: {
      paper:
        "Hahnemühle Photo Rag 308gsm (matte) / Kodak Endura Lustre (lustre)",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
  {
    id: "pr2",
    slug: "eyes-of-the-forest",
    title: "Eyes of the Forest",
    category: "bw",
    location: "Tadoba-Andhari Tiger Reserve, Maharashtra",
    description:
      "Converted to monochrome to strip away distraction and let the intensity of this tiger's gaze speak for itself. The interplay of light and shadow across its face reveals every whisker, every scar earned in the wild.",
    src: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?w=1600&q=80",
    aspectRatio: 1.25,
    featured: true,
    edition: { type: "limited", total: 30, sold: 17 },
    framingAvailable: true,
    sizes: PRINT_SIZES,
    availableMediums: ["matte", "canvas"],
    specs: {
      paper:
        "Hahnemühle Photo Rag Baryta 315gsm — warmtone fibre base ideal for B&W",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
  {
    id: "pr3",
    slug: "leopard-jim-corbett",
    title: "Leopard at Dusk, Jim Corbett",
    category: "leopard",
    location: "Jim Corbett National Park, Uttarakhand",
    description:
      "A leopard emerges from dense sal forest at the last light of day — its rosette-patterned coat glowing amber against the darkening undergrowth. One of the most sought-after sightings in India's oldest national park.",
    src: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1600&q=80",
    aspectRatio: 1.333,
    featured: true,
    edition: { type: "limited", total: 40, sold: 8 },
    framingAvailable: true,
    sizes: PRINT_SIZES,
    availableMediums: ["matte", "lustre", "canvas"],
    specs: {
      paper:
        "Hahnemühle Photo Rag 308gsm (matte) / Kodak Endura Lustre (lustre)",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
  {
    id: "pr4",
    slug: "valley-of-flowers",
    title: "Valley of Flowers, Uttarakhand",
    category: "landscape",
    location: "Valley of Flowers National Park, Uttarakhand",
    description:
      "A UNESCO World Heritage Site transformed into a carpet of colour during the brief monsoon bloom. Shot at 3,500m altitude with a wide-angle lens to capture the full sweep of the valley at its peak.",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    aspectRatio: 0.667,
    featured: false,
    edition: { type: "open" },
    framingAvailable: true,
    sizes: PRINT_SIZES,
    availableMediums: ["matte", "lustre", "canvas"],
    specs: {
      paper:
        "Hahnemühle Photo Rag 308gsm (matte) / Kodak Endura Lustre (lustre)",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
  {
    id: "pr5",
    slug: "leopard-canopy-pench",
    title: "Leopard in the Canopy",
    category: "leopard",
    location: "Pench Tiger Reserve, Madhya Pradesh",
    description:
      "A resting leopard surveys its territory from the fork of a teak tree, backlit by the late afternoon sky. Leopards spend much of the heat of the day draped across branches — the perfect vantage point for an ambush predator.",
    src: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1600&q=80",
    aspectRatio: 0.667,
    featured: false,
    edition: { type: "limited", total: 35, sold: 4 },
    framingAvailable: false,
    sizes: PRINT_SIZES.slice(0, 4), // up to XL only
    availableMediums: ["matte", "lustre"],
    specs: {
      paper:
        "Hahnemühle Photo Rag 308gsm (matte) / Kodak Endura Lustre (lustre)",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
  {
    id: "pr6",
    slug: "misty-morning-bandhavgarh",
    title: "Misty Morning Stroll",
    category: "tiger",
    location: "Bandhavgarh National Park, Madhya Pradesh",
    description:
      "A tiger materialises from the morning mist of Bandhavgarh, the ground fog lending an ethereal, almost painterly quality. This is the magic hour that wildlife photographers wake at 4 AM to chase.",
    src: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=1600&q=80",
    aspectRatio: 0.667,
    featured: true,
    edition: { type: "limited", total: 50, sold: 31 },
    framingAvailable: true,
    sizes: PRINT_SIZES,
    availableMediums: ["matte", "lustre", "canvas"],
    specs: {
      paper:
        "Hahnemühle Photo Rag 308gsm (matte) / Kodak Endura Lustre (lustre)",
      ink: "Epson UltraChrome HD archival pigment inks",
      archivalLife: "200+ years under museum conditions",
    },
  },
];
