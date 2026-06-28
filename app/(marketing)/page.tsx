import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import NewsletterSection from "@/components/home/NewsletterSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wild Wanderings by Sudiip | Wildlife Photography India",
  description:
    "Award-winning wildlife photography from the tiger reserves and bird sanctuaries of India. Fine art prints, wildlife photography tours, and workshops by Sudiip.",
};

export default async function HomePage() {
  // Sanity data fetching is temporarily disabled until project ID is configured.
  // Replace the empty arrays with real queries once NEXT_PUBLIC_SANITY_PROJECT_ID is set:
  //
  //   import { getFeaturedPhotos, getTours } from '@/lib/sanity/queries'
  //   const [featuredPhotos, featuredTours] = await Promise.all([
  //     getFeaturedPhotos(6),
  //     getTours({ featured: true }),
  //   ])

  const featuredPhotos: never[] = [];
  const featuredTours: never[] = [];
  void featuredTours; // will be used in ToursTeaser section

  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedGallery photos={featuredPhotos} />

      {/* Print CTA Banner */}
      <section className="relative section-padding overflow-hidden bg-[color:var(--ww-bg)] border-t border-[color:var(--ww-border)]">
        <div className="container-wide text-center">
          <p className="text-caption text-[color:var(--ww-gold)] mb-3">
            Fine Art Prints
          </p>
          <h2
            className="heading-section text-[color:var(--ww-text)] mb-4 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Own a piece of the wild
          </h2>
          <p className="text-[color:var(--ww-muted)] max-w-md mx-auto mb-8">
            Museum-quality giclée prints on fine art paper. Each image
            hand-reviewed and certified. Limited and open editions available.
          </p>
          <Link href="/shop" className="btn-gold text-sm px-10 py-4">
            Shop Prints
          </Link>
        </div>
      </section>

      {/* Tours Teaser — placeholder until Sanity is live */}
      <section className="section-padding bg-[color:var(--ww-surface)] border-t border-[color:var(--ww-border)]">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-caption text-[color:var(--ww-gold)] mb-2">
                Wildlife Tours
              </p>
              <h2
                className="heading-section text-[color:var(--ww-text)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Join Sudiip in the Field
              </h2>
            </div>
            <Link
              href="/tours"
              className="hidden sm:inline text-sm text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
            >
              All tours →
            </Link>
          </div>
          {/* Tour cards will be populated from Sanity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "Ranthambore Tiger Safari",
              "Sattal Bird Photography",
              "Snow Leopard Expedition",
            ].map((name) => (
              <div key={name} className="card-surface p-6 flex flex-col gap-3">
                <div className="aspect-photo bg-[color:var(--ww-border)] rounded-sm animate-pulse" />
                <p
                  className="font-semibold text-[color:var(--ww-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {name}
                </p>
                <p className="text-caption text-[color:var(--ww-gold)] text-[10px]">
                  Coming soon via Sanity CMS
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
