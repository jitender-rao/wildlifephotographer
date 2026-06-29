import Image from "next/image";
import Link from "next/link";
import type { PhotoSummary } from "@/types/portfolio";
import { urlFor } from "@/lib/sanity/image";

interface FeaturedGalleryProps {
  photos: PhotoSummary[];
}

const PLACEHOLDER = [
  {
    id: "1",
    title: "The Ranthambore King",
    location: "Ranthambore, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=900&q=85",
  },
  {
    id: "2",
    title: "Misty Morning",
    location: "Sattal, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=900&q=85",
  },
  {
    id: "3",
    title: "Silent Stalk",
    location: "Corbett, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&q=85",
  },
];

export default function FeaturedGallery({ photos }: FeaturedGalleryProps) {
  const items =
    photos.length > 0
      ? photos.slice(0, 3).map((p) => ({
          id: p._id,
          title: p.title,
          location: p.location,
          image: urlFor(p.image).width(900).height(600).url(),
          slug: p.slug.current,
        }))
      : PLACEHOLDER.map((p) => ({ ...p, slug: undefined }));

  return (
    <section className="section-padding bg-[color:var(--ww-surface-alt)]">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-eyebrow mb-3">Featured Work</p>
            <h2
              className="heading-section text-[color:var(--ww-text)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Through the Lens
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
          >
            View all work →
          </Link>
        </div>

        {/* 3-column grid — large images, breathing room */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[color:var(--ww-border)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              {/* Minimal bottom label — always visible, not on hover */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <p className="text-white text-xs font-medium">{item.title}</p>
                <p
                  className="text-white/60 text-[10px] mt-0.5"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.location}
                </p>
              </div>
              {item.slug && (
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="absolute inset-0 z-10"
                  aria-label={item.title}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/portfolio" className="btn-outline-gold text-sm">
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
