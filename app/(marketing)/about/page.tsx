import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Sudiip — Wild Wanderings",
  description:
    "Wildlife photographer based in India. 10+ years in India's forests, 30K+ followers, fine art prints and guided expeditions.",
};

const timeline = [
  {
    year: "2014",
    note: "First trip to Ranthambore. A Bengal tiger at 40 metres — the lens went up, the world went quiet.",
  },
  {
    year: "2016",
    note: "Left a corporate career to photograph full-time. First limited-edition print sold within a week.",
  },
  {
    year: "2018",
    note: "Led first guided expedition — 8 guests, 6 days in Corbett. All eight saw a tiger on day one.",
  },
  {
    year: "2021",
    note: "30,000 followers on Instagram. Still answers every DM personally.",
  },
  {
    year: "2024",
    note: "500+ fine art prints shipped worldwide. Studio based in Bangalore.",
  },
];

const gear = [
  { label: "Body", value: "Canon EOS R5" },
  { label: "Primary lens", value: "Canon 500mm f/4L IS III" },
  { label: "Zoom", value: "Canon 100–500mm f/4.5–7.1L" },
  { label: "Wide", value: "Canon 16–35mm f/2.8L III" },
  { label: "Tripod", value: "Gitzo GT5543LS + Wimberley WH-200" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--ww-bg)]">
      {/* Hero split — portrait left, quote right */}
      <section className="pt-24 pb-0">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-end">
            {/* Portrait */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "4/5", borderRadius: "2px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85"
                alt="Sudiip — Wild Wanderings wildlife photographer"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Intro */}
            <div className="py-12 lg:py-0 lg:pb-10">
              <p className="text-eyebrow mb-4">About Sudiip</p>
              <h1
                className="heading-section text-[color:var(--ww-text)] mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ten years in India&apos;s forests.
                <br />
                Still learning.
              </h1>
              <p className="text-[color:var(--ww-muted)] text-base leading-relaxed mb-6">
                I am a wildlife photographer based in Bangalore. My work takes
                me to the tiger reserves, bird sanctuaries, and high-altitude
                landscapes of India — places where patience is measured in
                hours, not minutes.
              </p>
              <p className="text-[color:var(--ww-muted)] text-base leading-relaxed mb-10">
                I shoot to document, to feel, and occasionally to share — the
                fine art prints and guided expeditions are a way to bring others
                into these moments without extracting anything from them.
              </p>

              {/* 3 stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-[color:var(--ww-border)] pt-8">
                {[
                  { stat: "30K+", label: "Followers" },
                  { stat: "15+", label: "Species documented" },
                  { stat: "10+", label: "Years in the field" },
                ].map((s) => (
                  <div key={s.stat}>
                    <p
                      className="text-2xl font-semibold text-[color:var(--ww-text)] mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {s.stat}
                    </p>
                    <p
                      className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — full-bleed dark */}
      <section
        className="mt-20 py-20 px-6"
        style={{ background: "var(--ww-dark-bg)" }}
      >
        <div className="container-wide max-w-3xl">
          <p className="text-eyebrow text-[color:var(--ww-gold-light)] mb-6">
            Philosophy
          </p>
          <blockquote
            className="text-white text-2xl md:text-3xl font-light leading-relaxed"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;I don&apos;t believe in the decisive moment — I believe in
            the patient hour. The image worth keeping is almost always the one
            you almost left before.&rdquo;
          </blockquote>
          <p
            className="text-white/40 text-xs mt-6 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            — Sudiip
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container-wide">
          <p className="text-eyebrow mb-10">Timeline</p>
          <div className="max-w-2xl space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className="flex gap-8 pb-10"
                style={{
                  borderLeft: "1px solid var(--ww-border)",
                  paddingLeft: "2rem",
                  marginLeft: "2rem",
                  position: "relative",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-5px",
                    top: "4px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background:
                      i === timeline.length - 1
                        ? "var(--ww-gold)"
                        : "var(--ww-border)",
                    border: "2px solid var(--ww-bg)",
                  }}
                />
                <div>
                  <p
                    className="text-[color:var(--ww-gold)] text-xs mb-1"
                    style={{
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.year}
                  </p>
                  <p className="text-[color:var(--ww-muted)] text-sm leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear */}
      <section className="pb-20 border-t border-[color:var(--ww-border)]">
        <div className="container-wide pt-16">
          <p className="text-eyebrow mb-8">What I Shoot With</p>
          <div className="max-w-lg space-y-4">
            {gear.map((g) => (
              <div
                key={g.label}
                className="flex justify-between py-3 border-b border-[color:var(--ww-border)]"
              >
                <span
                  className="text-[color:var(--ww-muted)] text-[10px] uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {g.label}
                </span>
                <span
                  className="text-[color:var(--ww-text)] text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {g.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-16 border-t border-[color:var(--ww-border)]">
        <div className="container-wide flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2
              className="text-xl font-semibold text-[color:var(--ww-text)] mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Join an expedition or own a print
            </h2>
            <p className="text-[color:var(--ww-muted)] text-sm">
              Every purchase funds another season in the field.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/shop" className="btn-gold">
              Shop Prints
            </Link>
            <Link href="/contact" className="btn-outline-gold">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
