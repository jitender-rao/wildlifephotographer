"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PhotoSummary } from "@/types/portfolio";
import { urlFor } from "@/lib/sanity/image";

interface FeaturedGalleryProps {
  photos: PhotoSummary[];
}

// Placeholder photos shown when Sanity is not yet configured
const PLACEHOLDER_PHOTOS = [
  {
    id: "1",
    title: "The Ranthambore King",
    location: "Ranthambore, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=800&q=80",
  },
  {
    id: "2",
    title: "Misty Morning",
    location: "Sattal, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
  },
  {
    id: "3",
    title: "Silent Stalk",
    location: "Corbett, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80",
  },
  {
    id: "4",
    title: "Golden Hour",
    location: "Kanha, Madhya Pradesh",
    image:
      "https://images.unsplash.com/photo-1509428685961-7f14b2f8f4e9?w=800&q=80",
  },
  {
    id: "5",
    title: "Kingfisher Dive",
    location: "Bharatpur, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1444927714506-8492d94b4e3d?w=800&q=80",
  },
  {
    id: "6",
    title: "The Watchful Eye",
    location: "Ranthambore, Rajasthan",
    image:
      "https://images.unsplash.com/photo-1503656142023-618e7d1f435a?w=800&q=80",
  },
];

export default function FeaturedGallery({ photos }: FeaturedGalleryProps) {
  const items =
    photos.length > 0
      ? photos.map((p) => ({
          id: p._id,
          title: p.title,
          location: p.location,
          image: urlFor(p.image).width(800).height(533).url(),
          slug: p.slug.current,
        }))
      : PLACEHOLDER_PHOTOS.map((p) => ({ ...p, slug: undefined }));

  return (
    <section className="section-padding bg-[color:var(--ww-bg)]">
      <div className="container-wide">
        {/* Heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-caption text-[color:var(--ww-gold)] mb-2">
              Featured Work
            </p>
            <h2
              className="heading-section text-[color:var(--ww-text)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Through the Lens
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline text-sm text-[color:var(--ww-muted)] hover:text-[color:var(--ww-gold)] transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative aspect-photo overflow-hidden rounded-sm bg-[color:var(--ww-surface)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ww-bg)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p
                  className="text-[color:var(--ww-text)] font-semibold text-sm"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.title}
                </p>
                <p className="text-caption text-[color:var(--ww-gold)] text-[10px] mt-0.5">
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
            </motion.div>
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
