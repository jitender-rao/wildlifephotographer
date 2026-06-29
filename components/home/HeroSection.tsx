import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[560px] max-h-[900px] overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1800&q=85"
        alt="Bengal tiger in Ranthambore — Wild Wanderings by Sudiip"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay — bottom-weighted so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24">
        <div className="container-wide">
          <p className="text-eyebrow text-[color:var(--ww-gold-light)] mb-4">
            Wildlife Photography · India
          </p>
          <h1
            className="heading-display text-white max-w-2xl mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            India&apos;s Wild,
            <br />
            Through His Lens
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-md mb-8 leading-relaxed font-light">
            Fine art prints and guided wildlife expeditions from the tiger
            reserves and bird sanctuaries of India.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/portfolio" className="btn-gold">
              Explore Portfolio
            </Link>
            <Link href="/shop" className="btn-ghost-light">
              Shop Prints
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
