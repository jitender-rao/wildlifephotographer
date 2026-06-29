import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import FeaturedGallery from "@/components/home/FeaturedGallery";
import AboutSplit from "@/components/home/AboutSplit";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const metadata: Metadata = {
  title: "Wild Wanderings by Sudiip | Wildlife Photography India",
  description:
    "Fine art wildlife prints and guided photography expeditions from the tiger reserves and bird sanctuaries of India. By Sudiip.",
};

export default async function HomePage() {
  const featuredPhotos: never[] = [];

  return (
    <>
      {/* 1. Hero — full-bleed, minimal copy */}
      <HeroSection />

      {/* 2. Core pillars — what Sudiip offers (Vantara "Core Initiatives") */}
      <section className="section-padding-sm bg-[color:var(--ww-surface)] border-b border-[color:var(--ww-border)]">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--ww-border)]">
            {[
              { icon: "◈", label: "Fine Art Prints", href: "/shop" },
              { icon: "◎", label: "Wildlife Tours", href: "/contact" },
              { icon: "◐", label: "Workshops", href: "/contact" },
              { icon: "◉", label: "Portfolio", href: "/portfolio" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group bg-[color:var(--ww-surface)] flex flex-col items-center gap-3 py-10 px-6 text-center hover:bg-[color:var(--ww-surface-alt)] transition-colors"
              >
                <span className="text-2xl text-[color:var(--ww-gold)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span
                  className="text-sm font-medium text-[color:var(--ww-text)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured gallery — 3 images, large */}
      <FeaturedGallery photos={featuredPhotos} />

      {/* 4. About split — "Where Healing Begins" equivalent */}
      <AboutSplit />

      {/* 5. Print CTA — full-bleed dark section (Vantara "Get in Touch" pattern) */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: "var(--ww-dark-bg)" }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
          }}
        />
        <div className="container-narrow relative text-center">
          <p className="text-eyebrow text-[color:var(--ww-gold-light)] mb-5">
            Fine Art Prints
          </p>
          <h2
            className="heading-section mb-5"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--ww-dark-text)",
            }}
          >
            Own a piece of the wild
          </h2>
          <p
            className="text-base mb-10 font-light"
            style={{ color: "rgba(240,235,227,0.6)" }}
          >
            Museum-quality giclée on Hahnemühle fine art paper. Limited
            editions, hand-certified.
          </p>
          <Link href="/shop" className="btn-gold">
            Shop Prints
          </Link>
        </div>
      </section>

      {/* 6. Testimonials — single-card carousel */}
      <TestimonialsSection />

      {/* 7. Join the Journey — simple strip CTA */}
      <section className="section-padding-sm bg-[color:var(--ww-surface-alt)] border-t border-[color:var(--ww-border)]">
        <div className="container-narrow text-center">
          <h2
            className="heading-section text-[color:var(--ww-text)] mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join Sudiip in the Field
          </h2>
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            WhatsApp Sudiip
          </Link>
        </div>
      </section>
    </>
  );
}
