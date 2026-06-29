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
    "Wildlife photography from India's tiger reserves, bird sanctuaries, and wild landscapes by Sudiip.",
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
      <main className="min-h-screen bg-[color:var(--ww-bg)] pt-28 pb-24">
        <div className="container-wide">
          {/* Page header — minimal, Vantara style */}
          <div className="mb-12 border-b border-[color:var(--ww-border)] pb-10">
            <p className="text-eyebrow mb-3">Portfolio</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h1
                className="heading-section text-[color:var(--ww-text)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Through the Lens
              </h1>
              <p
                className="text-[color:var(--ww-muted)] text-xs"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                }}
              >
                {photos.length}{" "}
                {photos.length === 1 ? "PHOTOGRAPH" : "PHOTOGRAPHS"}
                {activeCategory ? ` · ${activeCategory.toUpperCase()}` : ""}
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div className="mb-10">
            <Suspense fallback={<div className="h-8" />}>
              <CategoryFilter />
            </Suspense>
          </div>

          {/* Grid */}
          <MasonryGrid photos={photos} />
        </div>
      </main>

      <LightboxWrapper />
    </>
  );
}
