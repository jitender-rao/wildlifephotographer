import { Suspense } from "react";
import type { Metadata } from "next";
import type { PhotoCategory } from "@/types/portfolio";
import { PLACEHOLDER_PHOTOS } from "@/lib/placeholder-photos";
import { CategoryFilter } from "@/components/portfolio/CategoryFilter";
import { MasonryGrid } from "@/components/portfolio/MasonryGrid";
import { LightboxWrapper } from "@/components/portfolio/LightboxWrapper";

export const metadata: Metadata = {
  title: "Portfolio — Wild Wanderings by Sudiip",
  description:
    "Award-winning wildlife photography from India's tiger reserves, bird sanctuaries, and wild landscapes by Sudiip.",
};

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { category } = await searchParams;
  const activeCategory = category as PhotoCategory | undefined;

  const photos = activeCategory
    ? PLACEHOLDER_PHOTOS.filter((p) => p.category === activeCategory)
    : PLACEHOLDER_PHOTOS;

  return (
    <>
      <main className="min-h-screen bg-[color:var(--ww-bg)] pt-24 pb-16">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-10">
            <p className="text-caption text-[color:var(--ww-gold)] mb-2">
              Portfolio
            </p>
            <h1 className="heading-section text-[color:var(--ww-text)] mb-2">
              Through the Lens
            </h1>
            <p className="text-[color:var(--ww-muted)] text-sm max-w-xl">
              Wildlife encounters from India&apos;s national parks and
              sanctuaries — from the tigers of Ranthambore to the birds of
              Bharatpur.
            </p>
          </div>

          {/* Category filters — needs Suspense because it reads searchParams */}
          <div className="mb-10">
            <Suspense fallback={<div className="h-9" />}>
              <CategoryFilter />
            </Suspense>
          </div>

          {/* Photo count */}
          <p
            className="text-[color:var(--ww-muted)] text-xs mb-6"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
          >
            {photos.length} {photos.length === 1 ? "PHOTOGRAPH" : "PHOTOGRAPHS"}
            {activeCategory ? ` · ${activeCategory.toUpperCase()}` : ""}
          </p>

          {/* Grid */}
          <MasonryGrid photos={photos} />
        </div>
      </main>

      {/* Lightbox — rendered outside main, portal to body */}
      <LightboxWrapper />
    </>
  );
}
